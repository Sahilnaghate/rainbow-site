"use client";
import { Reveal } from "./ui.jsx";
import { Eyebrow, H2 } from "./shell.jsx";
import { COLORS, tint } from "../lib/theme.js";

const STEPS = [
  { n: "01", title: "Source", text: "Raw lots bought at origin mandis — Guntur chilli, Sangli turmeric, Unjha cumin, Idukki pepper — each with a farm region and mandi record." },
  { n: "02", title: "Clean & lab-check", text: "Every lot is machine-cleaned, then lab-checked for moisture, colour value and adulterants before it enters the store." },
  { n: "03", title: "Blend", text: "Recipes are locked in a confidential formula vault. Batches are weighed, ground and blended to the gram — not to a taster's mood." },
  { n: "04", title: "Batch-code & pack", text: "Every pack carries a batch code that traces back to the raw lots inside it. Packed with resealable liners for kitchen life." },
];

export function StoryManufacturing() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-28" style={{ background: tint(COLORS.mustard, 0.1) }}>
      <div className="max-w-7xl mx-auto">
        <Reveal><Eyebrow center>Manufacturing</Eyebrow></Reveal>
        <Reveal delay={0.06}><H2 center>How a Rainbow batch is made.</H2></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="rounded-2xl p-6 h-full" style={{ background: COLORS.paper, border: `1px solid ${tint(COLORS.ink, 0.1)}` }}>
                <div className="rs-display" style={{ fontSize: "2rem", color: tint(COLORS.red, 0.35), fontWeight: 600 }}>{s.n}</div>
                <h3 className="rs-display mt-2" style={{ fontSize: "1.2rem", color: COLORS.ink, fontWeight: 600 }}>{s.title}</h3>
                <p className="rs-body mt-3" style={{ color: COLORS.inkDim, fontSize: "0.9rem", lineHeight: 1.7 }}>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className="rs-body text-center mt-10" style={{ color: COLORS.inkDim, fontSize: "0.85rem" }}>
            Facility photographs and plant-walkthrough film to be added with the client&apos;s media pack.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
