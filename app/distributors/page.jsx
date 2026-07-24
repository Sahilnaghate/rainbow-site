import { PageHero, DistributorSection, ExportSection } from "../../components/sections.jsx";

export const metadata = { title: "Distributor & Export Program — Rainbow Masala", description: "Territory exclusivity, first-stock buyback and 12-18% margins for Indian distributors — plus branded & private-label masala exports with full documentation." };

export default function DistributorsPage() {
  return (
    <main>
      <PageHero eyebrow="Distributor & export program" title="A brand with 70 years of shelf trust — now going wider.">
        Since 1956, Rainbow has been the repeat-purchase masala of Marathwada. We are opening new territories across India with exclusivity and buyback protection — and shipping branded &amp; private-label blends to importers overseas.
      </PageHero>
      <DistributorSection />
      <ExportSection />
    </main>
  );
}
