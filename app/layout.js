import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import SiteFrame from "@/components/SiteFrame";
import StructuredData from "@/components/StructuredData";
import Analytics from "@/components/Analytics";
import { getInvestmentOpportunitiesPublicEnabled } from "@/lib/managedContent";
import { createPageMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

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
  ...createPageMetadata({
    title: "GNZ Marketing Group | Business Development, Marketing & Real Estate",
    description: "GNZ Marketing Group combines business development, strategic marketing, real estate opportunities, behavioral insight, and strategic relationships to help organizations identify opportunities and grow.",
  }),
  metadataBase: new URL("https://gnzmarketingllc.com"),
};

export default async function RootLayout({ children }) {
  const investmentOpportunitiesEnabled = await getInvestmentOpportunitiesPublicEnabled();
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable}`}>
        <StructuredData data={organizationJsonLd()} />
        <StructuredData data={websiteJsonLd()} />
        <Analytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <SiteFrame investmentOpportunitiesEnabled={investmentOpportunitiesEnabled}>{children}</SiteFrame>
      </body>
    </html>
  );
}
