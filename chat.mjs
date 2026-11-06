import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
const limits=new Map();
const contact='Please contact Wood N Work personally on +91 9090 9999 16 or https://wa.me/919090999916.';
export async function chat(req,res,root){
  const send=(code,data)=>{res.writeHead(code,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
  if(req.headers.origin&&!['http://'+req.headers.host,'https://'+req.headers.host].includes(req.headers.origin))return send(403,{error:'Please use the website assistant.'});
  if(!req.headers['content-type']?.startsWith('application/json'))return send(415,{error:'Please send a question as JSON.'});
  const now=Date.now(),ip=req.socket.remoteAddress;
  for(const [key,times] of limits)if(!times.some(t=>now-t<60000))limits.delete(key);
  const recent=(limits.get(ip)||[]).filter(t=>now-t<60000);
  if(recent.length>=15)return send(429,{error:'Please wait a minute before asking another question.'});
  limits.set(ip,[...recent,now]);
  let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>20000)return send(413,{error:'Please send a shorter question.'});}
  let input;try{input=JSON.parse(raw);}catch{return send(400,{error:'Invalid question.'});}
  if(typeof input?.message!=='string'||!input.message.trim()||input.message.length>1500)return send(422,{error:'Please ask a question under 1,500 characters.'});
  const question=input.message.trim(),q=question.toLowerCase();
  const planningQuestion=/^(what should i consider when planning kitchen storage\?|what is the difference between plywood and veneer\?|how can i plan wardrobe storage\?)$/.test(q);
  const faq=reply=>send(200,{reply,mode:'business-faq',notice:'Business FAQ · approved information, not a live AI answer'});
  // All enquiry-like messages remain local. Neither form values nor conversation history
  // are sent to a provider. Only the explicitly allowlisted general prompts below can use AI.
  if(/@|\d{3}|\b(my name|i am|i’m|i'm|my address|my phone|my number|my budget|my requirement|my project|my email)\b/i.test(question))return faq('Please share personal enquiry details through Get in Touch or directly on WhatsApp. This assistant handles general business questions. '+contact);
  if(/warrant|guarantee|install|deliver|timeline|how long|how soon|price|cost|rate|budget|estimate|supplier|stock|brand|partner|dealership|mahavir/.test(q))return faq('These details need a personal discussion. We do not have confirmed prices, schedules, warranties or supplier availability to share here. '+contact);
  if(/review|testimonial|completed|client|portfolio|project/.test(q))return faq('The Projects page shows illustrative kitchen, wardrobe and interior design concepts, including AI-generated imagery. They are not completed Wood N Work projects or real client briefs. No customer reviews are published without genuine approval.');
  if(/where|location|address|hour|open|visit|nashik/.test(q))return faq('Wood N Work is based in and serves Nashik. Address: 273, Shree Kulswamini Business Centre, Shop No. 6/7, Pandhari Mala, Ambad, Nashik-10. Hours: 10:00 AM–8:00 PM. '+contact);
  if(/phone|whatsapp|contact|call|email|instagram|website/.test(q))return faq('Call or WhatsApp +91 9090 9999 16. Email: siddham.0160@gmail.com. Use the Instagram link on this site to find us there. The website prepares WhatsApp drafts; you must press Send there. We cannot verify sending or delivery.');
  if(/experience|founder|siddham|history|who are/.test(q))return faq('Wood N Work — By Siddham Bhandari is based in Nashik. Founder: Siddham Bhandari. The business identifies 35+ years of experience and reasonable pricing as strengths. No founding date or detailed company history is confirmed.');
  if(!planningQuestion&&/offer|service|make|kitchen|wardrobe|furniture|interior/.test(q))return faq('Wood N Work offers interior design, furniture, modular kitchens, wardrobes and other interior-related work customised to client requirements. Share your requirement through Get in Touch, or contact us personally to discuss scope.');
  if(/enquir|quote|start|begin|form/.test(q))return faq('Use Get in Touch with your name, phone, requirement and locality. Dimensions, budget, timing and email are optional. After a successful server save, a WhatsApp draft opens. Please press Send inside WhatsApp; the website cannot verify message delivery.');
  const generalPrompts=new Map([
    ['what should i consider when planning kitchen storage?','Explain general kitchen storage planning considerations without making claims about company capabilities.'],
    ['what is the difference between plywood and veneer?','Explain in simple terms the general difference between plywood and wood veneer, without recommending a supplier or grade.'],
    ['how can i plan wardrobe storage?','Explain general wardrobe storage planning considerations without promising any product or service.']
  ]);
  const safePrompt=generalPrompts.get(q.replace(/[.!]+$/,''));
  if(!process.env.GEMINI_API_KEY||!safePrompt)return faq('I don’t have a confirmed answer to that question. '+contact+(process.env.GEMINI_API_KEY?'':' Live AI is not configured; this is a limited Business FAQ assistant.'));
  try{
    const knowledge=(await readFile(join(root,'knowledge','business.md'),'utf8')).slice(0,20000);
    const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(process.env.GEMINI_MODEL||'gemini-3.5-flash')}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY},signal:AbortSignal.timeout(20000),body:JSON.stringify({systemInstruction:{parts:[{text:'You are the Wood N Work assistant. Answer briefly using general design education and approved business facts only. Never invent business capabilities, products, reviews, completed work, prices, estimates, timelines, delivery, installation, warranties, brands, suppliers or history. Do not use the word toward. Say when a detail needs personal confirmation. Approved facts:\n'+knowledge}]},contents:[{role:'user',parts:[{text:safePrompt}]}],generationConfig:{maxOutputTokens:350,temperature:0.2}})});
    if(!response.ok)return send(503,{error:'Live AI could not connect. Business details remain available through the FAQ assistant. '+contact});
    const data=await response.json();let reply=data.candidates?.[0]?.content?.parts?.filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
    if(!reply||/\btoward\b/i.test(reply))return send(503,{error:'No suitable answer was returned. '+contact});
    return send(200,{reply,mode:'gemini',notice:'AI answer · general planning guidance. Confirm your project details personally.'});
  }catch{return send(503,{error:'Live AI is temporarily unavailable. '+contact});}
}

