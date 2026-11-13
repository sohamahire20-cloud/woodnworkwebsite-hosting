import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,readFile,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {Readable} from 'node:stream';
import {routes,render} from '../pages.mjs';
import {chat} from '../chat.mjs';
import {clamp,sectionProgress,storyPose} from '../public/motion-math.js';
const root=resolve('.');
let checks=0;
function ok(condition,message){assert.ok(condition,message);checks++;}
async function launch(directory,port){
 const child=spawn(process.execPath,['server.mjs'],{cwd:root,env:{...process.env,PORT:String(port),HOST:'127.0.0.1',DATA_DIRECTORY:directory,GEMINI_API_KEY:''},stdio:['ignore','pipe','pipe']});
 await new Promise((done,fail)=>{const timer=setTimeout(()=>{child.kill();fail(new Error('Test server did not start'));},10000);child.once('error',fail);child.once('exit',code=>{clearTimeout(timer);fail(new Error('Server exited '+code));});child.stdout.on('data',data=>{if(data.toString().includes('preview:')){clearTimeout(timer);done();}});});
 return child;
}
const directory=await mkdtemp(join(root,'.work','verify-'));
const child=await launch(directory,3131);
const base='http://127.0.0.1:3131';
const post=(path,body,headers={})=>fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
try{
 const assets=new Set();
 const products=render('/products');
 for(const id of ['kitchens','wardrobes','doors','beds','office-furniture']){
  ok(products.includes('id="'+id+'"'),'catalog category '+id);
 }
 ok((products.match(/class="catalog-card"/g)||[]).length===18,'all catalog entries rendered');
 for(const material of ['BWR/BWP Plywood','HMDR','Premium Hardware','Premium Laminate','Acrylic','P.U. Painted Shutters / Doors','Membrane Shutters / Doors']){
  ok(products.includes(material)&&render('/').includes(material),'approved material '+material);
 }
 for(const [path,target] of [['/projects','/products'],['/plywood-hardware','/products#materials']]){
  const response=await fetch(base+path,{redirect:'manual'});
  ok(response.status===301&&response.headers.get('location')===target,'retired route redirects '+path);
 }
 ok(clamp(-2)===0&&clamp(2)===1,'motion progress stays bounded');
 ok(sectionProgress(0,3000,750)===0&&sectionProgress(-2250,3000,750)===1,'pinned stage starts and finishes at section boundaries');
 for(let index=0;index<4;index++){const progress=(index+.7)/4.2;const pose=storyPose(progress,index,4,1200,750);ok(Math.abs(pose.x)<.001&&Math.abs(pose.y)<.001&&pose.opacity===1,'each story reaches the readable centre');}
 ok(storyPose(1,3,4,1200,750).opacity===1&&storyPose(1,3,4,1200,750).phase===0,'last story remains readable until the stage releases');
 const before=storyPose(0,0,4,1200,750),after=storyPose(.3,0,4,1200,750);ok(before.x<after.x&&before.y>after.y,'cards follow the diagonal scroll path in both directions');
 const opening=render('/').match(/<section class="opening"[\s\S]*?<\/section>/)?.[0];
 ok(opening&&opening.includes('href="#welcome"')&&opening.includes('Scroll to explore')&&!/<button|opening-bottom|film-control/.test(opening),'opening includes the mobile scroll link and has no playback overlays');
 for(const path of ['/fonts/eb-garamond-regular.woff2','/fonts/eb-garamond-italic.woff2','/fonts/figtree-regular.woff2','/motion-math.js']){const response=await fetch(base+path);ok(response.status===200,'local motion dependency '+path);}
 const metadata=JSON.parse(render('/').match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 ok(metadata.name==='Wood N Work'&&metadata.address.addressLocality==='Nashik','confirmed local business metadata');
 ok(!('aggregateRating' in metadata)&&!('openingHours' in metadata),'no invented review statistics or opening days');
 ok((await fetch(base+'/robots.txt')).status===200,'robots file available');
 const sitemap=await (await fetch(base+'/sitemap.xml')).text();ok((sitemap.match(/<loc>/g)||[]).length===4,'four canonical pages in sitemap');
 for(const path of Object.keys(routes)){
  const response=await fetch(base+path);const html=await response.text();ok(response.status===200,'route '+path);
  ok((html.match(/<h1>/g)||[]).length===1,'one h1 '+path);
  ok(!/\btoward\b|Siddham Bhandari|interior design|Sample testimonial|Ananya Patil|Rohan Mehta|Sneha Kulkarni|India.s best/i.test(html),'copy guard '+path);
  ok(html.includes('woodnwork16@gmail.com')&&html.includes('Shree Kulswamini'),'confirmed contact '+path);
  for(const match of html.matchAll(/(?:src|href|data-src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g))if(match[1]!=='/')assets.add(match[1]);
 }
 for(const path of assets){const response=await fetch(base+path,{method:'HEAD'});ok(response.status===200,'link or asset '+path);}
 for(const path of ['/data/enquiries.ndjson','/.env.local','/knowledge/business.md','/server.mjs','/research/rebuild-plan.md','/../.env.local','/%2e%2e%2f.env.local']){ok((await fetch(base+path)).status===404,'private path denied '+path);}
 let r=await post('/api/enquiries',{});let body=await r.json();ok(r.status===422&&body.errors.name&&body.errors.phone&&body.errors.location&&body.errors.requirement,'required validation');
 r=await post('/api/enquiries',{name:'QA',phone:'123',location:'Nashik',requirement:'Kitchen',email:'bad'});body=await r.json();ok(r.status===422&&body.errors.email&&body.errors.phone,'invalid phone email');
 const lead={name:'LOCAL QA — not a customer',phone:'9000000000',location:'Test locality',requirement:'Office Furniture',space:'Test dimensions',budget:'To discuss',timing:'Flexible',email:'qa@example.invalid',details:'Test only; no external message.'};
 r=await post('/api/enquiries',lead);body=await r.json();ok(r.status===201&&body.status==='saved'&&/^WNW-/.test(body.reference),'real saved response');
 const saved=(await readFile(join(directory,'enquiries.ndjson'),'utf8')).trim().split('\n').map(JSON.parse);ok(saved.length===1&&saved[0].reference===body.reference&&saved[0].phone===lead.phone&&saved[0].email===lead.email,'durable persisted fields');
 ok(!('consent' in saved[0])&&!('notificationStatus' in saved[0]),'no stale consent or automatic notification');
 r=await post('/api/enquiries',lead,{Origin:'https://unrelated.example'});ok(r.status===403,'cross origin rejected');
 r=await fetch(base+'/api/enquiries',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'name=QA'});ok(r.status===415,'no-JS POST rejected without URL leak');
 r=await post('/api/enquiries',[]);ok(r.status===400,'array rejected');
 r=await post('/api/enquiries',{...lead,details:'a'.repeat(17000)});ok(r.status===413,'oversized body rejected');
 r=await fetch(base+'/video/kitchen-opening-six.mp4',{headers:{Range:'bytes=0-99'}});ok(r.status===206&&(await r.arrayBuffer()).byteLength===100,'video byte range');
 r=await fetch(base+'/video/kitchen-opening-six.mp4',{headers:{Range:'bytes=99999999-'}});ok(r.status===416,'invalid range rejected');
 r=await fetch(base+'/api/chat/status');body=await r.json();ok(body.mode==='business-faq','honest unconfigured status');
 for(const [question,expected]of [['Where are you based?','Shree Kulswamini'],['What do you offer?','modular kitchens'],['What is the warranty?','personally'],['Do you have reviews?','No customer reviews'],['My phone is 9000000000','personal enquiry']]){r=await post('/api/chat',{message:question});body=await r.json();ok(r.status===200&&body.mode==='business-faq'&&body.reply.includes(expected),'grounded FAQ '+question);}
 // Provider adapter: intercept fetch in this test process; never contact a real AI service.
 const originalFetch=globalThis.fetch,oldKey=process.env.GEMINI_API_KEY;let forwarded=[];process.env.GEMINI_API_KEY='test-placeholder';
 const invoke=async(message,history=[])=>{const req=Readable.from([Buffer.from(JSON.stringify({message,history}))]);req.headers={'content-type':'application/json',host:'localhost'};req.socket={remoteAddress:'test-'+Math.random()};let output;const res={writeHead(code){this.code=code;},end(text){output={code:this.code,...JSON.parse(text)};}};await chat(req,res,root);return output;};
 try{
  globalThis.fetch=async(url,options)=>{forwarded.push(JSON.parse(options.body));return {ok:true,json:async()=>({candidates:[{content:{parts:[{text:'Plan shelves around everyday items. Confirm details personally.'}]}}]})};};
  let result=await invoke('How can I plan wardrobe storage?',[{role:'user',content:'private-enquiry-secret'}]);ok(result.mode==='gemini'&&forwarded.length===1,'allowlisted general AI question reaches adapter');
  ok(!JSON.stringify(forwarded).includes('private-enquiry-secret')&&!JSON.stringify(forwarded).includes('9000000000'),'history and enquiry data excluded');
  result=await invoke('My requirement is a kitchen at 123 Private Road, my number is 9000000000');ok(result.mode==='business-faq'&&forwarded.length===1,'private enquiry never forwarded');
  globalThis.fetch=async()=>({ok:false});result=await invoke('What is the difference between plywood and veneer?');ok(result.code===503&&result.error.includes('could not connect'),'honest provider error');
 }finally{globalThis.fetch=originalFetch;if(oldKey===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=oldKey;}
 const blocked=join(directory,'not-a-directory');await writeFile(blocked,'test fixture');const failure=await launch(blocked,3132);
 try{const response=await fetch('http://127.0.0.1:3132/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(lead)});const result=await response.json();ok(response.status===500&&!result.reference&&result.error.includes('could not save'),'save failure never claims success');}finally{failure.kill();}
 console.log('PASS: '+checks+' route, asset, copy, persistence, validation, privacy, video and chatbot checks.');
 console.log('QA data isolated in '+directory+' (not the business enquiries).');
}finally{child.kill();}

