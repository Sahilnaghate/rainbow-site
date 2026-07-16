import React, { useEffect, useMemo, useState } from "react";
import { COLORS, tint, LINKS } from "./theme.js";
import { Reveal, TiltCard, GrainDefs, SpiceMound, KenBurns } from "./components.jsx";
import {
  TRUST_COUNTERS, CUISINES, PRODUCTS, ORIGINS, HOME_NODE, RECIPES,
  TESTIMONIALS, TIMELINE, DISTRIBUTOR, FAQS,
} from "./data.js";

const NAV = [
  { label: "Products", href: "#products" },
  { label: "Sourcing", href: "#sourcing" },
  { label: "Distributors", href: "#distributors" },
  { label: "Story", href: "#story" },
  { label: "Recipes", href: "#recipes" },
  { label: "Contact", href: "#contact" },
];

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

// Stylised India silhouette (decorative, not a survey map) in a 100x110 viewBox.
const INDIA_PATH =
  "M36,3 C33,7 30,10 29,13 C26,17 23,20 20,25 C17,29 13,32 11,35 C9,38 5,40 5,43 " +
  "C7,46 9,47 10,49 C12,47 13,46 15,47 C15,50 16,52 17,53 C19,56 21,58 22,60 " +
  "C24,64 26,67 27,70 C29,74 31,78 32,82 C33,87 35,92 37,97 C39,93 41,89 43,85 " +
  "C45,81 48,77 51,72 C54,68 56,64 58,61 C60,57 62,53 64,50 C65,48 66,46 67,44 " +
  "C70,43 72,42 74,41 C78,40 81,38 84,38 C86,38 89,38 90,40 C88,42 86,43 83,44 " +
  "C80,45 77,46 74,46 C72,46 70,46 68,45 C67,44 66,43 65,42 C63,39 60,35 58,32 " +
  "C55,28 53,25 50,22 C48,18 45,15 43,12 C41,9 38,6 36,3 Z";

const HERO_SLIDES = [
  "/images/hero/garam-masal.jpg",
  "/images/hero/kitchenking-masala.jpg",
  "/images/hero/chat-masala.jpg",
];

/* ============ Cinematic intro splash (2.5s, once per session, skippable) ============ */
function IntroSplash({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2100);
    const t2 = setTimeout(onDone, 2850);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  const skip = () => { setLeaving(true); setTimeout(onDone, 500); };
  return (
    <div
      onClick={skip}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center cursor-pointer"
      style={{
        background: `radial-gradient(ellipse at 50% 42%, ${COLORS.redDeep}, ${COLORS.ink} 82%)`,
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.75s cubic-bezier(.76,0,.24,1)",
      }}
      aria-label="Intro — click to skip"
    >
      {[...Array(14)].map((_, i) => (
        <span key={i} className="rs-spark" style={{
          "--a": `${(i / 14) * 360}deg`,
          "--d": `${120 + (i % 4) * 46}px`,
          background: i % 3 === 0 ? COLORS.mustard : i % 3 === 1 ? COLORS.red : "#fff",
          animationDelay: `${0.55 + (i % 5) * 0.05}s`,
        }} />
      ))}
      <div className="rs-intro-logo" style={{ background: "#fff", borderRadius: "16px", padding: "14px 20px", boxShadow: `0 0 60px ${tint(COLORS.mustard, 0.45)}` }}>
        <img src="/logo.png" alt="Rainbow Masala" style={{ height: "84px", width: "auto", display: "block" }} />
      </div>
      <p className="rs-eyebrow rs-intro-tag" style={{ color: COLORS.mustard, fontSize: "0.78rem", marginTop: "1.6rem" }}>
        Professional Kitchen Masala Partner
      </p>
      <p className="rs-body rs-intro-tag" style={{ color: "rgba(255,246,231,0.55)", fontSize: "0.72rem", marginTop: "0.5rem", animationDelay: "1.1s" }}>
        since 1962 · Chh. Sambhajinagar
      </p>
      <span className="rs-body absolute bottom-6 right-8" style={{ color: "rgba(255,246,231,0.45)", fontSize: "0.72rem" }}>click to skip →</span>
    </div>
  );
}

function Eyebrow({ children, color = COLORS.red, center }) {
  return <p className={`rs-eyebrow ${center ? "text-center" : ""}`} style={{ color, fontSize: "0.8rem" }}>{children}</p>;
}
function H2({ children, center, color = COLORS.ink }) {
  return <h2 className={`rs-display mt-4 ${center ? "text-center" : ""}`} style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color, fontWeight: 600 }}>{children}</h2>;
}

/* ============ Bulk inquiry modal (HORECA funnel end-point) ============ */
function BulkInquiryModal({ open, onClose }) {
  const [f, setF] = useState({ business: "", name: "", phone: "", city: "", need: "" });
  if (!open) return null;
  const msg = encodeURIComponent(
    `Bulk enquiry — Rainbow Masala\nBusiness: ${f.business}\nContact: ${f.name} (${f.phone})\nCity: ${f.city}\nRequirement: ${f.need}`
  );
  const field = (label, key, placeholder, type = "text") => (
    <label className="block">
      <span className="rs-eyebrow" style={{ fontSize: "0.6rem", color: COLORS.inkDim }}>{label}</span>
      <input
        type={type}
        value={f[key]}
        onChange={(e) => setF({ ...f, [key]: e.target.value })}
        placeholder={placeholder}
        className="rs-body mt-1 w-full rounded-lg px-3 py-2.5"
        style={{ border: `1.5px solid ${tint(COLORS.ink, 0.18)}`, background: COLORS.paper, fontSize: "0.95rem", color: COLORS.ink }}
      />
    </label>
  );
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4" style={{ background: "rgba(42,22,12,0.55)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl p-6 md:p-8" style={{ background: COLORS.cream, boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>Bulk enquiry</Eyebrow>
            <h3 className="rs-display mt-2" style={{ fontSize: "1.6rem", color: COLORS.ink, fontWeight: 600 }}>Tell us what your kitchen needs.</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="rs-body text-xl" style={{ color: COLORS.inkDim }}>✕</button>
        </div>
        <div className="mt-5 grid gap-3">
          {field("Business name", "business", "Hotel Annapurna")}
          <div className="grid grid-cols-2 gap-3">
            {field("Contact person", "name", "Your name")}
            {field("Phone", "phone", "98xxxxxx00", "tel")}
          </div>
          {field("City", "city", "Chh. Sambhajinagar")}
          {field("Requirement", "need", "e.g. Garam Masala 25kg/month")}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`${LINKS.whatsapp}?text=${msg}`} target="_blank" rel="noreferrer" className="rs-btn px-6 py-3 rounded-full" style={{ background: "#1FA855", color: "#fff", fontSize: "0.78rem" }}>
            Send on WhatsApp
          </a>
          <a href={`mailto:${LINKS.email}?subject=Bulk enquiry — ${encodeURIComponent(f.business || "HORECA")}&body=${msg}`} className="rs-btn px-6 py-3 rounded-full" style={{ border: `2px solid ${COLORS.red}`, color: COLORS.red, fontSize: "0.78rem" }}>
            Send by Email
          </a>
        </div>
        <p className="rs-body mt-4" style={{ fontSize: "0.75rem", color: COLORS.inkDim }}>We reply within one working day. Minimum direct order 25kg — smaller needs are routed to your nearest distributor.</p>
      </div>
    </div>
  );
}

/* ============ Availability finder popup ============ */
function AvailabilityModal({ open, onClose }) {
  if (!open) return null;
  const Block = ({ title, children }) => (
    <div className="rounded-xl p-4" style={{ background: COLORS.paper, border: `1px solid ${tint(COLORS.ink, 0.12)}` }}>
      <p className="rs-eyebrow" style={{ fontSize: "0.62rem", color: COLORS.red }}>{title}</p>
      <div className="rs-body mt-2 text-sm" style={{ color: COLORS.inkDim, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4" style={{ background: "rgba(42,22,12,0.55)", backdropFilter: "blur(4px)" }} onClick={() => onClose()}>
      <div className="w-full max-w-lg rounded-2xl p-6 md:p-8" style={{ background: COLORS.cream, boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>Availability finder</Eyebrow>
            <h3 className="rs-display mt-2" style={{ fontSize: "1.6rem", color: COLORS.ink, fontWeight: 600 }}>Where can you buy?</h3>
          </div>
          <button onClick={() => onClose()} aria-label="Close" className="rs-body text-xl" style={{ color: COLORS.inkDim }}>✕</button>
        </div>
        <div className="mt-5 grid gap-3">
          <Block title="Bulk & HORECA (direct)">
            25kg+ per blend, dispatched from Chh. Sambhajinagar.{" "}
            <button className="underline" style={{ color: COLORS.red }} onClick={() => onClose("bulk")}>Raise a bulk enquiry →</button>
          </Block>
          <Block title="Through our distributors">
            85+ distributors across 11 states. WhatsApp us your city on{" "}
            <a className="underline" style={{ color: COLORS.red }} href={`${LINKS.whatsapp}?text=${encodeURIComponent("Hi! Which Rainbow distributor covers my city? City: ")}`} target="_blank" rel="noreferrer">+91 83559 33962</a>{" "}
            and we'll connect you the same day.
          </Block>
          <Block title="Retail packs online">
            <span className="flex flex-wrap gap-4">
              <a className="underline" style={{ color: COLORS.red }} href={LINKS.amazon} target="_blank" rel="noreferrer">Amazon</a>
              <a className="underline" style={{ color: COLORS.red }} href={LINKS.flipkart} target="_blank" rel="noreferrer">Flipkart</a>
              <a className="underline" style={{ color: COLORS.red }} href={LINKS.indiamart} target="_blank" rel="noreferrer">IndiaMART</a>
            </span>
          </Block>
        </div>
      </div>
    </div>
  );
}

/* ============ Cost-per-plate widget (key differentiator) ============ */
function CostPerPlate() {
  const usable = PRODUCTS.filter((p) => p.yieldPerKg && p.pricePerKg);
  const [idx, setIdx] = useState(0);
  const [price, setPrice] = useState(usable[0].pricePerKg);
  const p = usable[idx];
  const perPlate = price / p.yieldPerKg;
  return (
    <TiltCard className="rounded-2xl overflow-hidden h-full">
      <div className="rounded-2xl p-6 md:p-7 h-full flex flex-col" style={{ background: `radial-gradient(ellipse at 30% 0%, ${COLORS.redDeep}, ${COLORS.ink} 80%)`, color: "#fff" }}>
        <p className="rs-eyebrow" style={{ fontSize: "0.68rem", color: COLORS.mustard }}>Cost-per-plate math</p>
        <h3 className="rs-display mt-2" style={{ fontSize: "1.45rem", fontWeight: 600 }}>What a plate really costs you.</h3>
        <div className="mt-5 grid gap-3">
          <label className="block">
            <span className="rs-eyebrow" style={{ fontSize: "0.58rem", color: "rgba(255,246,231,0.7)" }}>Blend</span>
            <select
              value={idx}
              onChange={(e) => { const i = Number(e.target.value); setIdx(i); setPrice(usable[i].pricePerKg); }}
              className="rs-body mt-1 w-full rounded-lg px-3 py-2.5"
              style={{ background: "rgba(255,246,231,0.12)", border: "1px solid rgba(255,246,231,0.3)", color: "#fff", fontSize: "0.92rem" }}
            >
              {usable.map((u, i) => <option key={u.name} value={i} style={{ color: COLORS.ink }}>{u.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="rs-eyebrow" style={{ fontSize: "0.58rem", color: "rgba(255,246,231,0.7)" }}>Your price per kg (₹)</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
              className="rs-body mt-1 w-full rounded-lg px-3 py-2.5"
              style={{ background: "rgba(255,246,231,0.12)", border: "1px solid rgba(255,246,231,0.3)", color: "#fff", fontSize: "0.92rem" }}
            />
          </label>
        </div>
        <div className="mt-6 flex items-end justify-between gap-4 pt-5" style={{ borderTop: "1px solid rgba(255,246,231,0.25)" }}>
          <div>
            <p className="rs-eyebrow" style={{ fontSize: "0.58rem", color: "rgba(255,246,231,0.7)" }}>1 kg ≈ {p.yieldPerKg} plates</p>
            <p className="rs-display mt-1" style={{ fontSize: "2.2rem", color: COLORS.mustard, fontWeight: 600 }}>
              {perPlate < 1 ? `${Math.round(perPlate * 100)}p` : inr(perPlate.toFixed(2))}
              <span className="rs-body" style={{ fontSize: "0.9rem", color: "rgba(255,246,231,0.8)" }}> / plate</span>
            </p>
          </div>
          <p className="rs-body text-right" style={{ fontSize: "0.72rem", color: "rgba(255,246,231,0.65)", maxWidth: "130px" }}>Indicative yields — validated per recipe with your chef.</p>
        </div>
      </div>
    </TiltCard>
  );
}

/* ============ Sourcing route map ============ */
function SourcingMap() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid md:grid-cols-5 gap-8 items-stretch mt-14">
      <div className="md:col-span-3 relative rounded-3xl overflow-hidden p-4" style={{ background: `radial-gradient(ellipse at 50% 20%, ${COLORS.redDeep}, ${COLORS.ink} 80%)`, minHeight: "460px" }}>
        {/* aspect-locked wrapper so SVG map coords line up with pin percentages */}
        <div className="relative mx-auto h-full" style={{ aspectRatio: "100/110", maxWidth: "100%" }}>
          <svg viewBox="0 0 100 110" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
              <clipPath id="india-clip"><path d={INDIA_PATH} /></clipPath>
            </defs>
            <path d={INDIA_PATH} fill="rgba(250,162,25,0.09)" stroke="rgba(250,162,25,0.55)" strokeWidth="0.6" strokeLinejoin="round" />
            <g clipPath="url(#india-clip)">
              {[...Array(22)].map((_, r) =>
                [...Array(20)].map((_, c) => (
                  <circle key={`${r}-${c}`} cx={2.5 + c * 5} cy={2.5 + r * 5} r="0.32" fill="rgba(255,246,231,0.16)" />
                ))
              )}
            </g>
            {ORIGINS.map((org, i) => (
              <path
                key={org.name}
                d={`M${org.x},${org.y} Q${(org.x + HOME_NODE.x) / 2 + (i % 2 ? 5 : -5)},${(org.y + HOME_NODE.y) / 2 - 6} ${HOME_NODE.x},${HOME_NODE.y}`}
                stroke={i === active ? COLORS.mustard : "rgba(250,162,25,0.3)"}
                strokeWidth={i === active ? 0.7 : 0.4}
                strokeDasharray="1.6 1.6"
                fill="none"
              />
            ))}
            <circle cx={HOME_NODE.x} cy={HOME_NODE.y} r="2.2" fill={COLORS.mustard} />
            <circle cx={HOME_NODE.x} cy={HOME_NODE.y} r="3.8" fill="none" stroke={COLORS.mustard} strokeWidth="0.4" opacity="0.6" />
          </svg>
          {ORIGINS.map((org, i) => (
            <button
              key={org.name}
              onClick={() => setActive(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${org.x}%`, top: `${(org.y / 110) * 100}%`, width: i === active ? "20px" : "14px", height: i === active ? "20px" : "14px",
                background: org.base, border: `2.5px solid ${i === active ? COLORS.mustard : "rgba(255,246,231,0.6)"}`,
                boxShadow: i === active ? `0 0 18px ${tint(COLORS.mustard, 0.8)}` : "none", transition: "all 0.3s ease", cursor: "pointer",
              }}
              aria-label={`${org.name} — ${org.place}`}
            />
          ))}
        </div>
        <div className="absolute left-4 bottom-4 rs-body" style={{ fontSize: "0.7rem", color: "rgba(255,246,231,0.7)" }}>
          ● {HOME_NODE.name}, {HOME_NODE.place}
        </div>
        <div className="absolute right-4 top-4 rs-body" style={{ fontSize: "0.62rem", color: "rgba(255,246,231,0.45)" }}>
          Stylised map · not to scale
        </div>
      </div>
      <div className="md:col-span-2 flex flex-col gap-3">
        {ORIGINS.map((org, i) => (
          <button
            key={org.name}
            onClick={() => setActive(i)}
            className="text-left rounded-xl px-4 py-3 transition-all"
            style={{
              background: i === active ? COLORS.paper : "transparent",
              border: `1.5px solid ${i === active ? org.base : tint(COLORS.ink, 0.12)}`,
              boxShadow: i === active ? "0 10px 26px rgba(42,22,12,0.12)" : "none",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full shrink-0" style={{ background: org.base }} />
              <span className="rs-display" style={{ fontSize: "1.02rem", color: COLORS.ink, fontWeight: 600 }}>{org.name}</span>
              <span className="rs-body ml-auto" style={{ fontSize: "0.75rem", color: COLORS.inkDim }}>{org.place}</span>
            </div>
            {i === active && <p className="rs-body mt-2" style={{ fontSize: "0.85rem", color: COLORS.inkDim, lineHeight: 1.6 }}>{org.detail}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============ FAQ accordion ============ */
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid gap-3 mt-10 max-w-3xl mx-auto">
      {FAQS.map((f, i) => (
        <div key={i} className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}>
          <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="rs-body" style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 500 }}>{f.q}</span>
            <span style={{ color: COLORS.mustard }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <p className="rs-body px-5 pb-4" style={{ color: "rgba(255,246,231,0.85)", fontSize: "0.88rem", lineHeight: 1.7 }}>{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

/* ==================================================================== */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [availOpen, setAvailOpen] = useState(false);
  const [cuisine, setCuisine] = useState("All");
  const [intro, setIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return !sessionStorage.getItem("rs-intro-seen");
  });
  const closeIntro = () => { setIntro(false); try { sessionStorage.setItem("rs-intro-seen", "1"); } catch {} };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => (cuisine === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cuisine === cuisine)), [cuisine]);

  return (
    <div style={{ background: COLORS.cream, color: COLORS.ink }} className="min-h-screen w-full overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Work+Sans:wght@300;400;500;600&family=Barlow+Condensed:wght@500;600&display=swap');
        .rs-root, .rs-root * { box-sizing: border-box; }
        .rs-display { font-family: 'Fraunces', serif; letter-spacing: -0.01em; }
        .rs-body { font-family: 'Work Sans', sans-serif; }
        .rs-eyebrow { font-family: 'Barlow Condensed', sans-serif; text-transform: uppercase; letter-spacing: 0.28em; font-weight: 600; }
        .rs-btn { font-family: 'Barlow Condensed', sans-serif; text-transform: uppercase; letter-spacing: 0.14em; font-weight: 600; transition: transform 0.35s cubic-bezier(.22,.61,.36,1), box-shadow 0.35s ease, background 0.35s ease; display: inline-block; }
        .rs-btn:hover { transform: translateY(-2px); }
        .rs-btn:focus-visible, a:focus-visible, button:focus-visible { outline: 2px solid ${COLORS.red}; outline-offset: 3px; }
        .rs-marquee-track { display: flex; width: max-content; animation: rs-scroll 32s linear infinite; }
        @keyframes rs-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .rs-float-chip { animation: rs-bob 5s ease-in-out infinite; }
        @keyframes rs-bob { 0%,100% { transform: translateY(0) rotate(var(--r,0deg)); } 50% { transform: translateY(-10px) rotate(var(--r,0deg)); } }
        .rs-product-img { transition: transform 0.6s cubic-bezier(.22,.61,.36,1); }
        .rs-product-card:hover .rs-product-img { transform: scale(1.06); }
        .rs-nav-link { position: relative; }
        .rs-nav-link::after { content: ''; position: absolute; left: 0; right: 0; bottom: -4px; height: 2px; background: ${COLORS.red}; transform: scaleX(0); transform-origin: right; transition: transform 0.35s ease; }
        .rs-nav-link:hover::after { transform: scaleX(1); transform-origin: left; }
        @media (prefers-reduced-motion: reduce) { .rs-marquee-track, .rs-float-chip { animation: none; } }

        .rs-intro-logo { animation: rs-logo-in 0.9s cubic-bezier(.22,.61,.36,1) both; }
        @keyframes rs-logo-in { 0% { opacity: 0; transform: scale(0.6); } 60% { opacity: 1; transform: scale(1.06); } 100% { transform: scale(1); } }
        .rs-intro-tag { animation: rs-tag-in 0.7s ease 0.8s both; }
        @keyframes rs-tag-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .rs-spark { position: absolute; left: 50%; top: 42%; width: 7px; height: 7px; border-radius: 999px; opacity: 0; animation: rs-burst 1.1s cubic-bezier(.22,.61,.36,1) both; }
        @keyframes rs-burst {
          0% { opacity: 0; transform: rotate(var(--a)) translateX(0) scale(0.4); }
          25% { opacity: 1; }
          100% { opacity: 0; transform: rotate(var(--a)) translateX(var(--d)) scale(1); }
        }
        .rs-kenburns { transform: scale(1); }
        .rs-kb-active { animation: rs-kb 6.5s ease-out both; }
        @keyframes rs-kb { from { transform: scale(1.02); } to { transform: scale(1.14); } }
        @media (prefers-reduced-motion: reduce) { .rs-kb-active { animation: none; } }
      `}</style>

      <div className="rs-root">
        <GrainDefs />
        {intro && <IntroSplash onDone={closeIntro} />}
        <BulkInquiryModal open={bulkOpen} onClose={() => setBulkOpen(false)} />
        <AvailabilityModal open={availOpen} onClose={(next) => { setAvailOpen(false); if (next === "bulk") setBulkOpen(true); }} />

        {/* floating WhatsApp */}
        <a
          href={LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp us"
          className="fixed bottom-5 right-5 z-[80] flex items-center justify-center rounded-full"
          style={{ width: "54px", height: "54px", background: "#1FA855", boxShadow: "0 12px 30px rgba(0,0,0,0.3)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.6.1-.8l.4-.5c.1-.2.1-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.7a12 12 0 0 0 4.6 4.3c1.8.8 2.6.9 3.5.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0 0-.2-.1-.7-.1Z"/></svg>
        </a>

        {/* ===================== NAV ===================== */}
        <header className="fixed top-0 left-0 right-0 z-50" style={{
          background: scrolled ? "rgba(255,246,231,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? `2px solid ${COLORS.red}` : "1px solid transparent",
          transition: "all 0.4s ease",
        }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10" style={{ height: scrolled ? "64px" : "84px", transition: "height 0.4s ease" }}>
            <a href="#" className="flex items-center gap-2">
              <img src="/logo.png" alt="Rainbow Masala" style={{ height: scrolled ? "40px" : "48px", width: "auto", transition: "height 0.4s ease" }} />
            </a>
            <nav className="hidden lg:flex items-center gap-7 rs-body" style={{ fontSize: "0.92rem" }}>
              {NAV.map((item) => (
                <a key={item.label} href={item.href} className="rs-nav-link" style={{ color: COLORS.inkDim }}>{item.label}</a>
              ))}
            </nav>
            <div className="hidden lg:flex items-center gap-3">
              <a href={LINKS.erp} target="_blank" rel="noreferrer" className="rs-btn px-4 py-2 rounded-full" style={{ border: `2px solid ${tint(COLORS.ink, 0.25)}`, color: COLORS.inkDim, fontSize: "0.72rem" }}>
                Partner Login
              </a>
              <button onClick={() => setBulkOpen(true)} className="rs-btn px-5 py-2 rounded-full" style={{ background: COLORS.red, color: "#fff", fontSize: "0.75rem" }}>
                Bulk Enquiry
              </button>
            </div>
            <button className="lg:hidden" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu" style={{ color: COLORS.ink }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
          </div>
          {navOpen && (
            <div className="lg:hidden px-6 pb-6 flex flex-col gap-4 rs-body" style={{ background: COLORS.paper, color: COLORS.inkDim }}>
              {NAV.map((item) => (
                <a key={item.label} href={item.href} className="py-1" onClick={() => setNavOpen(false)}>{item.label}</a>
              ))}
              <button onClick={() => { setNavOpen(false); setBulkOpen(true); }} className="rs-btn px-5 py-2.5 rounded-full text-center" style={{ background: COLORS.red, color: "#fff", fontSize: "0.75rem" }}>Bulk Enquiry</button>
              <a href={LINKS.erp} target="_blank" rel="noreferrer" className="rs-btn px-5 py-2.5 rounded-full text-center" style={{ border: `2px solid ${tint(COLORS.ink, 0.25)}`, color: COLORS.inkDim, fontSize: "0.72rem" }}>Partner Login</a>
            </div>
          )}
        </header>

        {/* ===================== 1 · HERO AUTHORITY ===================== */}
        <section className="relative pt-32 md:pt-40 pb-14 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal><Eyebrow>Professional kitchen masala partner · since 1962</Eyebrow></Reveal>
              <Reveal delay={0.08}>
                <h1 className="rs-display mt-5" style={{ fontSize: "clamp(2.5rem, 5.6vw, 4.1rem)", lineHeight: 1.03, fontWeight: 600, color: COLORS.ink }}>
                  The same taste,<br />
                  <span style={{ fontStyle: "italic", color: COLORS.red, fontWeight: 500 }}>every batch.</span> Every branch.
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="rs-body mt-6 max-w-md" style={{ color: COLORS.inkDim, fontSize: "1.05rem", lineHeight: 1.7 }}>
                  Batch-coded, farm-traceable masalas built for hotels, restaurants and caterers — where consistency, cost per plate and supply matter more than anything printed on the pack.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button onClick={() => setBulkOpen(true)} className="rs-btn px-7 py-3.5 rounded-full" style={{ background: COLORS.red, color: "#fff", fontSize: "0.82rem" }}>
                    Bulk Enquiry
                  </button>
                  <a href="/catalogue.pdf" download className="rs-btn px-7 py-3.5 rounded-full" style={{ border: `2px solid ${COLORS.mustard}`, color: COLORS.ink, fontSize: "0.82rem" }}>
                    Download Catalogue
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {TRUST_COUNTERS.map((c) => (
                    <div key={c.label} style={{ borderTop: `2px solid ${COLORS.mustard}`, paddingTop: "0.7rem" }}>
                      <div className="rs-display" style={{ fontSize: "1.45rem", color: COLORS.red, fontWeight: 600 }}>{c.value}</div>
                      <div className="rs-eyebrow" style={{ fontSize: "0.58rem", color: COLORS.inkDim, marginTop: "0.3rem" }}>{c.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="relative rounded-3xl overflow-hidden" style={{ height: "min(62vw, 480px)", background: COLORS.ink, boxShadow: "0 30px 70px rgba(122,20,20,0.28)" }}>
              <KenBurns images={HERO_SLIDES} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${tint(COLORS.ink, 0.35)} 0%, transparent 42%, ${tint(COLORS.redDeep, 0.5)} 78%, ${tint(COLORS.ink, 0.92)} 100%)` }} />
              <div className="absolute bottom-4 left-4 flex items-center gap-2.5 px-4 py-2.5 rounded-full" style={{ background: "rgba(42,22,12,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,246,231,0.28)" }}>
                <span className="h-2 w-2 rounded-full" style={{ background: COLORS.mustard }} />
                <span className="rs-eyebrow" style={{ fontSize: "0.6rem", color: "#FFF6E7" }}>Cooked on Rainbow blends · batch-traceable</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== MARQUEE ===================== */}
        <div className="overflow-hidden py-5" style={{ background: COLORS.red }}>
          <div className="rs-marquee-track">
            {[...PRODUCTS.map((p) => p.name.toUpperCase()), ...PRODUCTS.map((p) => p.name.toUpperCase())].map((w, i) => (
              <span key={i} className="rs-display px-8" style={{ fontSize: "1.3rem", fontStyle: "italic", color: i % 2 ? COLORS.mustard : "#fff", whiteSpace: "nowrap" }}>
                {w} <span style={{ color: COLORS.mustard, fontStyle: "normal", marginLeft: "2rem" }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ===================== 2 · PRODUCT POWER ===================== */}
        <section id="products" className="px-6 md:px-10 py-24 md:py-28 max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <Eyebrow>Product power</Eyebrow>
                <H2>Built for the pass, priced for the plate.</H2>
              </div>
              <div className="flex flex-wrap gap-2">
                {CUISINES.map((c) => (
                  <button key={c} onClick={() => setCuisine(c)} className="rs-btn px-4 py-2 rounded-full" style={{
                    fontSize: "0.68rem",
                    background: cuisine === c ? COLORS.red : "transparent",
                    color: cuisine === c ? "#fff" : COLORS.inkDim,
                    border: `1.5px solid ${cuisine === c ? COLORS.red : tint(COLORS.ink, 0.2)}`,
                  }}>{c}</button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Reveal className="sm:col-span-2 lg:col-span-1 lg:row-span-2"><CostPerPlate /></Reveal>
            {filtered.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) * 0.05}>
                <TiltCard className="rs-product-card rounded-2xl overflow-hidden h-full">
                  <div style={{ background: COLORS.paper, border: `1px solid ${tint(p.base, 0.4)}` }} className="rounded-2xl overflow-hidden h-full flex flex-col">
                    <div className="overflow-hidden relative" style={{ aspectRatio: "4/3", background: tint(p.base, 0.12) }}>
                      {p.img ? (
                        <img src={p.img} alt={p.name} className="rs-product-img" style={{ position: "absolute", inset: "6%", width: "88%", height: "88%", objectFit: "contain", filter: "drop-shadow(0 10px 18px rgba(42,22,12,0.25))" }} />
                      ) : (
                        <div className="rs-product-img" style={{ position: "absolute", inset: "4%" }}>
                          <SpiceMound id={`product-${p.name.replace(/\s/g, "")}`} base={p.base} deep={p.deep} variant={i % 3} threads={!!p.threads} />
                        </div>
                      )}
                      <span className="rs-eyebrow absolute top-3 left-3 px-2.5 py-1 rounded-full" style={{ fontSize: "0.52rem", background: tint(p.deep, 0.9), color: "#fff" }}>{p.cuisine}</span>
                    </div>
                    <div className="p-4 pt-3 flex flex-col gap-1.5 grow">
                      <h3 className="rs-display" style={{ fontSize: "1.05rem", color: COLORS.ink, fontWeight: 600 }}>{p.name}</h3>
                      <p className="rs-body" style={{ fontSize: "0.78rem", color: COLORS.inkDim }}>{p.note}</p>
                      <div className="rs-body mt-auto pt-2 grid grid-cols-2 gap-x-3 gap-y-1" style={{ fontSize: "0.72rem", color: COLORS.inkDim, borderTop: `1px dashed ${tint(p.base, 0.4)}` }}>
                        <span>Packs: <b style={{ color: COLORS.ink }}>{p.packs}</b></span>
                        <span>Shelf: <b style={{ color: COLORS.ink }}>{p.shelf}</b></span>
                        {p.yieldPerKg && <span className="col-span-2">Yield: <b style={{ color: COLORS.red }}>1kg ≈ {p.yieldPerKg} plates</b></span>}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===================== 3 · SOURCING TRANSPARENCY ===================== */}
        <section id="sourcing" className="px-6 md:px-10 py-24 md:py-28" style={{ background: tint(COLORS.mustard, 0.1) }}>
          <div className="max-w-7xl mx-auto">
            <Reveal><Eyebrow center>Sourcing transparency</Eyebrow></Reveal>
            <Reveal delay={0.06}><H2 center>Six origins. One blending house. Nothing hidden.</H2></Reveal>
            <Reveal delay={0.12}>
              <p className="rs-body text-center mt-5 max-w-xl mx-auto" style={{ color: COLORS.inkDim, lineHeight: 1.7 }}>
                Every raw lot arrives with a farm region, a mandi record and a lab check — and every finished pack carries a batch code that traces back to them.
              </p>
            </Reveal>
            <SourcingMap />
          </div>
        </section>

        {/* ===================== 7 · TESTIMONIALS (proof before ask) ===================== */}
        <section className="px-6 md:px-10 py-24 md:py-28 max-w-7xl mx-auto">
          <Reveal><Eyebrow center>Chef-verified</Eyebrow></Reveal>
          <Reveal delay={0.06}><H2 center>Kitchens that measured us, then stayed.</H2></Reveal>
          <div className="grid md:grid-cols-3 gap-7 mt-14">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <TiltCard className="rounded-2xl overflow-hidden h-full">
                  <div className="rounded-2xl h-full flex flex-col" style={{ background: COLORS.paper, border: `1px solid ${tint(COLORS.ink, 0.1)}` }}>
                    <div className="relative flex items-center justify-center" style={{ aspectRatio: "16/9", background: `radial-gradient(ellipse at 50% 40%, ${t.accent}, ${COLORS.ink} 90%)`, borderRadius: "1rem 1rem 0 0" }}>
                      <span className="flex items-center justify-center rounded-full" style={{ width: "56px", height: "56px", background: "rgba(255,246,231,0.92)" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.red}><path d="M8 5v14l11-7z"/></svg>
                      </span>
                      <span className="rs-eyebrow absolute bottom-3 right-4" style={{ fontSize: "0.55rem", color: "rgba(255,246,231,0.85)" }}>Video · 1:20</span>
                    </div>
                    <div className="p-5 flex flex-col gap-3 grow">
                      <p className="rs-display" style={{ fontSize: "1.05rem", color: COLORS.ink, fontStyle: "italic", lineHeight: 1.5 }}>&ldquo;{t.quote}&rdquo;</p>
                      <div className="mt-auto pt-3" style={{ borderTop: `2px solid ${t.accent}` }}>
                        <p className="rs-body" style={{ fontWeight: 600, fontSize: "0.9rem", color: COLORS.ink }}>{t.name}</p>
                        <p className="rs-body" style={{ fontSize: "0.78rem", color: COLORS.inkDim }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===================== 5 · DISTRIBUTOR / FRANCHISE ===================== */}
        <section id="distributors" className="relative px-6 md:px-10 py-24 md:py-32 overflow-hidden" style={{ background: `radial-gradient(ellipse at 50% 20%, ${COLORS.redDeep}, ${COLORS.ink} 80%)` }}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal><p className="rs-eyebrow" style={{ color: COLORS.mustard, fontSize: "0.8rem" }}>Distributor & franchise</p></Reveal>
              <Reveal delay={0.08}>
                <h2 className="rs-display mt-4" style={{ fontSize: "clamp(2rem, 4vw, 2.9rem)", color: "#fff", fontWeight: 600 }}>
                  Own a territory that<br /><span style={{ fontStyle: "italic", color: COLORS.mustard, fontWeight: 500 }}>reorders itself.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 grid grid-cols-3 gap-5">
                  {[
                    { label: "Investment", value: DISTRIBUTOR.investment },
                    { label: "ROI horizon", value: DISTRIBUTOR.roi },
                    { label: "Trade margin", value: DISTRIBUTOR.margin },
                  ].map((s) => (
                    <div key={s.label} style={{ borderTop: `2px solid ${COLORS.mustard}`, paddingTop: "0.8rem" }}>
                      <div className="rs-display" style={{ fontSize: "1.3rem", color: COLORS.mustard, fontWeight: 600 }}>{s.value}</div>
                      <div className="rs-eyebrow" style={{ fontSize: "0.58rem", color: "rgba(255,246,231,0.7)", marginTop: "0.3rem" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <ul className="rs-body mt-8 grid gap-2.5" style={{ color: "rgba(255,246,231,0.88)", fontSize: "0.95rem" }}>
                  {DISTRIBUTOR.support.map((s) => (
                    <li key={s} className="flex items-center gap-3"><span style={{ color: COLORS.mustard }}>✦</span>{s}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <div className="rounded-2xl p-7 md:p-8" style={{ background: "rgba(255,246,231,0.06)", border: "1px solid rgba(255,246,231,0.22)", backdropFilter: "blur(6px)" }}>
                <p className="rs-eyebrow" style={{ fontSize: "0.65rem", color: COLORS.mustard }}>Territories open now</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {DISTRIBUTOR.territories.map((t) => (
                    <span key={t} className="rs-body px-4 py-2 rounded-full" style={{ background: "rgba(255,246,231,0.1)", border: "1px solid rgba(255,246,231,0.3)", color: "#fff", fontSize: "0.85rem" }}>{t}</span>
                  ))}
                </div>
                <p className="rs-body mt-6" style={{ color: "rgba(255,246,231,0.8)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  Send your city and current distribution lines — we reply with the territory brief, price structure and first-stock plan.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={`${LINKS.whatsapp}?text=${encodeURIComponent("Distributor enquiry — Rainbow Masala.\nCity/Territory: \nCurrent lines: \nName: ")}`} target="_blank" rel="noreferrer" className="rs-btn px-6 py-3 rounded-full" style={{ background: COLORS.mustard, color: COLORS.ink, fontSize: "0.78rem" }}>
                    Apply on WhatsApp
                  </a>
                  <a href={`mailto:${LINKS.email}?subject=Distributor enquiry`} className="rs-btn px-6 py-3 rounded-full" style={{ border: "2px solid rgba(255,246,231,0.5)", color: "#fff", fontSize: "0.78rem" }}>
                    Email us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================== 6 · FOUNDER TRUST ===================== */}
        <section id="story" className="px-6 md:px-10 py-24 md:py-28 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden flex items-center justify-center" style={{ aspectRatio: "4/5", background: `radial-gradient(ellipse at 40% 30%, ${COLORS.paprika}, ${COLORS.ink} 90%)` }}>
                <span className="flex items-center justify-center rounded-full" style={{ width: "72px", height: "72px", background: "rgba(255,246,231,0.92)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill={COLORS.red}><path d="M8 5v14l11-7z"/></svg>
                </span>
                <p className="rs-eyebrow absolute bottom-5 left-5" style={{ fontSize: "0.6rem", color: "rgba(255,246,231,0.85)" }}>Founder film · 2:40 (placeholder)</p>
              </div>
            </Reveal>
            <div>
              <Reveal><Eyebrow>The people behind the pack</Eyebrow></Reveal>
              <Reveal delay={0.08}><H2>Three generations, one standard.</H2></Reveal>
              <div className="mt-9">
                {TIMELINE.map((t, i) => (
                  <Reveal key={t.year} delay={0.12 + i * 0.06}>
                    <div className="flex gap-5 pb-6 relative">
                      <div className="flex flex-col items-center">
                        <span className="h-3 w-3 rounded-full shrink-0 mt-1.5" style={{ background: COLORS.red }} />
                        {i < TIMELINE.length - 1 && <span className="w-0.5 grow" style={{ background: tint(COLORS.red, 0.25) }} />}
                      </div>
                      <div>
                        <span className="rs-display" style={{ fontSize: "1.1rem", color: COLORS.red, fontWeight: 600 }}>{t.year}</span>
                        <p className="rs-body mt-0.5" style={{ color: COLORS.inkDim, fontSize: "0.95rem" }}>{t.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 4 · RECIPE ENGINE ===================== */}
        <section id="recipes" className="px-6 md:px-10 py-24 md:py-28" style={{ background: tint(COLORS.mustard, 0.1) }}>
          <div className="max-w-7xl mx-auto">
            <Reveal><Eyebrow center>Recipe engine</Eyebrow></Reveal>
            <Reveal delay={0.06}><H2 center>Restaurant-scale recipes, not home portions.</H2></Reveal>
            <div className="grid md:grid-cols-3 gap-8 mt-14">
              {RECIPES.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.1}>
                  <TiltCard className="rounded-2xl overflow-hidden group">
                    <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5", background: tint(r.base, 0.18) }}>
                      {r.img ? (
                        <img src={r.img} alt={r.name} className="rs-product-img" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div className="rs-product-img" style={{ position: "absolute", inset: "-10%" }}>
                          <SpiceMound id={`recipe-${i}`} base={r.base} deep={r.deep} variant={i} showFlecks={false} />
                        </div>
                      )}
                      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 25%, ${tint(r.deep, 0.94)} 90%)` }} />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="rs-display" style={{ fontSize: "1.35rem", color: "#fff", fontStyle: "italic" }}>{r.name}</h3>
                        <p className="rs-body mt-2" style={{ fontSize: "0.8rem", color: "rgba(255,246,231,0.9)" }}>{r.batch} · {r.time}</p>
                        <p className="rs-body" style={{ fontSize: "0.75rem", color: COLORS.mustard }}>{r.uses}</p>
                        <p className="rs-eyebrow mt-3" style={{ fontSize: "0.64rem", color: COLORS.mustard }}>View recipe →</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4 rs-body" style={{ fontSize: "0.88rem" }}>
                <span style={{ color: COLORS.inkDim }}>Follow the kitchen:</span>
                <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="rs-btn px-5 py-2.5 rounded-full" style={{ border: `2px solid ${COLORS.red}`, color: COLORS.red, fontSize: "0.72rem" }}>Instagram</a>
                <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" className="rs-btn px-5 py-2.5 rounded-full" style={{ border: "2px solid #1FA855", color: "#1FA855", fontSize: "0.72rem" }}>WhatsApp channel</a>
                <span style={{ color: COLORS.inkDim }}>Retail packs:</span>
                {[["Amazon", LINKS.amazon], ["Flipkart", LINKS.flipkart], ["IndiaMART", LINKS.indiamart]].map(([n, url]) => (
                  <a key={n} href={url} target="_blank" rel="noreferrer" className="underline" style={{ color: COLORS.red }}>{n}</a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================== 8 · AVAILABILITY BAND ===================== */}
        <section className="px-6 md:px-10 py-16" style={{ background: COLORS.paper }}>
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
            <div>
              <Eyebrow>Availability</Eyebrow>
              <h3 className="rs-display mt-2" style={{ fontSize: "1.6rem", color: COLORS.ink, fontWeight: 600 }}>Where can you buy Rainbow?</h3>
            </div>
            <button onClick={() => setAvailOpen(true)} className="rs-btn px-7 py-3.5 rounded-full" style={{ background: COLORS.red, color: "#fff", fontSize: "0.8rem" }}>
              Find your channel
            </button>
          </div>
        </section>

        {/* ===================== 9 · CONTACT & ECOSYSTEM ===================== */}
        <footer id="contact" className="px-6 md:px-10 pt-24 pb-10" style={{ background: COLORS.red, color: "#fff" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="grid md:grid-cols-2 gap-10 items-end pb-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.25)" }}>
                <div>
                  <h2 className="rs-display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 600 }}>
                    Talk to a <span style={{ fontStyle: "italic", color: COLORS.mustard }}>masala partner.</span>
                  </h2>
                  <p className="rs-body mt-4 max-w-md" style={{ color: "rgba(255,255,255,0.85)" }}>
                    Darak Foods Pvt. Ltd. · 14, Pranav Plaza, Aurangpura, Chh. Sambhajinagar, 431001, Maharashtra, India
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:items-end">
                  <a href={`tel:${LINKS.phone}`} className="rs-display" style={{ color: "#fff", fontSize: "1.4rem" }}>{LINKS.phoneDisplay}</a>
                  <a href={`mailto:${LINKS.email}`} className="rs-body" style={{ color: "rgba(255,255,255,0.85)" }}>{LINKS.email}</a>
                  <div className="flex gap-3 mt-2">
                    <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" className="rs-btn px-6 py-3 rounded-full" style={{ background: COLORS.mustard, color: COLORS.ink, fontSize: "0.78rem" }}>WhatsApp</a>
                    <button onClick={() => setBulkOpen(true)} className="rs-btn px-6 py-3 rounded-full" style={{ border: "2px solid rgba(255,255,255,0.6)", color: "#fff", fontSize: "0.78rem" }}>Bulk Enquiry</button>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="py-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.25)" }}>
              <p className="rs-eyebrow text-center" style={{ fontSize: "0.7rem", color: COLORS.mustard }}>Questions professional kitchens ask</p>
              <FAQ />
            </div>

            <Reveal>
              <div className="py-10 grid md:grid-cols-2 gap-8 items-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.25)" }}>
                <div>
                  <p className="rs-display" style={{ fontSize: "1.3rem", fontWeight: 600 }}>Menu-costing ideas, monthly.</p>
                  <p className="rs-body mt-1" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}>One email a month on standardisation, yields and food-cost control. No spam.</p>
                </div>
                <form className="flex gap-3" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll add you to the list."); }}>
                  <input type="email" required placeholder="kitchen@yourhotel.com" className="rs-body grow rounded-full px-5 py-3" style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: "0.9rem" }} />
                  <button type="submit" className="rs-btn px-6 py-3 rounded-full" style={{ background: COLORS.mustard, color: COLORS.ink, fontSize: "0.75rem" }}>Subscribe</button>
                </form>
              </div>
            </Reveal>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-8 rs-body" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem" }}>
              <span>© 2026 Rainbow Masala · Darak Foods Pvt. Ltd. · FSSAI licensed</span>
              <div className="flex flex-wrap gap-5">
                {["Facebook", "LinkedIn", "Instagram", "YouTube"].map((s) => (
                  <a key={s} href="#" style={{ color: "rgba(255,255,255,0.75)" }}>{s}</a>
                ))}
                <a href={LINKS.erp} target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.75)" }}>Partner Login</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)" }}>Privacy</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)" }}>Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
