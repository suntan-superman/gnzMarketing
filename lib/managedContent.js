import "server-only";
import { requireAdmin } from "@/lib/adminAuthorization";
import { createServiceClient } from "@/lib/supabase/server";

const selectedWorkPublicFields = "id, title, slug, category, summary, body, cover_image, image_alt, outcome, client_name, work_date, status, sort_order, featured, published_at";
const insightsPublicFields = "id, title, slug, excerpt, body, category, tags, cover_image, image_alt, attribution, source_url, original_published_at, status, sort_order, featured, published_at";
const opportunitiesPublicFields = "id, title, slug, summary, body, cover_image, image_alt, location, asset_type, status, sort_order";

function emptyManagedContent() {
  return { selectedWork: [], insights: [], opportunities: [], investmentPublicEnabled: false };
}

export async function getInvestmentOpportunitiesPublicEnabled() {
  const client = createServiceClient();
  if (!client) return false;
  const { data, error } = await client
    .from("gnz_content_settings")
    .select("boolean_value")
    .eq("key", "investment_opportunities_public_enabled")
    .maybeSingle();
  return !error && data?.boolean_value === true;
}

export async function getPublicSelectedWork() {
  const client = createServiceClient();
  if (!client) return [];
  const { data, error } = await client
    .from("gnz_selected_work")
    .select(selectedWorkPublicFields)
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("sort_order")
    .order("published_at", { ascending: false });
  return error ? [] : data || [];
}

export async function getPublicSelectedWorkBySlug(slug) {
  const client = createServiceClient();
  if (!client) return null;
  const { data, error } = await client
    .from("gnz_selected_work")
    .select(selectedWorkPublicFields)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return error ? null : data;
}

export async function getPublicInsights() {
  const client = createServiceClient();
  if (!client) return [];
  const { data, error } = await client
    .from("gnz_insights")
    .select(insightsPublicFields)
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("sort_order")
    .order("published_at", { ascending: false });
  return error ? [] : data || [];
}

export async function getPublicInsightBySlug(slug) {
  const client = createServiceClient();
  if (!client) return null;
  const { data, error } = await client
    .from("gnz_insights")
    .select(insightsPublicFields)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return error ? null : data;
}

export async function getPublicInvestmentOpportunities() {
  if (!await getInvestmentOpportunitiesPublicEnabled()) return [];
  const client = createServiceClient();
  if (!client) return [];
  const { data, error } = await client
    .from("gnz_investment_opportunities")
    .select(opportunitiesPublicFields)
    .eq("status", "published")
    .order("sort_order")
    .order("created_at", { ascending: false });
  return error ? [] : data || [];
}

export async function getPublicInvestmentOpportunityBySlug(slug) {
  if (!await getInvestmentOpportunitiesPublicEnabled()) return null;
  const client = createServiceClient();
  if (!client) return null;
  const { data, error } = await client
    .from("gnz_investment_opportunities")
    .select(opportunitiesPublicFields)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return error ? null : data;
}

export async function getAdminManagedContent() {
  await requireAdmin();
  const client = createServiceClient();
  if (!client) return emptyManagedContent();
  const [selectedWork, insights, opportunities, setting] = await Promise.all([
    client.from("gnz_selected_work").select("*").order("sort_order").order("created_at", { ascending: false }),
    client.from("gnz_insights").select("*").order("sort_order").order("created_at", { ascending: false }),
    client.from("gnz_investment_opportunities").select("*").order("sort_order").order("created_at", { ascending: false }),
    client.from("gnz_content_settings").select("key, boolean_value, updated_at, updated_by").eq("key", "investment_opportunities_public_enabled").maybeSingle(),
  ]);
  return {
    selectedWork: selectedWork.error ? [] : selectedWork.data || [],
    insights: insights.error ? [] : insights.data || [],
    opportunities: opportunities.error ? [] : opportunities.data || [],
    investmentPublicEnabled: !setting.error && setting.data?.boolean_value === true,
    investmentSetting: setting.data || null,
  };
}

export async function getAdminManagedRecord(kind, id) {
  await requireAdmin();
  const table = kind === "selected-work" ? "gnz_selected_work" : kind === "insights" ? "gnz_insights" : "gnz_investment_opportunities";
  const client = createServiceClient();
  if (!client) return null;
  const { data, error } = await client.from(table).select("*").eq("id", id).maybeSingle();
  return error ? null : data;
}
