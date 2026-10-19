"use client";
import { useState, useEffect, useRef, type MouseEvent } from "react";
import { X, ChevronLeft, ChevronRight, Plus, Maximize2 } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { type Project, type WorkMode } from "./portfolio-data";
import {portfolioFor} from "./portfolio-i18n";
import {usePortfolioLanguage} from "./use-portfolio-language";
import {LanguageSwitch} from "./language-switch";
import { LivingScene } from "./living-scene";
import { PortfolioThread } from "./portfolio-thread";
import { usePortfolioIntro } from "./use-portfolio-intro";
import { PortfolioInterruption } from "./portfolio-interruption";
import "./portfolio-interruption.css";
import {WorkStatement,InternshipInformation} from "./work-detail";
import "./work-collection.css";
import "./portfolio-language.css";

export default function Home() {
  const {language,changeLanguage,ui}=usePortfolioLanguage();
  const {projects,entries,internships,about,additionalWork}=portfolioFor(language);
  const title=useRef<HTMLHeadingElement>(null);
  const intro=usePortfolioIntro(title);
  const [motionPaused,setMotionPaused]=useState(false);
  const [projectId,setProjectId]=useState<string|null>(null); const [tab,setTab]=useState("galerie"); const [index,setIndex]=useState(0); const [lightbox,setLightbox]=useState(false); const [lightboxIndex,setLightboxIndex]=useState(0); const opener=useRef<HTMLElement|null>(null);
  const project=entries.find(entry=>entry.id===projectId)??null;
  const setProject=(entry:Project|null)=>setProjectId(entry?.id??null);
  const [workMode,setWorkMode]=useState<WorkMode>("projects");
  function selectWork(mode:WorkMode,scroll=false){
    setWorkMode(mode);
    window.history.replaceState(null,"",mode==="projects"?"#projekty":"#staze");
    if(scroll)document.getElementById("tvorba")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});
  }
  function navigateWork(event:MouseEvent<HTMLAnchorElement>,mode:WorkMode){
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();selectWork(mode,true);
  }
  function entryHash(p:Project){return (p.kind==="internship"?"#staz=":"#projekt=")+p.id;}
  function openProject(p:Project,updateUrl=true){
    opener.current=document.activeElement as HTMLElement;
    setWorkMode(p.kind==="internship"?"internships":"projects");setProject(p);setIndex(0);setTab("galerie");setLightbox(false);
    if(updateUrl)window.history.replaceState(null,"",entryHash(p));
  }
  function closeProject(){
    setProject(null);setLightbox(false);
    if(/^#(?:projekt|staz)=/.test(window.location.hash))window.history.replaceState(null,"",project?.kind==="internship"?"#staze":"#projekty");
  }
  useEffect(()=>{
    const sync=()=>{
      const hash=window.location.hash,p=entries.find(p=>hash==="#projekt="+p.id||hash==="#staz="+p.id);
      if(p){openProject(p,false);return;}
      if(hash==="#staze")setWorkMode("internships");
      else if(hash==="#projekty"||hash==="#tvorba")setWorkMode("projects");
      setProject(null);setLightbox(false);
    };
    sync();window.addEventListener("hashchange",sync);return()=>window.removeEventListener("hashchange",sync);
  },[]);
  function move(amount:number,full=false){if(!project?.media.length)return;if(full)setLightboxIndex(i=>(i+amount+project.media.length)%project.media.length);else setIndex(i=>(i+amount+project.media.length)%project.media.length);}
  function selectNext(p:Project){setProject(p);setLightbox(false);setIndex(0);setTab("galerie");setWorkMode(p.kind==="internship"?"internships":"projects");window.history.replaceState(null,"",entryHash(p));document.querySelector(".detail-scroll")?.scrollTo(0,0);}
  return <><div className="portfolio-content">
    <a className="skip-link" href="#profil">{ui.skip}</a>
    <header className="header"><a className="wordmark" href="#uvod" aria-label={ui.home}>VH<span className="mark-dot">.</span></a><nav aria-label={ui.navigation}><a href="#profil">{ui.about}</a><a href="#projekty" onClick={e=>navigateWork(e,"projects")}>{ui.projects}</a><a href="#staze" onClick={e=>navigateWork(e,"internships")}>{ui.internships}</a><a href="#kontakt">{ui.contact}</a></nav><div className="header-actions"><span className="header-note">{ui.authorTheatre}</span><LanguageSwitch language={language} onChange={changeLanguage}/></div></header>
    <main className="portfolio-main"><PortfolioThread paused={motionPaused}/>
      <section id="uvod" className="hero shell" data-intro={intro.settled ? "settled" : "opening"}><div className="hero-top"><span className="eyebrow muted">{ui.portfolio}</span></div><h1 ref={title}><span>Vojtěch</span><span>Honig<span className="name-period">.</span></span></h1><p className="hero-roles">{ui.roles}</p><div className="hero-bottom"><p>{ui.heroLine1}<br/>{ui.heroLine2}</p><a className="pill-link" href="#projekty" onClick={e=>navigateWork(e,"projects")}>{ui.viewProjects} <span className="button-number">{String(projects.length).padStart(2,"0")}</span></a></div><div className="hero-rule"><span>{ui.city}</span><span>{ui.selectedWork}</span></div></section>
      <section id="profil" className="profile-section shell"><div className="profile-image"><PortfolioInterruption language={language} blocked={!!project||lightbox} paused={motionPaused}/><span>Vojtěch Honig / {ui.city}</span></div><div className="profile-copy"><span className="eyebrow section-index">01 / {ui.about}</span><h2>{ui.about}</h2><p className="profile-education">{about[0]}</p><p className="profile-lead">{about[1]}</p>{about.slice(2).map(p=><p key={p}>{p}</p>)}<p className="additional-work">{additionalWork}</p></div></section>
      <section id="tvorba" className="projects-section work-section shell">
        <div className="section-heading"><div><span className="eyebrow section-index">02 / {ui.work}</span><h2>{ui.work}<span className="small-period">.</span></h2></div><p>{ui.workLine1}<br/>{ui.workLine2}</p></div>
        <div className="work-switcher">
          <div className="work-tabs" role="tablist" aria-label={ui.workAreas} onKeyDown={e=>{
            if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;
            e.preventDefault();const next=e.key==="Home"?"projects":e.key==="End"?"internships":workMode==="projects"?"internships":"projects";
            selectWork(next);document.getElementById(next==="projects"?"projekty":"staze")?.focus();
          }}>
            <button id="projekty" role="tab" aria-selected={workMode==="projects"} aria-controls="work-panel" tabIndex={workMode==="projects"?0:-1} onClick={()=>selectWork("projects")}>{ui.projects}<span>03</span></button>
            <button id="staze" role="tab" aria-selected={workMode==="internships"} aria-controls="work-panel" tabIndex={workMode==="internships"?0:-1} onClick={()=>selectWork("internships")}>{ui.internships}<span>03</span></button>
          </div>
          <p className="work-mode-note" aria-live="polite">{workMode==="projects"?ui.projectMode:ui.internshipMode}</p>
        </div>
        <div id="work-panel" role="tabpanel" aria-labelledby={workMode==="projects"?"projekty":"staze"} tabIndex={0}><LivingScene language={language} mode={workMode} onOpenProject={openProject} paused={motionPaused} onPauseChange={setMotionPaused}/></div>
      </section>
      <div className="work-thread-exit shell" data-thread-exit aria-hidden="true"/>
      <section id="kontakt" className="contact-section shell"><span className="eyebrow section-index">03 / {ui.contact}</span><div className="contact-content"><h2>{ui.contactLine1}<br/>{ui.contactLine2}<span className="small-period">.</span></h2><div><p>{ui.contactNote1}<br/>{ui.contactNote2}</p><a className="email-link" href="mailto:vojtechhonig@gmail.com">vojtechhonig@gmail.com</a></div></div></section>
    </main><footer className="footer shell"><a className="wordmark" href="#uvod">VH<span className="mark-dot">.</span></a><span>© 2026 Vojtěch Honig</span><span>{ui.footerRoles}</span></footer>
    <Sheet open={!!project} onOpenChange={open=>{if(!open)closeProject();}}><SheetContent className="project-sheet" showCloseButton={false} aria-describedby="project-description" onCloseAutoFocus={e=>{e.preventDefault();const target=opener.current?.isConnected&&opener.current!==document.body?opener.current:document.querySelector<HTMLElement>(`.scene-photo[data-entry-id="${project?.id}"]`)??document.getElementById(workMode==="projects"?"projekty":"staze");target?.focus({preventScroll:true});}}>{project&&<><div className="detail-top"><span className="eyebrow">{project.context}{project.year&&" / "+project.year}</span><div className="detail-top-actions"><LanguageSwitch language={language} onChange={changeLanguage}/><SheetClose className="close-button"><X size={20} aria-hidden="true"/><span>{ui.close}</span></SheetClose></div></div><div className="detail-scroll"><div className="detail-intro"><span className="eyebrow muted">{project.role}</span><SheetTitle className="detail-title">{project.title}</SheetTitle><SheetDescription id="project-description" className="detail-description">{project.context}{project.date&&" / "+project.date}{project.duration&&" / "+project.duration}</SheetDescription>{project.originalTitle&&<p className="detail-original-title">{ui.originalTitle}: {project.originalTitle}</p>}{project.mentor&&<p className="detail-mentor">{project.mentor}</p>}</div>
      <div className="project-overview"><WorkStatement language={language} entry={project} onOpen={selectNext}/>{project.media.length>1?<Tabs value={tab} onValueChange={setTab} className="media-tabs"><TabsList className="media-tabs-list" variant="line"><TabsTrigger value="galerie">{ui.gallery} <span>{project.media.length}</span></TabsTrigger>{project.videoId&&<TabsTrigger value="video">{ui.video}</TabsTrigger>}<TabsTrigger value="podrobnosti">{ui.details}</TabsTrigger></TabsList>
        <TabsContent value="galerie" className="media-tab-content"><div className="gallery-stage" onKeyDown={e=>{if(e.key==="ArrowLeft")move(-1);if(e.key==="ArrowRight")move(1);}} onTouchStart={e=>{e.currentTarget.dataset.touch=String(e.changedTouches[0].clientX);}} onTouchEnd={e=>{const d=e.changedTouches[0].clientX-Number(e.currentTarget.dataset.touch);if(Math.abs(d)>45)move(d<0?1:-1);}}><button className="gallery-image-button" aria-label={ui.enlarge} onClick={()=>{setLightboxIndex(index);setLightbox(true);}}><img src={project.media[index].src} alt={project.media[index].caption}/><span className="expand-badge"><Maximize2 size={18}/></span></button><button className="gallery-prev" aria-label={ui.previousPhoto} onClick={()=>move(-1)}><ChevronLeft/></button><button className="gallery-next" aria-label={ui.nextPhoto} onClick={()=>move(1)}><ChevronRight/></button></div><div className="gallery-caption"><p>{project.media[index].caption}</p><span aria-live="polite">{index+1} / {project.media.length}</span></div><div className="thumbnails">{project.media.map((m,i)=><button key={m.src} aria-label={ui.showPhoto+" "+(i+1)} aria-pressed={index===i} onClick={()=>setIndex(i)}><img src={m.thumbnail} alt="" loading="lazy"/></button>)}</div>{project.photoCredit&&<p className="photo-credit">{ui.photoCredit}: {project.photoCredit}</p>}</TabsContent>
        {project.videoId&&<TabsContent value="video" className="media-tab-content"><div className="video-content"><div className="youtube-frame"><iframe src={"https://www.youtube-nocookie.com/embed/"+project.videoId} title={project.title+" — "+ui.videoExcerpt} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/></div><a className="text-link" href={"https://youtu.be/"+project.videoId} target="_blank" rel="noreferrer">{ui.openYoutube}</a></div></TabsContent>}
        <TabsContent value="podrobnosti" className="media-tab-content">{(project.premiere||project.duration)&&<dl className="production-facts">{project.premiere&&<><dt>{ui.premiere}</dt><dd>{project.premiere}</dd></>}{project.duration&&<><dt>{ui.duration}</dt><dd>{project.duration}</dd></>}</dl>}<section className="credits"><h3>{ui.cast}</h3><p className="cast-list">{project.cast.join(", ")}</p>{project.team.length>0&&<><h3>{ui.team}</h3><dl className="team-list">{project.team.map(([role,name])=><div key={role}><dt>{role}</dt><dd>{name}</dd></div>)}</dl></>}</section>{project.externalUrl&&<a href={project.externalUrl} className="pill-link production-link" target="_blank" rel="noreferrer">{ui.productionPage}</a>}</TabsContent>
      </Tabs>:<InternshipInformation language={language} entry={project} onExpand={()=>{setLightboxIndex(0);setLightbox(true);}}/>}</div><div className="detail-navigation"><span className="eyebrow muted">{project.kind==="internship"?ui.nextInternships:ui.nextProjects}</span><div>{(project.kind==="internship"?internships:projects).filter(p=>p.id!==project.id).map(p=><button key={p.id} onClick={()=>selectNext(p)}>{p.title}<Plus size={18}/></button>)}</div></div></div></>}</SheetContent></Sheet>
    <Dialog open={lightbox} onOpenChange={setLightbox}><DialogContent className="lightbox" showCloseButton={false} onKeyDown={e=>{if(e.key==="ArrowLeft")move(-1,true);if(e.key==="ArrowRight")move(1,true);}}><DialogTitle className="sr-only">{project?.title} — {ui.gallery}</DialogTitle><DialogDescription className="sr-only">{ui.lightboxDescription}</DialogDescription><div className="lightbox-language"><LanguageSwitch language={language} onChange={changeLanguage}/></div><DialogClose className="lightbox-close"><X size={24}/><span className="sr-only">{ui.closePhoto}</span></DialogClose>{project?.media[lightboxIndex]&&<><img src={project.media[lightboxIndex].src} alt={project.media[lightboxIndex].caption} onTouchStart={e=>{e.currentTarget.dataset.touch=String(e.changedTouches[0].clientX);}} onTouchEnd={e=>{const d=e.changedTouches[0].clientX-Number(e.currentTarget.dataset.touch);if(Math.abs(d)>45)move(d<0?1:-1,true);}}/><div className="lightbox-controls">{project.media.length>1&&<button aria-label={ui.previousLarge} onClick={()=>move(-1,true)}><ChevronLeft/></button>}<p>{project.media[lightboxIndex].caption}<span aria-live="polite">{lightboxIndex+1} / {project.media.length}</span></p>{project.media.length>1&&<button aria-label={ui.nextLarge} onClick={()=>move(1,true)}><ChevronRight/></button>}</div></>}</DialogContent></Dialog>
  </div></>;
}
