"use client";

import {useEffect,useState} from "react";
import {labels,type Language} from "./portfolio-i18n";

const storageKey="vh-portfolio-language";
export function usePortfolioLanguage() {
  const [language,setLanguage]=useState<Language>("cs");
  useEffect(()=>{
    const sync=()=>{
      const explicit=new URL(window.location.href).searchParams.get("lang");
      let saved:string|null=null;
      try{saved=window.localStorage.getItem(storageKey);}catch{}
      setLanguage(explicit==="de"||explicit==="cs"?explicit:saved==="de"?"de":"cs");
    };
    sync();window.addEventListener("popstate",sync);return()=>window.removeEventListener("popstate",sync);
  },[]);
  useEffect(()=>{
    document.documentElement.lang=language;
    document.title=labels[language].metaTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content",labels[language].metaDescription);
  },[language]);
  function changeLanguage(next:Language) {
    setLanguage(next);
    try{window.localStorage.setItem(storageKey,next);}catch{}
    const url=new URL(window.location.href);url.searchParams.set("lang",next);
    window.history.replaceState(null,"",url.pathname+url.search+url.hash);
  }
  return {language,changeLanguage,ui:labels[language]};
}
