-- Remove implementation-only placeholder wording from existing GNZ Insights
-- records without overwriting any content an administrator has edited.
begin;

update public.gnz_hub_entries
set description = replace(description, 'A placeholder expert post about', 'A conversation about')
where id = 'hub-1' and description like 'A placeholder expert post about%';

update public.gnz_hub_entries
set description = replace(description, 'A short article placeholder about', 'A short note about')
where id = 'hub-2' and description like 'A short article placeholder about%';

update public.gnz_hub_entries
set description = replace(description, 'A practical placeholder note on', 'A practical note on')
where id = 'hub-3' and description like 'A practical placeholder note on%';

notify pgrst, 'reload schema';
commit;
