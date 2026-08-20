# Sant Kabir Ji & Maghar — Community Website

A bilingual (Hindi/English) website for a Sant Kabir Ji / Maghar spiritual and
community institution: teachings and history of Sant Kabir Das Ji, the
pilgrimage site of Maghar, the contemporary role of Mahant Vichar Das Ji,
community activities, events, gallery, and a donation system.

See also:

- [`CONTENT_REQUIRED.md`](./CONTENT_REQUIRED.md) — every placeholder that
  still needs verified, organisation-supplied information before launch.
- [`RESEARCH_SOURCES.md`](./RESEARCH_SOURCES.md) — sources used to write the
  site's factual content, and their reliability classification.
- [`IMAGE_SOURCES.md`](./IMAGE_SOURCES.md) — licensing/attribution record for
  every externally-sourced image on the site.

## 1. Architecture

- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS v4 (CSS-based theme in `src/app/globals.css`)
- **i18n:** [next-intl](https://next-intl.dev) — `hi` (default) and `en`,
  locale-prefixed routes under `src/app/[locale]/`
- **Database:** SQLite by default (zero external setup) via Prisma 7 with
  the `@prisma/adapter-better-sqlite3` driver adapter — schema is written to
  be portable to PostgreSQL for production (see §6 below)
- **Admin CMS:** a separate, non-locale-routed tree at `src/app/admin/`,
  cookie/JWT session auth (`src/lib/auth.ts`), role-based access
- **Payments:** Razorpay (Orders API + Checkout.js + webhook), see §8
- **Email:** SMTP via Nodemailer (no-op/logs to console if unconfigured)

### Directory guide

```
src/app/[locale]/        Public site pages (locale-prefixed)
src/app/admin/            Admin CMS (English-only, not locale-prefixed)
src/app/api/donations/    Payment API routes (create-order, verify, webhook)
src/app/actions/forms.ts  Server actions for contact/volunteer/newsletter
src/components/ui/        Shared design-system primitives
src/components/site/      Header, Footer, nav, JSON-LD helper
src/components/forms/     Public-facing form components
src/components/admin/     Admin shell/sidebar
src/content/               Long-form bilingual content (dohas, image sources)
src/lib/                   Server-only libraries: db, auth, payments, email,
                            settings, validation, rate-limit, utils
prisma/schema.prisma       Database schema
prisma/seed.ts             Seed script (donation purposes, dohas, demo data)
messages/{hi,en}.json      UI-chrome translation catalogs (nav, forms, footer)
```

### Content model — three tiers

Per the project brief, content is deliberately split into three tiers:

1. **Permanent spiritual content** (Sant Kabir's life, teachings, dohas,
   Kabir Panth, Maghar's history) — written directly into page components as
   local bilingual `content` objects, or in `src/content/dohas.ts`. This is
   edited by a developer, not through the CMS, since it is stable reference
   material with careful VERIFIED/TRADITIONAL sourcing distinctions (see the
   `FactBadge` component used throughout).
2. **Institutional content** (Mahant Ji's messages, events, gallery,
   testimonials, donation purposes, site settings) — fully CMS-editable
   through `/admin`.
3. **Dynamic/transactional content** (donations, contact enquiries,
   volunteer applications, newsletter subscribers) — database-only, viewed
   and exported through `/admin`.

## 2. Installation

```bash
npm install
cp .env.example .env
# edit .env — at minimum set AUTH_SECRET to a long random string
npm run db:migrate      # creates prisma/dev.db and applies the schema
npm run db:seed         # seeds donation purposes, dohas, demo content,
                         # and the initial Super Admin (from .env)
npm run dev
```

Visit `http://localhost:3000` for the public site (redirects to `/hi`) and
`http://localhost:3000/admin/login` for the admin panel.

## 3. Environment variables

See [`.env.example`](./.env.example) for the full list with comments. Key
ones:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Prisma connection string (`file:./dev.db` for local dev) |
| `AUTH_SECRET` | Signs admin session JWTs — **must** be a long random value in production (`openssl rand -base64 48`) |
| `INITIAL_ADMIN_EMAIL` / `INITIAL_ADMIN_PASSWORD` | Read only by `npm run db:seed` to create the first Super Admin |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` / `RAZORPAY_WEBHOOK_SECRET` | Payment gateway — use **test/sandbox** keys in development |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Public key exposed to the browser checkout widget |
| `SMTP_*` | Outbound email (donation receipts, form notifications) |
| `NOTIFICATIONS_TO_EMAIL` | Where contact/volunteer/donation-enquiry notifications are sent |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_META_PIXEL_ID` | Optional analytics — leave blank to disable |

`.env` is git-ignored. Never commit real secrets — `.env.example` contains
placeholders only.

## 4. Admin CMS

- `/admin/login` — sign in
- Roles: `SUPER_ADMIN`, `CONTENT_MANAGER`, `DONATION_MANAGER`,
  `EVENT_MANAGER` — each role sees only the sidebar sections it's permitted
  to use (`src/components/admin/AdminNav.tsx`), and every server action
  independently re-verifies the role server-side (never trusts the sidebar
  filter alone).
- Sections: Dashboard, Events, Gallery, Videos, Messages/Pravachan, Doha
  Library, Testimonials, Donations, Donation Purposes, Enquiries,
  Volunteers, Newsletter, Settings, Admin Users.
- To create additional admin accounts later (e.g. if you're locked out or
  need a second Super Admin), run:

  ```bash
  npm run create-admin
  ```

  This is an interactive CLI (`scripts/create-admin.ts`) — safer than
  editing the database directly.

### Site Settings (`/admin/settings`)

Organisation name, address, phone, email, social links, Google Maps embed
URL, SEO defaults, and tax/registration display fields (PAN, 80G, 12A,
FCRA) are all editable here — see `src/lib/settings.ts` for the full key
list and defaults. **These are never secrets** — API keys and passwords are
never stored in this table, only in environment variables.

## 5. Database

Prisma 7 requires an explicit driver adapter at runtime (no more bare
connection-string `PrismaClient`). The adapter lives in one place —
`src/lib/db.ts` — so switching databases only touches that file.

```bash
npm run db:migrate   # apply schema changes (creates a new migration)
npm run db:studio    # visual DB browser
npm run db:seed      # re-run seed data (idempotent)
```

### Switching to PostgreSQL for production

1. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
   }
   ```
2. Install the Postgres adapter: `npm install @prisma/adapter-pg pg`
3. In `src/lib/db.ts`, replace the SQLite adapter with:
   ```ts
   import { PrismaPg } from "@prisma/adapter-pg";
   // ...
   return new PrismaPg({ connectionString: url });
   ```
4. Set `DATABASE_URL` to a real Postgres connection string.
5. Run `npm run db:migrate` against the new database, then `npm run db:seed`.

A `docker-compose.yml` is provided for a local Postgres instance if you'd
rather test this path before deploying — see [`docker-compose.yml`](./docker-compose.yml).

## 6. Payment gateway setup (Razorpay)

Razorpay was selected over Cashfree/PayU for the combination of UPI+card+net
banking support, straightforward Orders API + webhook signature
verification, and first-class Node SDK support — see the comment at the top
of `src/lib/payments.ts` for the full rationale.

1. Create a [Razorpay](https://razorpay.com) account (test mode works
   without any KYC for development).
2. From Settings → API Keys, generate a **test** key pair. Set
   `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and
   `NEXT_PUBLIC_RAZORPAY_KEY_ID` (same value as `RAZORPAY_KEY_ID`) in `.env`.
3. From Settings → Webhooks, add a webhook pointing to
   `https://<your-domain>/api/donations/webhook`, subscribed to
   `payment.captured` and `payment.failed`. Set the webhook secret you
   choose there as `RAZORPAY_WEBHOOK_SECRET`.
4. Test the flow end-to-end using [Razorpay's test
   cards](https://razorpay.com/docs/payments/payments/test-card-upi-details/).
5. Before going live, switch to live keys (still the same three env vars)
   and re-register the webhook against your production URL.

The flow (`src/app/api/donations/{create-order,verify,webhook}/route.ts`)
never trusts the browser for payment success — the webhook is the source of
truth, and duplicate webhook deliveries are guarded against via a unique
constraint on `WebhookEvent.gatewayEventId` (see `prisma/schema.prisma`).

## 7. Email setup

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` in
`.env`. Any transactional SMTP provider works (SendGrid, Postmark, Amazon
SES, a Gmail app password for testing, etc.). Until these are set,
`src/lib/email.ts` logs what would have been sent to the server console
instead of failing — so the rest of the site (donations, forms) keeps
working in development without real email credentials.

## 8. Media / image storage

- `STORAGE_DRIVER=local` (default) — for now, admin-entered image/video
  URLs are plain text fields (paste a URL you've already uploaded
  elsewhere, or a YouTube video ID). No file-upload endpoint is wired up
  in this build.
- To add real file uploads later, implement an upload API route and switch
  `STORAGE_DRIVER` to `s3`, filling in the `S3_*` variables — the schema's
  `MediaAsset.url` field is storage-agnostic and doesn't need to change.
- Every image rendered from an admin-entered URL is checked against the
  Next.js `images.remotePatterns` allowlist (`next.config.ts`) via
  `canUseNextImage()` in `src/lib/utils.ts` — unlisted hosts fall back to a
  plain `<img>` tag rather than crashing `next/image`.

## 9. Deployment

1. Provision a PostgreSQL database (see §5) and a Node.js host (Vercel,
   Railway, a VPS with `next start`, etc.).
2. Set every variable from `.env.example` in your hosting provider's
   environment configuration — **never** commit `.env`.
3. Run `npm run build` then `npm start` (or let your platform do this).
4. Run `npm run db:migrate` (or `prisma migrate deploy` for a
   non-interactive production apply) and `npm run db:seed` once against the
   production database.
5. Point your Razorpay webhook at the production domain (§6).
6. Verify `robots.txt` and `/sitemap.xml` resolve correctly, and submit the
   sitemap to Google Search Console.

## 10. Backups

For SQLite, back up `prisma/dev.db` directly (or the file your
`DATABASE_URL` points to). For PostgreSQL in production, use your hosting
provider's automated backup/point-in-time-recovery feature — donation
records in particular should never be in a database without backups.

## 11. Security

See `SECURITY_REVIEW.md` for a fuller checklist. Highlights already
implemented:

- Admin passwords hashed with bcrypt (12 rounds); sessions are
  httpOnly/secure/sameSite cookies backed by a revocable DB session row,
  not a bare stateless JWT.
- Every admin server action independently re-checks role, not just the page
  guard.
- CSRF is mitigated structurally: all mutating admin/public actions are
  Next.js Server Actions or same-origin API routes reading cookies, not
  cross-origin-readable GET requests.
- Rate limiting on login and all public form submissions
  (`src/lib/rate-limit.ts`).
- Zod validation at every public and admin input boundary
  (`src/lib/validation.ts`).
- Payment webhook signature verified against the raw request body;
  idempotency enforced via a unique DB constraint.
- No secrets in the database or committed to the repo — `.env` is
  git-ignored, `.env.example` has placeholders only.

## 12. Updating content

- **Spiritual/educational content** (Sant Kabir teachings, Maghar pages,
  dohas prose): edit the relevant `content = { hi: {...}, en: {...} }`
  object directly in its page file under `src/app/[locale]/`.
- **Everything else** (events, gallery, messages, testimonials, donation
  purposes, settings, dohas list): use `/admin`.
- **UI chrome text** (buttons, nav labels, form labels): edit
  `messages/hi.json` / `messages/en.json`.

## 13. Testing performed

- `npx tsc --noEmit` — clean.
- `npx eslint .` — clean (one benign React Compiler warning about
  react-hook-form's `watch()`, not an error).
- `npm run build` — full production build succeeds, all locale/admin routes
  compile.
- Manual smoke test of: homepage (both locales), language switcher, mobile
  menu, Sant Kabir/Mahant Ji/Maghar subpages, doha search/filter, gallery
  lightbox, events list/detail, contact/volunteer/newsletter forms
  (including honeypot + rate limit), donation flow in Razorpay **test**
  mode (success, failure, and duplicate-webhook-delivery scenarios), admin
  login/logout, and CRUD in every admin section.

This project does not include an automated test suite (unit/e2e) — see
`CONTENT_REQUIRED.md` for what's still pending before a production launch.
