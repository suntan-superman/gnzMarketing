-- Add reversible lead lifecycle controls for the GNZ admin panel.
-- Archived leads remain in Supabase and can be restored. Permanent deletion is
-- available only after archival and is explicitly initiated by an admin.
begin;

alter table if exists public.gnz_leads
  add column if not exists archived_at timestamptz,
  add column if not exists archived_by uuid references auth.users(id) on delete set null;

grant delete on public.gnz_leads to service_role;

create index if not exists gnz_leads_archived_at_idx
  on public.gnz_leads (archived_at, created_at desc);

notify pgrst, 'reload schema';
commit;
