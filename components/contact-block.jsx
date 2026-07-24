"use client";
import Link from "next/link";
import { Reveal } from "./ui.jsx";
import { useShell } from "./shell.jsx";
import { COLORS, tint, LINKS } from "../lib/theme.js";

const SOCIALS = [
  { label: "Meta (Facebook)", href: "https://www.facebook.com/rainbowmasala", accent: "#1877F2" },
  { label: "LinkedIn", href: "https://in.linkedin.com/company/rainbow-masala", accent: "#0A66C2" },
  { label: "Instagram", href: LINKS.instagram, accent: "#C13584" },
];
const CHANNELS = [
  { label: "WhatsApp", value: "+91 83559 33962", href: LINKS.whatsapp, note: "Fastest — replies within business hours", accent: "#1FA855" },
  { label: "Phone", value: "+91 84828 59999", href: `tel:${LINKS.phone}`, note: "Mon–Sat, 10am–7pm IST", accent: "#D22C2E" },
  { label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}`, note: "For documents & trade queries", accent: "#D48F26" },
];

export function ContactBlock() {
  const { openBulk, openAvail } = useShell();
  return (
    <section className="px-6 md:px-10 pb-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.07}>
            <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block rounded-2xl p-6 h-full" style={{ background: COLORS.paper, border: `1px solid ${tint(COLORS.ink, 0.1)}`, borderTop: `3px solid ${c.accent}` }}>
              <p className="rs-eyebrow" style={{ fontSize: "0.62rem", color: COLORS.inkDim }}>{c.label}</p>
              <p className="rs-display mt-2" style={{ fontSize: "1.15rem", color: COLORS.ink, fontWeight: 600, wordBreak: "break-word" }}>{c.value}</p>
              <p className="rs-body mt-2" style={{ fontSize: "0.8rem", color: COLORS.inkDim }}>{c.note}</p>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div className="flex flex-wrap gap-3 mt-6">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rs-btn px-5 py-2.5 rounded-full" style={{ border: `2px solid ${s.accent}`, color: s.accent, fontSize: "0.7rem" }}>{s.label}</a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="rounded-2xl p-7 mt-8 flex flex-wrap items-center justify-between gap-5" style={{ background: tint(COLORS.mustard, 0.12), border: `1px solid ${tint(COLORS.mustard, 0.4)}` }}>
          <div>
            <p className="rs-display" style={{ fontSize: "1.25rem", color: COLORS.ink, fontWeight: 600 }}>Registered office & works</p>
            <p className="rs-body mt-1" style={{ color: COLORS.inkDim, fontSize: "0.95rem" }}>
              Darak Foods Pvt. Ltd. · 14, Pranav Plaza, Aurangpura, Chh. Sambhajinagar, 431001, Maharashtra, India
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={openBulk} className="rs-btn px-6 py-3 rounded-full" style={{ background: COLORS.red, color: "#fff", fontSize: "0.75rem" }}>Bulk Enquiry</button>
            <button onClick={openAvail} className="rs-btn px-6 py-3 rounded-full" style={{ border: `2px solid ${COLORS.red}`, color: COLORS.red, fontSize: "0.75rem" }}>Where to buy</button>
          </div>
        </div>
      </Reveal>

      {/* media moved to its own page — link out */}
      <Reveal delay={0.2}>
        <Link href="/media" className="mt-8 rounded-2xl p-7 flex flex-wrap items-center justify-between gap-4" style={{ background: COLORS.ink, display: "flex" }}>
          <div>
            <p className="rs-eyebrow" style={{ fontSize: "0.62rem", color: COLORS.mustard }}>Media & films</p>
            <p className="rs-display mt-1" style={{ fontSize: "1.25rem", color: "#fff", fontWeight: 600 }}>See the range in motion.</p>
            <p className="rs-body mt-1" style={{ fontSize: "0.85rem", color: "rgba(255,246,231,0.85)" }}>Brand films, product close-ups and the photo gallery.</p>
          </div>
          <span className="rs-btn px-6 py-3 rounded-full shrink-0" style={{ background: COLORS.red, color: "#fff", fontSize: "0.75rem" }}>Open Media →</span>
        </Link>
      </Reveal>
    </section>
  );
}
