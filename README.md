# GNZ Marketing Website

Static Next.js site for GNZ Marketing, LLC.

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

The static export is written to `out/`.

## Netlify

Netlify settings are included in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `out`

## Notes

- Contact forms are visual-only right now. Email, SMS, CRM, or form storage can be added later.
- Principal bios, company about copy, certifications, and article content include placeholder/mock content.
- The generated hero image used by the site is saved at `public/images/gnz-hero.png`.
