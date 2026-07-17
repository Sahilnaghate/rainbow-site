// NOTE FOR CLIENT REVIEW: counters, yields, prices, ROI figures and testimonial
// names below are ILLUSTRATIVE placeholders — replace with Darak Foods' real
// numbers before launch.

export const TRUST_COUNTERS = [
  { value: "1,200+", label: "Kitchens served" },
  { value: "85+", label: "Distributors" },
  { value: "11", label: "States" },
  { value: "100%", label: "Farm-sourced" },
];

export const CUISINES = ["All", "North Indian", "South Indian", "Street", "Universal"];

export const PRODUCTS = [
  { name: "Garam Masala", img: "/images/products/garam-masala.png", base: "#A9702E", deep: "#5C3A1E", category: "Premium Blends", cuisine: "Universal", packs: "1kg · 5kg · 25kg", yieldPerKg: 160, pricePerKg: 620, shelf: "12 mo", note: "The house finishing blend" },
  { name: "Kitchen King Masala", img: "/images/products/kitchen-king.png", base: "#F2A900", deep: "#8A5F0E", category: "Premium Blends", cuisine: "Universal", packs: "1kg · 5kg · 25kg", yieldPerKg: 130, pricePerKg: 540, shelf: "12 mo", note: "All-purpose gravy depth" },
  { name: "Chhole Masala", img: "/images/products/chhole-masala.png", base: "#C41E1E", deep: "#6B0F0F", category: "Premium Blends", cuisine: "North Indian", packs: "1kg · 5kg", yieldPerKg: 120, pricePerKg: 560, shelf: "12 mo", note: "North-Indian tang" },
  // Biryani Masala parked until the client supplies a pack photo (old site has none):
  // { name: "Biryani Masala", base: "#8B5A2B", deep: "#4A2F16", category: "Premium Blends", cuisine: "North Indian", packs: "1kg · 5kg · 25kg", yieldPerKg: 110, pricePerKg: 680, shelf: "12 mo", note: "Layered & slow-built" },
  { name: "Paneer Masala", img: "/images/products/paneer-masala.png", base: "#E89A3D", deep: "#8A531E", category: "Premium Blends", cuisine: "North Indian", packs: "1kg · 5kg", yieldPerKg: 125, pricePerKg: 590, shelf: "12 mo", note: "Rich gravy base" },
  { name: "Rajma Masala", img: "/images/products/rajma-masala.png", base: "#A63A1F", deep: "#5C1E10", category: "Premium Blends", cuisine: "North Indian", packs: "1kg · 5kg", yieldPerKg: 120, pricePerKg: 550, shelf: "12 mo", note: "Punjabi comfort" },
  { name: "Sambhar Masala", img: "/images/products/sambhar-masala.png", base: "#C4471D", deep: "#5C2210", category: "Premium Blends", cuisine: "South Indian", packs: "1kg · 5kg · 25kg", yieldPerKg: 140, pricePerKg: 520, shelf: "12 mo", note: "South-Indian staple" },
  { name: "Pavbhaji Masala", img: "/images/products/pavbhaji-masala.png", base: "#D9481A", deep: "#7A2A0C", category: "Premium Blends", cuisine: "Street", packs: "1kg · 5kg", yieldPerKg: 135, pricePerKg: 530, shelf: "12 mo", note: "Mumbai street classic" },
  { name: "Chat Masala", img: "/images/products/chat-masala.png", base: "#6B5A3A", deep: "#2E2416", category: "Premium Blends", cuisine: "Street", packs: "1kg · 5kg", yieldPerKg: 220, pricePerKg: 480, shelf: "12 mo", note: "The finishing sprinkle" },
  { name: "Pani Puri Masala", img: "/images/products/pani-puri-masala.png", base: "#6E7A45", deep: "#3A4224", category: "Premium Blends", cuisine: "Street", packs: "1kg", yieldPerKg: 240, pricePerKg: 460, shelf: "12 mo", note: "Sharp & tamarind-forward" },
  { name: "Saffron", img: "/images/products/saffron.png", base: "#E8A33D", deep: "#A63A1F", category: "Premium Blends", cuisine: "Universal", packs: "1g · 5g · 10g", yieldPerKg: null, pricePerKg: null, shelf: "24 mo", note: "The rarest thread", threads: true },
  { name: "Kesari Milk Masala", img: "/images/products/kesari-milk.png", base: "#E8C468", deep: "#B5761E", category: "Premium Blends", cuisine: "Universal", packs: "1kg · 5kg", yieldPerKg: 180, pricePerKg: 720, shelf: "12 mo", note: "For festival milk" },
  // — Single Spice Powders (client to supply pack photos) —
  { name: "Turmeric Powder", category: "Single Spice Powders", base: "#F2A900", deep: "#8A5F0E", cuisine: "Universal", packs: "1kg · 5kg · 25kg", yieldPerKg: 200, pricePerKg: 320, shelf: "12 mo", note: "High-curcumin Salem type" },
  { name: "Red Chilli Powder", category: "Single Spice Powders", base: "#C41E1E", deep: "#6B0F0F", cuisine: "Universal", packs: "1kg · 5kg · 25kg", yieldPerKg: 190, pricePerKg: 380, shelf: "12 mo", note: "Teja heat, Byadgi colour" },
  { name: "Coriander Powder", category: "Single Spice Powders", base: "#6E7A45", deep: "#3A4224", cuisine: "Universal", packs: "1kg · 5kg · 25kg", yieldPerKg: 180, pricePerKg: 290, shelf: "12 mo", note: "Eagle-grade, green tint" },
  { name: "Cumin Powder", category: "Single Spice Powders", base: "#8B5A2B", deep: "#4A2F16", cuisine: "Universal", packs: "1kg · 5kg", yieldPerKg: 210, pricePerKg: 520, shelf: "12 mo", note: "Unjha bold, freshly milled" },
  // — CTC / Whole Spices (client to supply pack photos) —
  { name: "Black Pepper (Whole)", category: "CTC Spices", base: "#3A2A1A", deep: "#1E140A", cuisine: "Universal", packs: "5kg · 25kg", yieldPerKg: null, pricePerKg: null, shelf: "24 mo", note: "Idukki estate MG-1" },
  { name: "Cumin Seeds (Whole)", category: "CTC Spices", base: "#8B5A2B", deep: "#4A2F16", cuisine: "Universal", packs: "5kg · 25kg", yieldPerKg: null, pricePerKg: null, shelf: "24 mo", note: "Machine-cleaned, bold" },
  { name: "Coriander Seeds (Whole)", category: "CTC Spices", base: "#6E7A45", deep: "#3A4224", cuisine: "Universal", packs: "5kg · 25kg", yieldPerKg: null, pricePerKg: null, shelf: "24 mo", note: "Kota eagle grade" },
  { name: "Red Chilli (Whole)", category: "CTC Spices", base: "#C41E1E", deep: "#6B0F0F", cuisine: "Universal", packs: "5kg · 25kg", yieldPerKg: null, pricePerKg: null, shelf: "24 mo", note: "Guntur Teja & Byadgi" },
];

export const CATEGORIES = ["All", "Premium Blends", "Single Spice Powders", "CTC Spices"];

export const HORECA_SOLUTIONS = [
  { title: "Restaurant Packs", desc: "1kg and 5kg kitchen-format packs with resealable liners — built for daily prep, not retail shelves.", points: ["Consistent batch profile", "Chef-format packaging", "Standing monthly orders"] },
  { title: "Catering Solutions", desc: "Event-scale supply with surge capacity — wedding seasons and banquet calendars planned in advance.", points: ["25kg bulk + mixed pallets", "Season surge planning", "Menu-costing support"] },
  { title: "Institutional Supply", desc: "Contract supply for hotel groups, cloud kitchens, industrial canteens and rail/hospital caterers.", points: ["Rate contracts & tenders", "Per-batch COA documentation", "Dedicated account manager"] },
];

export const BLOG_POSTS = [
  { slug: "reduce-food-cost-standardized-masalas", title: "How hotels reduce food cost using standardized masalas", excerpt: "Food cost is won or lost in consistency. Here's the math hotels use when they switch from loose-ground spice to standardized blends.", date: "2026-07-10", minutes: 6 },
  { slug: "cost-per-plate-masala-math", title: "Cost-per-plate: the only masala metric that matters", excerpt: "Price per kilo is a distraction. Yield per kilo is the number your P&L actually feels.", date: "2026-06-28", minutes: 4 },
  { slug: "batch-codes-and-kitchen-audits", title: "Why batch codes make kitchen audits painless", excerpt: "FSSAI audits, brand audits, franchise audits — a traceable masala shelf turns a stressful day into a checklist.", date: "2026-06-12", minutes: 5 },
];

export const ORIGINS = [
  { name: "Chilli", place: "Guntur, Andhra Pradesh", x: 46, y: 71, base: "#C41E1E", detail: "Teja & Byadgi grades, bought at mandi auctions each season." },
  { name: "Turmeric", place: "Sangli, Maharashtra", x: 30, y: 67, base: "#F2A900", detail: "High-curcumin Salem-type fingers, polished in-house." },
  { name: "Black Pepper", place: "Idukki, Kerala", x: 36, y: 88, base: "#3A2A1A", detail: "Estate-direct MG-1 pepper, sun-dried on the farm." },
  { name: "Saffron", place: "Pampore, Kashmir", x: 33, y: 10, base: "#A63A1F", detail: "Mongra-grade threads, hand-picked in October harvests." },
  { name: "Cumin", place: "Unjha, Gujarat", x: 17, y: 42, base: "#8B5A2B", detail: "Bold machine-cleaned cumin from Asia's largest jeera market." },
  { name: "Coriander", place: "Kota, Rajasthan", x: 27, y: 31, base: "#5C6B3F", detail: "Eagle-grade coriander with the green tint chefs look for." },
];

export const HOME_NODE = { name: "Rainbow Blending House", place: "Chh. Sambhajinagar, Maharashtra", x: 31, y: 61 };

export const RECIPES = [
  { name: "Hotel-style Sambhar Base", base: "#C4471D", deep: "#5C2210", batch: "10L base · 80 plates", uses: "Sambhar Masala 320g", time: "45 min", img: "/images/recipes/sambhar.jpg" },
  { name: "Bulk Chhole (Catering)", base: "#C41E1E", deep: "#6B0F0F", batch: "8kg chana · 120 plates", uses: "Chhole Masala 640g", time: "70 min", img: "/images/recipes/chhole.jpg" },
  { name: "Kitchen King Veg Base (Banquet)", base: "#E89A3D", deep: "#8A531E", batch: "12L gravy · 100 plates", uses: "Kitchen King Masala 900g", time: "55 min", img: "/images/recipes/kitchen-king.jpg" },
];

export const TESTIMONIALS = [
  { name: "Chef Prakash Rao", role: "Executive Chef, 3-property hotel group", quote: "Same garam masala profile across all three kitchens for two years. That's the whole point.", accent: "#C41E1E" },
  { name: "Imran Shaikh", role: "Owner, 400-cover caterer", quote: "Costing a wedding menu is easier when a kilo behaves like the last kilo.", accent: "#F2A900" },
  { name: "Meera Kulkarni", role: "F&B Manager, cloud-kitchen chain", quote: "We switched for the batch codes. We stayed for the supply reliability.", accent: "#A63A1F" },
];

export const TIMELINE = [
  { year: "1956", text: "A single spice shop opens in Aurangpura." },
  { year: "1988", text: "First stone-ground blends sold under the Rainbow name." },
  { year: "2005", text: "Dedicated blending unit; hotels become regular buyers." },
  { year: "2018", text: "Batch coding and QC lab introduced." },
  { year: "2026", text: "Full traceability — every pack scans back to its farm lots." },
];

export const DISTRIBUTOR = {
  investment: "₹3–8 lakh",
  roi: "14–18 months",
  margin: "12–18%",
  support: ["Territory exclusivity", "First-stock buyback guarantee", "Route-plan & beat support", "HORECA lead hand-off from this website"],
  territories: ["Vidarbha", "Marathwada", "North Karnataka", "Telangana", "Madhya Pradesh (South)"],
};

export const FAQS = [
  { q: "What is the minimum order for bulk supply?", a: "25kg per blend for direct HORECA supply. Below that, we route you to the nearest distributor so you get local delivery." },
  { q: "How do you keep taste consistent between batches?", a: "Fixed sourcing regions, lab-checked raw lots, and batch coding on every pack. Any pack can be traced back to the farm lots inside it." },
  { q: "Do you make custom blends for hotels?", a: "Yes — for volumes above 100kg/month we develop and lock a private recipe with your chef, held confidentially in our formula vault." },
  { q: "What are your certifications?", a: "FSSAI licensed; GST-registered; lab COA available per batch on request." },
  { q: "Which cities do you currently deliver to?", a: "Direct dispatch across Maharashtra and to metro hubs; distributor coverage in 11 states. Use the availability finder above for your city." },
];
