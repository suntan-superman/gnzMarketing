import { redirect } from "next/navigation";

export default async function HubDetailRedirect({ params }) {
  redirect(`/insights/${(await params).slug}`);
}
