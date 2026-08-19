# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: factories/factories.spec.js >> Factory Detail - Devices Tab >> Verify Edit Icon Action
- Location: tests/factories/factories.spec.js:234:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog').or(locator('form'))
Expected: visible
Error: strict mode violation: getByRole('dialog').or(locator('form')) resolved to 2 elements:
    1) <div role="dialog" tabindex="-1" id="radix-_r_h_" data-state="open" aria-labelledby="radix-_r_i_" aria-describedby="radix-_r_j_" class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2…>…</div> aka getByRole('dialog', { name: 'Update Device' })
    2) <form class="space-y-6 pt-2">…</form> aka getByText('Device NameDevice TypeMachineCameraMachineCancelUpdate')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('dialog').or(locator('form'))

```

# Page snapshot

```yaml
- generic:
  - list
  - generic:
    - generic:
      - generic:
        - generic:
          - generic:
            - img
          - generic:
            - generic:
              - button:
                - img
                - generic: Back to Factories
            - generic:
              - list:
                - listitem:
                  - generic:
                    - img
                    - generic: Aftab Textile Factorys
                - listitem:
                  - link:
                    - /url: /factories/Aftab%20Textile%20Factorys/analytics
                    - img
                    - generic: Analytics
                - listitem:
                  - link:
                    - /url: /factories/Aftab%20Textile%20Factorys/devices
                    - img
                    - generic: Devices
                - listitem:
                  - link:
                    - /url: /factories/Aftab%20Textile%20Factorys/clips
                    - img
                    - generic: Clips
                - listitem:
                  - link:
                    - /url: /factories/Aftab%20Textile%20Factorys/performance
                    - img
                    - generic: Performance
                - listitem:
                  - link:
                    - /url: /factories/Aftab%20Textile%20Factorys/configuration
                    - img
                    - generic: Configuration
                - listitem:
                  - link:
                    - /url: /factories/Aftab%20Textile%20Factorys/summary
                    - img
                    - generic: Summary
    - main:
      - generic:
        - generic:
          - button:
            - img
            - generic: Toggle Sidebar
          - button:
            - img
          - navigation:
            - list:
              - listitem:
                - link:
                  - /url: /factories
                  - text: Factories
                - generic:
                  - img
              - listitem:
                - link:
                  - /url: /factories/Aftab%20Textile%20Factorys
                  - text: Aftab Textile Factorys
                - generic:
                  - img
              - listitem:
                - link [disabled]: Devices
        - generic:
          - button:
            - img
            - generic: Toggle theme
          - button:
            - img
          - button:
            - img
            - generic: 9+
          - button:
            - generic:
              - generic:
                - img
      - generic:
        - generic:
          - generic:
            - generic:
              - generic:
                - generic:
                  - generic:
                    - heading [level=1]: Devices
                    - paragraph: View and manage your devices under the selected industry.
                  - generic:
                    - generic:
                      - generic:
                        - img
                      - textbox:
                        - /placeholder: Search
                    - button:
                      - img
                      - text: Add Device
                  - generic:
                    - generic:
                      - generic:
                        - table:
                          - rowgroup:
                            - row:
                              - columnheader: S.NO
                              - columnheader: DEVICE NAME
                              - columnheader: DEVICE TYPE
                              - columnheader: STATUS
                              - columnheader: CREATED ON
                              - columnheader: UPDATED ON
                              - columnheader: ACTIONS
                          - rowgroup:
                            - row:
                              - cell:
                                - generic: "1"
                              - cell: aftab textile device
                              - cell: machine
                              - cell:
                                - generic: active
                              - cell:
                                - generic: Jul 26, 2026
                              - cell:
                                - generic: Aug 6, 2026
                              - cell:
                                - generic:
                                  - button:
                                    - img
                                  - button:
                                    - img
                                  - button:
                                    - img
                    - generic:
                      - navigation:
                        - list:
                          - listitem:
                            - link:
                              - /url: "#"
                              - img
                              - generic: Previous
                          - listitem:
                            - link:
                              - /url: "#"
                              - text: "1"
                          - listitem:
                            - link:
                              - /url: "#"
                              - generic: Next
                              - img
  - alert: Aftab Textile Factorys · Count | Digital Eye
  - dialog "Update Device" [ref=e2]:
    - generic [ref=e3]:
      - heading "Update Device" [level=2] [ref=e4]
      - paragraph [ref=e5]: Update the device details
    - generic [ref=e6]:
      - generic [ref=e7]:
        - text: Device Name
        - textbox "Device Name" [active] [ref=e9]:
          - /placeholder: Enter device name
          - text: aftab textile device
      - generic [ref=e10]:
        - text: Device Type
        - combobox "Device Type" [ref=e11] [cursor=pointer]:
          - generic: Machine
          - img [ref=e12]
        - combobox [ref=e14]
      - generic [ref=e15]:
        - button "Cancel" [ref=e16] [cursor=pointer]
        - button "Update" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```

# Test source

```ts
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
  148 |     await expect(detail.hourlyGraph).toBeVisible();
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
> 236 |     await expect(detail.page.getByRole('dialog').or(detail.page.locator('form'))).toBeVisible();
      |                                                                                   ^ Error: expect(locator).toBeVisible() failed
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
  279 |     await detail.performanceDownloadButton.click();
  280 |     const download = await downloadPromise;
  281 |     expect(download.suggestedFilename()).toBeTruthy();
  282 |   });
  283 | });
  284 | 
```