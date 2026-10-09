import { getAdminContent } from "@/lib/siteContent";
import ContentEditor from "@/components/admin/ContentEditor";

export default async function ContentPage() {
  const content = await getAdminContent();
  return <><header className="admin-page-header"><div><p>Public website</p><h1>Site content</h1><span>Manage the About, Jobs, and Insights sections without changing code.</span></div></header><ContentEditor initialContent={content} /></>;
}
