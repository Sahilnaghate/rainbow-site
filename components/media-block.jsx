"use client";
import { useState } from "react";
import { Reveal } from "./ui.jsx";
import { COLORS, tint, LINKS } from "../lib/theme.js";
import { PRODUCTS } from "../lib/data.js";
import { useGallery } from "../lib/cms.js";

// Brand films — client-supplied AI footage that passed the branding check.
const FILMS = [
  {
    src: "/videos/rainbow-garam-pouch.mp4",
    poster: "/images/media/pouch-poster.jpg",
    title: "Rainbow Garam Masala",
    sub: "The premium pouch, up close — spice-bowl artwork and the Rainbow mark.",
    featured: true,
  },
  {
    src: "/videos/masala-into-pan.mp4",
    poster: "/images/media/pan-poster.jpg",
    title: "Into the pan",
    sub: "A spoon of Rainbow masala hits the sizzle.",
  },
  {
    src: "/videos/kitchen-king-promo.mp4",
    poster: "/images/products/kitchen-king.png",
    title: "Kitchen King — launch film",
    sub: "Our best-seller, in 20 seconds.",
    dark: true,
  },
];

function FilmCard({ film, large }) {
  const [sound, setSound] = useState(false);
  return (
    <div className="relative rounded-3xl overflow-hidden group" style={{ aspectRatio: large ? "16 / 9" : "1 / 1", background: COLORS.ink, boxShadow: "0 30px 70px rgba(42,22,12,0.28)" }}>
      <video
        src={film.src}
        poster={film.poster}
        autoPlay
        muted={!sound}
        loop
        playsInline
        onClick={(e) => { setSound((s) => !s); if (e.currentTarget.muted) e.currentTarget.muted = false; }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: film.dark ? "contain" : "cover", cursor: "pointer" }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 45%, rgba(20,8,4,0.72) 100%)" }} />
      <button onClick={() => setSound((s) => !s)} aria-label={sound ? "Mute" : "Unmute"} className="absolute top-3 right-3 flex items-center justify-center rounded-full" style={{ width: 38, height: 38, background: "rgba(42,22,12,0.6)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,246,231,0.3)" }}>
        <span style={{ fontSize: "0.95rem" }}>{sound ? "🔊" : "🔇"}</span>
      </button>
      <div className="absolute left-0 right-0 bottom-0 p-5 md:p-6 pointer-events-none">
        <p className="rs-display" style={{ fontSize: large ? "clamp(1.4rem,2.6vw,2rem)" : "1.15rem", color: "#fff", fontWeight: 600, fontStyle: "italic" }}>{film.title}</p>
        {film.sub && <p className="rs-body mt-1 max-w-md" style={{ fontSize: "0.82rem", color: "rgba(255,246,231,0.9)" }}>{film.sub}</p>}
      </div>
    </div>
  );
}

export function MediaBlock() {
  const cms = useGallery();
  const fallback = PRODUCTS.filter((p) => p.img).slice(0, 8).map((p) => ({ id: p.name, title: p.name, media_type: "image", media_url: p.img, _tint: p.base }));
  const gallery = cms && cms.length ? cms : fallback;
  const featured = FILMS.find((f) => f.featured);
  const rest = FILMS.filter((f) => !f.featured);
  return (
    <section className="px-6 md:px-10 pb-24 max-w-7xl mx-auto">
      {/* Brand films */}
      <Reveal>
        <p className="rs-eyebrow" style={{ fontSize: "0.7rem", color: COLORS.red }}>Brand films</p>
        <h2 className="rs-display mt-2" style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", color: COLORS.ink, fontWeight: 600 }}>See — and hear — the Rainbow difference.</h2>
        <p className="rs-body mt-2 max-w-xl" style={{ color: COLORS.inkDim, fontSize: "0.95rem" }}>Tap any film to turn the sound on.</p>
      </Reveal>
      <div className="grid lg:grid-cols-2 gap-6 mt-8 items-stretch">
        <Reveal className="lg:row-span-2"><FilmCard film={featured} large /></Reveal>
        {rest.map((f, i) => (
          <Reveal key={f.src} delay={0.08 + i * 0.08}><FilmCard film={f} /></Reveal>
        ))}
      </div>

      {/* Photo & media gallery (CMS-driven) */}
      <Reveal delay={0.15}>
        <div className="mt-16">
          <p className="rs-eyebrow" style={{ fontSize: "0.7rem", color: COLORS.red }}>Gallery</p>
          <h2 className="rs-display mt-2" style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)", color: COLORS.ink, fontWeight: 600 }}>Packs, plates & the blending house.</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {gallery.map((g) => (
              <div key={g.id} className="rounded-xl overflow-hidden relative flex items-center justify-center" style={{ background: tint(g._tint || COLORS.mustard, 0.12), border: `1px solid ${tint(g._tint || COLORS.mustard, 0.35)}`, aspectRatio: "1/1" }}>
                {g.media_type === "video" ? (
                  <a href={g.media_url} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center w-full h-full" style={{ background: COLORS.ink }}>
                    <span className="flex items-center justify-center rounded-full" style={{ width: "48px", height: "48px", background: "rgba(255,246,231,0.92)" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.red}><path d="M8 5v14l11-7z"/></svg>
                    </span>
                    <span className="rs-body mt-2 px-3 text-center" style={{ fontSize: "0.72rem", color: "rgba(255,246,231,0.85)" }}>{g.title}</span>
                  </a>
                ) : g._tint ? (
                  <img src={g.media_url} alt={g.title} style={{ maxWidth: "85%", maxHeight: "85%", objectFit: "contain" }} />
                ) : (
                  <img src={g.media_url} alt={g.title} className="w-full h-full" style={{ objectFit: "cover" }} />
                )}
              </div>
            ))}
          </div>
          <p className="rs-body mt-5" style={{ fontSize: "0.8rem", color: COLORS.inkDim }}>
            Buy retail packs online:{" "}
            <a className="underline" style={{ color: COLORS.red }} href={LINKS.amazon} target="_blank" rel="noreferrer">Amazon</a> ·{" "}
            <a className="underline" style={{ color: COLORS.red }} href={LINKS.flipkart} target="_blank" rel="noreferrer">Flipkart</a> ·{" "}
            <a className="underline" style={{ color: COLORS.red }} href={LINKS.indiamart} target="_blank" rel="noreferrer">IndiaMART</a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
