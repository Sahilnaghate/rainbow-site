import { Hero, Marquee, CaterPanel, SignatureShowcase, ProductsSection, DistributorSection, FounderSection, TestimonialsSection, AvailabilityBand } from "../components/sections.jsx";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <CaterPanel />
      <SignatureShowcase />
      <ProductsSection featured />
      <TestimonialsSection />
      <DistributorSection />
      <FounderSection />
      <AvailabilityBand />
    </main>
  );
}
