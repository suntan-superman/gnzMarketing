import ManagedContentEditor from "@/components/admin/ManagedContentEditor";
import { getAdminManagedContent } from "@/lib/managedContent";

export const metadata = { title: "Investment Opportunities" };

export default async function AdminInvestmentOpportunitiesPage() {
  const content = await getAdminManagedContent();
  return <><header className="admin-page-header"><div><p>Private Real Estate area</p><h1>Investment Opportunities</h1><span>Create private drafts for future review. Nothing is public while the global gate is off.</span></div></header><ManagedContentEditor kind="investment-opportunities" initialRecords={content.opportunities} investmentPublicEnabled={content.investmentPublicEnabled} /></>;
}
