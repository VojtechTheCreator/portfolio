export const RAMPAGE_DURATION = 4_200;
export const SCENE_DURATION = RAMPAGE_DURATION + 12_400;
export type SceneStage = "rampage" | "glitch" | "chaos" | "laugh" | "teeth" | "swallow" | "return";
export type SceneState = {stage:SceneStage; local:number; progress:number};
export type SceneAssets = {photos:HTMLImageElement[]; faces:HTMLImageElement[]; head:HTMLImageElement; texts:string[]; titles:string[]; crash?:string};
export type PuppetOrigin = {x:number;y:number;scale:number};
export type ImpactTarget = {x:number;y:number;label:string};
export type BattleLayout = {origin:PuppetOrigin;targets:ImpactTarget[]};

const cuts: [SceneStage, number, number][] = [
  ["rampage",0,RAMPAGE_DURATION],
  ["glitch",4200,5700], ["chaos",5700,9000], ["laugh",9000,12700],
  ["teeth",12700,14300], ["swallow",14300,15800], ["return",15800,SCENE_DURATION],
];
export function sceneState(elapsed:number): SceneState {
  const [stage,start,end] = cuts.find(([,start,end]) => elapsed >= start && elapsed < end) ?? cuts[cuts.length-1];
  return {stage,local:Math.max(0,elapsed-start),progress:Math.max(0,Math.min(1,(elapsed-start)/(end-start)))};
}
const ease = (t:number) => t*t*(3-2*t);
const noise = (seed:number) => {
  const n=Math.sin(seed*127.1+311.7)*43758.5453;
  return n-Math.floor(n);
};
export function mouthPosition(width:number,height:number) {
  return {x:width*.5,y:height*.67,size:Math.max(width*.82,height*1.06)};
}

export function pageDistortion(elapsed:number) {
  const state=sceneState(elapsed);
  if(state.stage==="rampage") {
    const hit=[1050,1930,2810,3690].find(t=>elapsed>=t&&elapsed<t+100);
    return {transform:hit?`translate(${Math.sin(elapsed*.17)*6}px,${Math.cos(elapsed*.21)*4}px)`:"",filter:hit?"contrast(1.35)":""};
  }
  if(state.stage==="glitch") {
    const pulse=[160,660,1160].some(start=>state.local>=start&&state.local<start+90);
    return {transform:pulse?`translate(${Math.floor(state.local/500)%2?-7:7}px,2px)`:"",filter:pulse?"hue-rotate(110deg) saturate(2.2) contrast(1.25)":""};
  }
  if(state.stage==="swallow") {
    const p=ease(state.progress),scale=Math.max(.0001,(1-p)**3);
    return {transform:`scale(${scale}) rotate(${p*23}deg)`,filter:`blur(${p*3}px)`};
  }
  return {transform:"",filter:""};
}

export function battleState(time:number,width:number,height:number,layout:BattleLayout) {
  const index=Math.max(0,Math.min(3,Math.floor((time-450)/880)));
  const local=Math.max(0,Math.min(880,time-450-index*880));
  const scale=Math.min(1.65,width/260);
  const stand=(target:ImpactTarget):PuppetOrigin=>({
    x:Math.max(65,Math.min(width-65,target.x-65*scale)),
    y:Math.max(130*scale,Math.min(height-135*scale,target.y+42*scale)),scale,
  });
  const target=layout.targets[index];
  const before=index?stand(layout.targets[index-1]):layout.origin,after=stand(target);
  const travel=time<450?0:ease(Math.min(1,local/350));
  const x=before.x+(after.x-before.x)*travel,y=before.y+(after.y-before.y)*travel;
  const size=before.scale+(after.scale-before.scale)*travel;
  const hits=Math.max(0,Math.min(4,Math.floor((time-1050)/880)+1));
  const strike=Math.max(0,Math.min(1,(local-440)/160));
  return {x,y,scale:size,index,target,hits,strike,local,walking:time>450&&local<350};
}

function drawRampage(ctx:CanvasRenderingContext2D,width:number,height:number,time:number,assets:SceneAssets,layout:BattleLayout) {
  const pose=battleState(time,width,height,layout);
  // Cheap stick limbs, with the photographic head lifted from its actual spot.
  const step=pose.walking?Math.sin(time*.028):0;
  ctx.save();ctx.translate(pose.x,pose.y+(pose.walking?Math.abs(step)*4:0));ctx.scale(pose.scale,pose.scale);
  ctx.strokeStyle="#e5e1d5";ctx.lineWidth=2.3;ctx.lineCap="round";ctx.lineJoin="round";
  ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(2,22);ctx.lineTo(0,62);
  ctx.moveTo(0,6);ctx.lineTo(-30,27);ctx.lineTo(-38,43);
  ctx.moveTo(0,62);ctx.lineTo(-15+step*12,93);ctx.lineTo(-32+step*22,127);
  ctx.moveTo(0,62);ctx.lineTo(18-step*12,91);ctx.lineTo(34-step*22,129);ctx.stroke();
  const armed=time>=450,hit=pose.strike;
  const hand=armed?{x:16+hit*32,y:-30+hit*45}:{x:36,y:43};
  ctx.beginPath();ctx.moveTo(2,9);ctx.lineTo(armed?17:27,armed?-9:26);ctx.lineTo(hand.x,hand.y);ctx.stroke();
  ctx.imageSmoothingEnabled=false;
  ctx.drawImage(pose.hits?assets.faces[0]:assets.head,-40,-96,80,84);
  if(armed) {
    const impact={x:(pose.target.x-pose.x)/pose.scale,y:(pose.target.y-pose.y)/pose.scale};
    const end={x:-48+(impact.x+48)*ease(hit),y:-104+(impact.y+104)*ease(hit)};
    ctx.strokeStyle="#bd6742";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(hand.x,hand.y);ctx.lineTo(end.x,end.y);ctx.stroke();
    ctx.strokeStyle="#ef442e";ctx.lineWidth=11;ctx.beginPath();ctx.moveTo(hand.x+(end.x-hand.x)*.45,hand.y+(end.y-hand.y)*.45);ctx.lineTo(end.x,end.y);ctx.stroke();
  }
  ctx.restore();
  for(let i=0;i<pose.hits;i++) {
    const target=layout.targets[i],age=(time-(1050+i*880))/1000;
    ctx.save();ctx.globalAlpha=Math.max(.15,.8-age*.14);ctx.strokeStyle="#e5e1d5";ctx.lineWidth=1.6;
    // Cracks and falling letters are a separate temporary layer, not the red thread.
    for(let ray=0;ray<5;ray++) {
      const angle=ray*Math.PI*2/5+i*.31;
      ctx.beginPath();ctx.moveTo(target.x,target.y);
      for(let j=1;j<5;j++)ctx.lineTo(target.x+Math.cos(angle+j*.16)*j*23,target.y+Math.sin(angle-j*.12)*j*19);
      ctx.stroke();
    }
    ctx.font=`bold ${Math.max(18,width*.018)}px monospace`;ctx.fillStyle="#ef442e";
    if(age<.28)ctx.fillText(assets.crash??"PRÁSK!",target.x-36,target.y-28);
    ctx.fillStyle="#e5e1d5";
    const letters=target.label.slice(0,16).split("");
    letters.forEach((letter,j)=>ctx.fillText(letter,target.x+(j-8)*18*(1+age*.3),target.y+Math.min(height,age*age*160)+Math.sin(j*7)*30*age));
    ctx.restore();
  }
}

function cover(ctx:CanvasRenderingContext2D,image:HTMLImageElement,x:number,y:number,width:number,height:number) {
  const ratio=Math.max(width/image.naturalWidth,height/image.naturalHeight);
  const sw=width/ratio,sh=height/ratio;
  ctx.drawImage(image,(image.naturalWidth-sw)/2,(image.naturalHeight-sh)/2,sw,sh,x,y,width,height);
}

function collage(ctx:CanvasRenderingContext2D,width:number,height:number,time:number,assets:SceneAssets) {
  const beat=Math.floor(time/165),palette=["#c3c795","#221b23","#aa473a","#918aa9"];
  ctx.fillStyle=palette[Math.floor(time/700)%palette.length];
  ctx.fillRect(0,0,width,height);
  const mobile=width<650;
  // Photographs jump between hard cuts, like a badly spliced rehearsal tape.
  for(let i=0;i<(mobile?7:11);i++) {
    const seed=beat*31+i*17;
    const image=assets.photos[(beat*3+i*5)%assets.photos.length];
    const w=width*((mobile?.48:.22)+noise(seed+3)*(mobile?.5:.33));
    const h=w*(.48+noise(seed+4)*.44);
    const x=width*(-.17+noise(seed)*1.14),y=height*(-.18+noise(seed+1)*1.05);
    ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate((noise(seed+2)-.5)*1.1);
    ctx.globalAlpha=.65+noise(seed+5)*.35;
    cover(ctx,image,-w/2,-h/2,w,h);
    ctx.strokeStyle=i%2?"#171717":"#c7c199";ctx.lineWidth=2;ctx.strokeRect(-w/2,-h/2,w,h);
    ctx.restore();
  }
  for(let i=0;i<(mobile?7:12);i++) {
    const seed=beat*13+i*43;
    ctx.save();ctx.translate(width*noise(seed),height*noise(seed+1));ctx.rotate((noise(seed+2)-.5)*.65);
    ctx.fillStyle=i%3===0?"#b5be29":i%3===1?"#e3ded0":"#1d1918";
    ctx.font=`${i%2?"italic":"bold"} ${Math.max(15,width*(.013+noise(seed+3)*.034))}px ${i%2?"Georgia":"monospace"}`;
    const text=assets.texts[(beat+i*7)%assets.texts.length];
    const words=text.split(" ");
    ctx.fillText(words.slice(0,8).join(" "),0,0);
    ctx.fillText(words.slice(8,16).join(" "),0,35);
    ctx.restore();
  }
  ctx.save();ctx.translate(-width*.04,height*(.23+noise(beat+67)*.53));ctx.rotate((noise(beat+6)-.5)*.24);
  ctx.font=`900 ${width*(mobile?.27:.21)}px Arial`;ctx.textBaseline="middle";ctx.fillStyle="#e4ddd1";
  ctx.globalAlpha=.72;ctx.fillText(beat%2?"HONIG":"VOJTĚCH",0,0);ctx.restore();
  ctx.save();ctx.font=`bold ${Math.max(21,width*.034)}px monospace`;ctx.fillStyle="#151515";
  ctx.fillRect(width*.05,height*.06,width*.68,46);ctx.fillStyle="#c2c992";
  ctx.fillText(assets.titles[beat%assets.titles.length],width*.06,height*.06+32);ctx.restore();
  // Small print defects, never a rapid full-screen white strobe.
  ctx.fillStyle="#151515";ctx.globalAlpha=.26;
  for(let i=0;i<65;i++)ctx.fillRect(noise(beat+i*11)*width,noise(beat+i*7)*height,noise(i+beat)*32+2,2);
  ctx.globalAlpha=1;
}

function face(ctx:CanvasRenderingContext2D,width:number,height:number,time:number,assets:SceneAssets,frame:number,opacity:number,zoom=1) {
  const mouth=mouthPosition(width,height);
  const jitter=Math.floor(time/140);
  const dx=(noise(jitter+91)-.5)*9,dy=(noise(jitter+16)-.5)*7;
  const size=mouth.size*zoom;
  ctx.save();ctx.globalAlpha=opacity;ctx.translate(mouth.x+dx,mouth.y+dy);
  ctx.rotate((noise(jitter+71)-.5)*.038);
  ctx.imageSmoothingEnabled=false;
  // Frame six's dark mouth cavity is at 46.8% / 68.3% in its cutout.
  const anchor=frame===5?{x:.468,y:.683}:{x:.51,y:.73};
  ctx.drawImage(assets.faces[frame],-size*anchor.x,-size*anchor.y,size,size);
  ctx.restore();
}

export function drawInterruption(ctx:CanvasRenderingContext2D,width:number,height:number,time:number,assets:SceneAssets,battle?:BattleLayout) {
  ctx.clearRect(0,0,width,height);
  const state=sceneState(time);
  if(state.stage==="rampage") {
    if(battle)drawRampage(ctx,width,height,time,assets,battle);
    return;
  }
  if(state.stage==="glitch") {
    if(battle&&state.progress<.6){ctx.save();ctx.globalAlpha=1-state.progress/.6;drawRampage(ctx,width,height,RAMPAGE_DURATION,assets,battle);ctx.restore();}
    const pulse=[160,660,1160].some(start=>state.local>=start&&state.local<start+90);
    if(pulse){ctx.fillStyle="#19251e88";ctx.fillRect(0,0,width,height);ctx.fillStyle="#ae473a66";ctx.fillRect(0,height*.31,width,Math.max(5,height*.025));}
    return;
  }
  if(state.stage==="return") {
    ctx.fillStyle=`rgba(9,9,9,${1-ease(state.progress)})`;ctx.fillRect(0,0,width,height);return;
  }
  if(state.stage==="swallow") {
    const p=ease(state.progress),mouth=mouthPosition(width,height);
    ctx.fillStyle="#090909";ctx.fillRect(0,0,width,height);
    const eat=()=>{
      ctx.save();ctx.translate(mouth.x,mouth.y);ctx.scale(Math.max(.0001,(1-p)**3),Math.max(.0001,(1-p)**3));
      ctx.rotate(p*.65);ctx.translate(-mouth.x,-mouth.y);collage(ctx,width,height,time,assets);ctx.restore();
    };
    eat();face(ctx,width,height,time,assets,5,.62+.38*p);
    // The shrinking composition passes visibly through the actual open mouth.
    ctx.save();ctx.beginPath();ctx.ellipse(mouth.x,mouth.y,mouth.size*.067,mouth.size*.055,0,0,Math.PI*2);ctx.clip();eat();ctx.restore();
    if(p>.78){ctx.fillStyle=`rgba(9,9,9,${ease((p-.78)/.22)})`;ctx.fillRect(0,0,width,height);}
    return;
  }
  collage(ctx,width,height,time,assets);
  if(state.stage==="laugh") {
    const frames=[0,1,2,4,2,1,5,2,0,4,2,5];
    face(ctx,width,height,time,assets,frames[Math.floor(state.local/145)%frames.length],.62);
  }
  if(state.stage==="teeth") {
    const frames=[5,3,2,0,5,3,2,0];
    face(ctx,width,height,time,assets,frames[Math.min(frames.length-1,Math.floor(state.local/200))],.78);
  }
}
