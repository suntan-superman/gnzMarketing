import ManagedContentEditor from "@/components/admin/ManagedContentEditor";
import { getAdminManagedContent } from "@/lib/managedContent";

export const metadata = { title: "Insights" };

export default async function AdminInsightsPage() {
  const content = await getAdminManagedContent();
  return <><header className="admin-page-header"><div><p>Public editorial content</p><h1>Insights</h1><span>Review, edit, and publish accurate GNZ perspectives without auto-publishing legacy Hub material.</span></div></header><ManagedContentEditor kind="insights" initialRecords={content.insights} /></>;
}
