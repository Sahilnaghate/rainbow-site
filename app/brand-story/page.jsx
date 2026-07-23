import { PageHero, FounderSection, Marquee } from "../../components/sections.jsx";
import { StoryManufacturing } from "../../components/story.jsx";
import { VideoBand } from "../../components/ui.jsx";

export const metadata = { title: "Brand Story — Rainbow Masala since 1956", description: "From a single Aurangpura spice shop in 1956 to a batch-coded blending house. The Rainbow Masala story and how we manufacture." };

export default function BrandStoryPage() {
  return (
    <main>
      <PageHero eyebrow="About us · since 1956" title="Seventy years of the same promise.">
        Rainbow started as a <mark style={{ background: "rgba(210,44,46,0.15)", color: "#8E1B1D", padding: "0 4px", borderRadius: "4px", fontWeight: 600 }}>single spice shop in Aurangpura in 1956</mark>. Three generations later, the promise hasn&apos;t changed — <mark style={{ background: "rgba(210,44,46,0.15)", color: "#8E1B1D", padding: "0 4px", borderRadius: "4px", fontWeight: 600 }}>the same taste, every batch</mark> — only the discipline behind it has grown.
      </PageHero>
      <section className="px-6 md:px-10 pb-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[["70", "years of blending"], ["19+", "products in range"], ["100%", "batch-coded packs"], ["FSSAI", "licensed facility"]].map(([v, l]) => (
            <div key={l} className="rounded-2xl p-5 text-center" style={{ background: "#fff", border: "1.5px solid rgba(210,44,46,0.25)", borderTop: "4px solid #D22C2E" }}>
              <div className="rs-display" style={{ fontSize: "1.9rem", color: "#D22C2E", fontWeight: 600 }}>{v}</div>
              <div className="rs-eyebrow" style={{ fontSize: "0.6rem", color: "#6B5040", marginTop: "0.3rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 md:px-10 py-10 max-w-7xl mx-auto">
        <VideoBand
          src="/videos/heritage-stone-grinding.mp4"
          eyebrow="The original process"
          title="It started on a grinding stone."
          sub="Before machines, every Rainbow blend was worked by hand on stone — the profiles we batch-code today were perfected there."
        />
      </section>
      <FounderSection />
      <StoryManufacturing />
      <Marquee />
    </main>
  );
}
