-- GNZ October 2026 review positioning updates.
-- This preserves the existing principal record while updating Gabriel's
-- public-facing title and approved opening bio framing.
begin;

update public.gnz_principals
set
  role = 'Principal, Strategy & Business Development',
  bio = 'Gabriel brings experience across sales, marketing, business development, real estate, and relationship development, with a focus on understanding people, identifying opportunity, and creating practical paths to growth.'
where id = 'gabriel';

notify pgrst, 'reload schema';
commit;
