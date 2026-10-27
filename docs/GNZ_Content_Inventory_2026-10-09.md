# GNZ Managed Content Inventory — October 9, 2026

This inventory records the disposition of content found in the existing GNZ Supabase-backed site before enabling the new admin-managed collections.

| Content | Current source | Existing public URL | Disposition | Reason |
| --- | --- | --- | --- | --- |
| Selected Work | No persisted Selected Work records found; the existing `lib/content.js` collection is empty | None | Omit until approved examples exist | No completed engagements, client permissions, or verified outcomes were supplied. No fictional examples were seeded. |
| Hale Forster on An N of 1 podcast. | `gnz_hub_entries` / legacy Hub seed `hub-1` | `/hub` (legacy) | Retain in legacy admin content; do not auto-migrate | Existing record has a summary and author but no source URL, date, or republication approval. |
| Uncovering the Why: LLMs in the Next Era of Marketing Analytics | `gnz_hub_entries` / legacy Hub seed `hub-2` | `/hub` (legacy) | Retain in legacy admin content; do not auto-migrate | Existing record is a short summary with no source URL, date, or explicit publication approval. |
| How Creative Testing Improves Marketing Confidence | `gnz_hub_entries` / legacy Hub seed `hub-3` | `/hub` (legacy) | Retain in legacy admin content; do not auto-migrate | Existing record is a short summary with no source URL, date, or explicit publication approval. |

The canonical public destination is now `/insights`. The legacy `/hub` route redirects to `/insights`, and `/hub/[slug]` redirects to the corresponding Insights detail path for future migrated records. The new `gnz_insights` collection is intentionally empty until an admin reviews and recreates suitable entries as drafts, preserving attribution and source links where available.

Investment Opportunities has no seeded records. Its global public setting is created as `false`, and its public list/detail routes return 404 while the setting is off.
