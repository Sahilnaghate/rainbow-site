import { Hero, Marquee, CaterPanel, ProductsSection, DistributorSection, FounderSection, TestimonialsSection, AvailabilityBand } from "../components/sections.jsx";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <CaterPanel />
      <ProductsSection featured />
      <TestimonialsSection />
      <DistributorSection />
      <FounderSection />
      <AvailabilityBand />
    </main>
  );
}
