"use client";

import { useEffect, useRef } from "react";

function buildWave(width: number) {
  const points: number[] = [];
  let x = 0;
  while (x < width + 40) {
    const flat = 60 + Math.random() * 40;
    for (let i = 0; i < flat; i++) {
      points.push(0);
      x++;
    }
    points.push(-6, -2, 18, -30, 10, -4, 4, 0, 0);
    x += 9;
  }
  return points;
}

export function EcgCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDarkMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function strokeColor() {
      const theme = document.documentElement.getAttribute("data-theme");
      const dark = theme ? theme === "dark" : isDarkMedia.matches;
      return dark ? "rgba(53,199,162,0.55)" : "rgba(20,122,99,0.4)";
    }

    const wave = buildWave((canvas.offsetWidth || 800) * 2);
    let offset = 0;
    let raf = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const baseline = h * 0.6;
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = strokeColor();
      ctx.shadowColor = strokeColor();
      ctx.shadowBlur = 8;
      for (let i = 0; i < w + 2; i++) {
        const idx = (i + Math.floor(offset)) % wave.length;
        const y = baseline + wave[idx] * 3.4;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();
      if (!reduced) {
        offset += 1.4;
        raf = requestAnimationFrame(draw);
      }
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
