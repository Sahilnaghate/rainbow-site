// Rainbow Masala design tokens — brand colours extracted from the existing
// rainbowspices.com site (red #D22C2E/#BA2C28, amber #FAA219, golden #D48F26)
// on a warm cream base.
export const COLORS = {
  cream: "#FFF6E7",
  paper: "#FFFFFF",
  ink: "#2A160C",
  inkDim: "#6B5040",
  red: "#D22C2E",
  redDeep: "#8E1B1D",
  mustard: "#FAA219",
  gold: "#D48F26",
  paprika: "#BA2C28",
  cardamom: "#5C6B3F",
};

export function tint(hex, alpha) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

export const LINKS = {
  phone: "+918482859999",
  phoneDisplay: "+91 84828 59999",
  whatsapp: "https://wa.me/918355933962",
  email: "sales@rainbowspices.com",
  erp: "https://darakone-erp.vercel.app",
  instagram: "https://instagram.com/rainbowmasala",
  amazon: "https://www.amazon.in/s?k=rainbow+masala",
  flipkart: "https://www.flipkart.com/search?q=rainbow%20masala",
  indiamart: "https://www.indiamart.com/search.mp?ss=rainbow+masala",
};
