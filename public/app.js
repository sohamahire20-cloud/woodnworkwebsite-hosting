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
 const status=document.querySelector('#form-status');
 let savedSubmission=null;
 const setError=(name,message)=>{const field=form.elements[name],label=document.getElementById(name+'-error');if(field)field.setAttribute('aria-invalid',message?'true':'false');if(label)label.textContent=message||'';};
 form.addEventListener('input',event=>{if(event.target.name)setError(event.target.name,'');});
 function prepareDraft(values){
  const lines=['Hello Wood N Work, I would like to discuss my requirement.','Name: '+values.name,'Phone: '+values.phone,'Requirement: '+values.requirement,'Locality: '+values.location];
  for(const [key,label]of [['space','Available space / dimensions'],['budget','Budget'],['timing','Preferred timing'],['email','Email'],['details','Details']])if(values[key])lines.push(label+': '+values[key]);
  return 'https://wa.me/919090999916?text='+encodeURIComponent(lines.join('\n'));
 }
 form.addEventListener('submit',event=>{
  event.preventDefault();
  status.textContent='';form.querySelectorAll('.field-error').forEach(n=>n.textContent='');form.querySelectorAll('[aria-invalid]').forEach(n=>n.removeAttribute('aria-invalid'));
  const values=Object.fromEntries([...new FormData(form)].map(([key,value])=>[key,String(value).trim()]));const errors={};
  if(!values.name)errors.name='Please enter your name.';
  if(!values.requirement)errors.requirement='Please select a requirement.';
  if(!values.location)errors.location='Please enter your locality.';
  const phone=values.phone.replace(/\D/g,'').replace(/^91(?=\d{10}$)/,'');
  if(!/^[6-9]\d{9}$/.test(phone)||!/^(?:\+91[ -]?)?[6-9][0-9 -]{8,13}$/.test(values.phone))errors.phone='Please enter a valid Indian mobile number.';
  if(values.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))errors.email='Please enter a valid email address.';
  if(Object.keys(errors).length){for(const [name,message]of Object.entries(errors))setError(name,message);status.textContent='Please check the highlighted fields. Your entries are still here.';form.elements[Object.keys(errors)[0]].focus();return;}
  const href=prepareDraft(values);
  const fingerprint=JSON.stringify(values);
  if(savedSubmission!==fingerprint){
   savedSubmission=fingerprint;
   // Keep the save request alive when the browser leaves for WhatsApp.
   fetch('/api/enquiries',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:fingerprint,
    keepalive:true
   }).then(response=>{
    if(!response.ok&&savedSubmission===fingerprint)savedSubmission=null;
   }).catch(()=>{
    if(savedSubmission===fingerprint)savedSubmission=null;
   });
  }
  window.location.assign(href);
 });
}

const productPhotoDialog = document.querySelector('#product-photo-dialog');
if (productPhotoDialog?.showModal) {
  const title = productPhotoDialog.querySelector('#product-photo-title');
  const image = productPhotoDialog.querySelector('#product-photo-image');
  const original = productPhotoDialog.querySelector('#product-photo-original');

  for (const link of document.querySelectorAll('[data-product-photo]')) {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const name = link.querySelector('img').alt;
      title.textContent = name;
      image.alt = name;
      image.src = link.href;
      original.href = link.href;
      productPhotoDialog.showModal();
      event.preventDefault();
    });
  }

  productPhotoDialog.addEventListener('click', event => {
    if (event.target !== productPhotoDialog) return;
    const bounds = productPhotoDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      productPhotoDialog.close();
    }
  });
}
