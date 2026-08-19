# DE UAT Dashboard — E2E Automation

Playwright + JavaScript E2E suite for `https://de-uat-internal.waiindustries.com/`, covering Login, Overview,
Factories (incl. Factory Edit, Devices, Performance, Live View), Analytics, Reports, Contact List, and
Notifications, plus a full cross-module E2E walkthrough.

## Setup

```bash
npm install
npx playwright install chromium
```

Credentials and target URL live in `.env` (already populated; see `.env.example` for the shape):

```
BASE_URL=https://de-uat-internal.waiindustries.com/
USER_EMAIL=test@issm.ai
USER_PASSWORD=test@123
```

## Running tests

All other modules reuse a single authenticated session, created once by `tests/auth.setup.js` and stored in
`playwright/.auth/user.json`. The `chromium` project depends on the `setup` project, so a plain `npx playwright
test` (or any `npm run test:*` script below) logs in automatically first — no manual step needed. The Login
module runs unauthenticated on its own project (`chromium-no-auth`) so it can exercise the login form itself.

```bash
npm test                    # everything
npm run test:login          # Login module only
npm run test:overview       # Overview dashboard
npm run test:factories      # Factories list, map, factory detail (Analytics/Devices/Performance/Live View)
npm run test:factory-edit   # Update Factory modal
npm run test:analytics      # Analytics module
npm run test:reports        # Reports module
npm run test:contacts       # Contact List module
npm run test:notifications  # Notifications
npm run test:e2e            # Full cross-module walkthrough

npm run test:headed         # any of the above with --headed
npm run test:ui             # Playwright UI mode
npm run report              # open the last HTML report
```

Run a single file or test directly, e.g.:

```bash
npx playwright test tests/analytics --grep "Verify Pie Chart Data Accuracy"
```

## Structure

```
pages/        Page Object Model — one class per module/page
tests/        Specs grouped by module (mirrors pages/)
tests/e2e/    Cross-module full-flow spec
fixtures/     Sample files used for upload tests (logo/image)
playwright.config.js
```

## Notes on scope

- **Destructive actions are intentionally skipped.** Company/factory *creation* and *deletion* aren't backed by
  a documented UI flow and would permanently affect shared UAT data other suites rely on, so those specific
  cases (see `tests/notifications/notifications.spec.js`) are marked `test.skip` with the reason inline rather
  than silently omitted.
- Selectors favor role/label/text queries with graceful fallbacks, but were authored from the requirements
  doc (`KnowledgeBaseNewUI.MD`) and the test-case doc (`New Features Test Cases.pdf`) before a live DOM pass.
  Run the suite once against the real app and tighten any locator Playwright reports as ambiguous or not found.
