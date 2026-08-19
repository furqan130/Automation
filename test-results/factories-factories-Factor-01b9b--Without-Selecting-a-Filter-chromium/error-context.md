# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: factories/factories.spec.js >> Factory Detail - Performance Tab >> Verify Download Without Selecting a Filter
- Location: tests/factories/factories.spec.js:277:3

# Error details

```
TimeoutError: page.waitForEvent: Timeout 15000ms exceeded while waiting for event "download"
=========================== logs ===========================
waiting for event "download"
============================================================
```

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /download/i })

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
            - link "Performance" [active] [ref=e40] [cursor=pointer]:
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
                - link "Performance" [disabled] [ref=e81]
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
      - generic [ref=e107]:
        - generic [ref=e108]:
          - heading "Performance" [level=1] [ref=e109]
          - paragraph [ref=e110]: View performance data for the selected industry.
        - generic [ref=e112]:
          - tablist [ref=e114]:
            - tab "Daily" [selected] [ref=e115] [cursor=pointer]
            - tab "Monthly" [ref=e116] [cursor=pointer]
          - generic [ref=e117]:
            - button "Select date" [ref=e118] [cursor=pointer]:
              - img [ref=e119]
              - generic [ref=e121]: Select date
            - button "Apply" [disabled]
        - generic [ref=e122]:
          - generic [ref=e123]:
            - generic [ref=e124]:
              - generic [ref=e125]:
                - img [ref=e126]
                - text: Downtime
              - generic [ref=e129]: "For: August 6th, 2026"
            - paragraph [ref=e131]: 350 min
          - generic [ref=e132]:
            - generic [ref=e133]:
              - generic [ref=e134]:
                - img [ref=e135]
                - text: Downtime Percentage
              - generic [ref=e139]: "For: August 6th, 2026"
            - paragraph [ref=e141]: 59.32%
        - generic [ref=e142]:
          - generic [ref=e143]:
            - generic [ref=e144]: Factory online status
            - generic [ref=e145]: "For: August 6th, 2026"
          - generic [ref=e148]:
            - img [ref=e151]:
              - generic [ref=e156]:
                - generic [ref=e158]: 06:00
                - generic [ref=e160]: 06:30
                - generic [ref=e162]: 07:00
                - generic [ref=e164]: 07:30
                - generic [ref=e166]: 08:00
                - generic [ref=e168]: 08:30
                - generic [ref=e170]: 09:00
                - generic [ref=e172]: 09:30
                - generic [ref=e174]: 10:00
                - generic [ref=e176]: 10:30
                - generic [ref=e178]: 11:00
                - generic [ref=e180]: 11:30
                - generic [ref=e182]: 12:00
                - generic [ref=e184]: 12:30
                - generic [ref=e186]: 13:00
                - generic [ref=e188]: 13:30
                - generic [ref=e190]: 14:00
                - generic [ref=e192]: 14:30
                - generic [ref=e194]: 15:00
                - generic [ref=e196]: 15:40
              - generic [ref=e198]:
                - generic [ref=e200]: "-1"
                - generic [ref=e202]: "0"
                - generic [ref=e204]: "1"
            - generic [ref=e211]:
              - generic [ref=e214]: Online
              - generic [ref=e217]: Offline
  - alert [ref=e218]: Performance | Digital Eye
  - generic [ref=e219]: "-1"
```

# Test source

```ts
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
  249 |     const factories = new FactoriesPage(page);
  250 |     detail = new FactoryDetailPage(page);
  251 |     await factories.open();
  252 |     const firstCompany = factories.companyRows.first();
  253 |     await factories.openFirstFactoryOf(firstCompany);
  254 |     await detail.goToTab('Performance');
  255 |     await expect(detail.performanceDateFilter).toBeVisible({ timeout: 15_000 });
  256 |   });
  257 | 
  258 |   test('Verify One-Day Filter Visibility', async () => {
  259 |     await expect(detail.performanceDateFilter).toBeVisible();
  260 |   });
  261 | 
  262 |   test('Verify Selecting a Specific Day', async () => {
  263 |     // This build surfaces Downtime metrics on the Performance tab, not GPU/CPU usage.
  264 |     await detail.pickPerformanceDate('2026-07-15');
  265 |     await expect(detail.downtimeBox).toBeVisible();
  266 |     await expect(detail.downtimePercentageBox).toBeVisible();
  267 |   });
  268 | 
  269 |   test('Verify Download Functionality', async ({ page }) => {
  270 |     await detail.pickPerformanceDate('2026-07-15');
  271 |     const downloadPromise = page.waitForEvent('download');
  272 |     await detail.performanceDownloadButton.click();
  273 |     const download = await downloadPromise;
  274 |     expect(download.suggestedFilename()).toBeTruthy();
  275 |   });
  276 | 
  277 |   test('Verify Download Without Selecting a Filter', async ({ page }) => {
  278 |     const downloadPromise = page.waitForEvent('download');
> 279 |     await detail.performanceDownloadButton.click();
      |                                            ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  280 |     const download = await downloadPromise;
  281 |     expect(download.suggestedFilename()).toBeTruthy();
  282 |   });
  283 | });
  284 | 
```