"use client";

import { useEffect, useRef } from "react";
import { curvePath, curveProgress, focusedPoints, livingPoints, smoothCurve, springStep, threadPoints, type ThreadBox, type ThreadLayout, type Point, type Cubic } from "./thread-geometry";

export function PortfolioThread({ paused }: { paused: boolean }) {
  const svg = useRef<SVGSVGElement>(null);
  const stroke = useRef<SVGPathElement>(null);
  const pause = useRef(paused);
  pause.current = paused;

  useEffect(() => {
    const main = svg.current?.closest("main");
    const root = svg.current;
    const path = stroke.current;
    if (!main || !root || !path) return;
    let frame: number | null = null;
    let layout: ThreadLayout | null = null;
    let points: Point[] = [];
    let curve: Cubic[] = [];
    let drawn = 0;
    let target = 0;
    let phase = 0;
    let previousTime = 0;
    let attraction: {offset: Point; velocity: Point}[] = [];
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const schedule = () => {
      if (frame === null && !document.hidden) frame = window.requestAnimationFrame(paint);
    };

    function progress() {
      if (!layout) return;
      const bottom = window.innerHeight - main!.getBoundingClientRect().top + 120;
      target = Math.max(target, curveProgress(curve, bottom));
      schedule();
    }

    function paint(now: number) {
      frame = null;
      if (!layout || document.hidden) return;
      const elapsed = previousTime ? Math.min(64, now - previousTime) : 32;
      previousTime = now;
      const still = pause.current || preference.matches;
      const top = main!.getBoundingClientRect().top;
      const loopVisible = top + layout.scene.bottom > 0 && top + layout.scene.y < window.innerHeight;
      if (!still && loopVisible) phase += elapsed / 1000;
      if (still) target = 1;
      drawn = still ? 1 : drawn + (target - drawn) * (1 - Math.exp(-elapsed / 180));
      if (Math.abs(target - drawn) < .0001) drawn = target;
      const idle = livingPoints(points, layout, phase);
      const featured = !still && loopVisible
        ? main!.querySelector<HTMLElement>(".scene-fragment[data-featured='true'] .scene-photo")?.getBoundingClientRect()
        : undefined;
      const mainBounds = featured ? main!.getBoundingClientRect() : null;
      const photo = featured && mainBounds ? {
        x:featured.left-mainBounds.left, y:featured.top-mainBounds.top,
        width:featured.width, height:featured.height, bottom:featured.bottom-mainBounds.top,
      } : null;
      const focus = focusedPoints(idle, photo);
      let moving = false;
      const gathered = idle.map((p, index) => {
        const state = attraction[index] ?? (attraction[index] = {offset:{x:0,y:0}, velocity:{x:0,y:0}});
        if (preference.matches) {
          state.offset = {x:0,y:0}; state.velocity = {x:0,y:0};
        } else if (!still) {
          const x = springStep(state.offset.x, state.velocity.x, focus[index].x-p.x, elapsed/1000);
          const y = springStep(state.offset.y, state.velocity.y, focus[index].y-p.y, elapsed/1000);
          state.offset = {x:x.position,y:y.position}; state.velocity = {x:x.velocity,y:y.velocity};
          moving ||= x.velocity !== 0 || y.velocity !== 0;
        }
        return {x:p.x+state.offset.x,y:p.y+state.offset.y};
      });
      const shape = smoothCurve(gathered);
      // Morphing changes arc length, so keep the visible part of the loop revealed.
      if (photo || moving) target = Math.max(target, curveProgress(shape, window.innerHeight-top+120));
      path!.setAttribute("d", curvePath(shape));
      path!.style.strokeDashoffset = String(1 - drawn);
      // One opaque stroke avoids darker patches where the authored loops cross.
      path!.style.strokeWidth = String((layout.width <= 640 ? 2.3 : 3.4) + (still ? 0 : Math.sin(phase * .42) * .35));
      if (!still && (loopVisible || moving || Math.abs(target - drawn) > .0001)) schedule();
    }

    function measure() {
      if (!main) return;
      const bounds = main.getBoundingClientRect();
      const box = (selector: string): ThreadBox | null => {
        const rect = main.querySelector(selector)?.getBoundingClientRect();
        return rect ? { x: rect.left - bounds.left, y: rect.top - bounds.top, width: rect.width, height: rect.height, bottom: rect.bottom - bounds.top } : null;
      };
      const hero = box("#uvod");
      const name = box("#uvod h1");
      const profile = box("#profil");
      const projects = box("#tvorba") ?? box("#projekty");
      const scene = box(".scene-space");
      const internships = box("[data-thread-exit]") ?? box("#staze");
      const contact = box("#kontakt");
      if (!hero || !name || !profile || !projects || !scene || !internships || !contact || bounds.width <= 0) return;
      layout = { width: bounds.width, height: bounds.height, hero, name, profile, projects, scene, internships, contact };
      points = threadPoints(layout);
      curve = smoothCurve(points);
      root!.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      progress();
    }

    const observer = new ResizeObserver(measure);
    observer.observe(main);
    measure();
    const wake = () => { previousTime = 0; progress(); };
    window.addEventListener("scroll", progress, { passive: true });
    window.addEventListener("portfolio-motion-change", wake);
    window.addEventListener("portfolio-scene-focus", wake);
    document.addEventListener("visibilitychange", wake);
    preference.addEventListener("change", wake);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", progress);
      window.removeEventListener("portfolio-motion-change", wake);
      window.removeEventListener("portfolio-scene-focus", wake);
      document.removeEventListener("visibilitychange", wake);
      preference.removeEventListener("change", wake);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => { window.dispatchEvent(new Event("portfolio-motion-change")); }, [paused]);

  return <svg ref={svg} className="portfolio-thread" viewBox="0 0 1 1" fill="none" aria-hidden="true" focusable="false">
    <path ref={stroke} pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1 }}/>
  </svg>;
}
