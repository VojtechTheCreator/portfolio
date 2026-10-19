import {about,additionalWork,entries,entryReflection,type Project} from "./portfolio-data";

export type Language="cs"|"de";

const cs={
  language:"Jazyk webu",czech:"Čeština",german:"Deutsch",skip:"Přejít na hlavní obsah",home:"Vojtěch Honig — úvod",navigation:"Hlavní navigace",
  about:"O mně",projects:"Projekty",internships:"Stáže",contact:"Kontakt",work:"Tvorba",authorTheatre:"Autorské divadlo",portfolio:"Autorské portfolio",roles:"autor, režisér, dramaturg",
  heroLine1:"Autorské divadlo",heroLine2:"ve studiových a nedivadelních prostorech.",viewProjects:"Prohlédnout projekty",city:"Praha",selectedWork:"Vybrané práce",
  workLine1:"Režie, autorská tvorba a dramaturgie.",workLine2:"Zkušenosti s dalšími tvůrci.",workAreas:"Oblasti tvorby",projectMode:"Inscenace a vlastní tvůrčí podíl",internshipMode:"Tvůrci, jejich praxe a moje zkušenost",
  contactLine1:"Pojďme spolu",contactLine2:"něco vytvořit",contactNote1:"Pro spolupráci, otázky",contactNote2:"nebo rozhovor o tvorbě.",footerRoles:"Režie / dramaturgie / autorská tvorba",
  close:"Zavřít",gallery:"Galerie",photograph:"Fotografie",video:"Video",details:"Podrobnosti",enlarge:"Zvětšit fotografii",previousPhoto:"Předchozí fotografie",nextPhoto:"Další fotografie",showPhoto:"Zobrazit fotografii",photoCredit:"Fotografie",videoExcerpt:"videoukázka",openYoutube:"Otevřít video na YouTube",premiere:"Premiéra",duration:"Délka představení",cast:"Obsazení",team:"Inscenační tým",productionPage:"Stránka inscenace",nextInternships:"Další stáže",nextProjects:"Další projekty",originalTitle:"Původní název",
  lightboxDescription:"Zvětšená fotografie. Fotografie lze procházet šipkami.",closePhoto:"Zavřít fotografii",previousLarge:"Předchozí zvětšená fotografie",nextLarge:"Další zvětšená fotografie",
  aboutInternship:"O stáži",aboutProduction:"O inscenaci",sharedTeam:"Stejný tvůrčí tandem / 2 stáže",internshipInformation:"Informace ke stáži",theatre:"Divadlo",period:"Období",role:"Role",artists:"Tvůrci",internshipPhotos:"Fotografie ke stáži",toAdd:"K doplnění",
  projectOverview:"Interaktivní přehled projektů",internshipOverview:"Interaktivní přehled stáží",openInternship:"Otevřít stáž",openProject:"Otevřít projekt",depogExcerpt:"Autorský vklad, disciplína a tvorba kolektivu.",tandemExcerpt:"Společný estetický jazyk režie a scénografie.",internshipChoice:"O stáži a výběru tvůrců",startMotion:"Spustit pohyb na webu",pauseMotion:"Pozastavit pohyb na webu",
  puppetAlt:"Vojtěch Honig jako tančící kreslený panáček s doutnající cigaretou a hrnkem kávy",puppetTrigger:"Zjistit víc o této osobě",puppetDescription:"Spustí krátkou groteskní animaci. Poté se vrátíte na portfolio. Animaci lze přeskočit klávesou Escape.",motionReduced:"Animace je vypnutá při omezení pohybu.",motionPaused:"Pro spuštění zapni pohyb webu.",interruptionTitle:"Scénický zkrat",interruptionDescription:"Krátká animovaná koláž. Poté se vrátíte na stejné místo v portfoliu. Lze přeskočit klávesou Escape.",backToPortfolio:"Zpět na portfolio",crash:"PRÁSK!",
  portalAlt:"Proražený displej. Za otvorem se vznášejí slova tělo, hlas, paměť a lidskost.",portalDescription:"Postava zmizela. Na jejím místě zůstal otvor ve skle s plujícími slovy.",resetPuppet:"Vrátit postavu",portalWords:["tělo","hlas","paměť","lidskost","smysl","krize","pohyb","jinde"],
  metaTitle:"Vojtěch Honig — režisér, dramaturg, autor",metaDescription:"Autorské divadlo ve studiových a nedivadelních prostorech. Vybrané inscenace, dramaturgické spolupráce a stáže Vojtěcha Honiga.",
};
const de:typeof cs={
  language:"Sprache der Website",czech:"Čeština",german:"Deutsch",skip:"Zum Hauptinhalt",home:"Vojtěch Honig — Startseite",navigation:"Hauptnavigation",
  about:"Über mich",projects:"Projekte",internships:"Hospitanzen",contact:"Kontakt",work:"Arbeiten",authorTheatre:"Autorentheater",portfolio:"Künstlerisches Portfolio",roles:"Autor, Regisseur, Dramaturg",
  heroLine1:"Autorentheater",heroLine2:"in Studioräumen und an nichttheatralen Spielorten.",viewProjects:"Projekte entdecken",city:"Prag",selectedWork:"Ausgewählte Arbeiten",
  workLine1:"Regie, eigene Theaterarbeiten und Dramaturgie.",workLine2:"Erfahrungen mit anderen Kunstschaffenden.",workAreas:"Arbeitsbereiche",projectMode:"Inszenierungen und mein künstlerischer Beitrag",internshipMode:"Kunstschaffende, ihre Praxis und meine Erfahrungen",
  contactLine1:"Lass uns gemeinsam",contactLine2:"etwas gestalten",contactNote1:"Für eine Zusammenarbeit, Fragen",contactNote2:"oder ein Gespräch über künstlerische Arbeit.",footerRoles:"Regie / Dramaturgie / eigene künstlerische Arbeiten",
  close:"Schließen",gallery:"Galerie",photograph:"Fotografie",video:"Video",details:"Details",enlarge:"Foto vergrößern",previousPhoto:"Vorheriges Foto",nextPhoto:"Nächstes Foto",showPhoto:"Foto anzeigen",photoCredit:"Fotos",videoExcerpt:"Videoausschnitt",openYoutube:"Video auf YouTube öffnen",premiere:"Premiere",duration:"Spieldauer",cast:"Besetzung",team:"Inszenierungsteam",productionPage:"Zur Inszenierung",nextInternships:"Weitere Hospitanzen",nextProjects:"Weitere Projekte",originalTitle:"Originaltitel",
  lightboxDescription:"Vergrößertes Foto. Mit den Pfeiltasten können Sie zwischen den Fotos wechseln.",closePhoto:"Foto schließen",previousLarge:"Vorheriges vergrößertes Foto",nextLarge:"Nächstes vergrößertes Foto",
  aboutInternship:"Zur Hospitanz",aboutProduction:"Zur Inszenierung",sharedTeam:"Dasselbe künstlerische Tandem / 2 Hospitanzen",internshipInformation:"Informationen zur Hospitanz",theatre:"Theater",period:"Zeitraum",role:"Tätigkeit",artists:"Kunstschaffende",internshipPhotos:"Fotos zur Hospitanz",toAdd:"Wird ergänzt",
  projectOverview:"Interaktive Übersicht der Projekte",internshipOverview:"Interaktive Übersicht der Hospitanzen",openInternship:"Hospitanz öffnen",openProject:"Projekt öffnen",depogExcerpt:"Eigener künstlerischer Beitrag, Disziplin und kollektive Arbeit.",tandemExcerpt:"Eine gemeinsame ästhetische Sprache von Regie und Bühnenbild.",internshipChoice:"Zur Hospitanz und zur Wahl der Kunstschaffenden",startMotion:"Bewegung auf der Website starten",pauseMotion:"Bewegung auf der Website pausieren",
  puppetAlt:"Vojtěch Honig als tanzendes Strichmännchen mit glimmender Zigarette und Kaffeetasse",puppetTrigger:"Mehr über diese Person erfahren",puppetDescription:"Startet eine kurze groteske Animation. Danach kehren Sie zum Portfolio zurück. Mit Escape lässt sich die Animation überspringen.",motionReduced:"Bei reduzierter Bewegung ist die Animation ausgeschaltet.",motionPaused:"Zum Starten die Bewegung der Website einschalten.",interruptionTitle:"Szenischer Kurzschluss",interruptionDescription:"Eine kurze animierte Collage. Danach kehren Sie an dieselbe Stelle im Portfolio zurück. Mit Escape lässt sie sich überspringen.",backToPortfolio:"Zurück zum Portfolio",crash:"KRACH!",
  portalAlt:"Ein durchbrochener Bildschirm. Hinter der Öffnung schweben die Wörter Körper, Stimme, Erinnerung und Menschlichkeit.",portalDescription:"Die Figur ist verschwunden. An ihrer Stelle bleibt ein Loch im Glas mit schwebenden Wörtern.",resetPuppet:"Figur zurückholen",portalWords:["Körper","Stimme","Erinnerung","Menschlichkeit","Sinn","Krise","Bewegung","anderswo"],
  metaTitle:"Vojtěch Honig — Regisseur, Dramaturg, Autor",metaDescription:"Autorentheater in Studioräumen und an nichttheatralen Spielorten. Ausgewählte Inszenierungen, dramaturgische Arbeiten und Hospitanzen von Vojtěch Honig.",
};
export type Labels=typeof cs;
export const labels:Record<Language,Labels>={cs,de};

const aboutDe=[
  "Ich habe mein Regiestudium an der JAMU abgeschlossen und Philosophie an der Philosophischen Fakultät der Karls-Universität studiert.",
  "Ich widme mich vor allem dem Autorentheater in Studioräumen und an nichttheatralen Spielorten.",
  "Im Mittelpunkt meiner Arbeit steht das Schauspiel – ausgehend von körperlichem Handeln und einer eigenständigen darstellerischen Sprache, die sich aus der Dramaturgie des jeweiligen Projekts entwickelt.",
  "Ich arbeite mit einer assoziativen Ästhetik, sowohl auf der Textebene als auch im Umgang mit Bühnenbild und Musik. Wesentlich sind für mich Atmosphären, Stimmungen und die emotionale Wirkung der künstlerischen Form.",
  "Thematisch beschäftige ich mich mit der Frage, was es bedeutet, in der heutigen Welt Mensch zu sein: wie sich der Begriff der Menschlichkeit in einem immer weniger menschlichen Kontext verändert und wie Individuen und Gesellschaft darauf reagieren.",
  "Ich arbeite auf der Grundlage eigener Texte oder mit Adaptionen zeitgenössischer Literatur.",
];
const additionalWorkDe="Darüber hinaus habe ich bei Kurzfilmen und mehreren einmaligen Performances Regie geführt. Seit Langem schreibe ich außerdem Theatertexte, Drehbücher und kürzere Prosatexte.";
const tandemReflectionDe={title:"Warum Kamila Polívková und Antonín Šilar?",text:"Kamila und Tonda bilden ein künstlerisches Tandem, das über die klassische Zusammenarbeit von Regie und Bühnenbild hinausgeht. In ihrer gemeinsamen Arbeit haben sie eine eindrucksvolle ästhetische Sprache entwickelt, mit der es ihnen immer wieder gelingt, ganz unterschiedliche literarische Vorlagen zum Leben zu erwecken. Ihre szenischen Lösungen schaffen mit präzise gewählten, oft minimalistischen Mitteln eine eigenständige Realität, die das Publikum von der ersten Sekunde an hineinzieht und bis zum letzten Moment nicht mehr loslässt."};
const translations:Record<string,Partial<Project>>={
  "ec-dysis-crisis-mami":{
    role:"Regie, Text und Konzept",category:"Regie",duration:"120 Minuten",premiere:"15. Dezember 2025",
    paragraphs:["Die Inszenierung erkundet Krisensituationen. Durch ihre offene Form löst sie ein einheitliches Feld der Publikumsaufmerksamkeit auf und versucht, persönliche wie gesellschaftliche Grenzzustände in einer assoziativen Sprache zu vermitteln. Sie untersucht die Grenzen der Verständlichkeit unterschiedlicher Reflexionen der Wirklichkeit und sucht gerade im Unverständlichen nach Auswegen. Dabei arbeitet sie mit der Form der persönlichen Aussage als Reaktion auf gesellschaftliche Phänomene. Sie verlässt die sinnvolle Sprache, um wieder Sinn zu finden. Sie dekonstruiert ihre eigenen thematischen Grundlagen, um sie sich tatsächlich zu eigen zu machen."],
  },
  mad:{
    role:"Regie",category:"Regie",context:"Theaterfakultät der JAMU",duration:"45 Minuten",
    paragraphs:["Ein Eintauchen in das Unterbewusstsein einer heutigen, zerstreuten Psyche, die immer schon mit mindestens einem Bein im Wahnsinn steht. Eine szenische Form, die sich zwischen verschiedenen Wirklichkeitsebenen ebenso bewegt wie zwischen den Räumen und Stockwerken der Theaterfakultät der JAMU. Situationen, Stimmungen, die Identitäten der Figuren und das Verhältnis zwischen Publikum und Darstellenden verändern sich unaufhörlich – Banalitäten, Traumata, Farce und emotionale Tiefe. Eine Untersuchung eigenständiger schauspielerischer Gestaltung auf der Grundlage von David Foster Wallaces Erzählung Inkarnace popálených dětí, YouTube-Memes und der hypnotischen Musik Caterina Barbieris."],
  },
  "zakon-rady":{
    title:"Das Gesetz der Serie",originalTitle:"Zákon řady",role:"Dramaturgie",category:"Dramaturgie",
    paragraphs:["Die minimalistische Bewegungsinszenierung unter der Regie von Apolena Vanišová ist frei von der Theorie des österreichischen Biologen und Zoologen Paul Kammerer inspiriert. Vier Akteurinnen und Akteure beobachten aufmerksam Objekte, die sich selbsttätig über die Bühne bewegen. Sie konzentrieren sich auf deren Wege durch den Raum und versuchen, gleiche oder ähnliche Anordnungen festzuhalten, die dabei entstehen. Durch das Prinzip der Wiederholung werden Dinge wahrnehmbar, die uns normalerweise verborgen bleiben. Die Inszenierung lädt zu einem visuellen Erlebnis und zum meditativen Eintauchen in endlose repetitive Muster ein. Damit entsteht eine Parallele zu Kammerers Gesetz der Serie, das er in seinem Buch Das Gesetz der Serie beschrieb."],
  },
  "hory-doly-epizody":{
    title:"Berge, Täler, Episoden",originalTitle:"Hory, doly, epizody",role:"Regieassistenz",category:"Assistenz",premiere:"25. Mai 2025 · Überdachte Markthalle am Zelný trh, Brünn",
    quote:"Der Morgen ist klüger und gibt nach. Sie frühstückten und lebten glücklich miteinander bis zum kleinen Tod.",
    lead:"Ein Weckruf in die Realität beim erkaltenden Frühstück. Eine Matinee, in der Kleider Männer machen und das Wort die Frau hart macht. Immer wieder dasselbe. Er. Sie. Es. Sie. Sie führen Krieg zum Abschied. Ich gleich wir minus du.",
    paragraphs:["Die Vergänglichkeit von Verbindlichkeit, die Grenzen der Macht des Wortes, die vermeintliche Beständigkeit eines Versprechens, die Unfähigkeit, irgendjemandem irgendetwas zu garantieren. Das neue Bühnenwerk des Kollektivs D’epog nimmt das Motiv des Weges zum Ausgangspunkt: Es verfolgt die Bewegung von Standpunkten, untersucht die Folgen veränderter Entscheidungen und analysiert die Ursachen, die zur Neubewertung ursprünglicher Haltungen führen. Das Konzept geht aus der dramaturgischen Linie „Maximale Haltbarkeit“ hervor, die sich mit dem Phänomen der Stabilität und dem Thema der Meinungspromiskuität beschäftigt."],
    reflection:{title:"Warum Lucia Repašská?",text:"Die Arbeit von D’epog fasziniert mich sowohl durch ihre Ergebnisse, die bei aller großen Vielfalt eine außergewöhnliche künstlerische Qualität bewahren, als auch durch den besonderen Entstehungsprozess. In ihm treffen extreme Disziplin und der authentische künstlerische Beitrag jedes Ensemblemitglieds aufeinander. D’epog ist für mich ein außergewöhnliches Beispiel für die schöpferische Kontinuität eines Kollektivs und die radikale Hingabe an die gemeinsame Arbeit."},
  },
  vegetarianka:{title:"Die Vegetarierin",originalTitle:"Vegetariánka",date:"Februar 2026",role:"Hospitanz",category:"Hospitanz"},
  "der-mensch-erscheint-im-holozaen":{date:"Oktober 2026",role:"Hospitanz",category:"Hospitanz"},
};
const teamRoles:Record<string,string>={
  "Text, koncept":"Text, Konzept","Režie":"Regie","Dramaturgie":"Dramaturgie","Asistentka dramaturgie":"Dramaturgieassistenz","Scéna":"Bühnenbild","Asistentka scénografie":"Bühnenbildassistenz","Kostýmy":"Kostüme","Hudba":"Musik","Pohybová spolupráce":"Bewegungsarbeit","Video a projekce":"Video und Projektionen","Světelný design":"Lichtdesign","Světlo":"Licht","Zvuk":"Ton","Produkce":"Produktion","Grafika":"Grafik","Foto":"Fotos","Autor":"Text","Překlad":"Übersetzung","Vizuální spolupráce":"Visuelle Zusammenarbeit","Pohybová supervize":"Bewegungssupervision","Odborná spolupráce":"Fachliche Beratung","Vizuál":"Visuelle Gestaltung","Asistent režie":"Regieassistenz",
};
export function localizeEntry(entry:Project,language:Language):Project {
  if(language==="cs")return entry;
  const translation=translations[entry.id]??{};
  const title=translation.title??entry.title;
  return {...entry,...translation,team:entry.team.map(([role,name])=>[teamRoles[role]??role,name.replace("(textilní obraz)","(Textilbild)").replace("(grafika)","(Grafik)")]),media:entry.media.map((media,index)=>({...media,caption:title+" / "+String(index+1).padStart(2,"0")}))};
}
export function portfolioFor(language:Language) {
  const localized=entries.map(entry=>localizeEntry(entry,language));
  return {entries:localized,projects:localized.filter(entry=>entry.kind==="project"),internships:localized.filter(entry=>entry.kind==="internship"),productions:localized.filter(entry=>entry.paragraphs.length>0),about:language==="de"?aboutDe:about,additionalWork:language==="de"?additionalWorkDe:additionalWork};
}
export function reflectionFor(entry:Project,language:Language) {
  if(language==="cs")return entryReflection(entry);
  return entry.reflectionKey?tandemReflectionDe:translations[entry.id]?.reflection;
}
