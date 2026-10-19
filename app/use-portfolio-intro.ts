"use client";

import { useEffect, useState, type RefObject } from "react";

/** Animate stable letterforms, then hand over to the identical compact layout. */
export function usePortfolioIntro(title: RefObject<HTMLHeadingElement | null>) {
  const [intro, setIntro] = useState({ settled: false });
  useEffect(() => {
    const heading = title.current;
    const hero = heading?.closest<HTMLElement>(".hero");
    if (!heading || !hero) return;
    const words = Array.from(heading.children) as HTMLElement[];
    const fontSize = parseFloat(getComputedStyle(heading).fontSize);
    const width = words.reduce((sum, word) => sum + word.getBoundingClientRect().width, 0);
    heading.style.setProperty("--compact-name-width", String(width / fontSize + .34));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || document.hidden) {
      setIntro({ settled: true });
      return;
    }

    let cancelled = window.scrollY > 40 || !!(window.location.hash && window.location.hash !== "#uvod");
    let disposed = false;
    let scrollFrame: number | null = null;
    let restoreScrollStyle: (() => void) | undefined;
    let animations: Animation[] = [];
    const clearWords = () => words.forEach(word => {
      for (const property of ["left", "top", "right", "bottom", "transform-origin"]) word.style.removeProperty(property);
    });
    function stopScroll() {
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
      scrollFrame = null;
      restoreScrollStyle?.();
      restoreScrollStyle = undefined;
    }
    function scrollToProfile() {
      if (cancelled || disposed || document.hidden) return;
      const profile = document.getElementById("profil");
      if (!profile) return;
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      restoreScrollStyle = () => { root.style.scrollBehavior = previousBehavior; };
      const start = window.scrollY;
      const padding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      const destination = Math.max(0, Math.min(profile.getBoundingClientRect().top + start - padding, root.scrollHeight - window.innerHeight));
      const started = performance.now();
      function step(now: number) {
        if (cancelled || disposed) { stopScroll(); return; }
        const t = Math.min(1, (now - started) / 1900);
        const ease = t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
        window.scrollTo(0, start + (destination - start) * ease);
        if (t < 1) scrollFrame = window.requestAnimationFrame(step);
        else { stopScroll(); removeListeners(); }
      }
      scrollFrame = window.requestAnimationFrame(step);
    }
    function finish() {
      if (disposed) return;
      hero!.dataset.intro = "settled";
      animations.forEach(animation => animation.cancel());
      animations = [];
      clearWords();
      setIntro({ settled: true });
      // The final font and layout now exactly match the last transform frame.
      if (cancelled) removeListeners();
      else scrollToProfile();
    }
    function fold() {
      if (!heading || !hero || disposed) return;
      if (preference.matches) { finish(); return; }
      const initialStyle = getComputedStyle(heading);
      const initial = {
        font: parseFloat(initialStyle.fontSize), width: initialStyle.width, height: initialStyle.height,
        marginTop: initialStyle.marginTop, marginBottom: initialStyle.marginBottom,
      };
      const start = heading.getBoundingClientRect();
      const before = words.map(word => word.getBoundingClientRect());
      hero.dataset.intro = "settled";
      const finalStyle = getComputedStyle(heading);
      const final = {
        font: parseFloat(finalStyle.fontSize), width: finalStyle.width, height: finalStyle.height,
        marginTop: finalStyle.marginTop, marginBottom: finalStyle.marginBottom,
      };
      const end = heading.getBoundingClientRect();
      const after = words.map(word => word.getBoundingClientRect());
      hero.dataset.intro = "opening";
      if (typeof heading.animate !== "function") { finish(); return; }
      const timing: KeyframeAnimationOptions = { duration: 2200, fill: "both" };
      const grow = 1.026;
      const release = "cubic-bezier(.42,0,.16,1)";
      animations.push(heading.animate([
        {width:initial.width, height:initial.height, marginTop:initial.marginTop, marginBottom:initial.marginBottom, offset:0, easing:"cubic-bezier(.2,.8,.3,1)"},
        {width:initial.width, height:parseFloat(initial.height)*grow+"px", marginTop:initial.marginTop, marginBottom:initial.marginBottom, offset:.16, easing:release},
        {width:final.width, height:final.height, marginTop:final.marginTop, marginBottom:final.marginBottom, offset:1},
      ], timing));
      words.forEach((word, index) => {
        const x = before[index].left - start.left;
        const y = before[index].top - start.top;
        const dx = after[index].left - end.left - x;
        const dy = after[index].top - end.top - y;
        word.style.left = x + "px";
        word.style.top = y + "px";
        word.style.right = "auto";
        word.style.bottom = "auto";
        word.style.transformOrigin = "0 0";
        animations.push(word.animate([
          {transform:"translate(0px,0px) scale(1)", offset:0, easing:"cubic-bezier(.2,.8,.3,1)"},
          {transform:`translate(0px,0px) scale(${grow})`, offset:.16, easing:release},
          {transform:`translate(${dx}px,${dy}px) scale(${final.font/initial.font})`, offset:1},
        ], timing));
      });
      Promise.all(animations.map(animation => animation.finished)).then(finish).catch(() => {});
    }
    const opening = window.setTimeout(fold, 1500);
    function cancelAuto() { cancelled = true; stopScroll(); removeListeners(); }
    function onKey(event: KeyboardEvent) {
      if (["Tab", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Escape"].includes(event.key)) cancelAuto();
    }
    function onVisibility() { if (document.hidden) cancelAuto(); }
    function removeListeners() {
      window.removeEventListener("wheel", cancelAuto);
      window.removeEventListener("touchmove", cancelAuto);
      window.removeEventListener("pointerdown", cancelAuto);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
      preference.removeEventListener("change", cancelAuto);
    }
    window.addEventListener("wheel", cancelAuto, { passive: true });
    window.addEventListener("touchmove", cancelAuto, { passive: true });
    window.addEventListener("pointerdown", cancelAuto);
    window.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVisibility);
    preference.addEventListener("change", cancelAuto);
    return () => {
      disposed = true;
      window.clearTimeout(opening);
      stopScroll();
      animations.forEach(animation => animation.cancel());
      clearWords();
      removeListeners();
    };
  }, [title]);
  return intro;
}
