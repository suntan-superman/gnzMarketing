import "server-only";
import { createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/adminAuthorization";
import { hubEntries as defaultHubEntries, jobs as defaultJobs, principals as defaultPrincipals } from "@/lib/content";

function normalizePublicPrincipal(principal) {
  if (principal.id === "gabriel" || principal.name?.toLowerCase().includes("gabriel")) {
    const legacyBio = "Gabriel brings a practical operator's mindset to marketing strategy, client relationships, and growth planning.";
    const reviewBio = "Gabriel brings experience across sales, marketing, business development, real estate, and relationship development, with a focus on understanding people, identifying opportunity, and creating practical paths to growth.";
    return {
      ...principal,
      role: "Principal, Strategy & Business Development",
      bio: principal.bio === legacyBio ? reviewBio : principal.bio,
    };
  }
  return principal;
}

export async function getPublicPrincipals() {
  const client = createServiceClient();
  if (!client) return defaultPrincipals;
  const { data, error } = await client.from("gnz_principals").select("id, name, role, bio").order("sort_order");
  return error || !data?.length ? defaultPrincipals : data.map(normalizePublicPrincipal);
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
    principals: principalsResult.error || !principalsResult.data?.length ? defaultPrincipals : principalsResult.data.map(normalizePublicPrincipal),
    jobs: jobsResult.error || !jobsResult.data?.length ? defaultJobs : jobsResult.data,
    hubEntries: hubResult.error || !hubResult.data?.length ? defaultHubEntries : hubResult.data,
  };
}

export async function getAdminLeads({ search = "", status = "", service = "", leadType = "" } = {}) {
  await requireAdmin();
  const client = createServiceClient();
  if (!client) return [];
  let query = client
    .from("gnz_leads")
    .select("id, reference, created_at, first_name, last_name, company_name, phone, email, service, status, lead_type, source_site, property_address, property_city")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status) query = query.eq("status", status);
  if (service) query = query.eq("service", service);
  if (leadType) query = query.eq("lead_type", leadType);
  if (search) {
    const clean = search.replace(/[,%()]/g, " ").trim();
    if (clean) query = query.or(`first_name.ilike.%${clean}%,last_name.ilike.%${clean}%,company_name.ilike.%${clean}%,phone.ilike.%${clean}%,email.ilike.%${clean}%,reference.ilike.%${clean}%,property_address.ilike.%${clean}%,property_city.ilike.%${clean}%`);
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

export async function getAdminAssignees() {
  await requireAdmin();
  const client = createServiceClient();
  if (!client) return [];
  const { data, error } = await client.from("admin_users").select("user_id, display_name").order("display_name");
  return error ? [] : data;
}

export async function getLeadNotificationLog(leadId) {
  await requireAdmin();
  const client = createServiceClient();
  if (!client) return [];
  const { data, error } = await client.from("smkh_notification_logs").select("id, channel, status, error_code, attempted_at").eq("lead_id", leadId).order("attempted_at", { ascending: false }).limit(20);
  return error ? [] : data;
}

export async function getDashboardData() {
  await requireAdmin();
  const client = createServiceClient();
  if (!client) return { leads: [], counts: {} };
  const [leadsResult, countResults] = await Promise.all([
    client.from("gnz_leads").select("id, reference, created_at, first_name, last_name, company_name, service, status, lead_type, source_site").order("created_at", { ascending: false }).limit(8),
    Promise.all(["new", "contacted", "qualified", "in_discussion", "closed", "not_proceeding"].map(async (status) => {
      const { count } = await client.from("gnz_leads").select("id", { count: "exact", head: true }).eq("status", status);
      return [status, count || 0];
    })),
  ]);
  return { leads: leadsResult.data || [], counts: Object.fromEntries(countResults) };
}
