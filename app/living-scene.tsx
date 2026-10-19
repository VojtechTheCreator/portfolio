"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { type Project, type WorkMode } from "./portfolio-data";
import {labels,portfolioFor,type Language} from "./portfolio-i18n";

export function LivingScene({ language="cs",mode, onOpenProject, paused, onPauseChange }: {language?:Language;mode:WorkMode;onOpenProject: (project: Project) => void; paused: boolean; onPauseChange: (paused: boolean) => void }) {
  const ui=labels[language],{projects,internships}=portfolioFor(language);
  const scene = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const reducedMotion = useRef(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const items=mode==="projects"?projects:internships;
  const candidate=focused??hovered;
  const active=items.some(item=>item.id===candidate)?candidate:null;

  useEffect(()=>{resetScene();setHovered(null);setFocused(null);},[mode]);

  useEffect(() => {
    window.dispatchEvent(new Event("portfolio-scene-focus"));
  }, [active]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      reducedMotion.current = preference.matches;
      scene.current?.style.setProperty("--scene-x", "0px");
      scene.current?.style.setProperty("--scene-y", "0px");
    };
    syncPreference();
    preference.addEventListener("change", syncPreference);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (scene.current) observer.observe(scene.current);
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      preference.removeEventListener("change", syncPreference);
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  function moveScene(event: PointerEvent<HTMLDivElement>) {
    if (paused || reducedMotion.current || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1)) * 20;
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1)) * 14;
    if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    frame.current = window.requestAnimationFrame(() => {
      scene.current?.style.setProperty("--scene-x", x + "px");
      scene.current?.style.setProperty("--scene-y", y + "px");
      frame.current = null;
    });
  }

  function resetScene() {
    if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    frame.current = null;
    scene.current?.style.setProperty("--scene-x", "0px");
    scene.current?.style.setProperty("--scene-y", "0px");
  }

  return <div
    ref={scene}
    className="living-scene"
    data-mode={mode}
    data-paused={paused || !inView || !pageVisible}
    data-engaged={active !== null}
    onPointerMove={moveScene}
    onPointerLeave={() => { resetScene(); setHovered(null); }}
    onPointerCancel={() => { resetScene(); setHovered(null); }}
    onPointerUp={event => { if (event.pointerType !== "mouse") resetScene(); }}
    role="group"
    aria-label={mode==="projects"?ui.projectOverview:ui.internshipOverview}
  >
    <div className="scene-space">
      {items.map((project, index) => <div className={"scene-fragment scene-fragment-" + index} key={index}
        data-featured={active === project.id}
        onPointerEnter={event => { if (event.pointerType === "mouse") { setFocused(null); setHovered(project.id); } }}
        onPointerLeave={() => setHovered(value => value === project.id ? null : value)}
      >
        <div className="scene-drift"><div className="scene-float"><div className="scene-card-enter" key={project.id}>
          <button className={"scene-photo"+(project.kind==="internship"?" scene-internship scene-internship-"+project.theme:"")} data-entry-id={project.id} onClick={() => onOpenProject(project)} aria-label={(project.kind==="internship"?ui.openInternship:ui.openProject)+" "+project.title}
            aria-describedby={"scene-preview-" + project.id}
            onFocus={event => { if (event.currentTarget.matches(":focus-visible")) setFocused(project.id); }}
            onBlur={() => setFocused(null)}
          >
            {project.kind==="project"?<>
              <img src={"/media/scene/" + project.id + ".webp"} alt="" width={960} height={645} loading="lazy"/>
              <span className="scene-photo-label"><span><span className="scene-number">{String(index + 1).padStart(2, "0")}</span><strong className="scene-title">{project.title}</strong><span className="scene-role">{project.role}</span><span className="scene-preview" id={"scene-preview-" + project.id}><span><span className="scene-context">{project.context}{project.year && " / " + project.year}{project.duration && " / " + project.duration}</span><span className="scene-excerpt">{project.paragraphs[0].split(/(?<=\.)\s/)[0]}</span><span className="scene-open">{ui.openProject}</span></span></span></span><ArrowUpRight size={22} aria-hidden="true"/></span>
            </>:<>
              {project.cover&&<img className="internship-card-photo" src={project.cover} alt="" width={960} height={645} loading="lazy"/>}
              <span className="internship-poster">
                <span className="internship-card-top"><span className="scene-number">{String(index+1).padStart(2,"0")} / {project.date}</span><ArrowUpRight size={21} aria-hidden="true"/></span>
                <span className="internship-card-mentor">{project.mentor?.split(" · ").map(name=><span key={name}>{name}</span>)}</span>
                <span className="internship-card-bottom"><span className="internship-card-context">{project.context}</span><strong className="scene-title">{project.title}</strong><span className="scene-role">{project.role}</span>
                  <span className="scene-preview" id={"scene-preview-"+project.id}><span><span className="scene-excerpt">{project.reflection?ui.depogExcerpt:ui.tandemExcerpt}</span><span className="scene-open">{ui.internshipChoice}</span></span></span>
                </span>
              </span>
            </>}
          </button>
        </div></div></div>
      </div>)}
    </div>
    <div className="scene-controls">
      <button className="scene-pause" aria-label={paused ? ui.startMotion : ui.pauseMotion} aria-pressed={paused} onClick={() => { resetScene(); onPauseChange(!paused); }}>
        {paused ? <Play size={13} aria-hidden="true"/> : <Pause size={13} aria-hidden="true"/>}
      </button>
    </div>
  </div>;
}
