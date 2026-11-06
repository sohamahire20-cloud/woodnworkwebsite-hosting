document.documentElement.classList.add('js');
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Open menu');}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');navigation.classList.toggle('open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton?.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>860)closeMenu();});

// Shared tools are rendered on every route; storage failures never break navigation.
const storage={read(key,fallback){try{return JSON.parse(sessionStorage.getItem(key))??fallback;}catch{return fallback;}},write(key,value){try{sessionStorage.setItem(key,JSON.stringify(value));}catch{}}};
const chatPanel=document.querySelector('#chat-panel');
const chatToggle=document.querySelector('#chat-toggle');
const chatInput=document.querySelector('#chat-input');
const chatMessages=document.querySelector('#chat-messages');
const chatState=document.querySelector('#chat-state');
const chatNotice=document.querySelector('#chat-notice');
let chatHistory=[];
if(!Array.isArray(chatHistory))chatHistory=[];
chatHistory=chatHistory.filter(item=>item&&['user','assistant'].includes(item.role)&&typeof item.content==='string').slice(-20).map(item=>({role:item.role,content:item.content.slice(0,5000)}));
let chatBusy=false;
function addChatMessage(role,text,error=false){const item=document.createElement('div');item.className=`chat-message ${role}${error?' error':''}`;item.textContent=text;chatMessages.append(item);chatMessages.scrollTop=chatMessages.scrollHeight;return item;}
function saveChat(){/* Questions stay in this page only; enquiry data never feeds the assistant. */}
function openChat(open,focus=true){chatPanel.hidden=!open;chatToggle.setAttribute('aria-expanded',String(open));chatToggle.setAttribute('aria-label',open?'Close Wood N Work assistant':'Open Wood N Work assistant');document.body.classList.toggle('chat-open',open);storage.write('wnw-chat-open',open);if(open&&focus)chatInput.focus({preventScroll:true});if(!open&&focus)chatToggle.focus({preventScroll:true});}
if(chatPanel){
 for(const item of chatHistory)addChatMessage(item.role,item.content);
 openChat(false,false);
 const mode=document.querySelector('#chat-mode');
 fetch('/api/chat/status').then(r=>{if(!r.ok)throw new Error();return r.json();}).then(data=>{mode.textContent=data.mode==='ai-configured'?'Business FAQ · AI configured for general planning':'Business FAQ · live AI not configured';}).catch(()=>{mode.textContent='Availability unknown · contact us if needed';});
 chatToggle.addEventListener('click',()=>openChat(chatPanel.hidden));
 document.querySelector('#chat-close').addEventListener('click',()=>openChat(false));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!chatPanel.hidden){openChat(false);event.preventDefault();}});
 const defaultNotice=chatNotice.textContent;
 async function sendChat(message){
  message=String(message||'').trim().slice(0,1500);if(!message||chatBusy)return;
  const history=chatHistory.slice(-10);chatBusy=true;chatInput.value='';
  const sendButton=document.querySelector('#chat-form button');sendButton.disabled=true;chatState.textContent='Thinking…';
  addChatMessage('user',message);chatHistory.push({role:'user',content:message});saveChat();
  const loading=addChatMessage('assistant','One moment…');loading.setAttribute('aria-label','Assistant is preparing a reply');
  try{
   const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message}),signal:AbortSignal.timeout(30000)});
   const result=await response.json();if(!response.ok||typeof result.reply!=='string')throw new Error(result.error||'The assistant could not reply just now. Please try again or contact us on WhatsApp.');
   loading.remove();addChatMessage('assistant',result.reply);chatHistory.push({role:'assistant',content:result.reply});chatHistory=chatHistory.slice(-20);saveChat();
   chatNotice.textContent=result.notice||defaultNotice;chatState.textContent=result.mode==='gemini'?'AI planning guidance':'Business FAQ answer';
  }catch(error){
   loading.remove();chatHistory.pop();saveChat();chatInput.value=message;
   const item=addChatMessage('assistant',error.name==='TimeoutError'?'That took longer than expected. Please try again, or reach us on WhatsApp.':error.message,true);
   const retry=document.createElement('button');retry.textContent='Try again';retry.className='chat-retry';retry.addEventListener('click',()=>{item.remove();sendChat(message);});item.append(document.createElement('br'),retry);chatState.textContent='Could not connect';
  }finally{chatBusy=false;sendButton.disabled=false;}
 }
 document.querySelector('#chat-form').addEventListener('submit',event=>{event.preventDefault();sendChat(chatInput.value);});
 document.querySelectorAll('.chat-suggestions button').forEach(button=>button.addEventListener('click',()=>sendChat(button.textContent)));
 document.querySelector('#chat-clear').addEventListener('click',()=>{if(chatBusy)return;chatHistory=[];saveChat();chatMessages.replaceChildren();addChatMessage('assistant','A fresh start. What would you like to know about your space?');chatState.textContent='';chatNotice.textContent=defaultNotice;chatInput.value='';chatInput.focus();});
}

// Concept studies stay distinct from actual completed commissions.
const projectDataElement=document.querySelector('#project-data');
let projectData=[];try{projectData=JSON.parse(projectDataElement?.textContent||'[]');}catch{}
const projectDialog=document.querySelector('#project-dialog');
let projectOpener;
if(projectDialog){
 if(typeof projectDialog.showModal!=='function')document.documentElement.classList.add('no-dialog');
 projectDialog.setAttribute('aria-labelledby','project-dialog-title');
 document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',event=>{
  const project=projectData.find(item=>item.id===button.dataset.project);if(!project)return;projectOpener=button;
  if(typeof projectDialog.showModal!=='function')return;
  event.preventDefault();
  if(document.querySelector('[data-project-gallery]'))document.querySelector('[data-filter="'+project.category+'"]')?.click();
  const image=document.querySelector('#project-dialog-image');image.src=project.image;image.alt=`AI-generated design: ${project.title}`;
  for(const name of ['title','brief','solution'])document.querySelector(`#project-dialog-${name}`).textContent=project[name];
  const list=document.querySelector('#project-dialog-materials');list.replaceChildren(...project.materials.map(text=>{const item=document.createElement('li');item.textContent=text;return item;}));
  projectDialog.showModal();projectDialog.scrollTop=0;document.body.classList.add('dialog-open');document.dispatchEvent(new Event('project:opened'));
 }));
 const closeProject=()=>projectDialog.close();
 projectDialog.querySelector('.dialog-close').addEventListener('click',closeProject);
 projectDialog.addEventListener('click',event=>{if(event.target===projectDialog){const rect=projectDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeProject();}});
 projectDialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');projectOpener?.focus({preventScroll:true});});
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
 let stagger=0;
 document.querySelectorAll('.project-card[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&card.animate)card.animate([{opacity:0,transform:'translateY(28px) scale(.98)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:500,delay:stagger++*65,easing:'cubic-bezier(.16,1,.3,1)'});});
}));

// Six-second decorative film. No text, replay or other controls overlay the opening.
const openingVideo=document.querySelector('#opening-video');
if(openingVideo){
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 openingVideo.muted=true;
 openingVideo.addEventListener('playing',()=>openingVideo.classList.add('is-playing'));
 openingVideo.addEventListener('error',()=>openingVideo.classList.remove('is-playing'));
 motion.addEventListener('change',()=>{if(motion.matches){openingVideo.pause();openingVideo.classList.remove('is-playing');}});
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)openingVideo.pause();});observer.observe(openingVideo);}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)openingVideo.pause();});
 if(!motion.matches&&!navigator.connection?.saveData){openingVideo.src=openingVideo.dataset.src;openingVideo.play().catch(()=>openingVideo.classList.remove('is-playing'));}
}

const form=document.querySelector('#enquiry-form');
if(form){
 const select=form.elements.requirement;
 const requested=new URLSearchParams(location.search).get('requirement');
 if([...select.options].some(option=>option.value===requested))select.value=requested;
 const status=document.querySelector('#form-status'),submit=form.querySelector('button[type=submit]');
 let savedSubmission=null;
 const setError=(name,message)=>{const field=form.elements[name],label=document.getElementById(name+'-error');if(field)field.setAttribute('aria-invalid',message?'true':'false');if(label)label.textContent=message||'';};
 form.addEventListener('input',event=>{if(event.target.name)setError(event.target.name,'');});
 function prepareDraft(values,reference){
  const lines=['Hello Wood N Work, I would like to discuss my requirement.','Reference: '+reference,'Name: '+values.name,'Phone: '+values.phone,'Requirement: '+values.requirement,'Locality: '+values.location];
  for(const [key,label]of [['space','Available space / dimensions'],['budget','Budget'],['timing','Preferred timing'],['email','Email'],['details','Details']])if(values[key])lines.push(label+': '+values[key]);
  return 'https://wa.me/919090999916?text='+encodeURIComponent(lines.join('\n'));
 }
 function showSaved(reference,href,popupAvailable){
  status.replaceChildren();
  const heading=document.createElement('p');heading.textContent='Your enquiry was saved on the website server. Reference '+reference+'.';status.append(heading);
  const note=document.createElement('p');note.textContent=popupAvailable?'A WhatsApp draft was requested in a new tab. Please press Send inside WhatsApp. If it did not open, use the link below.':'Your browser did not allow the WhatsApp tab to open. Use the link below to open your draft, then press Send inside WhatsApp.';status.append(note);
  const uncertainty=document.createElement('p');uncertainty.textContent='The website cannot know whether you pressed Send or whether a message was delivered. Your saved enquiry is separate from WhatsApp.';status.append(uncertainty);
  const fallback=document.createElement('a');fallback.href=href;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.textContent='Open WhatsApp draft ↗';status.append(fallback);
  status.focus();
 }
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(submit.disabled)return;
  status.textContent='';form.querySelectorAll('.field-error').forEach(n=>n.textContent='');form.querySelectorAll('[aria-invalid]').forEach(n=>n.removeAttribute('aria-invalid'));
  const values=Object.fromEntries([...new FormData(form)].map(([key,value])=>[key,String(value).trim()]));const errors={};
  if(!values.name)errors.name='Please enter your name.';
  if(!values.requirement)errors.requirement='Please select a requirement.';
  if(!values.location)errors.location='Please enter your locality.';
  const phone=values.phone.replace(/\D/g,'').replace(/^91(?=\d{10}$)/,'');
  if(!/^[6-9]\d{9}$/.test(phone)||!/^(?:\+91[ -]?)?[6-9][0-9 -]{8,13}$/.test(values.phone))errors.phone='Please enter a valid Indian mobile number.';
  if(values.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))errors.email='Please enter a valid email address.';
  if(Object.keys(errors).length){for(const [name,message]of Object.entries(errors))setError(name,message);status.textContent='Please check the highlighted fields. Your entries are still here.';form.elements[Object.keys(errors)[0]].focus();return;}
  // Reserve a window during the click gesture, before awaiting the server save.
  let popup;try{popup=window.open('about:blank','_blank');if(popup){popup.opener=null;popup.document.title='Preparing your WhatsApp draft';popup.document.body.textContent='Saving your enquiry. Your WhatsApp draft will open here after the website confirms the save. Please keep this tab open.';}}catch{popup=null;}
  const fingerprint=JSON.stringify(values);
  submit.disabled=true;submit.textContent='Saving your enquiry…';form.setAttribute('aria-busy','true');
  let saveConfirmed=false;
  try{
   let result;
   if(savedSubmission?.fingerprint===fingerprint)result=savedSubmission.result;
   else{
    const response=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values),signal:AbortSignal.timeout(20000)});
    result=await response.json();
    if(!response.ok){if(result.errors){for(const [name,message]of Object.entries(result.errors))setError(name,message);form.elements[Object.keys(result.errors)[0]]?.focus();}throw new Error(result.error||'The server could not save your enquiry. Please try again or call us.');}
    if(result.status!=='saved'||typeof result.reference!=='string')throw new Error('The server did not confirm a save. Please call us before trying again.');
    savedSubmission={fingerprint,result};
   }
   saveConfirmed=true;
   const href=prepareDraft(values,result.reference);let popupAvailable=false;
   try{if(popup&&!popup.closed){popup.location.replace(href);popupAvailable=true;}}catch{try{popup?.close();}catch{}}
   showSaved(result.reference,href,popupAvailable);
  }catch(error){
   try{popup?.close();}catch{}
   status.textContent=error.name==='TimeoutError'||error instanceof TypeError?'We could not confirm the server save. Your entries are still here. Please call Wood N Work before retrying if you are unsure whether the enquiry was saved.':error.message;
   if(!form.querySelector('[aria-invalid="true"]'))status.focus();
  }finally{submit.disabled=false;submit.textContent=saveConfirmed?'Open saved WhatsApp draft ↗':'Save & open WhatsApp ↗';form.removeAttribute('aria-busy');}
 });
}

if(document.querySelector('[data-project-gallery]'))document.querySelector('[data-filter="kitchens"]')?.click();
const conceptId=new URLSearchParams(location.search).get('concept');
if(conceptId)document.querySelector('[data-project="'+CSS.escape(conceptId)+'"]')?.click();
function openConceptHash(){const id=location.hash.match(/^#concept-([a-z-]+)$/)?.[1];if(id)document.querySelector('[data-project="'+CSS.escape(id)+'"]')?.click();}
openConceptHash();
window.addEventListener('hashchange',openConceptHash);
