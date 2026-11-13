import {clamp,smoothstep,sectionProgress,storyPose} from './motion-math.js';

const root=document.documentElement;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const mobile=matchMedia('(max-width:620px)');
const page=document.querySelector('.page-scroll');
const deck=document.querySelector('[data-story-deck]');
const deckCards=[...document.querySelectorAll('[data-story-card]')];
const deckHeading=deck?.querySelector('[data-deck-heading]');
const materialStories=[...document.querySelectorAll('[data-material-story]')];
const brandStories=[...document.querySelectorAll('.brand-story')].map(section=>({
 chapters:[...section.querySelectorAll('.brand-story-chapter')],
 images:[...section.querySelectorAll('.brand-story-visual img')]
}));
const reading=[...document.querySelectorAll('[data-reading-reveal]')];
const parallax=[...document.querySelectorAll('.photo img,.card-photo img,.project-photo img')];
const header=document.querySelector('.header');
let frame=0,active=true;
const viewport=()=>mobile.matches?page.clientHeight:innerHeight;
const scrollTop=()=>mobile.matches?page.scrollTop:window.scrollY;
const scrollToTop=top=>{(mobile.matches?page:window).scrollTo({top,behavior:'instant'});};

function splitHeading(heading){
 if(heading.closest('.project-dialog')||heading.dataset.split)return;
 heading.dataset.split='true';
 heading.setAttribute('aria-label',heading.innerText.replace(/\s+/g,' ').trim());
 let index=0;
 const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
 const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 for(const text of nodes){
  if(!text.textContent.trim())continue;
  const fragment=document.createDocumentFragment();
  for(const part of text.textContent.split(/(\s+)/)){
   if(!part.trim()){fragment.append(document.createTextNode(part));continue;}
   const clip=document.createElement('span'),word=document.createElement('span');
   clip.className='word-clip';clip.setAttribute('aria-hidden','true');word.className='word-rise';word.textContent=part;word.style.setProperty('--word-delay',Math.min(index++*.045,.38)+'s');clip.append(word);fragment.append(clip);
  }
  text.replaceWith(fragment);
 }
 heading.classList.add('split-heading');
}

// All text and cards are visible before enhancement and in reduced-motion mode.
document.querySelectorAll('main h1,main h2').forEach(splitHeading);
for(const paragraph of reading){
 paragraph.setAttribute('aria-label',paragraph.textContent);
 const words=paragraph.textContent.split(/(\s+)/);paragraph.replaceChildren(...words.map(text=>{const span=document.createElement('span');span.textContent=text;span.setAttribute('aria-hidden','true');return span;}));
}
const entering=[...document.querySelectorAll('.offering-card,.catalog-card,.principles article,.story-grid,.furniture-feature,.about-visual,.planning-band,.material-reading article,.contact-card,.form-heading,.layout-grid article,.furniture-type-grid article,.material-chapters article,.brand-story-chapter')];
entering.forEach((node,index)=>{node.dataset.motionEnter='';node.style.setProperty('--enter-delay',(index%2)*.12+'s');});
parallax.forEach(img=>img.classList.add('parallax-image'));
if('IntersectionObserver'in window){
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('motion-visible');observer.unobserve(entry.target);}}},{threshold:.09,rootMargin:'0px 0px -25px 0px'});
 [...document.querySelectorAll('.split-heading'),...entering].forEach(el=>observer.observe(el));
}else root.classList.add('motion-static');

function update(){
 frame=0;
 const height=viewport(),top=scrollTop();
 header?.classList.toggle('is-scrolled',top>60);
 if(active){
 for(const img of parallax){const rect=img.parentElement.getBoundingClientRect();if(rect.bottom<0||rect.top>height)continue;const delta=clamp((height/2-(rect.top+rect.height/2))/height,-1,1);img.style.setProperty('--image-y',(delta*28).toFixed(2)+'px');}
 for(const paragraph of reading){const rect=paragraph.getBoundingClientRect();const progress=clamp((height*.82-rect.top)/(height*.65));const words=[...paragraph.children];words.forEach((word,index)=>{word.style.opacity=String(.25+.75*clamp((progress-index/words.length)*5));});}
 for(const {chapters,images} of brandStories){
  let current=0;
  for(let index=1;index<chapters.length;index++){
   if(chapters[index].getBoundingClientRect().top>height*.48)break;
   current=index;
  }
  images.forEach((image,index)=>image.classList.toggle('is-current',index===current));
 }
 for(const story of materialStories){
  const steps=[...story.querySelectorAll('[data-material-step]')];let nearest=0,closest=Infinity;
  steps.forEach((step,index)=>{const rect=step.getBoundingClientRect();const distance=Math.abs(rect.top+rect.height*.4-height*.5);if(distance<closest){closest=distance;nearest=index;}});
  story.querySelector('[data-material-scene]').dataset.active=String(nearest);
  story.style.setProperty('--material-phase',String(nearest));
  steps.forEach((step,index)=>step.classList.toggle('material-active',index===nearest));
  story.querySelectorAll('.material-index span').forEach((label,index)=>label.classList.toggle('active',index===nearest));
 }
 }
 if(deck&&deck.classList.contains('showcase-animated')){
  const rect=deck.getBoundingClientRect(),progress=sectionProgress(rect.top,rect.height,height);
  // Geometry uses the actual scroll viewport, including the reserved mobile contact dock.
  if(rect.bottom>0&&rect.top<height){
   const width=deck.clientWidth;
   deckHeading.style.opacity=String(1-smoothstep(.02,.13,progress));
   deckCards.forEach((card,index)=>{const p=storyPose(progress,index,deckCards.length,width,height);card.style.transform='translate3d('+p.x.toFixed(2)+'px,'+p.y.toFixed(2)+'px,0) rotateZ('+p.rotate.toFixed(2)+'deg) rotateX('+p.tilt.toFixed(2)+'deg) scale('+p.scale.toFixed(4)+')';card.style.opacity=p.opacity.toFixed(3);card.style.zIndex=String(p.z);card.style.pointerEvents=Math.abs(p.phase)<.65?'auto':'none';});
  }
 }
}
function schedule(){if(!frame)frame=requestAnimationFrame(update);}
function jumpToCard(index){
 if(!deck.classList.contains('showcase-animated'))return;
 const rect=deck.getBoundingClientRect(),height=viewport();const progress=(index+.7)/(deckCards.length+.2);
 scrollToTop(scrollTop()+rect.top+progress*(rect.height-height));schedule();
}
deckCards.forEach((card,index)=>card.addEventListener('focusin',()=>{if(card.matches(':focus-visible'))jumpToCard(index);}));

function configure(){
 active=!reduced.matches&&!root.classList.contains('motion-static')&&viewport()>=560;
 root.classList.toggle('motion-active',active);
 const animateShowcase=deck&&!reduced.matches&&!root.classList.contains('motion-static')&&viewport()>=380;
 deck?.classList.toggle('showcase-animated',Boolean(animateShowcase));
 if(!animateShowcase){
  deckCards.forEach(card=>{card.style.removeProperty('transform');card.style.removeProperty('opacity');card.style.removeProperty('pointer-events');card.style.removeProperty('z-index');});
  deckHeading?.style.removeProperty('opacity');
 }
 if(!active){
  reading.forEach(p=>[...p.children].forEach(word=>word.style.removeProperty('opacity')));
  parallax.forEach(img=>img.style.removeProperty('--image-y'));
 }
 schedule();
}
window.addEventListener('scroll',schedule,{passive:true});page?.addEventListener('scroll',schedule,{passive:true});
window.addEventListener('resize',configure,{passive:true});reduced.addEventListener('change',configure);mobile.addEventListener('change',configure);
document.fonts.ready.then(schedule);
configure();
