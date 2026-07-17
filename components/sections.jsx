"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { COLORS, tint, LINKS } from "../lib/theme.js";
import { Reveal, TiltCard, SpiceMound, KenBurns } from "./ui.jsx";
import { useShell, Eyebrow, H2, Field } from "./shell.jsx";
import { CATEGORIES, CUISINES, PRODUCTS, RECIPES, TIMELINE, DISTRIBUTOR, HORECA_SOLUTIONS } from "../lib/data.js";
import { useCounters, useTestimonials } from "../lib/cms.js";

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
const HERO_SLIDES = ["/images/hero/garam-masal.jpg", "/images/hero/kitchenking-masala.jpg", "/images/hero/chat-masala.jpg"];

/* ---------- page hero for subpages ---------- */
export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="pt-32 md:pt-40 pb-10 px-6 md:px-10 max-w-7xl mx-auto">
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <Reveal delay={0.08}>
        <h1 className="rs-display mt-4" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)", lineHeight: 1.05, fontWeight: 600, color: COLORS.ink }}>{title}</h1>
      </Reveal>
      {children && <Reveal delay={0.16}><p className="rs-body mt-5 max-w-2xl" style={{ color: COLORS.inkDim, fontSize: "1.05rem", lineHeight: 1.7 }}>{children}</p></Reveal>}
    </section>
  );
}

/* ---------- homepage hero ---------- */
export function Hero() {
  const { openBulk } = useShell();
  const counters = useCounters();
  return (
    <section className="relative pt-32 md:pt-40 pb-14 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Reveal><Eyebrow>Professional kitchen masala partner · since 1956</Eyebrow></Reveal>
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
              <button onClick={openBulk} className="rs-btn px-7 py-3.5 rounded-full" style={{ background: COLORS.red, color: "#fff", fontSize: "0.82rem" }}>Bulk Enquiry</button>
              <a href="/catalogue.pdf" download className="rs-btn px-7 py-3.5 rounded-full" style={{ border: `2px solid ${COLORS.mustard}`, color: COLORS.ink, fontSize: "0.82rem" }}>Download Catalogue</a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {counters.map((c) => (
                <div key={c.label} style={{ borderTop: `2px solid ${COLORS.mustard}`, paddingTop: "0.7rem" }}>
                  <div className="rs-display" style={{ fontSize: "1.45rem", color: COLORS.red, fontWeight: 600 }}>{c.value}</div>
                  <div className="rs-eyebrow" style={{ fontSize: "0.58rem", color: COLORS.inkDim, marginTop: "0.3rem" }}>{c.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="relative rounded-3xl overflow-hidden" style={{ height: "min(62vw, 480px)", background: COLORS.ink, boxShadow: "0 30px 70px rgba(142,27,29,0.28)" }}>
          <KenBurns images={HERO_SLIDES} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${tint(COLORS.ink, 0.35)} 0%, transparent 42%, ${tint(COLORS.redDeep, 0.5)} 78%, ${tint(COLORS.ink, 0.92)} 100%)` }} />
          <div className="absolute bottom-4 left-4 flex items-center gap-2.5 px-4 py-2.5 rounded-full" style={{ background: "rgba(42,22,12,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,246,231,0.28)" }}>
            <span className="h-2 w-2 rounded-full" style={{ background: COLORS.mustard }} />
            <span className="rs-eyebrow" style={{ fontSize: "0.6rem", color: "#FFF6E7" }}>Cooked on Rainbow blends · batch-traceable</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden py-5" style={{ background: COLORS.redDeep }}>
      <div className="rs-marquee-track">
        {[...PRODUCTS.map((p) => p.name.toUpperCase()), ...PRODUCTS.map((p) => p.name.toUpperCase())].map((w, i) => (
          <span key={i} className="rs-display px-8" style={{ fontSize: "1.35rem", fontStyle: "italic", color: "#fff", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
            {w} <span style={{ color: "rgba(255,255,255,0.7)", fontStyle: "normal", marginLeft: "2rem" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- cost-per-plate widget ---------- */
export function CostPerPlate() {
  // Client feedback: no ₹ pricing on the site (rates move seasonally) — yield-only guide.
  const usable = PRODUCTS.filter((p) => p.yieldPerKg);
  const [idx, setIdx] = useState(0);
  const p = usable[idx];
  return (
    <TiltCard className="rounded-2xl overflow-hidden h-full">
      <div className="rounded-2xl p-6 md:p-7 h-full flex flex-col" style={{ background: `radial-gradient(ellipse at 30% 0%, ${COLORS.redDeep}, ${COLORS.ink} 80%)`, color: "#fff" }}>
        <p className="rs-eyebrow" style={{ fontSize: "0.68rem", color: COLORS.mustard }}>Yield guide</p>
        <h3 className="rs-display mt-2" style={{ fontSize: "1.45rem", fontWeight: 600 }}>How far one kilo goes.</h3>
        <div className="mt-5 grid gap-3">
          <label className="block">
            <span className="rs-eyebrow" style={{ fontSize: "0.58rem", color: "rgba(255,246,231,0.7)" }}>Blend</span>
            <select value={idx} onChange={(e) => { const i = Number(e.target.value); setIdx(i); setPrice(usable[i].pricePerKg); }}
              className="rs-body mt-1 w-full rounded-lg px-3 py-2.5" style={{ background: "rgba(255,246,231,0.12)", border: "1px solid rgba(255,246,231,0.3)", color: "#fff", fontSize: "0.92rem" }}>
              {usable.map((u, i) => <option key={u.name} value={i} style={{ color: COLORS.ink }}>{u.name}</option>)}
            </select>
          </label>

        </div>
        <div className="mt-6 flex items-end justify-between gap-4 pt-5" style={{ borderTop: "1px solid rgba(255,246,231,0.25)" }}>
          <div>
            <p className="rs-eyebrow" style={{ fontSize: "0.58rem", color: "rgba(255,246,231,0.7)" }}>Indicative yield</p>
            <p className="rs-display mt-1" style={{ fontSize: "2.2rem", color: COLORS.mustard, fontWeight: 600 }}>
              1kg ≈ {p.yieldPerKg}
              <span className="rs-body" style={{ fontSize: "0.9rem", color: "rgba(255,246,231,0.8)" }}> plates</span>
            </p>
          </div>
          <p className="rs-body text-right" style={{ fontSize: "0.72rem", color: "rgba(255,246,231,0.65)", maxWidth: "130px" }}>Validated per recipe with your chef. Trade rates on enquiry.</p>
        </div>
      </div>
    </TiltCard>
  );
}

/* ---------- product grid (featured or full w/ filters) ---------- */
export function ProductsSection({ featured = false }) {
  const { setZoom } = useShell();
  const [category, setCategory] = useState("All");
  const [cuisine, setCuisine] = useState("All");
  const list = useMemo(() => {
    let l = PRODUCTS;
    if (category !== "All") l = l.filter((p) => p.category === category);
    if (cuisine !== "All") l = l.filter((p) => p.cuisine === cuisine);
    return featured ? l.slice(0, 7) : l;
  }, [category, cuisine, featured]);

  return (
    <section id="products" className="px-6 md:px-10 py-24 md:py-28 max-w-7xl mx-auto">
      <Reveal>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <Eyebrow>Product power</Eyebrow>
            <H2>Built for the pass, priced for the plate.</H2>
          </div>
          {!featured && (
            <div className="flex flex-col gap-2 items-end">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button key={c} onClick={() => setCategory(c)} className="rs-btn px-4 py-2 rounded-full" style={{ fontSize: "0.68rem", background: category === c ? COLORS.red : "transparent", color: category === c ? "#fff" : COLORS.inkDim, border: `1.5px solid ${category === c ? COLORS.red : tint(COLORS.ink, 0.2)}` }}>{c}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {CUISINES.map((c) => (
                  <button key={c} onClick={() => setCuisine(c)} className="rs-btn px-3 py-1.5 rounded-full" style={{ fontSize: "0.6rem", background: cuisine === c ? tint(COLORS.mustard, 0.25) : "transparent", color: COLORS.inkDim, border: `1.5px solid ${cuisine === c ? COLORS.mustard : tint(COLORS.ink, 0.15)}` }}>{c}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <Reveal className="sm:col-span-2 lg:col-span-1 lg:row-span-2"><CostPerPlate /></Reveal>
        {list.map((p, i) => (
          <Reveal key={p.name} delay={(i % 4) * 0.05}>
            <TiltCard className="rs-product-card rounded-2xl overflow-hidden h-full">
              <div style={{ background: COLORS.paper, border: `1px solid ${tint(p.base, 0.4)}` }} className="rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="overflow-hidden relative" style={{ aspectRatio: "4/3", background: tint(p.base, 0.12), cursor: p.img ? "zoom-in" : "default" }} onClick={() => p.img && setZoom({ img: p.img, name: p.name })}>
                  {p.img ? (
                    <img src={p.img} alt={p.name} className="rs-product-img" style={{ position: "absolute", inset: "6%", width: "88%", height: "88%", objectFit: "contain", filter: "drop-shadow(0 10px 18px rgba(42,22,12,0.25))" }} />
                  ) : (
                    <div className="rs-product-img" style={{ position: "absolute", inset: "4%" }}>
                      <SpiceMound id={`product-${p.name.replace(/\W/g, "")}`} base={p.base} deep={p.deep} variant={i % 3} threads={!!p.threads} />
                    </div>
                  )}
                  <span className="rs-eyebrow absolute top-3 left-3 px-2.5 py-1 rounded-full" style={{ fontSize: "0.52rem", background: tint(p.deep, 0.9), color: "#fff" }}>{p.category}</span>
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

      {featured && (
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link href="/products" className="rs-btn px-7 py-3.5 rounded-full" style={{ border: `2px solid ${COLORS.red}`, color: COLORS.red, fontSize: "0.8rem" }}>
              View the full range →
            </Link>
          </div>
        </Reveal>
      )}
    </section>
  );
}

/* ---------- distributor ---------- */
export function DistributorSection() {
  return (
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
              {[{ label: "Investment", value: DISTRIBUTOR.investment }, { label: "ROI horizon", value: DISTRIBUTOR.roi }, { label: "Trade margin", value: DISTRIBUTOR.margin }].map((s) => (
                <div key={s.label} style={{ borderTop: `2px solid ${COLORS.mustard}`, paddingTop: "0.8rem" }}>
                  <div className="rs-display" style={{ fontSize: "1.3rem", color: COLORS.mustard, fontWeight: 600 }}>{s.value}</div>
                  <div className="rs-eyebrow" style={{ fontSize: "0.58rem", color: "rgba(255,246,231,0.7)", marginTop: "0.3rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <ul className="rs-body mt-8 grid gap-2.5" style={{ color: "rgba(255,246,231,0.88)", fontSize: "0.95rem" }}>
              {DISTRIBUTOR.support.map((s) => <li key={s} className="flex items-center gap-3"><span style={{ color: COLORS.mustard }}>✦</span>{s}</li>)}
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
              <a href={`${LINKS.whatsapp}?text=${encodeURIComponent("Distributor enquiry — Rainbow Masala.\nCity/Territory: \nCurrent lines: \nName: ")}`} target="_blank" rel="noreferrer" className="rs-btn px-6 py-3 rounded-full" style={{ background: COLORS.mustard, color: COLORS.ink, fontSize: "0.78rem" }}>Apply on WhatsApp</a>
              <a href={`mailto:${LINKS.email}?subject=Distributor enquiry`} className="rs-btn px-6 py-3 rounded-full" style={{ border: "2px solid rgba(255,246,231,0.5)", color: "#fff", fontSize: "0.78rem" }}>Email us</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- founder / story ---------- */
export function FounderSection() {
  return (
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
  );
}

/* ---------- testimonials ---------- */
export function TestimonialsSection() {
  const testimonials = useTestimonials();
  return (
    <section className="px-6 md:px-10 py-24 md:py-28 max-w-7xl mx-auto">
      <Reveal><Eyebrow center>Chef-verified</Eyebrow></Reveal>
      <Reveal delay={0.06}><H2 center>Kitchens that measured us, then stayed.</H2></Reveal>
      <div className="grid md:grid-cols-3 gap-7 mt-14">
        {testimonials.map((t, i) => (
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
  );
}

/* ---------- export ---------- */
export function ExportForm() {
  const [f, setF] = useState({ company: "", country: "", products: "", volume: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const msg = encodeURIComponent(`Export enquiry — Rainbow Masala\nCompany: ${f.company}\nCountry: ${f.country}\nProducts: ${f.products}\nMonthly volume: ${f.volume}`);
  return (
    <div className="rounded-2xl p-7 md:p-8" style={{ background: COLORS.paper, border: `1px solid ${tint(COLORS.ink, 0.12)}`, boxShadow: "0 20px 50px rgba(42,22,12,0.10)" }}>
      <p className="rs-eyebrow" style={{ fontSize: "0.65rem", color: COLORS.red }}>Export lead form</p>
      <div className="mt-4 grid gap-3">
        <Field label="Company" value={f.company} onChange={set("company")} placeholder="Importer / distributor name" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Country" value={f.country} onChange={set("country")} placeholder="UAE, UK, USA…" />
          <Field label="Monthly volume" value={f.volume} onChange={set("volume")} placeholder="e.g. 2 tonnes" />
        </div>
        <Field label="Products of interest" value={f.products} onChange={set("products")} placeholder="Garam masala, sambhar masala…" />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`${LINKS.whatsapp}?text=${msg}`} target="_blank" rel="noreferrer" className="rs-btn px-6 py-3 rounded-full" style={{ background: "#1FA855", color: "#fff", fontSize: "0.78rem" }}>Send on WhatsApp</a>
        <a href={`mailto:${LINKS.email}?subject=Export enquiry&body=${msg}`} className="rs-btn px-6 py-3 rounded-full" style={{ border: `2px solid ${COLORS.red}`, color: COLORS.red, fontSize: "0.78rem" }}>Send by Email</a>
      </div>
      <p className="rs-body mt-4" style={{ fontSize: "0.75rem", color: COLORS.inkDim }}>Export desk replies within two working days with pricing, MOQs and documentation checklist.</p>
    </div>
  );
}

export function ExportSection() {
  return (
    <section id="export" className="px-6 md:px-10 py-24 md:py-28" style={{ background: tint(COLORS.mustard, 0.1) }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal><Eyebrow>Export enquiries</Eyebrow></Reveal>
          <Reveal delay={0.08}><H2>Rainbow, beyond India.</H2></Reveal>
          <Reveal delay={0.16}>
            <p className="rs-body mt-6 max-w-md" style={{ color: COLORS.inkDim, fontSize: "1.02rem", lineHeight: 1.75 }}>
              Branded and private-label masalas for importers, ethnic-food distributors and food-service groups. FSSAI-licensed facility, per-batch lab COA, export documentation and FOB/CIF support from Mumbai port.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <ul className="rs-body mt-7 grid gap-2.5" style={{ color: COLORS.inkDim, fontSize: "0.95rem" }}>
              {["Private-label & contract blending", "Per-batch lab COA + traceability", "Retail packs and 25kg bulk", "Export documentation handled end-to-end"].map((s) => (
                <li key={s} className="flex items-center gap-3"><span style={{ color: COLORS.red }}>✦</span>{s}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.15}><ExportForm /></Reveal>
      </div>
    </section>
  );
}

/* ---------- recipes (content play) ---------- */
export function RecipesSection() {
  return (
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
  );
}

/* ---------- availability band ---------- */
export function AvailabilityBand() {
  const { openAvail } = useShell();
  return (
    <section className="px-6 md:px-10 py-16" style={{ background: COLORS.paper }}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
        <div>
          <Eyebrow>Availability</Eyebrow>
          <h3 className="rs-display mt-2" style={{ fontSize: "1.6rem", color: COLORS.ink, fontWeight: 600 }}>Where can you buy Rainbow?</h3>
        </div>
        <button onClick={openAvail} className="rs-btn px-7 py-3.5 rounded-full" style={{ background: COLORS.red, color: "#fff", fontSize: "0.8rem" }}>Find your channel</button>
      </div>
    </section>
  );
}
