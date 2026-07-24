import { PageHero } from "../../components/sections.jsx";
import { MediaBlock } from "../../components/media-block.jsx";

export const metadata = { title: "Media — Rainbow Masala", description: "Brand films, product videos and the Rainbow Masala photo gallery — packs, plated dishes and the blending house." };

export default function MediaPage() {
  return (
    <main>
      <PageHero eyebrow="Media" title="Films, packs & the plate.">
        Watch the range in motion and browse the gallery — brand films, product close-ups and photos of Rainbow blends at work.
      </PageHero>
      <MediaBlock />
    </main>
  );
}
