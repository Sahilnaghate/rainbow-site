"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { COLORS } from "../lib/theme.js";

/* ---------- reveal-on-scroll ---------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

export function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(.22,.61,.36,1) ${delay}s, transform 0.9s cubic-bezier(.22,.61,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- tilt card ---------- */
export function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg) translateZ(6px)`,
      transition: "transform 0.06s linear",
    });
  }, []);
  const onLeave = useCallback(() => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: "transform 0.5s cubic-bezier(.22,.61,.36,1)",
    });
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ ...style, willChange: "transform" }} className={className}>
      {children}
    </div>
  );
}

/* ---------- illustrated spice mounds (SVG, no external images) ---------- */
const MOUND_PATHS = [
  "M60,190 C40,140 70,90 130,75 C190,60 250,90 255,150 C260,205 210,235 150,235 C95,235 78,225 60,190 Z",
  "M40,200 C30,150 90,110 150,100 C215,90 270,120 270,165 C270,215 200,240 140,238 C85,236 48,235 40,200 Z",
  "M70,210 C45,160 55,110 110,85 C150,65 190,70 220,95 C260,125 265,175 235,205 C205,235 150,245 110,235 C90,230 82,225 70,210 Z",
];
const FLECKS = [
  { x: 100, y: 150, r: 4 }, { x: 140, y: 118, r: 3 }, { x: 175, y: 168, r: 5 },
  { x: 120, y: 195, r: 3 }, { x: 205, y: 145, r: 4 }, { x: 92, y: 112, r: 3 },
  { x: 205, y: 195, r: 3 }, { x: 150, y: 212, r: 4 }, { x: 165, y: 130, r: 3 },
];

export function GrainDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="spice-grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" result="noiseAlpha" />
          <feComposite in="noiseAlpha" in2="SourceGraphic" operator="in" result="grain" />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
      </defs>
    </svg>
  );
}

export function SpiceMound({ id, base, deep, threads = false, variant = 0, showFlecks = true, highlight = true }) {
  const gradId = `mound-grad-${id}`;
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id={gradId} cx="35%" cy="28%" r="78%">
          <stop offset="0%" stopColor={base} stopOpacity="1" />
          <stop offset="55%" stopColor={base} />
          <stop offset="100%" stopColor={deep} />
        </radialGradient>
      </defs>
      <path d={MOUND_PATHS[variant % MOUND_PATHS.length]} fill={`url(#${gradId})`} filter="url(#spice-grain)" />
      {showFlecks &&
        FLECKS.map((f, i) => (
          <circle key={i} cx={f.x} cy={f.y} r={f.r} fill={deep} opacity={i % 3 === 0 ? 0.5 : 0.28} />
        ))}
      {threads &&
        [...Array(6)].map((_, i) => (
          <path
            key={i}
            d={`M${100 + i * 15},${210 - i * 6} C${110 + i * 15},${180 - i * 6} ${95 + i * 15},${150 - i * 6} ${115 + i * 15},${110 - i * 6}`}
            stroke={COLORS.redDeep}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}
      {highlight && <ellipse cx="105" cy="105" rx="38" ry="22" fill="#FFFFFF" opacity="0.22" />}
    </svg>
  );
}

/* ---------- Ken Burns hero slideshow (real food photography) ---------- */
export function KenBurns({ images, interval = 4500 }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className={`rs-kenburns ${i === idx ? "rs-kb-active" : ""}`}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            objectPosition: "8% center", // old banners carry baked-in text on the right — keep the dish side
            opacity: i === idx ? 1 : 0,
            transition: "opacity 1.6s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ── rising steam / aroma over a food image (v3 items 2 & 9) ── */
export function SteamLayer({ count = 5, opacity = 1 }) {
  const wisps = Array.from({ length: count }, (_, i) => {
    const left = 8 + (i * 84) / (count - 1 || 1); // spread across the dish
    const dur = 5.5 + (i % 3) * 1.4;
    const delay = -(i * 1.3);
    const drift = (i % 2 ? 1 : -1) * (8 + (i % 3) * 7);
    return { left, dur, delay, drift, i };
  });
  return (
    <div className="rs-steam" style={{ opacity }} aria-hidden="true">
      {wisps.map((w) => (
        <span
          key={w.i}
          style={{
            left: `${w.left}%`,
            marginLeft: "-12%",
            "--rs-steam-dur": `${w.dur}s`,
            "--rs-steam-delay": `${w.delay}s`,
            "--rs-steam-drift": `${w.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ── premium signature-dish showcase: framed real food photo with aroma steam
   + a 3D floating pack (v3 item 2) ── */
export function SignatureDish({ dish, pack, badge, title, sub, deep = "#5C2210" }) {
  return (
    <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "1 / 1", boxShadow: "0 40px 90px rgba(42,22,12,0.35)" }}>
      <img src={dish} alt={title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      {/* warm grade + bottom vignette */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 50% 20%, rgba(0,0,0,0) 45%, rgba(20,8,4,0.5) 100%), linear-gradient(180deg, transparent 40%, ${deep}f2 96%)` }} />
      <SteamLayer count={6} />
      {/* floating pack */}
      {pack && (
        <div className="absolute rs-float3d" style={{ right: "7%", bottom: "9%", width: "34%", zIndex: 3, filter: "drop-shadow(0 26px 34px rgba(0,0,0,0.55))" }}>
          <img src={pack} alt="" aria-hidden="true" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      )}
      <div className="absolute left-0 right-0 bottom-0 p-7" style={{ zIndex: 4 }}>
        {badge && <span className="rs-eyebrow" style={{ fontSize: "0.62rem", color: "#FAA219" }}>{badge}</span>}
        <h3 className="rs-display mt-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", color: "#fff", fontWeight: 600, fontStyle: "italic" }}>{title}</h3>
        {sub && <p className="rs-body mt-2 max-w-sm" style={{ fontSize: "0.85rem", color: "rgba(255,246,231,0.9)" }}>{sub}</p>}
      </div>
    </div>
  );
}

