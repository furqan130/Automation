# E2E Test Run Results

- **Date:** 2026-08-06
- **Suites:** `tests/login`, `tests/company`
- **Browser:** Chromium (headed, 1920x1080)
- **Target:** https://de-uat-internal.waiindustries.com/
- **Command:** `npx playwright test tests/login tests/company --headed --project=chromium-no-auth --project=chromium`

## Summary

| Total | Passed | Failed |
|-------|--------|--------|
| 19    | 19     | 0      |

## Login (`tests/login/login.spec.js`)

| # | Test | Status | Duration |
|---|------|--------|----------|
| 1 | Verify Email Input Field | ✅ Pass | 2.8s |
| 2 | Verify Password Input Field | ✅ Pass | 2.5s |
| 3 | Verify Login Button Enabled | ✅ Pass | 2.7s |
| 4 | Verify Error Message on Invalid Login | ✅ Pass | 3.7s |
| 5 | Verify Successful Login | ✅ Pass | 5.0s |

## Company Management (`tests/company/company.spec.js`)

| # | Test | Status | Duration |
|---|------|--------|----------|
| 1 | Verify Company Button Opens Create Company Modal | ✅ Pass | 9.3s |
| 2 | Verify Company Name Field Is Required | ✅ Pass | 7.3s |
| 3 | Verify Cancel Button Discards Create Company Modal | ✅ Pass | 10.7s |
| 4 | Verify Close Icon Discards Create Company Modal | ✅ Pass | 8.8s |
| 5 | Verify Successful Company Creation | ✅ Pass | 15.6s |
| 6 | Verify Created Company Is Findable Via Search Filter | ✅ Pass | 15.9s |
| 7 | Verify Edit Icon Opens Update Company Modal Pre-Filled With Current Name | ✅ Pass | 27.7s |
| 8 | Verify Cancel Button Discards Company Rename | ✅ Pass | 17.0s |
| 9 | Verify Successful Company Rename | ✅ Pass | 19.7s |
| 10 | Verify Delete Icon Opens Confirmation Dialog With Company Name | ✅ Pass | 33.9s |
| 11 | Verify Cancel On Delete Confirmation Keeps The Company | ✅ Pass | 20.8s |
| 12 | Verify Successful Company Deletion | ✅ Pass | 21.8s |
| 13 | Verify Create/Edit/Delete Flow Retains One Company For Future Factory Setup | ✅ Pass | 1.6m |

Test #13 created and edited two disposable companies, deleted both, and left
**"E2E Factory Base Company"** in place (created on a prior run, reused via its
idempotency check here) as the fixture for the upcoming Factory creation.

## Notes (Login + Company run)

- No failures on this run.
- Full HTML report (traces/screenshots/videos on failure) available via `npm run report`.

---

# Factories Suite Run Results

- **Date:** 2026-08-06
- **Suites:** `tests/factories` (`factories.spec.js`, `factory-edit.spec.js`)
- **Browser:** Chromium (headed, 1920x1080)
- **Target:** https://de-uat-internal.waiindustries.com/
- **Fixture:** "Aftab Textile Factorys" (under "A TestPP Company") - the alphabetically-first company/factory the suite opens by default
- **Command:** `npx playwright test tests/factories --headed --project=chromium`

## Summary

| Total | Passed | Failed | Skipped |
|-------|--------|--------|---------|
| 70    | 20     | 16     | 34      |

This is the result after fixing the `selectCalendarDate` detach/re-render race in
`pages/BasePage.js` and a `Cement Bags` label mismatch in `pages/FactoryDetailPage.js`
(originally 16 passed / 20 failed before those fixes).

## Factories - List Page

| # | Test | Status | Duration |
|---|------|--------|----------|
| 1 | Verify All Factories Page Load | ✅ Pass | 8.4s |
| 2 | Verify Search Supports Special Characters | ✅ Pass | 11.7s |
| 3 | Verify Interactive Factory Map Displays Markers | ✅ Pass | 8.5s |
| 4 | Verify Factory Map Marker Hover Tooltip | ⏭ Skipped (by design - marker tooltips are canvas-drawn, no DOM to assert on) | - |
| 5 | Verify Factory Status Filters (All/Online/Offline) | ✅ Pass | 19.3s |
| 6 | Verify Factory Summary Totals | ❌ Fail | 40.3s |

## Factory Detail Page

| # | Test | Status | Duration |
|---|------|--------|----------|
| 1 | Verify Factory Page Side Navigation Tabs | ✅ Pass | 10.9s |
| 2 | Verify Switching Between Analytics/Devices/Performance Tabs | ✅ Pass | 13.4s |
| 3 | Verify Factory Map Button Navigation | ✅ Pass | 13.3s |
| 4 | Verify Global Analytics Button Navigation | ✅ Pass | 10.6s |
| 5 | Verify Filters Section Visibility | ✅ Pass | 11.1s |
| 6 | Verify By Date Filter | ✅ Pass | 11.1s |
| 7 | Verify By Month Filter | ✅ Pass | 9.8s |
| 8 | Verify Date Range Filter - Valid Range | ❌ Fail | 40.5s |
| 9 | Verify Date Range Filter - End Date Before Start Date | ❌ Fail | 42.2s |
| 10 | Verify Cement Bags (Day) Box | ✅ Pass | 11.7s |
| 11 | Verify Cement Bags (Month) Box | ✅ Pass | 10.9s |
| 12 | Verify Totals Boxes Update with Filter Change | ✅ Pass | 9.9s |
| 13 | Verify Packer-Line-Specific Bag Counts Match Filter | ❌ Fail | 24.7s |
| 14 | Verify Hourly Graph with Single-Day (By Date) Filter | ❌ Fail | 21.8s |
| 15 | Verify Hourly Graph with Current Month Filter | ❌ Fail | 22.3s |
| 16 | Verify Hourly Graph with Past Month Filter | ❌ Fail | 27.5s |
| 17 | Verify Hourly Graph with Date Range Filter | ❌ Fail | 41.5s |
| 18 | Verify Live View Tab Selection | ❌ Fail | 26.7s |
| 19 | Verify Live View Description Text | ❌ Fail | 29.1s |
| 20 | Verify Quality/Resolution Dropdown Options | ❌ Fail | 23.8s |
| 21 | Verify Frame Rate Dropdown Options | ❌ Fail | 23.9s |
| 22 | Verify Idle State Before Go Live | ❌ Fail | 24.9s |

## Factory Detail - Devices Tab

| # | Test | Status | Duration |
|---|------|--------|----------|
| 1 | Verify Devices Table Columns | ✅ Pass | 9.5s |
| 2 | Verify Search Devices Field | ✅ Pass | 9.1s |
| 3 | Verify Edit Icon Action | ❌ Fail | 10.4s |
| 4 | Verify Device Deletion Confirmation | ✅ Pass | 9.5s |

## Factory Detail - Performance Tab

| # | Test | Status | Duration |
|---|------|--------|----------|
| 1 | Verify One-Day Filter Visibility | ✅ Pass | 9.6s |
| 2 | Verify Selecting a Specific Day | ✅ Pass | 9.3s |
| 3 | Verify Download Functionality | ❌ Fail | 26.0s |
| 4 | Verify Download Without Selecting a Filter | ❌ Fail | 24.8s |

## Factory Edit Modal (`factory-edit.spec.js`)

All 33 tests ⏭ **Skipped by design** - the whole `describe` block is `test.describe.skip`'d in
the source. Per its own comment, the Update Factory modal is only reachable via a factory row
that has device/production data, and the one UAT fixture with that ("Test Company" / "Test
Factory") isn't reliably reachable through the in-app search in a 249-company virtualized list.

## Root causes of the 16 remaining failures

1. **Date Range Filter (2 tests)** - a deeper, unresolved bug distinct from the fixed
   `selectCalendarDate` race: the start-date popover doesn't auto-close when the end-date
   popover opens, and end-date month navigation lands on the wrong month as a result.
2. **9 tests** (Packer-Line-Specific Counts, Hourly Graph x4, Live View x2, Quality/Frame Rate
   dropdowns, Idle State) - not a code bug. The fixture factory ("Aftab Textile Factorys") has
   zero packer lines/devices configured ("No packer lines found" in the UI), so anything gated
   behind selecting a packer line can never pass against this fixture.
3. **Verify Factory Summary Totals, Devices - Verify Edit Icon Action, Performance - Download
   (x2)** - separate, pre-existing issues unrelated to the calendar fix; not yet investigated.

## Notes (Factories run)

- Full HTML report (traces/screenshots/videos on failure) available via `npm run report`.
