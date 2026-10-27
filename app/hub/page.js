import { redirect } from "next/navigation";

export const metadata = { title: "Insights | GNZ Marketing Group" };

export default function HubPage() {
  redirect("/insights");
}
