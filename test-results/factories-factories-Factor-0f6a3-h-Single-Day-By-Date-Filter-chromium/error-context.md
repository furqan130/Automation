# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: factories/factories.spec.js >> Factory Detail Page >> Verify Hourly Graph with Single-Day (By Date) Filter
- Location: tests/factories/factories.spec.js:145:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="hourly-production-graph"]').or(locator('div').filter({ hasText: /hourly production/i }).first())
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="hourly-production-graph"]').or(locator('div').filter({ hasText: /hourly production/i }).first())

```

```yaml
- region "Notifications (F8)":
  - list
- img "Digital Eye"
- button "Back to factories":
  - img
  - text: Back to Factories
- list:
  - listitem:
    - img
    - text: Aftab Textile Factorys
  - listitem:
    - link "Analytics":
      - /url: /factories/Aftab%20Textile%20Factorys/analytics
      - img
      - text: Analytics
  - listitem:
    - link "Devices":
      - /url: /factories/Aftab%20Textile%20Factorys/devices
      - img
      - text: Devices
  - listitem:
    - link "Clips":
      - /url: /factories/Aftab%20Textile%20Factorys/clips
      - img
      - text: Clips
  - listitem:
    - link "Performance":
      - /url: /factories/Aftab%20Textile%20Factorys/performance
      - img
      - text: Performance
  - listitem:
    - link "Configuration":
      - /url: /factories/Aftab%20Textile%20Factorys/configuration
      - img
      - text: Configuration
  - listitem:
    - link "Summary":
      - /url: /factories/Aftab%20Textile%20Factorys/summary
      - img
      - text: Summary
- main:
  - button "Toggle Sidebar":
    - img
    - text: Toggle Sidebar
  - button "Home":
    - img
  - navigation "breadcrumb":
    - list:
      - listitem:
        - link "Factories":
          - /url: /factories
      - listitem:
        - link "Aftab Textile Factorys":
          - /url: /factories/Aftab%20Textile%20Factorys
      - listitem:
        - link "Analytics" [disabled]
  - button "Toggle theme":
    - img
    - img
    - text: Toggle theme
  - button "Settings":
    - img
  - button "9+":
    - img
    - text: 9+
  - button:
    - img
  - heading "Aftab Textile Factorys · Count" [level=1]
  - text: Online
  - paragraph: A TestPP Company
  - paragraph: Count totals and packer-line analytics for this factory.
  - link "Factory map":
    - /url: /factories
    - img
    - text: Factory map
  - link "Global analytics":
    - /url: /analytics
    - img
    - text: Global analytics
    - img
  - text: Filters Changes apply automatically when a valid period is selected.
  - button "Refresh count data":
    - img
    - text: Refresh
  - paragraph: Period type
  - button "By date":
    - text: By date
    - img
  - paragraph: Date
  - button "July 15th, 2026":
    - img
    - text: July 15th, 2026
  - button "Reset filters"
  - text: Aftab Textile Factorys · July 15, 2026
  - img
  - text: Updated 3:41 PM · auto-refreshes every 2.5 min
  - heading "Factory totals" [level=2]
  - paragraph: Aggregated across all packer lines at this factory.
  - paragraph: Count (day)
  - img
  - paragraph: "0"
  - paragraph: July 15, 2026
  - paragraph: Count (month)
  - img
  - paragraph: "57"
  - paragraph: July 2026
  - heading "Packer line" [level=2]
  - paragraph: Select a line to view its count breakdown and optional live view.
  - paragraph: Production section
  - tablist:
    - tab "Kiln" [selected]
    - tab "Packaging"
  - img
  - paragraph: No packer lines found
  - paragraph: This factory has no camera lines configured yet. Set up devices to start tracking count.
  - link "Go to Devices":
    - /url: /factories/Aftab Textile Factorys/devices
- alert: Factories & Companies | Digital Eye
```

# Test source

```ts
  48  |   });
  49  | });
  50  | 
  51  | test.describe('Factory Detail Page', () => {
  52  |   let factories;
  53  |   let detail;
  54  | 
  55  |   test.beforeEach(async ({ page }) => {
  56  |     factories = new FactoriesPage(page);
  57  |     detail = new FactoryDetailPage(page);
  58  |     await factories.open();
  59  |     const firstCompany = factories.companyRows.first();
  60  |     await factories.openFirstFactoryOf(firstCompany);
  61  |     await expect(detail.factoryNameHeader).toBeVisible({ timeout: 15_000 });
  62  |   });
  63  | 
  64  |   test('Verify Factory Page Side Navigation Tabs', async () => {
  65  |     await expect(detail.analyticsTab).toBeVisible();
  66  |     await expect(detail.devicesTab).toBeVisible();
  67  |     await expect(detail.performanceTab).toBeVisible();
  68  |   });
  69  | 
  70  |   test('Verify Switching Between Analytics/Devices/Performance Tabs', async () => {
  71  |     await detail.goToTab('Devices');
  72  |     await expect(detail.devicesTable).toBeVisible();
  73  |     await detail.goToTab('Performance');
  74  |     await expect(detail.performanceDateFilter).toBeVisible();
  75  |     await detail.goToTab('Analytics');
  76  |     await expect(detail.filtersSection).toBeVisible();
  77  |   });
  78  | 
  79  |   test('Verify Factory Map Button Navigation', async ({ page }) => {
  80  |     await detail.factoryMapButton.click();
  81  |     await expect(page.locator('canvas').first()).toBeVisible();
  82  |   });
  83  | 
  84  |   test('Verify Global Analytics Button Navigation', async ({ page }) => {
  85  |     await detail.globalAnalyticsButton.click();
  86  |     await expect(page).toHaveURL(/analytics/i);
  87  |   });
  88  | 
  89  |   test('Verify Filters Section Visibility', async () => {
  90  |     await expect(detail.filtersSection).toBeVisible();
  91  |     await expect(detail.filtersSection).toContainText(/select filter/i);
  92  |     await expect(detail.filtersSection).toContainText(/changes apply automatically/i);
  93  |   });
  94  | 
  95  |   test('Verify By Date Filter', async () => {
  96  |     await detail.selectFilter('By Date');
  97  |     await detail.pickDate('2026-07-15');
  98  |     await expect(detail.cementBagsDayBox).toContainText(/\d+/);
  99  |   });
  100 | 
  101 |   test('Verify By Month Filter', async () => {
  102 |     await detail.selectFilter('By Month');
  103 |     await expect(detail.cementBagsMonthBox).toContainText(/\d+/);
  104 |   });
  105 | 
  106 |   test('Verify Date Range Filter - Valid Range', async () => {
  107 |     await detail.selectFilter('Date Range');
  108 |     await detail.pickDateRange('2026-07-01', '2026-07-15');
  109 |     await expect(detail.cementBagsMonthBox).toContainText(/\d+/);
  110 |   });
  111 | 
  112 |   test('Verify Date Range Filter - End Date Before Start Date', async ({ page }) => {
  113 |     await detail.selectFilter('Date Range');
  114 |     await detail.pickDateRange('2026-07-15', '2026-07-01');
  115 |     const error = page.locator('[role="alert"], .error-message, .text-red-500');
  116 |     await expect(error.first()).toBeVisible({ timeout: 5_000 });
  117 |   });
  118 | 
  119 |   test('Verify Cement Bags (Day) Box', async () => {
  120 |     await expect(detail.cementBagsDayBox).toBeVisible();
  121 |     await expect(detail.cementBagsDayBox).toContainText(/\d+/);
  122 |   });
  123 | 
  124 |   test('Verify Cement Bags (Month) Box', async () => {
  125 |     await expect(detail.cementBagsMonthBox).toBeVisible();
  126 |     await expect(detail.cementBagsMonthBox).toContainText(/\d+/);
  127 |   });
  128 | 
  129 |   test('Verify Totals Boxes Update with Filter Change', async () => {
  130 |     const before = await detail.cementBagsDayBox.innerText();
  131 |     await detail.selectFilter('By Date');
  132 |     await detail.pickDate('2026-07-01');
  133 |     await expect(async () => {
  134 |       const after = await detail.cementBagsDayBox.innerText();
  135 |       expect(after).not.toBe(before);
  136 |     }).toPass({ timeout: 10_000 });
  137 |   });
  138 | 
  139 |   test('Verify Packer-Line-Specific Bag Counts Match Filter', async () => {
  140 |     await detail.selectFirstPackerLine();
  141 |     await expect(detail.cementBagsDayBox).toContainText(/\d+/);
  142 |     await expect(detail.cementBagsMonthBox).toContainText(/\d+/);
  143 |   });
  144 | 
  145 |   test('Verify Hourly Graph with Single-Day (By Date) Filter', async () => {
  146 |     await detail.selectFilter('By Date');
  147 |     await detail.pickDate('2026-07-15');
> 148 |     await expect(detail.hourlyGraph).toBeVisible();
      |                                      ^ Error: expect(locator).toBeVisible() failed
  149 |   });
  150 | 
  151 |   test('Verify Hourly Graph with Current Month Filter', async () => {
  152 |     await detail.selectFilter('By Month');
  153 |     await expect(detail.hourlyGraph).toBeVisible();
  154 |   });
  155 | 
  156 |   test('Verify Hourly Graph with Past Month Filter', async () => {
  157 |     await detail.selectFilter('By Month');
  158 |     await expect(detail.hourlyGraphCalendar.first()).toBeVisible({ timeout: 5_000 }).catch(() => {});
  159 |     await expect(detail.hourlyGraph).toBeVisible();
  160 |   });
  161 | 
  162 |   test('Verify Hourly Graph with Date Range Filter', async () => {
  163 |     await detail.selectFilter('Date Range');
  164 |     await detail.pickDateRange('2026-07-01', '2026-07-10');
  165 |     await expect(detail.hourlyGraph).toBeVisible();
  166 |   });
  167 | 
  168 |   test('Verify Live View Tab Selection', async () => {
  169 |     await detail.selectFirstPackerLine();
  170 |     await detail.liveViewTab.click();
  171 |     await expect(detail.page.getByText(/live view/i).first()).toBeVisible();
  172 |   });
  173 | 
  174 |   test('Verify Live View Description Text', async () => {
  175 |     await detail.selectFirstPackerLine();
  176 |     await detail.liveViewTab.click();
  177 |     await expect(detail.liveViewHelperText).toBeVisible();
  178 |   });
  179 | 
  180 |   test('Verify Quality/Resolution Dropdown Options', async () => {
  181 |     await detail.selectFirstPackerLine();
  182 |     await detail.liveViewTab.click();
  183 |     await detail.qualityDropdown.click();
  184 |     for (const res of ['360p', '720p', '1080p']) {
  185 |       await expect(detail.page.getByRole('option', { name: new RegExp(res) })).toBeVisible();
  186 |     }
  187 |   });
  188 | 
  189 |   test('Verify Frame Rate Dropdown Options', async () => {
  190 |     await detail.selectFirstPackerLine();
  191 |     await detail.liveViewTab.click();
  192 |     await detail.frameRateDropdown.click();
  193 |     for (const fps of ['1 fps', '5 fps', '10 fps', '15 fps']) {
  194 |       await expect(detail.page.getByRole('option', { name: new RegExp(fps) })).toBeVisible();
  195 |     }
  196 |   });
  197 | 
  198 |   test('Verify Idle State Before Go Live', async () => {
  199 |     await detail.selectFirstPackerLine();
  200 |     await detail.liveViewTab.click();
  201 |     await expect(detail.page.getByText('idle', { exact: true })).toBeVisible();
  202 |     await expect(detail.goLiveButton).toBeVisible();
  203 |   });
  204 | });
  205 | 
  206 | test.describe('Factory Detail - Devices Tab', () => {
  207 |   let detail;
  208 | 
  209 |   test.beforeEach(async ({ page }) => {
  210 |     const factories = new FactoriesPage(page);
  211 |     detail = new FactoryDetailPage(page);
  212 |     await factories.open();
  213 |     const firstCompany = factories.companyRows.first();
  214 |     await factories.openFirstFactoryOf(firstCompany);
  215 |     await detail.goToTab('Devices');
  216 |     await expect(detail.devicesTable).toBeVisible({ timeout: 15_000 });
  217 |   });
  218 | 
  219 |   test('Verify Devices Table Columns', async () => {
  220 |     const headerRow = detail.devicesTable.locator('thead');
  221 |     for (const col of ['S.NO', 'DEVICE NAME', 'DEVICE TYPE', 'STATUS', 'CREATED ON', 'UPDATED ON', 'ACTIONS']) {
  222 |       await expect(headerRow).toContainText(new RegExp(col, 'i'));
  223 |     }
  224 |   });
  225 | 
  226 |   test('Verify Search Devices Field', async () => {
  227 |     const rowsBefore = await detail.devicesTable.locator('tbody tr').count();
  228 |     const firstDeviceName = (await detail.devicesTable.locator('tbody tr').first().innerText()).split('\n')[1] || '';
  229 |     await detail.deviceSearchInput.fill(firstDeviceName.slice(0, 3));
  230 |     const rowsAfter = await detail.devicesTable.locator('tbody tr').count();
  231 |     expect(rowsAfter).toBeLessThanOrEqual(rowsBefore);
  232 |   });
  233 | 
  234 |   test('Verify Edit Icon Action', async () => {
  235 |     await detail.deviceEditIcon.first().click();
  236 |     await expect(detail.page.getByRole('dialog').or(detail.page.locator('form'))).toBeVisible();
  237 |   });
  238 | 
  239 |   test('Verify Device Deletion Confirmation', async () => {
  240 |     await detail.deviceDeleteIcon.first().click();
  241 |     await expect(detail.page.getByText(/are you sure|confirm delete/i)).toBeVisible();
  242 |   });
  243 | });
  244 | 
  245 | test.describe('Factory Detail - Performance Tab', () => {
  246 |   let detail;
  247 | 
  248 |   test.beforeEach(async ({ page }) => {
```