# Testovací scénka V2 — panáček s pálkou

Vytvořeno vestavěným nástrojem ImageGen, úpravou původního portrétu a sprite
sheetu V1. Původní soubory jsou zachované. Nové podklady:

- `public/media/short-circuit/head-neutral.webp`: neutrální výstřižek hlavy.
- `public/media/short-circuit/evil-sprite.png`: šest červených výrazů s plameny v očích.
- `public/media/short-circuit/evil-face-0.webp` až `evil-face-5.webp`: jednotlivé výrazy pro web.

Tělo a pálka jsou kreslené v SVG a canvasu, nikoli generované fotografie.
Kliknutí na tlačítko „Zjistit víc o této osobě“ spustí 4,2 sekundy rozbíjení
aktuálně viditelných prvků stránky, pak následuje dosavadní 12,4sekundový zkrat.
Esc nebo tlačítko návratu obnoví všechny styly, původní pozici, ovládání i panáčka.
Po skončení lze scénku znovu přehrát kliknutím. Automatický časovač je ve V2 vypnutý.
Animace respektuje omezení pohybu a pozastavený pohyb na webu.

## Přesný prompt — hlava panáčka

Use case: background-extraction, identity-preserve. Edit target: attached original photographic portrait of Vojtech Honig. Create one square transparent cutout of ONLY his whole head, including all dark hair, ears and chin, without neck, sweater, torso or background. Preserve his actual face, blue-grey eyes, facial proportions, expression, hair and original photographic lighting exactly; do not beautify or redesign him. Same neutral expression as original. Head centered, facing front, with roughly 8 percent transparent margin and chin ending near the bottom of the square. Scissors-cut edge, mildly grainy low-budget photo-collage aesthetic, not illustration. Real transparent alpha everywhere outside the head; no shadow, gradient, paper or checkerboard. This head will sit on a silly hand-drawn stick figure. No body or text.

## Přesný prompt — červené výrazy

Use case: identity-preserve, style-transfer. Edit target: attached existing 3-column 2-row stop-motion sprite sheet of the same man. Preserve the EXACT canvas size, six equal square cells, head positions, head scales, facial features, hair and every open-mouth / closed-teeth expression. Preserve all six mouth interiors and shapes, especially frame six's wide dark mouth; this is crucial for registration in an existing animation. Change only the coloration and eyes: a rough saturated red photographic filter over the skin, with tiny theatrical orange-yellow FLAMES in BOTH eyes in every frame, sitting in the eye sockets and curling a little above the eyelids. His laughter should feel absurdly evil, mischievous and grotesque, like a cheap DIY cardboard villain or a deliberately bad photo meme, with xerox grain and obvious low-budget collage. Recognizably the original person, not a monster. Retain dark hair and natural human teeth; no horns, no gore, no new face, no cinematic polish. Keep a truly transparent background everywhere outside all six heads. No added labels, no grid lines, no background, no black or red rectangles behind heads. Output exactly the same 3:2 sprite-sheet composition as input, all heads remain entirely within their original cells.
