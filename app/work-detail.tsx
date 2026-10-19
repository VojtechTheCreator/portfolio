"use client";

import {ArrowUpRight,ImagePlus} from "lucide-react";
import {type Project} from "./portfolio-data";
import {labels,portfolioFor,reflectionFor,type Language} from "./portfolio-i18n";

export function WorkStatement({entry,onOpen,language="cs"}:{entry:Project;onOpen:(entry:Project)=>void;language?:Language}) {
  const ui=labels[language],{internships}=portfolioFor(language);
  const reflection=entry.kind==="internship"?reflectionFor(entry,language):undefined;
  const related=entry.reflectionKey?internships.filter(item=>item.reflectionKey===entry.reflectionKey):[];
  return <section className="project-statement" aria-label={reflection?ui.aboutInternship:ui.aboutProduction}>
    {reflection&&<div className="internship-statement">
      <span className="eyebrow statement-label">{ui.aboutInternship} / {entry.role}</span>
      <h3>{reflection.title}</h3>
      <p>{reflection.text}</p>
      {related.length>1&&<div className="shared-reflection">
        <span className="eyebrow muted">{ui.sharedTeam}</span>
        <div>{related.map(item=><button key={item.id} disabled={item.id===entry.id} onClick={()=>onOpen(item)} aria-current={item.id===entry.id?"true":undefined}>{item.context}<ArrowUpRight size={14} aria-hidden="true"/></button>)}</div>
      </div>}
    </div>}
    {entry.paragraphs.length>0&&<>
      <span className="eyebrow statement-label">{ui.aboutProduction}</span>
      <div className="project-description-text">
        {entry.quote&&<blockquote>{entry.quote}</blockquote>}
        {entry.lead&&<p className="project-lead">{entry.lead}</p>}
        {entry.paragraphs.map(text=><p key={text}>{text}</p>)}
      </div>
    </>}
  </section>;
}

export function InternshipInformation({entry,language="cs",onExpand}:{entry:Project;language?:Language;onExpand?:()=>void}) {
  const ui=labels[language],photo=entry.media[0];
  return <aside className="internship-information" aria-label={ui.internshipInformation}>
    {photo&&<><button className="internship-detail-photo" onClick={onExpand} aria-label={ui.enlarge}><img src={photo.src} alt={photo.caption}/><span aria-hidden="true">↗</span></button><p className="internship-photo-caption">{photo.caption}</p></>}
    <dl className="internship-facts">
      <div><dt>{ui.theatre}</dt><dd>{entry.context}</dd></div>
      <div><dt>{ui.period}</dt><dd>{entry.date}</dd></div>
      <div><dt>{ui.role}</dt><dd>{entry.role}</dd></div>
      <div><dt>{ui.artists}</dt><dd>{entry.mentor}</dd></div>
    </dl>
    {!photo&&<div className="internship-media-placeholder"><ImagePlus size={25} aria-hidden="true"/><span>{ui.internshipPhotos}</span><small>{ui.toAdd}</small></div>}
    {entry.externalUrl&&<a className="pill-link production-link" href={entry.externalUrl} target="_blank" rel="noreferrer">{ui.productionPage}<ArrowUpRight size={17} aria-hidden="true"/></a>}
  </aside>;
}
