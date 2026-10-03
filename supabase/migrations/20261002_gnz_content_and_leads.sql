-- GNZ Marketing content and lead storage in the shared CutPro Supabase project.
-- Run after the existing CutPro schema. This migration is additive and isolated
-- from CutPro's public.leads records.
begin;

create table if not exists public.gnz_leads (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  submission_token uuid not null unique,
  source text not null default 'contact',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null default '',
  company_name text not null default '',
  phone text not null,
  email text not null,
  service text not null,
  message text not null,
  internal_notes text not null default '',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed'))
);

create table if not exists public.gnz_principals (
  id text primary key,
  name text not null,
  role text not null,
  bio text not null,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.gnz_jobs (
  id text primary key,
  name text not null default '',
  description text not null default '',
  is_published boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.gnz_hub_entries (
  id text primary key,
  title text not null default '',
  description text not null default '',
  author text not null default '',
  is_published boolean not null default true,
  sort_order integer not null default 0,
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

drop trigger if exists gnz_leads_updated_at on public.gnz_leads;
create trigger gnz_leads_updated_at before update on public.gnz_leads
for each row execute function public.set_updated_at();

drop trigger if exists gnz_principals_updated_at on public.gnz_principals;
create trigger gnz_principals_updated_at before update on public.gnz_principals
for each row execute function public.set_updated_at();

drop trigger if exists gnz_jobs_updated_at on public.gnz_jobs;
create trigger gnz_jobs_updated_at before update on public.gnz_jobs
for each row execute function public.set_updated_at();

drop trigger if exists gnz_hub_entries_updated_at on public.gnz_hub_entries;
create trigger gnz_hub_entries_updated_at before update on public.gnz_hub_entries
for each row execute function public.set_updated_at();

insert into public.gnz_principals (id, name, role, bio, sort_order)
values
  ('gabriel', 'Gabriel Gonzales', 'Principal, Strategy and Client Growth', 'Gabriel brings a practical operator''s mindset to marketing strategy, client relationships, and growth planning.', 0),
  ('zay', 'Zay Aaron-Julian', 'Principal, Campaigns and Performance', 'Zay focuses on campaign execution, audience engagement, and translating insights into measurable marketing action.', 1)
on conflict (id) do nothing;

insert into public.gnz_jobs (id, sort_order)
values ('job-1', 0), ('job-2', 1), ('job-3', 2)
on conflict (id) do nothing;

insert into public.gnz_hub_entries (id, title, description, author, sort_order)
values
  ('hub-1', 'Hale Forster on An N of 1 podcast.', 'A placeholder expert post about marrying academic knowledge with industry research to support positive behavior change.', 'GNZ Marketing', 0),
  ('hub-2', 'Uncovering the Why: LLMs in the Next Era of Marketing Analytics', 'A short article placeholder about why understanding why something works matters more than measurement alone.', 'GNZ Insights', 1),
  ('hub-3', 'How Creative Testing Improves Marketing Confidence', 'A practical placeholder note on using pre-testing, audience signals, and iteration to reduce campaign guesswork.', 'GNZ Strategy', 2)
on conflict (id) do nothing;

alter table public.gnz_leads enable row level security;
alter table public.gnz_principals enable row level security;
alter table public.gnz_jobs enable row level security;
alter table public.gnz_hub_entries enable row level security;

revoke all on public.gnz_leads, public.gnz_principals, public.gnz_jobs, public.gnz_hub_entries from public, anon, authenticated;
grant select, insert, update on public.gnz_leads to service_role;
grant select, insert, update on public.gnz_principals, public.gnz_jobs, public.gnz_hub_entries to service_role;

create index if not exists gnz_leads_created_at_idx on public.gnz_leads (created_at desc);
create index if not exists gnz_leads_status_idx on public.gnz_leads (status);
create index if not exists gnz_leads_service_idx on public.gnz_leads (service);
create index if not exists gnz_jobs_public_idx on public.gnz_jobs (is_published, sort_order);
create index if not exists gnz_hub_entries_public_idx on public.gnz_hub_entries (is_published, sort_order);

notify pgrst, 'reload schema';
commit;
