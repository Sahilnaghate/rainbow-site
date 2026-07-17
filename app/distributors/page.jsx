import { PageHero, DistributorSection } from "../../components/sections.jsx";

export const metadata = { title: "Distributor Program — Rainbow Masala", description: "Territory exclusivity, first-stock buyback, 12-18% margins. Apply for a Rainbow Masala distributorship." };

export default function DistributorsPage() {
  return (
    <main>
      <PageHero eyebrow="Distributor program" title="A brand with 70 years of shelf trust.">
        Since 1956, Rainbow has been the repeat-purchase masala of Marathwada. We are opening new territories with exclusivity, buyback protection and HORECA leads handed to you from this website.
      </PageHero>
      <DistributorSection />
    </main>
  );
}
