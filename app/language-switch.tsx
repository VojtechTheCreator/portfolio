"use client";

import {labels,type Language} from "./portfolio-i18n";

export function LanguageSwitch({language,onChange}:{language:Language;onChange:(language:Language)=>void}) {
  return <div className="language-switch" role="group" aria-label={labels[language].language}>
    <button type="button" lang="cs" aria-label="Čeština" aria-pressed={language==="cs"} onClick={()=>onChange("cs")}>CZ</button>
    <span aria-hidden="true">/</span>
    <button type="button" lang="de" aria-label="Deutsch" aria-pressed={language==="de"} onClick={()=>onChange("de")}>DE</button>
  </div>;
}
