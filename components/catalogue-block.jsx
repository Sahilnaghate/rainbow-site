"use client";
import { Reveal } from "./ui.jsx";
import { useShell } from "./shell.jsx";
import { COLORS, tint } from "../lib/theme.js";

export function CatalogueBlock() {
  const { openBulk } = useShell();
  return (
    <section className="px-6 md:px-10 pb-28 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <Reveal>
          <div className="rounded-2xl p-8 h-full flex flex-col" style={{ background: `radial-gradient(ellipse at 30% 0%, ${COLORS.redDeep}, ${COLORS.ink} 80%)`, color: "#fff" }}>
            <p className="rs-eyebrow" style={{ fontSize: "0.68rem", color: COLORS.mustard }}>Digital PDF</p>
            <h3 className="rs-display mt-3" style={{ fontSize: "1.8rem", fontWeight: 600 }}>Rainbow Masala — Product Catalogue</h3>
            <p className="rs-body mt-4" style={{ color: "rgba(255,246,231,0.85)", lineHeight: 1.7 }}>
              All blends, single powders and whole spices with packs, yields and shelf life. Updated quarterly.
            </p>
            <a href="/catalogue.pdf" download className="rs-btn mt-8 px-7 py-3.5 rounded-full self-start" style={{ background: COLORS.mustard, color: COLORS.ink, fontSize: "0.8rem" }}>
              Download PDF
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl p-8 h-full flex flex-col" style={{ background: COLORS.paper, border: `1px solid ${tint(COLORS.ink, 0.1)}` }}>
            <p className="rs-eyebrow" style={{ fontSize: "0.68rem", color: COLORS.red }}>Prefer it on WhatsApp?</p>
            <h3 className="rs-display mt-3" style={{ fontSize: "1.5rem", color: COLORS.ink, fontWeight: 600 }}>We&apos;ll send it with trade pricing.</h3>
            <p className="rs-body mt-4" style={{ color: COLORS.inkDim, lineHeight: 1.7 }}>
              Raise a bulk enquiry with your business name and city, and the catalogue lands on your WhatsApp with HORECA rates for your volume band.
            </p>
            <button onClick={openBulk} className="rs-btn mt-8 px-7 py-3.5 rounded-full self-start" style={{ background: COLORS.red, color: "#fff", fontSize: "0.8rem" }}>
              Bulk Enquiry
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
