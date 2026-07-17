import Link from "next/link";
import { PageHero } from "../../components/sections.jsx";
import { BLOG_POSTS } from "../../lib/data.js";

export const metadata = { title: "Blog — Rainbow Masala", description: "Food-cost control, standardization and kitchen-audit guides for professional Indian kitchens." };

export default function BlogIndex() {
  return (
    <main>
      <PageHero eyebrow="Kitchen economics" title="Notes for professional kitchens.">
        Practical writing on standardization, yields and food-cost control — the same math we use with our HORECA clients.
      </PageHero>
      <section className="px-6 md:px-10 pb-28 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-7">
          {BLOG_POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="block rounded-2xl p-7 h-full transition-transform hover:-translate-y-1" style={{ background: "#FFFFFF", border: "1px solid rgba(42,22,12,0.1)", borderTop: "3px solid #D22C2E" }}>
              <p className="rs-eyebrow" style={{ fontSize: "0.6rem", color: "#6B5040" }}>{p.date} · {p.minutes} min read</p>
              <h2 className="rs-display mt-3" style={{ fontSize: "1.3rem", color: "#2A160C", fontWeight: 600, lineHeight: 1.3 }}>{p.title}</h2>
              <p className="rs-body mt-3" style={{ fontSize: "0.9rem", color: "#6B5040", lineHeight: 1.7 }}>{p.excerpt}</p>
              <p className="rs-eyebrow mt-5" style={{ fontSize: "0.62rem", color: "#D22C2E" }}>Read →</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
