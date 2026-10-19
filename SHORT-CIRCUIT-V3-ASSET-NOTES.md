# V3 — tanec, mrknutí a otvor

Nový fotografický podklad `public/media/short-circuit/head-wink.webp` byl vytvořen
vestavěným ImageGen úpravou `head-neutral.webp`. Původní hlava zůstává zachovaná.
Pohyb těla, mrknutí a plující slova jsou řízené webovou animací. Rozbité sklo
a tmavý otvor jsou vektorové SVG prvky v `app/profile-portal.tsx`.

Postava tancuje automaticky, když je vidět, a respektuje pozastavení pohybu,
skrytou kartu i otevřený detail projektu. Mrkne jednou při prvním skutečném
zobrazení očí; ne během načítání fotografie nebo zakrytí dialogem.
Po dokončené scénce postava zmizí a zůstane otvor s osmi plujícími slovy.
Vrácení postavy umožňuje znovu spustit scénku bez opakovaného mrknutí.

## Přesný prompt použitý v ImageGen

Use case: precise-object-edit, identity-preserve. Edit target: the attached square transparent photographic head cutout of Vojtech Honig. Produce a registration-matched WINK frame for a website animation. Change ONLY the eye on the LEFT side of the image as seen by the viewer: close that eyelid in a small friendly mischievous wink. Keep the other blue-grey eye open exactly as it is. Preserve ALL other facial features, the neutral closed mouth, eyebrows, hair, ears, chin, skin texture, original photographic lighting and color. Do not add a smile, do not tilt the head, do not beautify, do not redraw or move the head. Keep precisely the same square canvas framing and relative head position and scale as the input, with identical transparent margins and full head silhouette. The result will be laid directly over the original image for about 150 milliseconds, so exact alignment is essential. Low-budget photographic collage texture, the same rough cutout edge as input. Actual transparent alpha outside the head, no neck or body, no shadow, no background gradient, no text.
