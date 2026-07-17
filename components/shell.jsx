"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COLORS, tint, LINKS } from "../lib/theme.js";
import { GrainDefs } from "./ui.jsx";
import { FAQS } from "../lib/data.js";

const ShellCtx = createContext(null);
export const useShell = () => useContext(ShellCtx);

const NAV = [
  { label: "About Us", href: "/brand-story" },
  { label: "Products", href: "/products" },
  { label: "Recipes", href: "/recipes" },
  { label: "HORECA", href: "/horeca" },
  { label: "Distributors", href: "/distributors" },
  { label: "Contact Us", href: "/contact" },
];

export function Eyebrow({ children, color = COLORS.red, center }) {
  return <p className={`rs-eyebrow ${center ? "text-center" : ""}`} style={{ color, fontSize: "0.8rem" }}>{children}</p>;
}
export function H2({ children, center, color = COLORS.ink }) {
  return <h2 className={`rs-display mt-4 ${center ? "text-center" : ""}`} style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color, fontWeight: 600 }}>{children}</h2>;
}
export function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="rs-eyebrow" style={{ fontSize: "0.6rem", color: COLORS.inkDim }}>{label}</span>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="rs-body mt-1 w-full rounded-lg px-3 py-2.5"
        style={{ border: `1.5px solid ${tint(COLORS.ink, 0.18)}`, background: COLORS.paper, fontSize: "0.95rem", color: COLORS.ink }} />
    </label>
  );
}
function Modal({ onClose, children, maxW = "max-w-md" }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4" style={{ background: "rgba(42,22,12,0.55)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div className={`w-full ${maxW} rounded-2xl p-6 md:p-8`} style={{ background: COLORS.cream, boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function BulkInquiryModal({ onClose }) {
  const [f, setF] = useState({ business: "", name: "", phone: "", city: "", need: "" });
  const msg = encodeURIComponent(`Bulk enquiry — Rainbow Masala\nBusiness: ${f.business}\nContact: ${f.name} (${f.phone})\nCity: ${f.city}\nRequirement: ${f.need}`);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <Modal onClose={onClose}>
      <div className="flex items-start justify-between">
        <div>
          <Eyebrow>Bulk enquiry</Eyebrow>
          <h3 className="rs-display mt-2" style={{ fontSize: "1.6rem", color: COLORS.ink, fontWeight: 600 }}>Tell us what your kitchen needs.</h3>
        </div>
        <button onClick={onClose} aria-label="Close" className="rs-body text-xl" style={{ color: COLORS.inkDim }}>✕</button>
      </div>
      <div className="mt-5 grid gap-3">
        <Field label="Business name" value={f.business} onChange={set("business")} placeholder="Hotel Annapurna" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Contact person" value={f.name} onChange={set("name")} placeholder="Your name" />
          <Field label="Phone" value={f.phone} onChange={set("phone")} placeholder="98xxxxxx00" type="tel" />
        </div>
        <Field label="City" value={f.city} onChange={set("city")} placeholder="Chh. Sambhajinagar" />
        <Field label="Requirement" value={f.need} onChange={set("need")} placeholder="e.g. Garam Masala 25kg/month" />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`${LINKS.whatsapp}?text=${msg}`} target="_blank" rel="noreferrer" className="rs-btn px-6 py-3 rounded-full" style={{ background: "#1FA855", color: "#fff", fontSize: "0.78rem" }}>Send on WhatsApp</a>
        <a href={`mailto:${LINKS.email}?subject=Bulk enquiry&body=${msg}`} className="rs-btn px-6 py-3 rounded-full" style={{ border: `2px solid ${COLORS.red}`, color: COLORS.red, fontSize: "0.78rem" }}>Send by Email</a>
      </div>
      <p className="rs-body mt-4" style={{ fontSize: "0.75rem", color: COLORS.inkDim }}>We reply within one working day. Minimum direct order 25kg — smaller needs are routed to your nearest distributor.</p>
    </Modal>
  );
}

function AvailabilityModal({ onClose }) {
  const Block = ({ title, children }) => (
    <div className="rounded-xl p-4" style={{ background: COLORS.paper, border: `1px solid ${tint(COLORS.ink, 0.12)}` }}>
      <p className="rs-eyebrow" style={{ fontSize: "0.62rem", color: COLORS.red }}>{title}</p>
      <div className="rs-body mt-2 text-sm" style={{ color: COLORS.inkDim, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
  return (
    <Modal onClose={() => onClose()} maxW="max-w-lg">
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
          85+ distributors across 11 states. WhatsApp your city to{" "}
          <a className="underline" style={{ color: COLORS.red }} href={`${LINKS.whatsapp}?text=${encodeURIComponent("Hi! Which Rainbow distributor covers my city? City: ")}`} target="_blank" rel="noreferrer">+91 83559 33962</a>.
        </Block>
        <Block title="Retail packs online">
          <span className="flex flex-wrap gap-4">
            <a className="underline" style={{ color: COLORS.red }} href={LINKS.amazon} target="_blank" rel="noreferrer">Amazon</a>
            <a className="underline" style={{ color: COLORS.red }} href={LINKS.flipkart} target="_blank" rel="noreferrer">Flipkart</a>
            <a className="underline" style={{ color: COLORS.red }} href={LINKS.indiamart} target="_blank" rel="noreferrer">IndiaMART</a>
          </span>
        </Block>
      </div>
    </Modal>
  );
}

function IntroSplash({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2100);
    const t2 = setTimeout(onDone, 2850);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  const skip = () => { setLeaving(true); setTimeout(onDone, 500); };
  return (
    <div onClick={skip} className="fixed inset-0 z-[200] flex flex-col items-center justify-center cursor-pointer"
      style={{ background: `radial-gradient(ellipse at 50% 42%, ${COLORS.redDeep}, ${COLORS.ink} 82%)`, transform: leaving ? "translateY(-100%)" : "translateY(0)", transition: "transform 0.75s cubic-bezier(.76,0,.24,1)" }}
      aria-label="Intro — click to skip">
      {[...Array(14)].map((_, i) => (
        <span key={i} className="rs-spark" style={{ "--a": `${(i / 14) * 360}deg`, "--d": `${120 + (i % 4) * 46}px`, background: i % 3 === 0 ? COLORS.mustard : i % 3 === 1 ? COLORS.red : "#fff", animationDelay: `${0.55 + (i % 5) * 0.05}s` }} />
      ))}
      <div className="rs-intro-logo" style={{ background: "#fff", borderRadius: "16px", padding: "14px 20px", boxShadow: `0 0 60px ${tint(COLORS.mustard, 0.45)}` }}>
        <img src="/logo.png" alt="Rainbow Masala" style={{ height: "84px", width: "auto", display: "block" }} />
      </div>
      <p className="rs-eyebrow rs-intro-tag" style={{ color: COLORS.mustard, fontSize: "0.78rem", marginTop: "1.6rem" }}>Professional Kitchen Masala Partner</p>
      <p className="rs-body rs-intro-tag" style={{ color: "rgba(255,246,231,0.55)", fontSize: "0.72rem", marginTop: "0.5rem", animationDelay: "1.1s" }}>since 1956 · Chh. Sambhajinagar</p>
      <span className="rs-body absolute bottom-6 right-8" style={{ color: "rgba(255,246,231,0.45)", fontSize: "0.72rem" }}>click to skip →</span>
    </div>
  );
}

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

export function Footer() {
  const { openBulk } = useShell();
  return (
    <footer id="contact-block" className="px-6 md:px-10 pt-24 pb-10" style={{ background: COLORS.red, color: "#fff" }}>
      <div className="max-w-7xl mx-auto">
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
              <button onClick={openBulk} className="rs-btn px-6 py-3 rounded-full" style={{ border: "2px solid rgba(255,255,255,0.6)", color: "#fff", fontSize: "0.78rem" }}>Bulk Enquiry</button>
              <a href="/catalogue.pdf" download className="rs-btn px-6 py-3 rounded-full" style={{ border: "2px solid rgba(255,255,255,0.6)", color: "#fff", fontSize: "0.78rem" }}>Download Catalogue</a>
            </div>
          </div>
        </div>

        <div className="py-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.25)" }}>
          <p className="rs-eyebrow text-center" style={{ fontSize: "0.7rem", color: COLORS.mustard }}>Questions professional kitchens ask</p>
          <FAQ />
        </div>

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

        <p className="rs-body pt-6" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.72rem", lineHeight: 1.6 }}>
          Disclaimer: Product images are illustrative; packaging may vary. Indicative yields depend on recipe and portioning. Rainbow® and the Rainbow Masala marks are the property of Darak Foods Pvt. Ltd. FSSAI licence details are printed on every pack.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 rs-body" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem" }}>
          <span>© 2026 Rainbow Masala · Darak Foods Pvt. Ltd. · FSSAI licensed · Since 1956</span>
          <div className="flex flex-wrap gap-5">
            <Link href="/export" style={{ color: "rgba(255,255,255,0.75)" }}>Export</Link>
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.75)" }}>Blog</Link>
            <Link href="/catalogue" style={{ color: "rgba(255,255,255,0.75)" }}>Catalogue</Link>
            {[["Facebook", "#"], ["LinkedIn", "https://in.linkedin.com/company/rainbow-masala"], ["Instagram", LINKS.instagram], ["YouTube", "#"]].map(([s, url]) => (
              <a key={s} href={url} target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.75)" }}>{s}</a>
            ))}
            <a href={LINKS.erp} target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.75)" }}>Partner Login</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.6)" }}>Privacy</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.6)" }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Shell({ children }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [availOpen, setAvailOpen] = useState(false);
  const [zoom, setZoom] = useState(null);
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    if (pathname === "/" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !sessionStorage.getItem("rs-intro-seen")) setIntro(true);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const closeIntro = () => { setIntro(false); try { sessionStorage.setItem("rs-intro-seen", "1"); } catch {} };

  const ctx = { openBulk: () => setBulkOpen(true), openAvail: () => setAvailOpen(true), setZoom };

  return (
    <ShellCtx.Provider value={ctx}>
      <div style={{ background: COLORS.cream, color: COLORS.ink }} className="rs-root min-h-screen w-full overflow-x-hidden">
        <GrainDefs />
        {intro && <IntroSplash onDone={closeIntro} />}
        {bulkOpen && <BulkInquiryModal onClose={() => setBulkOpen(false)} />}
        {availOpen && <AvailabilityModal onClose={(next) => { setAvailOpen(false); if (next === "bulk") setBulkOpen(true); }} />}
        {zoom && (
          <div className="fixed inset-0 z-[95] flex flex-col items-center justify-center px-6 cursor-zoom-out" style={{ background: "rgba(42,22,12,0.82)", backdropFilter: "blur(6px)" }} onClick={() => setZoom(null)}>
            <img src={zoom.img} alt={zoom.name} style={{ maxWidth: "min(90vw, 560px)", maxHeight: "72vh", objectFit: "contain", filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.5))" }} />
            <p className="rs-display mt-5" style={{ color: "#FFF6E7", fontSize: "1.3rem", fontWeight: 600 }}>{zoom.name}</p>
            <p className="rs-body mt-1" style={{ color: "rgba(255,246,231,0.6)", fontSize: "0.8rem" }}>click anywhere to close</p>
          </div>
        )}

        <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp us"
          className="fixed bottom-5 right-5 z-[80] flex items-center justify-center rounded-full"
          style={{ width: "54px", height: "54px", background: "#1FA855", boxShadow: "0 12px 30px rgba(0,0,0,0.3)" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.6.1-.8l.4-.5c.1-.2.1-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.7a12 12 0 0 0 4.6 4.3c1.8.8 2.6.9 3.5.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0 0-.2-.1-.7-.1Z"/></svg>
        </a>

        <header className="fixed top-0 left-0 right-0 z-50" style={{
          background: scrolled ? "rgba(255,246,231,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? `2px solid ${COLORS.red}` : "1px solid transparent",
          transition: "all 0.4s ease",
        }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10" style={{ height: scrolled ? "64px" : "84px", transition: "height 0.4s ease" }}>
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Rainbow Masala" style={{ height: scrolled ? "40px" : "48px", width: "auto", transition: "height 0.4s ease" }} />
            </Link>
            <nav className="hidden lg:flex items-center gap-7 rs-body" style={{ fontSize: "0.92rem" }}>
              {NAV.map((item) => (
                <Link key={item.label} href={item.href} className={`rs-nav-link ${pathname === item.href ? "rs-active" : ""}`} style={{ color: pathname === item.href ? COLORS.red : COLORS.inkDim }}>{item.label}</Link>
              ))}
            </nav>
            <div className="hidden lg:flex items-center gap-3">
              <a href={LINKS.erp} target="_blank" rel="noreferrer" className="rs-btn px-4 py-2 rounded-full" style={{ border: `2px solid ${tint(COLORS.ink, 0.25)}`, color: COLORS.inkDim, fontSize: "0.72rem" }}>Partner Login</a>
              <button onClick={() => setBulkOpen(true)} className="rs-btn px-5 py-2 rounded-full" style={{ background: COLORS.red, color: "#fff", fontSize: "0.75rem" }}>Bulk Enquiry</button>
            </div>
            <button className="lg:hidden" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu" style={{ color: COLORS.ink }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
          </div>
          {navOpen && (
            <div className="lg:hidden px-6 pb-6 flex flex-col gap-4 rs-body" style={{ background: COLORS.paper, color: COLORS.inkDim }}>
              {NAV.map((item) => (
                <Link key={item.label} href={item.href} className="py-1" onClick={() => setNavOpen(false)}>{item.label}</Link>
              ))}
              <button onClick={() => { setNavOpen(false); setBulkOpen(true); }} className="rs-btn px-5 py-2.5 rounded-full text-center" style={{ background: COLORS.red, color: "#fff", fontSize: "0.75rem" }}>Bulk Enquiry</button>
              <a href={LINKS.erp} target="_blank" rel="noreferrer" className="rs-btn px-5 py-2.5 rounded-full text-center" style={{ border: `2px solid ${tint(COLORS.ink, 0.25)}`, color: COLORS.inkDim, fontSize: "0.72rem" }}>Partner Login</a>
            </div>
          )}
        </header>

        {children}
        <Footer />
      </div>
    </ShellCtx.Provider>
  );
}
