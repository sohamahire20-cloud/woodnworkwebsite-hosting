export const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,value));
export function smoothstep(start,end,value){const t=clamp((value-start)/(end-start));return t*t*(3-2*t);}
export function sectionProgress(top,height,viewport){return clamp(-top/Math.max(1,height-viewport));}
export function storyPose(progress,index,count,width,height){
 const travel=clamp(progress)*(count+.2)-index-.7;
 const phase=index===count-1?Math.min(travel,0):travel;
 const distance=Math.abs(phase);
 return {x:phase*width*.72,y:-phase*height*.92,rotate:clamp(phase*11+(index%2?-3:3),-25,25),tilt:clamp(phase*14,-20,20),scale:Math.max(.78,1-distance*.075),opacity:1-smoothstep(1.08,1.75,distance),z:100-Math.round(distance*12),phase};
}
