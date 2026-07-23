import { PageHero, RecipesSection } from "../../components/sections.jsx";
import { VideoBand } from "../../components/ui.jsx";

export const metadata = { title: "Recipes — Rainbow Masala", description: "Restaurant-scale recipes built on Rainbow blends — batch sizes, timings and blend quantities." };

export default function RecipesPage() {
  return (
    <main>
      <PageHero eyebrow="Recipes" title="Cooked the Rainbow way.">
        Restaurant-scale bases and home classics, each built on one Rainbow blend.
      </PageHero>
      <section className="px-6 md:px-10 pb-4 max-w-7xl mx-auto">
        <VideoBand
          src="/videos/curry-bubbling.mp4"
          eyebrow="Fresh from the pass"
          title="One blend. A full simmer."
          sub="Every recipe below is written for restaurant batches — and every one starts with a single Rainbow blend."
        />
      </section>
      <RecipesSection />
    </main>
  );
}
