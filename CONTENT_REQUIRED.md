# Content Required Before Production Launch

This file lists every piece of information that is currently a placeholder,
unset, or demo data — and therefore needs to be supplied and verified by the
organisation before this site goes live. Per the project's fact-checking
discipline, none of these have been guessed or fabricated; they are either
left blank, marked with an explicit placeholder string, or omitted entirely.

## 1. Organisation identity & legal details (`/admin/settings`)

All of the following currently show the literal placeholder text
`PLACEHOLDER — REPLACE WITH VERIFIED ORGANISATION INFORMATION` (or the Hindi
equivalent) wherever they are displayed on the public site (footer, About
the Institution page, donation receipts, legal pages):

- [ ] Legal/registered organisation name (English & Hindi)
- [ ] Registered address
- [ ] Public phone number
- [ ] Public email address
- [ ] WhatsApp number (if any)
- [ ] Trust/society registration number
- [ ] PAN
- [ ] 80G status (`not_verified` / `eligible` / `not_eligible`) and 80G
      registration number, if eligible — **the site will not claim "80G
      eligible" anywhere until this is explicitly set to `eligible` in
      Settings**
- [ ] 12A registration number
- [ ] FCRA registration number (only relevant if the organisation intends to
      accept donations from outside India)
- [ ] Official logo — the current wordmark
      (`src/components/ui/Logo.tsx`) is an original, tasteful placeholder
      built from CSS/SVG, explicitly NOT presented as an official existing
      logo. Replace with a real logo file once one is confirmed authorised
      for use.
- [ ] Jurisdiction for legal disputes — the legal pages (Terms, Donation
      Terms, etc.) currently use the placeholder
      `[PLACEHOLDER — INSERT JURISDICTION]` for the governing-law clause.
      Have this reviewed by a lawyer before launch.

## 2. Social media (`/admin/settings`)

All social links are currently empty (the footer only renders icons for
platforms that have a URL configured, so nothing broken shows meanwhile):

- [ ] YouTube channel URL
- [ ] Facebook page URL
- [ ] Instagram profile URL
- [ ] X/Twitter profile URL
- [ ] WhatsApp Channel URL

Per the project brief, do not label any account "Official" without
reasonable evidence it is genuinely run by the organisation — none was
found during research (see `RESEARCH_SOURCES.md`).

## 3. Mahant Vichar Das Ji (`/mahant-vichar-das-ji/*`)

Research (see `RESEARCH_SOURCES.md`) could not verify the following, so
they are absent from the site rather than guessed:

- [ ] An official, high-resolution portrait with confirmed usage rights —
      the site currently shows a dignified typographic placeholder
      (`PortraitPlaceholder` component). If the organisation can supply a
      photo with clear permission, add it via `/admin/gallery` with
      category `MAHANT_JI`, and it will automatically replace the
      placeholder on the Photos subpage; the homepage/hub-page placeholders
      would need a small follow-up code change to also read from the
      gallery rather than always showing the placeholder.
- [ ] A single, confirmed formal institutional title/trust name (sources
      disagree — see the "Introduction" subpage for how this is currently
      handled)
- [ ] Birth date
- [ ] Guru-diksha (initiation) details / guru lineage
- [ ] List of predecessor mahants
- [ ] Number of followers/disciples
- [ ] Any awards or honours
- [ ] Verified social media handles specific to him personally

## 4. Maghar visitor information

- [ ] Precise GPS coordinates of the Samadhi-Mazar complex itself (the site
      currently uses the Maghar town-level coordinate as an approximation
      in the map embed and structured data — a more precise on-site reading
      would improve accuracy).

## 5. Payment gateway & email (`.env`, never in the CMS)

- [ ] Razorpay **live** `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` /
      `RAZORPAY_WEBHOOK_SECRET` (the build currently runs against test/
      sandbox keys only — see README §6)
- [ ] Production SMTP credentials for donation receipts and form
      notifications (currently unset; emails are logged to the console
      instead of sent)
- [ ] `NOTIFICATIONS_TO_EMAIL` — a real inbox that should receive contact/
      volunteer/donation-enquiry notifications
- [ ] `AUTH_SECRET` — must be regenerated to a real random value before
      production (the checked-in `.env` uses an insecure development
      placeholder)

## 6. Analytics (optional)

- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Google Analytics) — leave blank to
      keep analytics disabled
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` — leave blank to keep disabled

## 7. Demo data to remove before production

The seed script (`prisma/seed.ts`) creates a small amount of clearly-labelled
demo content so the site isn't empty on first run. **Remove or replace these
via `/admin` before launch:**

- [ ] `DEMO EVENT — Guru Purnima Satsang` (`/admin/events`) — flagged with
      `isDemo: true` and a visible "DEMO" badge on the public site
- [ ] `DEMO — Sample Devotee` testimonial (`/admin/testimonials`) — created
      unpublished by default; delete rather than publish

## 8. Content the organisation should review even though it's not a blank placeholder

- [ ] All "Activities" and "Seva" page descriptions were written generically
      (e.g. "the community organises Satsang gatherings...") to avoid
      inventing specific statistics or named programmes. If the
      organisation runs specific, verifiable programmes, replace this
      general language with real detail.
- [ ] The "About the Institution" financial-transparency section currently
      states that detailed financial statements are available on request —
      replace with real disclosure once the organisation formalises this.
- [ ] Every claim on `/sant-kabir/*`, `/mahant-vichar-das-ji/*`, and
      `/maghar/*` is labeled VERIFIED or TRADITIONAL via the `FactBadge`
      component. If the organisation has additional verified information
      (e.g. a confirmed formal history), it can be added following the same
      sourcing discipline described in `RESEARCH_SOURCES.md`.
