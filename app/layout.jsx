import "./globals.css";
import Shell from "../components/shell.jsx";

export const metadata = {
  title: "Rainbow Masala — Professional Kitchen Masala Partner",
  description: "Batch-coded, farm-traceable masalas for hotels, restaurants and caterers. Consistent taste, lower cost per plate, always in stock. Darak Foods, Chh. Sambhajinagar — since 1956.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
