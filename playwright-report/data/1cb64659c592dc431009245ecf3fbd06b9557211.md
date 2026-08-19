# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: factories/factories.spec.js >> Factory Detail Page >> Verify Date Range Filter - End Date Before Start Date
- Location: tests/factories/factories.spec.js:112:3

# Error details

```
TimeoutError: locator.click: Timeout 5000ms exceeded.
Call log:
  - waiting for getByRole('grid', { name: 'July 2026' }).getByRole('gridcell', { name: '1', exact: true, disabled: false }).first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - region "Notifications (F8)":
    - list
  - generic [ref=e2]:
    - generic [ref=e6]:
      - img "Digital Eye" [ref=e8] [cursor=pointer]
      - generic [ref=e9]:
        - button "Back to factories" [ref=e11] [cursor=pointer]:
          - img [ref=e12]
          - generic [ref=e14]: Back to Factories
        - list [ref=e16]:
          - listitem [ref=e17]:
            - generic [ref=e18]:
              - img [ref=e19]
              - generic [ref=e21]: Aftab Textile Factorys
          - listitem [ref=e22]:
            - link "Analytics" [ref=e23] [cursor=pointer]:
              - /url: /factories/Aftab%20Textile%20Factorys/analytics
              - img [ref=e24]
              - generic [ref=e26]: Analytics
          - listitem [ref=e27]:
            - link "Devices" [ref=e28] [cursor=pointer]:
              - /url: /factories/Aftab%20Textile%20Factorys/devices
              - img [ref=e29]
              - generic [ref=e32]: Devices
          - listitem [ref=e33]:
            - link "Clips" [ref=e34] [cursor=pointer]:
              - /url: /factories/Aftab%20Textile%20Factorys/clips
              - img [ref=e35]
              - generic [ref=e38]: Clips
          - listitem [ref=e39]:
            - link "Performance" [ref=e40] [cursor=pointer]:
              - /url: /factories/Aftab%20Textile%20Factorys/performance
              - img [ref=e41]
              - generic [ref=e43]: Performance
          - listitem [ref=e44]:
            - link "Configuration" [ref=e45] [cursor=pointer]:
              - /url: /factories/Aftab%20Textile%20Factorys/configuration
              - img [ref=e46]
              - generic [ref=e49]: Configuration
          - listitem [ref=e50]:
            - link "Summary" [ref=e51] [cursor=pointer]:
              - /url: /factories/Aftab%20Textile%20Factorys/summary
              - img [ref=e52]
              - generic [ref=e55]: Summary
    - main [ref=e56]:
      - generic [ref=e57]:
        - generic [ref=e58]:
          - button "Toggle Sidebar" [ref=e59] [cursor=pointer]:
            - img [ref=e60]
            - generic [ref=e62]: Toggle Sidebar
          - button "Home" [ref=e63] [cursor=pointer]:
            - img [ref=e64]
          - navigation "breadcrumb" [ref=e68]:
            - list [ref=e69]:
              - listitem [ref=e70]:
                - link "Factories" [ref=e71] [cursor=pointer]:
                  - /url: /factories
                - img [ref=e73]
              - listitem [ref=e75]:
                - link "Aftab Textile Factorys" [ref=e76] [cursor=pointer]:
                  - /url: /factories/Aftab%20Textile%20Factorys
                - img [ref=e78]
              - listitem [ref=e80]:
                - link "Analytics" [disabled] [ref=e81]
        - generic [ref=e82]:
          - button "Toggle theme" [ref=e83] [cursor=pointer]:
            - img
            - img [ref=e84]
            - generic [ref=e86]: Toggle theme
          - button "Settings" [ref=e87] [cursor=pointer]:
            - img [ref=e88]
          - button "9+" [ref=e91] [cursor=pointer]:
            - img [ref=e92]
            - generic [ref=e95]: 9+
          - button [ref=e96] [cursor=pointer]:
            - img [ref=e99]
      - generic [ref=e106]:
        - generic [ref=e107]:
          - generic [ref=e108]:
            - generic [ref=e109]:
              - heading "Aftab Textile Factorys · Count" [level=1] [ref=e110]
              - generic [ref=e111]: Online
            - paragraph [ref=e113]: A TestPP Company
            - paragraph [ref=e114]: Count totals and packer-line analytics for this factory.
          - generic [ref=e115]:
            - link "Factory map" [ref=e116] [cursor=pointer]:
              - /url: /factories
              - img [ref=e117]
              - text: Factory map
            - link "Global analytics" [ref=e120] [cursor=pointer]:
              - /url: /analytics
              - img [ref=e121]
              - text: Global analytics
              - img [ref=e123]
        - generic [ref=e126]:
          - generic [ref=e128]:
            - generic [ref=e129]:
              - generic [ref=e130]: Filters
              - generic [ref=e131]: Changes apply automatically when a valid period is selected.
            - generic [ref=e132]:
              - generic [ref=e133]: Updating…
              - button "Refresh count data" [ref=e134] [cursor=pointer]:
                - img [ref=e135]
                - text: Refresh
          - generic [ref=e140]:
            - generic [ref=e141]:
              - generic [ref=e142]:
                - paragraph [ref=e143]: Period type
                - button "Date range" [ref=e144] [cursor=pointer]:
                  - text: Date range
                  - img [ref=e145]
              - generic [ref=e147]:
                - paragraph [ref=e148]: Start date
                - button "July 15th, 2026" [ref=e149] [cursor=pointer]:
                  - img [ref=e150]
                  - text: July 15th, 2026
              - generic [ref=e152]:
                - paragraph [ref=e153]: End date
                - button "Pick end date" [ref=e154] [cursor=pointer]:
                  - img [ref=e155]
                  - generic [ref=e157]: Pick end date
              - button "Reset filters" [ref=e158] [cursor=pointer]
            - generic [ref=e159]:
              - generic [ref=e160]: Aftab Textile Factorys · Today & this month · current year in charts
              - generic [ref=e161]:
                - img [ref=e162]
                - text: Updated 3:39 PM
                - generic [ref=e167]: · auto-refreshes every 2.5 min
        - generic [ref=e168]:
          - generic [ref=e169]:
            - heading "Factory totals" [level=2] [ref=e170]
            - paragraph [ref=e171]: Aggregated across all packer lines at this factory.
          - generic [ref=e172]:
            - generic [ref=e173]:
              - generic [ref=e174]:
                - paragraph [ref=e175]: Count (day)
                - img [ref=e177]
              - paragraph [ref=e181]: "28"
              - paragraph [ref=e182]: August 6, 2026
            - generic [ref=e183]:
              - generic [ref=e184]:
                - paragraph [ref=e185]: Count (month)
                - img [ref=e187]
              - paragraph [ref=e191]: "52"
              - paragraph [ref=e192]: August 2026
        - generic [ref=e193]:
          - generic [ref=e194]:
            - generic [ref=e195]:
              - heading "Packer line" [level=2] [ref=e196]
              - paragraph [ref=e197]: Select a line to view its count breakdown and optional live view.
            - generic [ref=e198]:
              - paragraph [ref=e199]: Production section
              - tablist [ref=e201]:
                - tab "Kiln" [selected] [ref=e202] [cursor=pointer]
                - tab "Packaging" [ref=e203] [cursor=pointer]
          - generic [ref=e205]:
            - img [ref=e206]
            - generic [ref=e209]:
              - paragraph [ref=e210]: No packer lines found
              - paragraph [ref=e211]: This factory has no camera lines configured yet. Set up devices to start tracking count.
            - link "Go to Devices" [ref=e212] [cursor=pointer]:
              - /url: /factories/Aftab Textile Factorys/devices
  - alert [ref=e213]: Factories & Companies | Digital Eye
```

# Test source

```ts
  1  | class BasePage {
  2  |   /**
  3  |    * @param {import('@playwright/test').Page} page
  4  |    */
  5  |   constructor(page) {
  6  |     this.page = page;
  7  |   }
  8  | 
  9  |   async goto(path = '/') {
  10 |     await this.page.goto(path);
  11 |   }
  12 | 
  13 |   /** Left sidebar navigation link, by visible label. */
  14 |   navLink(name) {
  15 |     return this.page.getByRole('link', { name, exact: false });
  16 |   }
  17 | 
  18 |   async gotoViaSidebar(name) {
  19 |     await this.navLink(name).click();
  20 |   }
  21 | 
  22 |   async waitForLoadingToFinish() {
  23 |     const spinner = this.page.locator(
  24 |       '[data-testid="loading-spinner"], .loading-spinner, .spinner, [role="progressbar"]'
  25 |     );
  26 |     const count = await spinner.count();
  27 |     if (count > 0) {
  28 |       await spinner
  29 |         .first()
  30 |         .waitFor({ state: 'hidden', timeout: 15_000 })
  31 |         .catch(() => {});
  32 |     }
  33 |   }
  34 | 
  35 |   async closeModalIfOpen() {
  36 |     const closeBtn = this.page.locator(
  37 |       'button[aria-label="Close"], .modal button:has-text("X"), [data-testid="modal-close"]'
  38 |     );
  39 |     if (await closeBtn.first().isVisible().catch(() => false)) {
  40 |       await closeBtn.first().click();
  41 |     }
  42 |   }
  43 | 
  44 |   // The calendar popover's content re-renders (and its nav button briefly detaches/reattaches)
  45 |   // during the burst of data refetches right after the page loads - confirmed live via the
  46 |   // "element is not stable" / "element was detached from the DOM, retrying" trace on a plain
  47 |   // .click(). Retry the whole locate-and-click on failure instead of failing on the first race
  48 |   // (same pattern as FactoriesPage.openFirstFactoryOf / CompanyPage.clickRowActionButton).
  49 |   async _clickResilient(locator, { retries = 5, clickTimeout = 5_000 } = {}) {
  50 |     let lastError;
  51 |     for (let attempt = 0; attempt < retries; attempt++) {
  52 |       try {
> 53 |         await locator.click({ force: true, timeout: clickTimeout });
     |                       ^ TimeoutError: locator.click: Timeout 5000ms exceeded.
  54 |         return;
  55 |       } catch (error) {
  56 |         lastError = error;
  57 |         await this.page.waitForTimeout(500);
  58 |       }
  59 |     }
  60 |     throw lastError;
  61 |   }
  62 | 
  63 |   /**
  64 |    * Navigates the currently open react-day-picker style calendar grid to the given
  65 |    * date and clicks the day cell. Assumes the calendar opens on the current month.
  66 |    */
  67 |   async selectCalendarDate(dateStr) {
  68 |     const target = new Date(`${dateStr}T00:00:00`);
  69 |     const today = new Date();
  70 |     const monthsDiff = (target.getFullYear() - today.getFullYear()) * 12 + (target.getMonth() - today.getMonth());
  71 |     const navButton = this.page.getByRole('button', { name: monthsDiff >= 0 ? /go to next month/i : /go to previous month/i }).first();
  72 |     for (let i = 0; i < Math.abs(monthsDiff); i++) {
  73 |       await this._clickResilient(navButton);
  74 |     }
  75 |     const monthLabel = `${target.toLocaleString('en-US', { month: 'long' })} ${target.getFullYear()}`;
  76 |     const grid = this.page.getByRole('grid', { name: monthLabel });
  77 |     const dayCell = grid.getByRole('gridcell', { name: String(target.getDate()), exact: true, disabled: false }).first();
  78 |     await this._clickResilient(dayCell);
  79 |   }
  80 | }
  81 | 
  82 | module.exports = { BasePage };
  83 | 
```