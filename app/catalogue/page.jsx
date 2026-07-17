import { PageHero } from "../../components/sections.jsx";
import { CatalogueBlock } from "../../components/catalogue-block.jsx";

export const metadata = { title: "Catalogue — Rainbow Masala", description: "Download the Rainbow Masala digital product catalogue (PDF) — packs, yields and HORECA formats." };

export default function CataloguePage() {
  return (
    <main>
      <PageHero eyebrow="Catalogue" title="The full range, one PDF.">
        Pack sizes, indicative yields, shelf life and HORECA formats for every blend — ready to forward to your purchase team.
      </PageHero>
      <CatalogueBlock />
    </main>
  );
}
