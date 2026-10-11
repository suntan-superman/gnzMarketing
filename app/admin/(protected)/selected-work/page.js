import ManagedContentEditor from "@/components/admin/ManagedContentEditor";
import { getAdminManagedContent } from "@/lib/managedContent";

export const metadata = { title: "Selected Work" };

export default async function AdminSelectedWorkPage() {
  const content = await getAdminManagedContent();
  return <><header className="admin-page-header"><div><p>Review-only public content</p><h1>Selected Work</h1><span>Manage approved examples only. Drafts are private until explicitly published.</span></div></header><ManagedContentEditor kind="selected-work" initialRecords={content.selectedWork} /></>;
}
