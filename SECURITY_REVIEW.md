# Security Review

Manual audit performed against the OWASP-relevant checklist from the
project brief. Findings and current mitigations below; nothing here is
theoretical — each item was checked directly against the code.

## Authentication & session management

- Admin passwords are hashed with **bcrypt, 12 rounds** (`src/lib/auth.ts`,
  `hashPassword`/`verifyPassword`). Plaintext passwords are never stored or
  logged.
- Sessions are **not** bare stateless JWTs: a signed JWT (HS256, `jose`)
  references a server-side `AdminSession` row keyed by a hashed random
  token. `getAdminSession()` verifies the JWT signature *and* that the DB
  row still exists, hasn't expired, and its stored token hash matches — so
  an admin can be force-logged-out (e.g. deactivated) without waiting for
  JWT expiry, unlike a pure stateless-JWT design.
- Session cookie: `httpOnly`, `secure` in production, `sameSite: "lax"`,
  8-hour expiry.
- Login is rate-limited per email+IP (`checkLoginRateLimit`,
  `src/lib/auth.ts`), and returns the same generic "Invalid email or
  password" message whether the email doesn't exist or the password is
  wrong — no user enumeration.
- `AUTH_SECRET` is read from environment only, never hardcoded; the
  checked-in `.env` uses an explicitly-labelled development placeholder
  that must be rotated before production (`CONTENT_REQUIRED.md` §5).

## Authorization (broken access control)

- The admin route tree is split by Next.js route groups: `(auth)` (login,
  unguarded) and `(dashboard)` (everything else), with a single
  `(dashboard)/layout.tsx` server component enforcing "must have a valid
  session" for every nested route — verified this cannot be bypassed by
  directly requesting a nested route, since the guard runs in the layout,
  not conditionally in each page.
- **Every** admin server action independently re-verifies role
  server-side (spot-checked `events/actions.ts`, `settings/actions.ts`,
  `donations/actions.ts`, `users/actions.ts`) — the sidebar's
  role-based filtering is UX only, never the actual enforcement boundary.
- Role checks use an explicit allowlist per section (`ALLOWED_ROLES`
  constants), not a blocklist — safer default (new roles added later are
  denied by default rather than accidentally granted access).
- The one `SUPER_ADMIN`-only manual donation-status override additionally
  writes an `AuditLog` row recording who changed what — appropriate for a
  sensitive, rarely-used escape hatch.
- `/admin` sets `robots: { index: false, follow: false }` so it is never
  indexed by search engines.
- The public `proxy.ts` (Next 16's renamed middleware) matcher explicitly
  excludes `/admin` and `/api` from locale rewriting — confirmed this
  doesn't accidentally exempt them from anything security-relevant, since
  the admin auth guard lives in the route layout, not in proxy.ts.

## Injection (SQL / NoSQL / command)

- Confirmed via `grep -rn '\$queryRaw\|\$executeRaw' src/` that the
  application code contains **zero** raw SQL calls — every database access
  goes through Prisma's parameterized query builder. The only matches are
  in the generated Prisma client's own type definitions (unused).
- All user input reaching the database passes through a zod schema first
  (`src/lib/validation.ts`) at every public and admin entry point.

## Cross-site scripting (XSS)

- Confirmed via `grep -rln "dangerouslySetInnerHTML" src/` that the only
  use of raw HTML injection in the entire codebase is
  `src/components/site/JsonLd.tsx`, which serializes a controlled
  JavaScript object (`JSON.stringify`) built from server-side data — never
  user input directly.
- Notification emails (`src/app/actions/forms.ts`) HTML-escape every
  user-supplied field before interpolating into the email body
  (`escapeHtml`).
- React's default JSX escaping handles everything else (all user-generated
  text — donor names, messages, testimonials, etc. — is rendered as plain
  JSX children, never through `dangerouslySetInnerHTML`).

## CSRF

- All state-changing operations are either Next.js Server Actions (which
  have built-in Origin-header verification in Next 14+) or same-origin
  `fetch()` calls from client components to API routes reading httpOnly
  cookies — there is no endpoint that performs a sensitive mutation purely
  from an unauthenticated cross-origin GET request.
- The donation `create-order`/`verify` API routes require no authentication
  (they're intentionally public, unauthenticated endpoints — the "victim"
  concept CSRF protects against doesn't apply, since there's no session
  being acted on behalf of).

## Payment-specific security

- Webhook signature is verified against the **raw request body string**
  (`req.text()`), never a re-serialized JSON object — this is the single
  most common mistake in HMAC webhook verification and is done correctly
  here.
- Webhook idempotency is enforced by a **unique database constraint**
  (`WebhookEvent.gatewayEventId`), not an in-memory cache — durable across
  restarts and safe under concurrent requests.
- The `verify` route additionally checks `donation.gatewayOrderId ===
  razorpay_order_id` before trusting a signature — prevents a valid
  signature for one donation being replayed against a different donation
  record.
- Both `verify` and the webhook use an **atomic conditional update**
  (`updateMany` guarded by `paymentStatus: { not: "SUCCESS" }`) rather than
  a read-then-write, so a race between the two paths (or duplicate
  deliveries) cannot double-send a receipt email or corrupt status.
- Amount is fixed server-side at order creation time and never re-read from
  client input during verification.
- `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` are referenced only
  in server-only files (`src/lib/payments.ts`, imported only by API
  routes) — confirmed via grep that no `"use client"` file references them.
  Only `NEXT_PUBLIC_RAZORPAY_KEY_ID` (intentionally public) reaches the
  browser.

## File uploads

- No file-upload endpoint exists in this build — admin-entered
  image/video fields are plain URL text inputs (see README §8). This
  eliminates the file-upload attack surface (path traversal, malicious
  file type, zip bombs, etc.) entirely for now; it becomes relevant again
  if/when a real upload endpoint is added later, at which point it must
  validate file type by content (not just extension), enforce a size cap,
  and store uploads outside any web-executable path.

## Rate limiting

- Implemented (`src/lib/rate-limit.ts`) on: admin login, donation order
  creation, contact form, volunteer form, newsletter subscription.
- Current implementation is **in-memory, per-process** — adequate for a
  single-instance deployment (the default in this build) but will not
  share state across multiple server instances/replicas. If you scale
  horizontally, replace the `Map`-based store with Redis or similar.

## Secrets & configuration

- `.env` is git-ignored; `.env.example` contains placeholders only, no
  real values.
- No secret is stored in the database — `SiteSetting` (the CMS-editable
  settings table) deliberately excludes anything credential-shaped; a
  comment in `settings/actions.ts` documents this boundary explicitly.
- Confirmed via grep that no environment secret variable name appears in
  any `"use client"` file.

## Known limitations / recommendations for production hardening

1. **Rate limiter is per-process, in-memory.** Fine for a single-instance
   deployment; move to a shared store before scaling horizontally.
2. **No Content-Security-Policy header yet.** `next.config.ts` now sets
   `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and a
   basic `Permissions-Policy`, but a full CSP was deliberately not added in
   this pass because it requires careful tuning against the Razorpay
   Checkout script and Google Fonts/Maps embeds — recommended as a
   follow-up once the production domain and all third-party embeds are
   finalised, to avoid shipping an untested CSP that silently breaks
   checkout.
3. **No automated dependency-vulnerability scanning wired into CI** —
   `npm audit` currently reports 3 high-severity findings, all inside
   `prisma`'s own dev-time CLI dependency chain (`deepmerge-ts`, a
   stack-exhaustion DoS in a schema-merging step of the Prisma CLI, not
   reachable from the deployed application). Re-run `npm audit` after any
   `prisma` version bump.
4. **No automated test suite.** All verification in this project was
   manual (`tsc`, `eslint`, `next build`, and manual smoke testing — see
   README §13). Add unit/integration tests before further feature work if
   the team has the capacity, particularly around the payment webhook
   idempotency logic.
5. Rotate `AUTH_SECRET` and set real Razorpay/SMTP credentials before
   production — tracked in `CONTENT_REQUIRED.md` §5.
