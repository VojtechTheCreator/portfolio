# Portfolio — vratný návrh pohybu linky

## Před doplněním fotografií a německé verze — 15. října 2026

- Zdrojový commit: `200ec167414392171ce7431bcf49bb7fedf97a5a`
- Uložená verze Sites: `appgprj_6ac7c79a460c8191905e23988e0205a2~appgver_f39a6d71e85c81918668f37121ee9747`

Tento commit uchovává celý český web se společnou sekcí Tvorba, třemi projekty
a třemi stážemi. Obnovení celého commitu vrátí přesně stav před bilingvní verzí.
Nové fotografie: `022117_62_185995.jpg` → Vegetariánka;
`16x9_HOLO_3509d7d5d7.jpg` → Der Mensch erscheint im Holozän.
Originální nahrané soubory se neupravují, web používá optimalizované kopie.

## Přesný stav před společnou sekcí Tvorba — 14. října 2026

- Zdrojový commit: `c989e0ea379347faeaf06bf194c1003ab745f0d0`
- Uložená verze Sites: `appgprj_6ac7c79a460c8191905e23988e0205a2~appgver_b1f1f80725b881918b5d8016760dfd01`
- Soukromá adresa: https://vojtech-honig-portfolio.quietmelon2.chatgpt.site

Kompletní návrat tohoto commitu obnoví přesně původní čtyři projekty,
samostatné stáže, jejich texty i navigaci. Obsahuje rovněž schválenou linku,
úvodní animaci, tančící postavu s cigaretou a kávou, zkrat a otvor se záblesky.
Nový návrh mění pouze organizaci tvorby a její detaily. Pro návrat pouze této
organizace obnovit `app/page.tsx`, `app/portfolio-data.ts`, `app/living-scene.tsx`,
`app/portfolio-thread.tsx` a `app/portfolio-interruption.tsx`; odstranit nové
`app/work-detail.tsx` a `app/work-collection.css` a jejich importy.
Geometrie a fyzika červené linky ani animace postavy se nepřepisují.

## Přesný schválený stav před experimentem

- Zdrojový commit: `d5a2278bc6b2cdd2318f99ae6bb787a695c44dea`
- Uložená verze Sites: `appgprj_6ac7c79a460c8191905e23988e0205a2~appgver_6c16f05019988191a994a0fd5ac95bf3`
- Soukromá adresa: https://vojtech-honig-portfolio.quietmelon2.chatgpt.site

Tento commit zachovává celý tehdejší web, včetně původního pohybu linky,
plynulé animace jména a pomalého posunu na profil.

## Jak odstranit pouze návrh přitahování linky

Z uvedeného commitu obnovit tyto tři soubory:

- `app/living-scene.tsx`
- `app/portfolio-thread.tsx`
- `app/thread-geometry.ts`

Tím se přesně vrátí původní chování linky i interaktivních projektů.
Nové označení „autor, režisér, dramaturg“ pod jménem a nadpis „O mně“
jsou samostatně v `app/page.tsx` a `app/globals.css` a mohou zůstat.
Pro návrat celého webu do stavu před těmito úpravami použít celý výchozí commit.

## Schválená osmička před kruhovou smyčkou

- Zdrojový commit: `e41cbd1fd3312b12f976a0d62fc413b7c053ab4f`
- Uložená verze Sites: `appgprj_6ac7c79a460c8191905e23988e0205a2~appgver_d6f40d9b15048191b1ad20786d7003d6`

Tento stav byl schválen 11. října 2026. Obsahuje nové označení pod jménem,
nadpis „O mně“ a přitahování osmičky k vybranému projektu.
Pro odstranění pouze kruhové smyčky obnovit `app/thread-geometry.ts`
z tohoto commitu. Výchozí osmička, animace, fotografie i obsah zůstanou přesně stejné.

## Schválená linka a kruhová smyčka — zachovat při dalších úpravách

- Zdrojový commit: `72351d1bc2d34c68132bdcfb062820086f28566f`
- Uložená verze Sites: `appgprj_6ac7c79a460c8191905e23988e0205a2~appgver_02f5cfd7613c8191a1f59d49c114c86b`

Uživatel výslovně schválil linku u jména a u projektů 11. října 2026 a požaduje,
aby se při dalších úpravách neměnila. Scénický zkrat po 30 sekundách je samostatná
dočasná vrstva. Žádný ze souborů linky ani animace úvodního jména se kvůli němu nemění.
Pro úplné odstranění zkratu obnovit `app/page.tsx` z tohoto commitu a odstranit
`app/portfolio-interruption.tsx`, `app/interruption-scene.ts`, `app/portfolio-interruption.css`
a `public/media/short-circuit/`. Schválený vzhled se vrátí přesně.

## Zkrat V1 — uložen před testem panáčka a červeného obličeje

- Zdrojový commit: `80b99bbe61362ea088defc4ad220d5dd2cfbe959`
- Uložená verze Sites: `appgprj_6ac7c79a460c8191905e23988e0205a2~appgver_88c96ce3bfe481919e709664ce4b4b03`

V1 má původní portrét a automatický zkrat po 30 viditelných sekundách.
Uživatel ho 13. října 2026 pochválil a požádal o další testovací variantu.
V2 má místo portrétu fotografickou hlavu na jednoduchém panáčkovi; tlačítko
„Zjistit víc o této osobě“ spustí rozbíjení stránky, zkrat a červený obličej
s plameny v očích. V této testovací variantě není automatické spuštění po 30 sekundách.

Pro přesný návrat do V1 obnovit celý výchozí commit. Pro návrat pouze spouštění
a portrétu obnovit `app/page.tsx`, `app/portfolio-interruption.tsx`,
`app/interruption-scene.ts` a `app/portfolio-interruption.css` z V1.
Původní fotografie, šest původních výrazů a sprite sheet zůstávají zachované.
Schválené soubory linky a úvodní animace se během V2 nemění.

## V2 před tancem, mrknutím a otvorem

- Zdrojový commit: `4fa883db8ee226a56741dbe68add4b87567b71cd`
- Uložená verze Sites: `appgprj_6ac7c79a460c8191905e23988e0205a2~appgver_06fb95ead96c8191b423a3f9e9ece5e3`

Uživatel V2 schválil jako zábavnou a požádal o další úpravy 13. října 2026.
V3 přidává automatický tanec, jediné mrknutí při prvním zobrazení očí a
trvalý otvor po dokončeném spolknutí stránky. Otvor obsahuje pouze plující
slova; žádná druhá dimenze ani navigace do ní zatím neexistuje.
„Vrátit postavu“ zruší otvor a umožní scénku znovu spustit. Mrknutí se tím neopakuje.
Esc před spolknutím vrátí postavu. Reload zahájí novou návštěvu s postavou.
Pro přesný návrat k V2 obnovit tento commit; schválená linka, úvod i renderer
rozbíjení a červeného obličeje během V3 zůstávají beze změny.

## V3 před rozšířením choreografie a záblesky v otvoru

- Zdrojový commit: `72776c6a7430e61ceb18c01472d46594010edbba`
- Uložená verze Sites: `appgprj_6ac7c79a460c8191905e23988e0205a2~appgver_163e242b83c48191a869037b2564c495`

Tento stav obsahuje jednoduchý automatický tanec, jediné mrknutí a otvor
s plujícími slovy. Nová varianta mění pouze choreografii a přidává krátké,
řídké bílé záblesky uvnitř otvoru. Pro návrat obnovit `app/profile-puppet.tsx`,
`app/profile-portal.tsx` a `app/portfolio-interruption.css` z tohoto commitu.
Schválená červená linka, úvod, mrknutí i celá scénka rozbíjení se nemění.

## Tanec a záblesky před přidáním rekvizit

- Zdrojový commit: `b98a4119edf27b5690d67c8b5806b618d2ae00a5`
- Uložená verze Sites: `appgprj_6ac7c79a460c8191905e23988e0205a2~appgver_ece30eaaf3e481918c7339deb6090e04`

Pro odstranění pouze cigarety a kávy obnovit `app/profile-puppet.tsx` a
`app/portfolio-interruption.css` z tohoto commitu. Choreografie, mrknutí,
scénka, otvor i schválená červená linka zůstávají stejné.
