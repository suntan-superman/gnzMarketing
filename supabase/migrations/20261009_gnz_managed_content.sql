-- GNZ managed Selected Work, Insights, and gated Investment Opportunities.
-- Additive migration: legacy gnz_hub_entries remains intact for review/admin
-- reference and is not deleted or rewritten here.
begin;

create table if not exists public.gnz_selected_work (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default 'Marketing',
  summary text not null default '',
  body text not null default '',
  cover_image text not null default '',
  image_alt text not null default '',
  outcome text not null default '',
  client_name text not null default '',
  work_date date,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  featured boolean not null default false,
  source_reference text not null default '',
  approval_notes text not null default '',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.gnz_insights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body text not null default '',
  category text not null default '',
  tags text[] not null default '{}',
  cover_image text not null default '',
  image_alt text not null default '',
  attribution text not null default '',
  source_url text not null default '',
  original_published_at date,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.gnz_investment_opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  body text not null default '',
  cover_image text not null default '',
  image_alt text not null default '',
  location text not null default '',
  asset_type text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  internal_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.gnz_content_settings (
  key text primary key,
  boolean_value boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists gnz_selected_work_updated_at on public.gnz_selected_work;
create trigger gnz_selected_work_updated_at before update on public.gnz_selected_work
for each row execute function public.set_updated_at();

drop trigger if exists gnz_insights_updated_at on public.gnz_insights;
create trigger gnz_insights_updated_at before update on public.gnz_insights
for each row execute function public.set_updated_at();

drop trigger if exists gnz_investment_opportunities_updated_at on public.gnz_investment_opportunities;
create trigger gnz_investment_opportunities_updated_at before update on public.gnz_investment_opportunities
for each row execute function public.set_updated_at();

drop trigger if exists gnz_content_settings_updated_at on public.gnz_content_settings;
create trigger gnz_content_settings_updated_at before update on public.gnz_content_settings
for each row execute function public.set_updated_at();

insert into public.gnz_content_settings (key, boolean_value)
values ('investment_opportunities_public_enabled', false)
on conflict (key) do nothing;

create or replace function public.gnz_investment_opportunities_public_enabled()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.gnz_content_settings
    where key = 'investment_opportunities_public_enabled' and boolean_value = true
  );
$$;

revoke all on function public.gnz_investment_opportunities_public_enabled() from public, anon, authenticated;
grant execute on function public.gnz_investment_opportunities_public_enabled() to anon, authenticated, service_role;

alter table public.gnz_selected_work enable row level security;
alter table public.gnz_insights enable row level security;
alter table public.gnz_investment_opportunities enable row level security;
alter table public.gnz_content_settings enable row level security;

revoke all on public.gnz_selected_work, public.gnz_insights, public.gnz_investment_opportunities, public.gnz_content_settings from public, anon, authenticated;
grant select on public.gnz_selected_work, public.gnz_insights, public.gnz_investment_opportunities to anon, authenticated;
grant select, insert, update, delete on public.gnz_selected_work, public.gnz_insights, public.gnz_investment_opportunities, public.gnz_content_settings to service_role;

drop policy if exists gnz_selected_work_public_read on public.gnz_selected_work;
create policy gnz_selected_work_public_read on public.gnz_selected_work
for select to anon, authenticated using (status = 'published');

drop policy if exists gnz_insights_public_read on public.gnz_insights;
create policy gnz_insights_public_read on public.gnz_insights
for select to anon, authenticated using (status = 'published');

drop policy if exists gnz_investment_opportunities_public_read on public.gnz_investment_opportunities;
create policy gnz_investment_opportunities_public_read on public.gnz_investment_opportunities
for select to anon, authenticated using (
  status = 'published'
  and public.gnz_investment_opportunities_public_enabled()
);

create index if not exists gnz_selected_work_public_idx on public.gnz_selected_work (status, featured, sort_order);
create index if not exists gnz_insights_public_idx on public.gnz_insights (status, featured, sort_order);
create index if not exists gnz_investment_opportunities_public_idx on public.gnz_investment_opportunities (status, sort_order);

update public.gnz_principals
set bio = 'Zay brings knowledge of human behavior and decision-making, including a master’s degree in Behavioral Science from Arizona State University, to GNZ’s marketing, relationship, and opportunity-focused work.'
where id = 'zay'
  and bio = 'Zay focuses on campaign execution, audience engagement, and translating insights into measurable marketing action.';

notify pgrst, 'reload schema';
commit;
