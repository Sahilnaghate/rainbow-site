"use client";
import { PageHero, TestimonialsSection, CostPerPlate } from "../../components/sections.jsx";
import { Reveal, TiltCard, VideoBand } from "../../components/ui.jsx";
import { useShell, Eyebrow, H2 } from "../../components/shell.jsx";
import { COLORS, tint } from "../../lib/theme.js";
import { HORECA_SOLUTIONS } from "../../lib/data.js";

export default function HorecaPage() {
  const { openBulk } = useShell();
  return (
    <main>
      <PageHero eyebrow="HORECA solutions" title="Built for hotels, restaurants and caterers.">
        Three supply formats, one standard: the same batch-coded taste whether you run a 40-cover restaurant or a 4,000-plate banquet calendar.
      </PageHero>
      <section className="px-6 md:px-10 pb-24 max-w-7xl mx-auto">
        <div className="pb-12">
          <VideoBand
            src="/videos/kadhai-sprinkle.mp4"
            eyebrow="On the line"
            title="Blends made for the kadhai, not the shelf."
            sub="Profiles built for high heat, big batches and fast service — the same hit of flavour on plate one and plate one thousand."
          />
        </div>
        <div className="grid md:grid-cols-3 gap-7">
          {HORECA_SOLUTIONS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <TiltCard className="rounded-2xl overflow-hidden h-full">
                <div className="rounded-2xl p-7 h-full flex flex-col" style={{ background: COLORS.paper, border: `1px solid ${tint(COLORS.ink, 0.1)}` }}>
                  <h3 className="rs-display" style={{ fontSize: "1.4rem", color: COLORS.red, fontWeight: 600 }}>{s.title}</h3>
                  <p className="rs-body mt-3" style={{ color: COLORS.inkDim, fontSize: "0.95rem", lineHeight: 1.7 }}>{s.desc}</p>
                  <ul className="rs-body mt-5 grid gap-2 grow" style={{ color: COLORS.inkDim, fontSize: "0.88rem" }}>
                    {s.points.map((p) => <li key={p} className="flex items-center gap-2.5"><span style={{ color: COLORS.mustard }}>✦</span>{p}</li>)}
                  </ul>
                  <button onClick={openBulk} className="rs-btn mt-6 px-6 py-3 rounded-full self-start" style={{ background: COLORS.red, color: "#fff", fontSize: "0.75rem" }}>Start an enquiry</button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-7 mt-14 items-stretch">
          <div className="lg:col-span-1"><CostPerPlate /></div>
          <Reveal className="lg:col-span-2">
            <div className="rounded-2xl p-8 h-full flex flex-col justify-center" style={{ background: tint(COLORS.mustard, 0.12), border: `1px solid ${tint(COLORS.mustard, 0.4)}` }}>
              <Eyebrow>Why professional kitchens switch</Eyebrow>
              <H2>Reliability. Economics. Supply. Expertise.</H2>
              <p className="rs-body mt-5 max-w-xl" style={{ color: COLORS.inkDim, lineHeight: 1.75 }}>
                Consistent taste in every batch, a lower cost per plate you can verify, stock that never runs dry mid-season, and blends developed for the pass — not the retail shelf. That is the whole pitch. Measure us on it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <TestimonialsSection />
    </main>
  );
}
