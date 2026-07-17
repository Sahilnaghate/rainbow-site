import { PageHero, RecipesSection } from "../../components/sections.jsx";

export const metadata = { title: "Recipes — Rainbow Masala", description: "Restaurant-scale recipes built on Rainbow blends — batch sizes, timings and blend quantities." };

export default function RecipesPage() {
  return (
    <main>
      <PageHero eyebrow="Recipes" title="Cooked the Rainbow way.">
        Restaurant-scale bases and home classics, each built on one Rainbow blend. Premium recipe photography updates are on the way.
      </PageHero>
      <RecipesSection />
    </main>
  );
}
