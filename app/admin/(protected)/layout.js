import { requireAdmin } from "@/lib/adminAuthorization";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: { default: "GNZ Admin", template: "%s | GNZ Admin" }, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }) {
  const { profile } = await requireAdmin();
  return <AdminShell profile={profile}>{children}</AdminShell>;
}
