import { Hero, Marquee, ProductsSection, DistributorSection, FounderSection, TestimonialsSection, AvailabilityBand } from "../components/sections.jsx";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ProductsSection featured />
      <TestimonialsSection />
      <DistributorSection />
      <FounderSection />
      <AvailabilityBand />
    </main>
  );
}
