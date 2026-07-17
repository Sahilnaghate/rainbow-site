import { PageHero } from "../../components/sections.jsx";
import { ContactBlock } from "../../components/contact-block.jsx";

export const metadata = { title: "Contact — Rainbow Masala", description: "Call, WhatsApp or email Rainbow Masala (Darak Foods), Chh. Sambhajinagar. Bulk, distributor and export enquiries." };

export default function ContactPage() {
  return (
    <main>
      <PageHero eyebrow="Contact & ecosystem" title="One call away from a consistent kitchen.">
        Bulk supply, distributorships, exports or a plain question — pick whichever channel your day allows. WhatsApp is fastest.
      </PageHero>
      <ContactBlock />
    </main>
  );
}
