// Rainbow Masala design tokens — warm cream base, Everest-style red + mustard.
export const COLORS = {
  cream: "#FFF6E7",
  paper: "#FFFFFF",
  ink: "#2A160C",
  inkDim: "#6B5040",
  red: "#C41E1E",
  redDeep: "#7A1414",
  mustard: "#F2A900",
  gold: "#C9A667",
  paprika: "#A63A1F",
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
