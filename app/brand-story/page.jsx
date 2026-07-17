import { PageHero, FounderSection, Marquee } from "../../components/sections.jsx";
import { StoryManufacturing } from "../../components/story.jsx";

export const metadata = { title: "Brand Story — Rainbow Masala since 1956", description: "From a single Aurangpura spice shop in 1956 to a batch-coded blending house. The Rainbow Masala story and how we manufacture." };

export default function BrandStoryPage() {
  return (
    <main>
      <PageHero eyebrow="Brand story · since 1956" title="Seventy years of the same promise.">
        Rainbow started as a single spice shop in Aurangpura in 1956. Three generations later, the promise hasn&apos;t changed — the same taste, every batch — only the discipline behind it has grown.
      </PageHero>
      <FounderSection />
      <StoryManufacturing />
      <Marquee />
    </main>
  );
}
