import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "../../../lib/blog-content.js";

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = ARTICLES[slug];
  return a ? { title: `${a.title} — Rainbow Masala`, description: a.body[0].slice(0, 155) } : {};
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const a = ARTICLES[slug];
  if (!a) notFound();
  return (
    <main>
      <article className="pt-32 md:pt-40 pb-24 px-6 md:px-10 max-w-3xl mx-auto">
        <p className="rs-eyebrow" style={{ fontSize: "0.7rem", color: "#D22C2E" }}>Kitchen economics · {a.date} · {a.minutes} min read</p>
        <h1 className="rs-display mt-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", lineHeight: 1.1, fontWeight: 600, color: "#2A160C" }}>{a.title}</h1>
        <div className="mt-8 grid gap-5">
          {a.body.map((p, i) => (
            <p key={i} className="rs-body" style={{ color: "#4A3728", fontSize: "1.02rem", lineHeight: 1.85 }}>{p}</p>
          ))}
        </div>
        <div className="mt-12 rounded-2xl p-7" style={{ background: "rgba(250,162,25,0.12)", border: "1px solid rgba(250,162,25,0.4)" }}>
          <p className="rs-display" style={{ fontSize: "1.2rem", color: "#2A160C", fontWeight: 600 }}>Run the numbers on your own menu.</p>
          <p className="rs-body mt-2" style={{ color: "#6B5040", fontSize: "0.92rem" }}>The cost-per-plate calculator on our products page uses the same math as this article.</p>
          <Link href="/products" className="rs-btn inline-block mt-5 px-6 py-3 rounded-full" style={{ background: "#D22C2E", color: "#fff", fontSize: "0.75rem" }}>Open the calculator</Link>
        </div>
        <Link href="/blog" className="rs-body inline-block mt-8 underline" style={{ color: "#D22C2E", fontSize: "0.9rem" }}>← All articles</Link>
      </article>
    </main>
  );
}
