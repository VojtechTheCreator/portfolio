export type Media = { src: string; thumbnail: string; caption: string };
export type Project = {
  kind: "project" | "internship"; mentor?: string; date?: string; reflectionKey?: "polivkova-silar";
  id: string; title: string; originalTitle?: string; year?: string; role: string; category: string; context: string;
  duration?: string; premiere?: string; paragraphs: string[]; quote?: string; lead?: string;
  cast: string[]; team: [string, string][]; reflection?: { title: string; text: string };
  externalUrl?: string; videoId?: string; media: Media[]; theme: string; cover: string; photoCredit?: string;
};
const ensemble = ["Petr Erhart", "Veronika Stieranková", "Michal Květák", "Ema Červenáková", "David Piskač", "Karolína Anna Měřínská", "Kryštof Zajíček Grygar", "Terézia Bocianová", "Michaela Skalová", "Jakub Krol"];
function gallery(id: string, title: string, count: number): Media[] {
  return Array.from({length:count},(_,i)=>({src:"/media/"+id+"/"+String(i+1).padStart(2,"0")+".webp",thumbnail:"/media/"+id+"/"+String(i+1).padStart(2,"0")+"-thumb.webp",caption:title+" / "+String(i+1).padStart(2,"0")}));
}
// Keep the four productions together for the existing theatrical interruption.
export const productions: Project[] = [
  {
    kind:"project",id:"ec-dysis-crisis-mami", title:"ec dysis crisis, mami", year:"2025—2026", role:"Režie, text a koncept", category:"Režie", context:"Studio Marta", duration:"120 minut", premiere:"15. prosince 2025",
    paragraphs:["Inscenace ohledává situace krize, svou otevřenou formou rozostřuje jednotné pole divácké pozornosti a pokouší se asociativním jazykem komunikovat osobní i společenské hraniční stavy. Zkoumá limity srozumitelnosti nejrůznějších reflexí skutečnosti a hledá východiska skrze nesrozumitelnost. Pracuje s formátem osobní výpovědi jako reakcí na společenské fenomény. Opouští smysluplný jazyk ve snaze opět najít smysl. Dekonstruuje své vlastní tematické základy ve snaze si je skutečně přivlastnit."],
    cast:[...ensemble,"Nikolaos Natanailidis"],
    team:[["Text, koncept","Jana Startsev, Vojtěch Honig"],["Režie","Vojtěch Honig"],["Dramaturgie","Jana Startsev"],["Asistentka dramaturgie","Eva Kaslová"],["Scéna","Alexandra Kubenková"],["Asistentka scénografie","Tamara Žilavá"],["Kostýmy","Jana Mlatečková"],["Hudba","Natálie Chatrná"],["Pohybová spolupráce","Tereza Havránková"],["Video a projekce","Bohdan Chrastil"],["Světelný design","Anna Vodáková"],["Světlo","Anna Vodáková"],["Zvuk","Pavel Jirgl"],["Produkce","Lucie Rožcová, Julie Michalčíková"],["Grafika","Alexandra Kubénková, Jana Mlatečková"],["Foto","Nik Machal"]],
    media:gallery("ec-dysis","ec dysis crisis, mami",10), theme:"ec-dysis", cover:"/media/ec-dysis/05.webp",photoCredit:"Nik Machal",
  },
  {
    kind:"project",id:"mad",title:"MaD",year:"2025",role:"Režie",category:"Režie",context:"Divadelní fakulta JAMU",duration:"45 minut",
    paragraphs:["Ponor do podvědomí současné roztěkané psychiky, která je už vždy alespoň jednou nohou v šílenství. Tvar pohybující se jak mezi různými vrstvami skutečnosti, tak mezi různými místnostmi a patry divadelní fakulty JAMU. Neustále se proměňující situace, nálady, identity postav a vztah mezi divákem a herci – banality, traumata, fraška a emocionální hloubka. Studie autorské herecké tvorby na základě textu Inkarnace popálených dětí Davida Fostera Wallace, youtubových memů a hypnotické hudby Cateriny Barbieri."],
    cast:[...ensemble,"Lukáš Hroník"],team:[],videoId:"UJqxBekmeBI",media:gallery("mad","MaD",10),theme:"mad",cover:"/media/mad/01.webp",
  },
  {
    kind:"project",id:"zakon-rady",title:"Zákon řady",role:"Dramaturgie",category:"Dramaturgie",context:"Studio Hrdinů",
    paragraphs:["Minimalistická pohybová inscenace v režii Apoleny Vanišové je volně inspirována teorií rakouského biologa a zoologa Paula Kammerera. Čtveřice aktérů v ní pozorně sleduje objekty, které se samovolně pohybují po scéně. Soustředí se na jejich cestu prostorem a pokouší se zachytit stejná nebo podobná seskupení, která na místě vznikají. Principy opakování umožňují všímat si věcí, které jsou za normálních okolností nám neviditelné. Inscenace vybízí k vizuálnímu prožitku a meditativnímu ponoru do nekončících repetitivních vzorců. Vytváří tím paralelu k principu Kammererova zákonu řady, který popsal v knize Das Gesetz der Serie."],
    externalUrl:"https://studiohrdinu.cz/cs/production/zakon-rady/",cast:["Jan Bárta","Eliška Brtnická","Dora Bouzková","Sára Märc"],
    team:[["Autor","Apolena Vanišová"],["Překlad","Petr Soukup"],["Režie","Apolena Vanišová"],["Dramaturgie","Jan Horák, Vojtěch Honig"],["Scéna","Apolena Vanišová, Pavel Havrda"],["Kostýmy","Monika Krobová"],["Hudba","Matěj Šenkyřík"],["Světelný design","Pavel Havrda"],["Pohybová spolupráce","Jan Bárta, Eliška Brtnická"],["Vizuální spolupráce","Johana Střížková"],["Pohybová supervize","Hana Polanská"],["Odborná spolupráce","Tomáš Mládek"],["Vizuál","Lucie Rosická (textilní obraz), Jan Bouček (grafika)"],["Foto","Kristýna Burýšková Šaarová"]],
    media:gallery("zakon-rady","Zákon řady",5),theme:"zakon",cover:"/media/zakon-rady/01.webp",photoCredit:"Kristýna Burýšková Šaarová",
  },
  {
    kind:"internship",mentor:"Lucia Repašská",date:"2025",id:"hory-doly-epizody",title:"Hory, doly, epizody",year:"2025",role:"Asistent režie",category:"Asistence",context:"D’epog",premiere:"25. května 2025 · Krytá městská tržnice na Zelném trhu, Brno",
    quote:"Ráno moudřejší ustoupí. Posnídali a žili spolu šťastně až do malé smrti.",lead:"Budíček do reality u chladnoucí snídaně. Matiné, ve kterém šaty dělají muže a slovo tvrdí ženu. Prostě pořád to samé dokola. On. Ona. Ono. Ona. Válčí na rozloučenou. Já rovná se my mínus ty.",
    paragraphs:["Pomíjivost závazku, limity síly slova, iluzorní trvanlivost slibu, neschopnost komukoliv cokoliv garantovat. Nové inscenační dílo kolektivu D’epog tematizuje motiv cesty – sleduje pohyb stanoviska, zkoumá důsledky změn rozhodnutí a analyzuje příčiny, které vedou k přehodnocení původních postojů. Koncept vychází z dramaturgické linie „Maximální trvanlivost“, jež se soustředí na fenomén stability a ohledává téma názorové promiskuity."],
    externalUrl:"https://depog.com/cs/creative-pages/hory-doly-epizody",cast:["Zdeněk Polák","Janet Prokešová","Zuzana Smutková"],team:[["Režie","Lucia Repašská"],["Kostýmy","Jan Matýsek"],["Asistent režie","Vojtěch Honig"]],
    reflection:{title:"Proč Lucia Repašská?",text:"Tvorba D’epogu je pro mě fascinující jak výslednými tvary, které si i ve své vysoké různorodosti zachovávají výjimečnou uměleckou kvalitu, tak svým specifickým tvůrčím procesem, ve kterém se potkává extrémní disciplinovanost a autentický autorský vklad každého člena souboru. D’epog je pro mě výjimečným případem tvůrčí kontinuity kolektivu a radikální odevzdanosti společné tvorbě."},
    media:gallery("hory-doly","Hory, doly, epizody",4),theme:"hory",cover:"/media/hory-doly/01.webp",
  },
];
export const about = [
  "Vystudoval jsem režii na JAMU, studoval jsem filozofii na FF UK.",
  "Věnuji se především autorskému divadlu ve studiových a nedivadelních prostorech.",
  "Soustředím se primárně na herectví – založené na fyzickém jednání a autorském hereckém jazyku, který vzniká v reakci na dramaturgii konkrétního projektu.",
  "Pracuji s asociativní estetikou, jak na úrovni textu, tak v práci se scénografií a hudbou – podstatné jsou pro mě atmosféry, nálady a emocionální působivost tvaru.",
  "Tematicky se věnuji otázce, co znamená být člověkem v současném světě, jakým způsobem se proměňuje koncept lidskosti ve stále méně lidském kontextu a jak na to reagují individua a společnost.",
  "Pracuji na základě autorských textů nebo adaptace současné literatury.",
];
export const additionalWork = "Kromě toho jsem režíroval krátké filmy a několik jednorázových performancí. Dlouhodobě se také věnuji psaní divadelních textů, filmových scénářů a kratších prozaických textů.";
export const internshipReflection = "Kamila a Tonda tvoří tvůrčí tandem, který přesahuje klasickou spolupráci režie-scénografie. Společnou prací si vybudovali působivý estetický jazyk, kterým se jim opakovaně daří přivést k životu nejrůznější literární předlohy. Jejich inscenační řešení dokáže přesně zvolenými, často minimalistickými prostředky vytvořit svébytnou realitu, která diváka vtáhne v první vteřině a nepustí do poslední chvíle.";
export const internships: Project[] = [
  productions[3],
  {kind:"internship",id:"vegetarianka",title:"Vegetariánka",context:"Divadlo v Dlouhé",date:"Únor 2026",year:"2026",role:"Stáž",category:"Stáž",mentor:"Kamila Polívková · Antonín Šilar",reflectionKey:"polivkova-silar",externalUrl:"https://www.divadlovdlouhe.cz/repertoar/nase-inscenace/vegetarianka/",paragraphs:[],cast:[],team:[],media:gallery("vegetarianka","Vegetariánka",1),theme:"dlouha",cover:"/media/vegetarianka/01.webp"},
  {kind:"internship",id:"der-mensch-erscheint-im-holozaen",title:"Der Mensch erscheint im Holozän",context:"Staatstheater Kassel",date:"Říjen 2026",year:"2026",role:"Stáž",category:"Stáž",mentor:"Kamila Polívková · Antonín Šilar",reflectionKey:"polivkova-silar",externalUrl:"https://www.staatstheater-kassel.de/play/dermenscherscheintimholozaen-3384",paragraphs:[],cast:[],team:[],media:gallery("holozaen","Der Mensch erscheint im Holozän",1),theme:"kassel",cover:"/media/holozaen/01.webp"},
];
export const projects = productions.filter(entry=>entry.kind==="project");
export const entries = [...projects,...internships];
export type WorkMode = "projects" | "internships";
export function entryReflection(entry:Project) {
  return entry.reflection ?? (entry.reflectionKey ? {title:"Proč Kamila Polívková a Antonín Šilar?",text:internshipReflection} : undefined);
}
