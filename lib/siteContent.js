import "server-only";
import { createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/adminAuthorization";
import { hubEntries as defaultHubEntries, jobs as defaultJobs, principals as defaultPrincipals } from "@/lib/content";

export async function getPublicPrincipals() {
  const client = createServiceClient();
  if (!client) return defaultPrincipals;
  const { data, error } = await client.from("gnz_principals").select("id, name, role, bio").order("sort_order");
  return error || !data?.length ? defaultPrincipals : data;
}

export async function getPublicJobs() {
  const client = createServiceClient();
  if (!client) return [];
  const { data, error } = await client
    .from("gnz_jobs")
    .select("id, name, description")
    .eq("is_published", true)
    .order("sort_order");
  if (error) return [];
  return data.filter((job) => job.name?.trim() && job.description?.trim());
}

export async function getPublicHubEntries() {
  const client = createServiceClient();
  if (!client) return defaultHubEntries;
  const { data, error } = await client
    .from("gnz_hub_entries")
    .select("id, title, description, author")
    .eq("is_published", true)
    .order("sort_order");
  if (error) return defaultHubEntries;
  return data.filter((entry) => entry.title?.trim() && entry.description?.trim());
}

export async function getAdminContent() {
  await requireAdmin();
  const client = createServiceClient();
  if (!client) return { principals: defaultPrincipals, jobs: defaultJobs, hubEntries: defaultHubEntries };
  const [principalsResult, jobsResult, hubResult] = await Promise.all([
    client.from("gnz_principals").select("id, name, role, bio, sort_order").order("sort_order"),
    client.from("gnz_jobs").select("id, name, description, is_published, sort_order").order("sort_order"),
    client.from("gnz_hub_entries").select("id, title, description, author, is_published, sort_order").order("sort_order"),
  ]);
  return {
    principals: principalsResult.error || !principalsResult.data?.length ? defaultPrincipals : principalsResult.data,
    jobs: jobsResult.error || !jobsResult.data?.length ? defaultJobs : jobsResult.data,
    hubEntries: hubResult.error || !hubResult.data?.length ? defaultHubEntries : hubResult.data,
  };
}

export async function getAdminLeads({ search = "", status = "", service = "" } = {}) {
  await requireAdmin();
  const client = createServiceClient();
  if (!client) return [];
  let query = client
    .from("gnz_leads")
    .select("id, reference, created_at, first_name, last_name, company_name, phone, email, service, status")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status) query = query.eq("status", status);
  if (service) query = query.eq("service", service);
  if (search) {
    const clean = search.replace(/[,%()]/g, " ").trim();
    if (clean) query = query.or(`first_name.ilike.%${clean}%,last_name.ilike.%${clean}%,company_name.ilike.%${clean}%,phone.ilike.%${clean}%,email.ilike.%${clean}%,reference.ilike.%${clean}%`);
  }
  const { data, error } = await query;
  return error ? [] : data;
}

export async function getAdminLead(id) {
  await requireAdmin();
  const client = createServiceClient();
  if (!client) return null;
  const { data } = await client.from("gnz_leads").select("*").eq("id", id).maybeSingle();
  return data || null;
}

export async function getDashboardData() {
  await requireAdmin();
  const client = createServiceClient();
  if (!client) return { leads: [], counts: {} };
  const [leadsResult, countResults] = await Promise.all([
    client.from("gnz_leads").select("id, reference, created_at, first_name, last_name, company_name, service, status").order("created_at", { ascending: false }).limit(8),
    Promise.all(["new", "contacted", "qualified", "closed"].map(async (status) => {
      const { count } = await client.from("gnz_leads").select("id", { count: "exact", head: true }).eq("status", status);
      return [status, count || 0];
    })),
  ]);
  return { leads: leadsResult.data || [], counts: Object.fromEntries(countResults) };
}
