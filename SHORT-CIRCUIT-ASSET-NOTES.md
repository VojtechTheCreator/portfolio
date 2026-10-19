# Obrazové podklady ke scénickému zkratu

Vytvořeno vestavěným nástrojem ImageGen úpravou původní fotografie
`public/media/portrait.jpg`. Původní portrét v sekci „O mně“ se nezměnil.

Výsledek: `public/media/short-circuit/laugh-sprite.png`, šest výstřižků
`public/media/short-circuit/face-0.webp` až `face-5.webp` a dvanáct zmenšených
fotografií již dodaných inscenací `photo-0.webp` až `photo-11.webp`.
Webové soubory mají dohromady přibližně 620 kB. Šest snímků se střídá v kódu;
nejde o vygenerovaný videosoubor. Průhlednost, stop motion a vtažení obrazu
do úst se skládají za běhu animace. Spouští se jednou při návštěvě po 30 sekundách
ve viditelné kartě, odloží se při otevřeném projektu, má délku 12,4 sekundy.
Esc a tlačítko vracejí návštěvníka ihned. Při omezení pohybu nebo pozastaveném
pohybu se automaticky nespouští.

## Přesný prompt použitý v ImageGen

Use case: identity-preserve. Asset type: a single transparent stop-motion sprite sheet for a playful surreal theatre portfolio animation. Edit target: the attached real portrait of Vojtech Honig. Retain this exact young man's recognizable face, blue-grey eyes, dark short hair, skin texture, nose, ears, facial proportions and black turtleneck. Create ONE sprite sheet laid out as exactly 3 equal columns and 2 equal rows, each cell perfectly square. Landscape 3:2 ratio. Each of the six cells contains one centered frontal cutout of the SAME man's whole head including hair, ears, chin and just the top of his black turtleneck. No background anywhere, true transparent alpha in gutters and outside each head. Use the same head size and centered position in every cell, with the eyes aligned across cells, approximately 8 percent transparent margin within each cell. Head fills about 80 percent of cell. No labels, no grids, no typography. Frame order left to right, top to bottom: 1) an intense exaggerated broad toothy mischievous grin, teeth clenched together; 2) laughing with mouth moderately open; 3) ecstatic slightly wild laughter with mouth very wide open, clear dark mouth interior; 4) toothy grin with teeth clamped shut for a tooth clack; 5) laughing open-mouthed, subtly cocked eyebrows and tiny head tilt; 6) huge absurd open laugh with a large dark mouth cavity for a visual swallowing effect, still recognizably the same person. It must look like crudely manipulated real photographic cutouts, an intentionally cheap DIY 2000s low-budget theatre-video aesthetic, posterized color, mild xerox grain and imperfect jagged scissors-cut edges. Keep actual photographic facial detail and likeness, no drawing, no glamorous lighting, no heroic cinematic mood, no horror monster, no extra teeth rows, no gore, no change of identity. Full head fully within EACH cell, all poses face viewer. The six expressions should read as funny unhinged performative laughter, not a polite professional smile. Preserve transparency; no checkerboard painted into the pixels.
