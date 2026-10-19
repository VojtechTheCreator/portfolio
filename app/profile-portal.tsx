"use client";

import {useId,type RefObject} from "react";
import {labels,type Language} from "./portfolio-i18n";

const hole="M155 50 L180 75 L220 45 L226 83 L267 92 L252 121 L295 143 L279 187 L319 202 L293 233 L300 284 L267 298 L284 339 L245 346 L244 389 L210 372 L176 410 L149 378 L111 401 L104 361 L66 351 L78 317 L43 288 L60 262 L31 225 L65 205 L47 163 L88 143 L83 103 L119 108 L134 67 Z";
const words=[
  {text:"tělo",x:104,y:151,size:24},{text:"hlas",x:216,y:196,size:17},
  {text:"paměť",x:113,y:254,size:21},{text:"lidskost",x:133,y:326,size:24},
  {text:"smysl",x:196,y:125,size:14},{text:"krize",x:78,y:308,size:14},
  {text:"pohyb",x:231,y:277,size:15},{text:"jinde",x:160,y:373,size:12},
];

export function ProfilePortal({drawing,onReset,language="cs"}: {language?:Language;drawing:RefObject<SVGSVGElement|null>;onReset:()=>void}) {
  const ui=labels[language];
  const id=useId(),clip=id+"-hole",depth=id+"-depth",light=id+"-light";
  return <>
    <svg ref={drawing} className="profile-puppet-drawing profile-portal-drawing" viewBox="0 0 360 500" role="img" aria-label={ui.portalAlt}>
      <defs>
        <clipPath id={clip}><path d={hole}/></clipPath>
        <radialGradient id={depth} cx="49%" cy="43%" r="72%"><stop offset="0" stopColor="#010104"/><stop offset=".7" stopColor="#090b16"/><stop offset="1" stopColor="#262332"/></radialGradient>
        <radialGradient id={light}><stop offset="0" stopColor="#fff" stopOpacity=".9"/><stop offset=".25" stopColor="#e3e9ff" stopOpacity=".5"/><stop offset="1" stopColor="#d8e2ff" stopOpacity="0"/></radialGradient>
      </defs>
      <g className="portal-glass-cracks" fill="none" stroke="#aaa59b" strokeWidth=".8" opacity=".55">
        <path d="M134 67 L120 42 L129 19 M119 108 L73 75 L57 83 L28 55 M47 163 L16 138 L7 154 M31 225 L12 238 L6 216 M66 351 L30 372 L21 407 M111 401 L84 447 L91 471 M176 410 L181 455 L164 483 M244 389 L276 424 L279 453 M284 339 L329 359 L345 349 M300 284 L338 295 L352 318 M319 202 L339 167 L350 162 M267 92 L300 51 L330 59 M220 45 L237 20"/>
      </g>
      <path d={hole} fill="#343238" stroke="#090909" strokeWidth="15" strokeLinejoin="miter"/>
      <path d={hole} fill={`url(#${depth})`} stroke="#a19b92" strokeWidth="1.5"/>
      <g clipPath={`url(#${clip})`}>
        <ellipse cx="186" cy="235" rx="110" ry="172" fill="#010104" opacity=".45"/>
        <g className="portal-flash portal-flash-left" aria-hidden="true">
          <ellipse cx="123" cy="194" rx="139" ry="160" fill={`url(#${light})`}/>
          <path d="M89 79 L113 134 L97 166 L136 202 L120 248 L143 290" fill="none" stroke="#f5f7ff" strokeWidth="1.4"/>
          <path d="M136 202 L177 182 L197 195 M120 248 L89 265" fill="none" stroke="#d8e3ff" strokeWidth=".7"/>
        </g>
        <g className="portal-flash portal-flash-right" aria-hidden="true">
          <ellipse cx="244" cy="291" rx="127" ry="146" fill={`url(#${light})`}/>
          <path d="M278 168 L249 223 L268 251 L232 284 L247 320 L208 389" fill="none" stroke="#fff" strokeWidth="1.2"/>
          <path d="M232 284 L204 273 L184 287 M247 320 L278 342" fill="none" stroke="#d8e3ff" strokeWidth=".7"/>
        </g>
        {words.map((word,index)=><g key={word.text} className={"portal-word portal-word-"+index}>
          <text x={word.x} y={word.y} fontSize={language==="de"&&index===3?16:word.size} fill={index%3===0?"#c6bdb0":index%3===1?"#858391":"#9faab1"} fontFamily={index%2?"monospace":"Georgia, serif"} textAnchor="middle">{ui.portalWords[index]}</text>
        </g>)}
      </g>
      <g fill="#aaa398" fillOpacity=".45" stroke="#d4c9b9" strokeOpacity=".55" strokeWidth=".7">
        <path d="M155 50 L141 78 L134 67 Z M220 45 L224 85 L206 70 Z M267 92 L252 121 L259 91 Z M295 143 L279 187 L286 154 Z M319 202 L293 233 L304 201 Z M300 284 L267 298 L282 294 Z M284 339 L245 346 L264 342 Z M244 389 L210 372 L237 374 Z M176 410 L149 378 L176 393 Z M111 401 L104 361 L112 385 Z M66 351 L78 317 L79 339 Z M43 288 L60 262 L53 283 Z M31 225 L65 205 L47 228 Z M47 163 L88 143 L62 160 Z M83 103 L119 108 L103 115 Z"/>
      </g>
    </svg>
    <p id="profile-portal-description" className="sr-only" role="status">{ui.portalDescription}</p>
    <button className="portal-reset" onClick={onReset} aria-describedby="profile-portal-description">{ui.resetPuppet} <span aria-hidden="true">↶</span></button>
  </>;
}
