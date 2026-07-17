import { ProductsSection, RecipesSection } from "../../components/sections.jsx";
import { PageHero } from "../../components/sections.jsx";

export const metadata = { title: "Product Range — Rainbow Masala", description: "Premium blends, single spice powders and CTC spices with pack sizes, yields and shelf life. Cost-per-plate math included." };

export default function ProductsPage() {
  return (
    <main>
      <PageHero eyebrow="Product range" title="Premium blends, single powders, whole spices.">
        Every product below is batch-coded and farm-traceable. Filter by category or cuisine, click any pack to zoom, and use the cost-per-plate calculator to cost your menu.
      </PageHero>
      <ProductsSection />
      <RecipesSection />
    </main>
  );
}
