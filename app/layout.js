import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingContact from "@/components/FloatingContact";

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
  title: "GNZ Marketing, LLC | Marketing Powered by Data",
  description:
    "GNZ Marketing helps organizations transform data into actionable insights, smarter campaigns, and measurable business growth.",
  metadataBase: new URL("https://gnzmarketingllc.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable}`}>
        <SiteHeader />
        <main>{children}</main>
        <FloatingContact />
        <SiteFooter />
      </body>
    </html>
  );
}
