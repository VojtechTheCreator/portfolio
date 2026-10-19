"use client";

import {useEffect,useRef,useState} from "react";
import {createPortal} from "react-dom";
import {labels,portfolioFor,type Language} from "./portfolio-i18n";
import {battleState,drawInterruption,mouthPosition,pageDistortion,sceneState,SCENE_DURATION,type BattleLayout,type SceneAssets} from "./interruption-scene";
import {ProfilePuppet} from "./profile-puppet";

function loadImage(src:string):Promise<HTMLImageElement> {
  return new Promise((resolve,reject)=>{
    const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error("Image unavailable: "+src));image.src=src;
  });
}

/** A click wakes the portrait puppet; all damage is temporary and reversible. */
export function PortfolioInterruption({blocked,paused,language="cs"}:{blocked:boolean;paused:boolean;language?:Language}) {
  const ui=labels[language],{productions:projects}=portfolioFor(language);
  const languageRef=useRef(language);languageRef.current=language;
  const [playing,setPlaying]=useState(false);
  const [vanished,setVanished]=useState(false);
  const [ready,setReady]=useState(false),[allowed,setAllowed]=useState(true);
  const canvas=useRef<HTMLCanvasElement>(null),skip=useRef<HTMLButtonElement>(null);
  const drawing=useRef<SVGSVGElement>(null);
  const assets=useRef<SceneAssets|null>(null);
  const flags=useRef({blocked,paused});flags.current={blocked,paused};

  useEffect(()=>{
    let disposed=false;
    Promise.all([
      Promise.all(Array.from({length:12},(_,i)=>loadImage(`/media/short-circuit/photo-${i}.webp`))),
      Promise.all(Array.from({length:6},(_,i)=>loadImage(`/media/short-circuit/evil-face-${i}.webp`))),
      loadImage("/media/short-circuit/head-neutral.webp"),
      loadImage("/media/short-circuit/head-wink.webp"),
    ]).then(([photos,faces,head])=>{
      if(!disposed){const content=portfolioFor(languageRef.current);assets.current={photos,faces,head,texts:[...content.about,...content.productions.flatMap(p=>[...p.paragraphs,...p.quote?[p.quote]:[],...p.lead?[p.lead]:[]])],titles:content.productions.map(p=>p.title),crash:labels[languageRef.current].crash};setReady(true);}
    }).catch(()=>{assets.current=null;});
    const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync=()=>{setAllowed(!preference.matches);if(preference.matches)setPlaying(false);};
    sync();preference.addEventListener("change",sync);
    return()=>{disposed=true;preference.removeEventListener("change",sync);assets.current=null;};
  },[]);

  useEffect(()=>{
    if(!assets.current)return;
    const content=portfolioFor(language);
    assets.current.texts=[...content.about,...content.productions.flatMap(p=>[...p.paragraphs,...p.quote?[p.quote]:[],...p.lead?[p.lead]:[]])];
    assets.current.titles=content.productions.map(p=>p.title);assets.current.crash=ui.crash;
  },[language,ui.crash]);

  useEffect(()=>{
    if(!playing)return;
    const surface=canvas.current,content=document.querySelector<HTMLElement>(".portfolio-content"),scene=assets.current;
    const ctx=surface?.getContext("2d");
    if(!surface||!ctx||!content||!scene){setPlaying(false);return;}
    const previousFocus=content.querySelector<HTMLElement>(".puppet-trigger")??(document.activeElement instanceof HTMLElement?document.activeElement:null);
    const oldContentStyle=content.getAttribute("style"),oldInert=content.inert;
    const oldOverflow=document.body.style.overflow,oldPadding=document.body.style.paddingRight;
    const scroll=window.scrollY,scrollbar=window.innerWidth-document.documentElement.clientWidth;
    const oldDrawingStyle=drawing.current?.getAttribute("style")??null;
    const puppet=drawing.current;
    const rect=puppet?.getBoundingClientRect();
    const nodes=Array.from(content.querySelectorAll<HTMLElement>(".header nav,.hero h1,.hero-roles,.profile-copy h2,.profile-copy>p,.scene-photo,.section-heading h2,.section-heading>p,.profile-image>span"))
      .map(element=>({element,rect:element.getBoundingClientRect(),style:element.getAttribute("style")}))
      .filter(item=>item.rect.bottom>35&&item.rect.top<window.innerHeight-35&&item.rect.width>0).slice(0,16);
    const fallback=[{x:.75,y:.25},{x:.8,y:.5},{x:.5,y:.65},{x:.68,y:.38}];
    let battle:BattleLayout={
      origin:rect?{x:rect.left+rect.width*.5,y:rect.top+rect.height*.42,scale:rect.width/360*1.8}:{x:window.innerWidth*.22,y:window.innerHeight*.4,scale:1.4},
      targets:Array.from({length:4},(_,i)=>{
        const item=nodes[i];return item?{x:item.rect.left+item.rect.width*.52,y:Math.max(80,Math.min(window.innerHeight-90,item.rect.top+Math.min(35,item.rect.height/2))),label:item.element.textContent?.trim()||projects[i].title}
          :{x:window.innerWidth*fallback[i].x,y:window.innerHeight*fallback[i].y,label:projects[i].title};
      }),
    };
    const restoreDamage=()=>nodes.forEach(({element,style})=>{if(style===null)element.removeAttribute("style");else element.setAttribute("style",style);});
    const restoreDrawing=()=>{if(!puppet)return;if(oldDrawingStyle===null)puppet.removeAttribute("style");else puppet.setAttribute("style",oldDrawingStyle);};
    if(puppet)puppet.style.visibility="hidden";
    if(scrollbar>0)document.body.style.paddingRight=(parseFloat(getComputedStyle(document.body).paddingRight)+scrollbar)+"px";
    document.body.style.overflow="hidden";content.inert=true;
    skip.current?.focus({preventScroll:true});
    let frame:number|null=null,elapsed=0,last=0,lastPaint=-Infinity,consumed=false;
    let width=window.innerWidth,height=window.innerHeight,dpr=Math.min(1.5,window.devicePixelRatio||1);
    const resize=()=>{
      const oldWidth=width,oldHeight=height;width=window.innerWidth;height=window.innerHeight;
      if(oldWidth!==width||oldHeight!==height)battle={origin:{x:battle.origin.x*width/oldWidth,y:battle.origin.y*height/oldHeight,scale:battle.origin.scale*width/oldWidth},targets:battle.targets.map(t=>({...t,x:t.x*width/oldWidth,y:t.y*height/oldHeight}))};
      dpr=Math.min(1.5,window.devicePixelRatio||1);surface.width=Math.round(width*dpr);surface.height=Math.round(height*dpr);lastPaint=-Infinity;
    };
    resize();
    const stop=()=>setPlaying(false);
    const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduce=()=>{if(preference.matches)stop();};
    function paint(now:number) {
      frame=null;
      if(document.hidden){last=0;return;}
      if(last)elapsed+=Math.min(100,now-last);last=now;
      if(elapsed>=SCENE_DURATION){stop();return;}
      const distortion=pageDistortion(elapsed),mouth=mouthPosition(width,height);
      const stage=sceneState(elapsed).stage;
      if(stage==="rampage") {
        const hits=battleState(elapsed,width,height,battle).hits;
        nodes.forEach(({element},i)=>{
          const strike=i%4;if(strike>=hits)return;
          const age=Math.max(0,(elapsed-(1050+strike*880))/1000),p=Math.min(1,age/.4);
          element.style.transformOrigin="50% 50%";
          element.style.transform=`translate(${(i%2?1:-1)*(26+i*7)*p}px,${age*age*38}px) rotate(${(i%2?1:-1)*(7+i*3)*p}deg)`;
          element.style.opacity=String(Math.max(.12,1-age*.28));
        });
      } else if(stage==="return"){
        restoreDamage();restoreDrawing();
        if(!consumed){consumed=true;setVanished(true);}
      }
      content!.style.transformOrigin=`${mouth.x}px ${window.scrollY+mouth.y}px`;
      content!.style.transform=distortion.transform;content!.style.filter=distortion.filter;
      if(now-lastPaint>=65){ctx!.setTransform(dpr,0,0,dpr,0,0);drawInterruption(ctx!,width,height,elapsed,scene!,battle);lastPaint=now;}
      frame=window.requestAnimationFrame(paint);
    }
    const visible=()=>{
      last=0;
      if(document.hidden){if(frame!==null)window.cancelAnimationFrame(frame);frame=null;}
      else if(frame===null)frame=window.requestAnimationFrame(paint);
    };
    const key=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){event.preventDefault();event.stopPropagation();stop();}
      if(event.key==="Tab"){event.preventDefault();skip.current?.focus();}
    };
    paint(performance.now());
    window.addEventListener("resize",resize);
    window.addEventListener("keydown",key,true);
    document.addEventListener("visibilitychange",visible);
    preference.addEventListener("change",reduce);
    return()=>{
      if(frame!==null)window.cancelAnimationFrame(frame);
      window.removeEventListener("resize",resize);window.removeEventListener("keydown",key,true);
      document.removeEventListener("visibilitychange",visible);preference.removeEventListener("change",reduce);
      restoreDamage();restoreDrawing();
      if(oldContentStyle===null)content.removeAttribute("style");else content.setAttribute("style",oldContentStyle);
      content.inert=oldInert;document.body.style.overflow=oldOverflow;document.body.style.paddingRight=oldPadding;
      if(window.scrollY!==scroll){const root=document.documentElement,behavior=root.style.scrollBehavior;root.style.scrollBehavior="auto";window.scrollTo(0,scroll);root.style.scrollBehavior=behavior;}
      const returnFocus=content.querySelector<HTMLElement>(".portal-reset")??previousFocus;
      if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});
    };
  },[playing]);

  const activate=()=>{if(assets.current&&allowed&&!flags.current.blocked&&!flags.current.paused)setPlaying(true);};
  return <><ProfilePuppet language={language} drawing={drawing} onActivate={activate} onReset={()=>setVanished(false)} ready={ready} allowed={allowed} paused={paused} blocked={blocked} active={playing} vanished={vanished}/>{playing?createPortal(<div className="portfolio-interruption" role="dialog" aria-modal="true" aria-labelledby="interruption-title" aria-describedby="interruption-description">
    <h2 id="interruption-title" className="sr-only">{ui.interruptionTitle}</h2>
    <p id="interruption-description" className="sr-only">{ui.interruptionDescription}</p>
    <canvas ref={canvas} className="interruption-canvas" aria-hidden="true"/>
    <button ref={skip} className="interruption-skip" onClick={()=>setPlaying(false)}>{ui.backToPortfolio} <span>Esc</span></button>
  </div>,document.body):null}</>;
}
