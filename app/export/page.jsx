import { PageHero, ExportSection } from "../../components/sections.jsx";

export const metadata = { title: "Export — Rainbow Masala", description: "Branded and private-label Indian masala exports. FSSAI facility, per-batch COA, FOB/CIF from Mumbai port." };

export default function ExportPage() {
  return (
    <main>
      <PageHero eyebrow="Export" title="Indian kitchens run on these blends. Yours can too.">
        Importers and ethnic-food distributors: branded or private-label, retail packs or 25kg bulk, with full export documentation.
      </PageHero>
      <ExportSection />
    </main>
  );
}
