# GNZ Marketing Website

Next.js site for GNZ Marketing, LLC with Supabase-backed contact capture and a protected content admin panel.

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Production Build

```bash
npm run build
```

The production build is written to `.next/` and requires a Node-capable runtime for contact submissions and admin pages.

## Netlify

Netlify settings are included in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `.next`

## Notes

- Contact submissions are stored in Supabase table `gnz_leads` and can be reviewed from `/admin`.
- Principal bios, three job slots, and three Hub entry slots are managed from `/admin/content`.
- The generated hero image used by the site is saved at `public/images/gnz-hero.png`.

## Supabase setup

GNZ uses the existing CutPro Supabase project and credential names. Run
`supabase/migrations/20261002_gnz_content_and_leads.sql` after the CutPro schema.
The migration creates isolated `gnz_*` tables and grants access only to the server
role. It does not modify CutPro leads.

The existing shared `admin_users` table controls GNZ admin access. With the local
`ADMIN`, `ADMIN_PW`, `ADMIN2`, and `ADMIN2_PW` variables configured, provision the
two administrator accounts explicitly with:

```bash
npm run admin:provision
npm run admin:provision -- --reset-passwords
```

The command does not print passwords. It creates missing Supabase Auth users and
adds their IDs to `admin_users`; existing users are not reset automatically.
Use the second command only when you intentionally want the configured local
passwords applied to existing users.
Sign in at `/admin/login`.

The public contact form uses `NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY` only for the
site's displayed telephone number. `EMAIL_FROM`, `EMAIL_REPLY_TO`, and
`LEAD_NOTIFICATION_EMAIL` should use GNZ-approved values even though the Resend
provider credentials may be shared with CutPro.

//////////////////////////////////
To run locally:
npx serve@latest out

/////////////////////////////////

