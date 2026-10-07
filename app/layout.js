import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import SiteFrame from "@/components/SiteFrame";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "GNZ Marketing Group | Business Development, Marketing & Real Estate",
  description:
    "GNZ Marketing Group combines business development, strategic marketing, real estate opportunities, behavioral insight, and strategic relationships to help organizations identify opportunities and grow.",
  metadataBase: new URL("https://gnzmarketingllc.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable}`}>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
