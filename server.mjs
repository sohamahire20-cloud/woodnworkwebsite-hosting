import http from 'node:http';
import { readFile, mkdir, open, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { resolve, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { render, routes, redirects } from './pages.mjs';
import { chat } from './chat.mjs';
import { enquiryRequirements } from './catalog.mjs';

const root = dirname(fileURLToPath(import.meta.url));
for (const file of ['.env', '.env.local']) { try { process.loadEnvFile(resolve(root,file)); } catch {} }
const assets = resolve(root, 'public');
const dataDirectory = resolve(process.env.DATA_DIRECTORY || resolve(root, 'data'));
if (dataDirectory === assets || dataDirectory.startsWith(assets + '/') || dataDirectory.startsWith(assets + '\\')) throw new Error('DATA_DIRECTORY must be outside public assets.');
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '127.0.0.1';
const attempts = new Map();
let writeQueue = Promise.resolve();
const types = { '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png', '.ico':'image/x-icon', '.txt':'text/plain; charset=utf-8', '.xml':'application/xml; charset=utf-8', '.woff2':'font/woff2' };
const json = (res, status, body) => {res.writeHead(status, {'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(body));};
const fields = {name:100,requirement:60,location:180,space:200,details:2500,phone:30,email:180,timing:150,budget:150};
async function enquiry(req,res) {
  const origin = req.headers.origin;
  if (origin && origin !== `http://${req.headers.host}` && origin !== `https://${req.headers.host}`) return json(res,403,{error:'Please submit from this website.'});
  if (!req.headers['content-type']?.startsWith('application/json')) return json(res,415,{error:'Please send the enquiry as JSON.'});
  const ip = req.socket.remoteAddress;
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter(time=> now-time < 60000);
  for (const [key, times] of attempts) if (!times.some(time=>now-time<60000)) attempts.delete(key);
  if (recent.length >= 8) return json(res,429,{error:'Please wait a minute before trying again.'});
  attempts.set(ip,[...recent,now]);
  let body='';
  for await (const chunk of req) { body += chunk; if(Buffer.byteLength(body)>16384) return json(res,413,{error:'Your enquiry is too long.'}); }
  let input;
  try { input = JSON.parse(body); } catch { return json(res,400,{error:'Please check your enquiry and try again.'}); }
  if(!input || typeof input !== 'object' || Array.isArray(input)) return json(res,400,{error:'Invalid enquiry.'});
  const values = {};const errors={};
  for (const [key,max] of Object.entries(fields)) { values[key]=typeof input[key]==='string'?input[key].trim():''; if(values[key].length>max) errors[key]=`Please keep this under ${max} characters.`; }
  if(!values.name) errors.name='Please enter your name.';
  if(!enquiryRequirements.includes(values.requirement)) errors.requirement='Please select your requirement.';
  if(!values.location) errors.location='Please enter your project locality.';
  if(!/^(?:\+91[ -]?)?[6-9][0-9 -]{8,13}$/.test(values.phone)||values.phone.replace(/\D/g,'').replace(/^91(?=\d{10}$)/,'').length!==10) errors.phone='Please enter a valid Indian mobile number.';
  if(values.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email='Please enter a valid email address.';
  if(Object.keys(errors).length) return json(res,422,{error:'Please check the highlighted fields.',errors});
  const reference=`WNW-${randomUUID().slice(0,8).toUpperCase()}`;
  const lead={reference,createdAt:new Date().toISOString(),...values};
  const save=writeQueue.then(async()=>{await mkdir(dataDirectory,{recursive:true,mode:0o700});const handle=await open(resolve(dataDirectory,'enquiries.ndjson'),'a',0o600);try{await handle.writeFile(JSON.stringify(lead)+'\n');await handle.sync();}finally{await handle.close();}});
  writeQueue=save.catch(()=>{});
  try { await save; } catch { return json(res,500,{error:'We could not save your enquiry. Please try again or call us.'}); }
  // Saving is distinct from the visitor sending their draft in WhatsApp.
  json(res,201,{reference,status:'saved'});
}
const server=http.createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','SAMEORIGIN');
  try {
    const url=new URL(req.url,'http://localhost');const path=decodeURIComponent(url.pathname);
    if(path==='/api/chat/status'&&req.method==='GET') return json(res,200,{mode:process.env.GEMINI_API_KEY?'ai-configured':'business-faq'});
    if(path==='/api/enquiries'&&req.method==='POST') return await enquiry(req,res);
    if(path==='/api/chat'&&req.method==='POST') return await chat(req,res,root);
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end();}
    if(redirects.has(path)){res.writeHead(301,{Location:redirects.get(path)});return res.end();}
    if(Object.hasOwn(routes,path)) {const html=render(path);res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'});return res.end(req.method==='HEAD'?undefined:html);}
    const asset=resolve(assets,'.'+path);
    if(!asset.startsWith(assets+'\\')&&!asset.startsWith(assets+'/')){res.writeHead(404);return res.end('Not found');}
    if(extname(asset)==='.mp4') {
      let info;try{info=await stat(asset);}catch{res.writeHead(404);return res.end('Not found');}
      const headers={'Content-Type':'video/mp4','Accept-Ranges':'bytes','Cache-Control':'public, max-age=86400'};
      let start=0,end=info.size-1,status=200;
      if(req.headers.range){
        const range=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        if(!range||(!range[1]&&!range[2])){res.writeHead(416,{...headers,'Content-Range':`bytes */${info.size}`});return res.end();}
        start=range[1]?Number(range[1]):Math.max(0,info.size-Number(range[2]));
        end=range[1]&&range[2]?Math.min(Number(range[2]),info.size-1):info.size-1;
        if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end||start>=info.size){res.writeHead(416,{...headers,'Content-Range':`bytes */${info.size}`});return res.end();}
        status=206;headers['Content-Range']=`bytes ${start}-${end}/${info.size}`;
      }
      headers['Content-Length']=end-start+1;res.writeHead(status,headers);
      if(req.method==='HEAD')return res.end();
      const stream=createReadStream(asset,{start,end});
      stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());return stream.pipe(res);
    }
    if(!types[extname(asset)]) {res.writeHead(404);return res.end('Not found');}
    try {const file=await readFile(asset);res.writeHead(200,{'Content-Type':types[extname(asset)],'Cache-Control':path.startsWith('/frames/')?'public, max-age=86400':'no-cache'});res.end(req.method==='HEAD'?undefined:file);}catch{res.writeHead(404);res.end('Not found');}
  }catch(error){if(!res.headersSent)json(res,500,{error:'Something went wrong. Please try again.'});else res.end();}
});
server.listen(port,host,()=>console.log(`Wood N Work preview: http://localhost:${port}`));
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
