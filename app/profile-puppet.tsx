"use client";

import {useEffect,useRef,useState,type RefObject} from "react";
import {ProfilePortal} from "./profile-portal";
import {labels,type Language} from "./portfolio-i18n";

export function ProfilePuppet({language="cs",drawing,onActivate,onReset,ready,allowed,paused,blocked,active,vanished}: {
  language?:Language;drawing:RefObject<SVGSVGElement|null>;onActivate:()=>void;onReset:()=>void;ready:boolean;allowed:boolean;paused:boolean;blocked:boolean;active:boolean;vanished:boolean;
}) {
  const ui=labels[language];
  const eyes=useRef<SVGRectElement>(null),winked=useRef(false),winkTimer=useRef<number|null>(null);
  const [inView,setInView]=useState(false),[visible,setVisible]=useState(true),[winking,setWinking]=useState(false);
  useEffect(()=>{
    const element=drawing.current;if(!element)return;
    const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting));observer.observe(element);
    const sync=()=>setVisible(!document.hidden);sync();document.addEventListener("visibilitychange",sync);
    return()=>{observer.disconnect();document.removeEventListener("visibilitychange",sync);};
  },[drawing,vanished]);
  useEffect(()=>{
    if(winked.current||!ready||!allowed||paused||blocked||active||vanished||!visible||!eyes.current)return;
    const observer=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting||entry.intersectionRatio<.65||winked.current||document.hidden)return;
      winked.current=true;setWinking(true);observer.disconnect();
      winkTimer.current=window.setTimeout(()=>{setWinking(false);winkTimer.current=null;},900);
    },{threshold:.65});
    // Observe the eye region, so the wink cannot happen while only the hair is visible.
    observer.observe(eyes.current);return()=>observer.disconnect();
  },[ready,allowed,paused,blocked,active,vanished,visible]);
  useEffect(()=>()=>{if(winkTimer.current!==null)window.clearTimeout(winkTimer.current);},[]);
  const moving=inView&&visible&&allowed&&!paused&&!blocked&&!active;
  return <div className="profile-puppet" data-moving={moving} data-winking={winking}>
    {vanished?<ProfilePortal language={language} drawing={drawing} onReset={onReset}/>:<>
    <svg ref={drawing} className="profile-puppet-drawing" viewBox="0 0 360 500" role="img" aria-label={ui.puppetAlt}>
      <g transform="translate(180 210) scale(1.8)">
        <g className="puppet-bob" fill="none" stroke="#e5e1d5" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(0 62)">
            <g className="puppet-torso">
              <path d="M0 -76 L2 -40 L0 0"/>
              <g transform="translate(0 -56)"><g className="puppet-arm-left">
                <path d="M0 0 L-30 21"/>
                <g transform="translate(-30 21)"><g className="puppet-elbow-left">
                  <path d="M0 0 L-8 16 L-12 15"/>
                  <g transform="translate(-12 15)"><g className="puppet-cigarette-hold" strokeWidth=".8" aria-hidden="true">
                    <g transform="rotate(-18)">
                      <rect x="-7" y="-1" width="17" height="2" rx=".5" fill="#e5e1d5" stroke="#e5e1d5"/>
                      <path d="M-7 0 L-3 0" stroke="#bb8655" strokeWidth="2"/>
                      <path d="M10 0 L12 0" stroke="#9c9990" strokeWidth="1.5"/>
                      <circle className="puppet-ember-glow" cx="10" cy="0" r="3" fill="#ed5931" opacity=".16" stroke="none"/>
                      <circle className="puppet-ember" cx="10" cy="0" r="1.2" fill="#ee6a35" stroke="none"/>
                      <g fill="none" stroke="#d8d5cb" strokeWidth=".7">
                        <path className="puppet-smoke puppet-smoke-one" d="M11 -2 C16 -8 6 -12 12 -18 S16 -27 12 -32"/>
                        <path className="puppet-smoke puppet-smoke-two" d="M11 -2 C7 -8 16 -13 11 -20 S8 -27 13 -35"/>
                      </g>
                    </g>
                  </g></g>
                </g></g>
              </g></g>
              <g transform="translate(2 -53)"><g className="puppet-arm-right">
                <path d="M0 0 L25 17"/>
                <g transform="translate(25 17)"><g className="puppet-elbow-right">
                  <path d="M0 0 L9 17 L13 15"/>
                  <g transform="translate(13 15)"><g className="puppet-coffee-hold" strokeWidth="1.3" aria-hidden="true">
                    <path d="M5 -8 C-5 -10 -5 3 5 0"/>
                    <path d="M4 -13 L5 3 Q13 6 21 3 L22 -13 Z" fill="#e5e1d5"/>
                    <ellipse cx="13" cy="-13" rx="9" ry="2.3" fill="#151515"/>
                    <ellipse cx="13" cy="-13" rx="6.5" ry="1.2" fill="#71533c" stroke="none"/>
                    <path d="M9 -3 L16 -3" stroke="#8a867d" strokeWidth=".7"/>
                    <path className="puppet-coffee-steam" d="M13 -18 C8 -23 17 -25 12 -31" stroke="#d8d5cb" strokeWidth=".7" opacity=".25"/>
                  </g></g>
                </g></g>
              </g></g>
              <g transform="translate(0 -76)"><g className="puppet-head" stroke="none">
                <image href="/media/short-circuit/head-neutral.webp" x="-40" y="-82" width="80" height="84" preserveAspectRatio="none"/>
                <image className="puppet-wink-image" href="/media/short-circuit/head-wink.webp" x="-40" y="-82" width="80" height="84" preserveAspectRatio="none"/>
                <rect ref={eyes} x="-26" y="-45" width="54" height="22" fill="transparent" pointerEvents="none"/>
              </g></g>
            </g>
            <g className="puppet-leg-left">
              <path d="M0 0 L-15 31"/>
              <g transform="translate(-15 31)"><g className="puppet-knee-left"><path d="M0 0 L-17 34 L-25 34"/></g></g>
            </g>
            <g className="puppet-leg-right">
              <path d="M0 0 L18 29"/>
              <g transform="translate(18 29)"><g className="puppet-knee-right"><path d="M0 0 L16 38 L24 38"/></g></g>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <button className="puppet-trigger" onClick={onActivate} disabled={!ready||!allowed||paused||blocked} aria-describedby="puppet-trigger-description" aria-busy={!ready}>
      {ui.puppetTrigger} <span aria-hidden="true">↗</span>
    </button>
    <p id="puppet-trigger-description" className="sr-only">{ui.puppetDescription}</p>
    </>}
    {!allowed&&<p className="puppet-motion-note">{ui.motionReduced}</p>}
    {paused&&allowed&&<p className="puppet-motion-note">{ui.motionPaused}</p>}
  </div>;
}
