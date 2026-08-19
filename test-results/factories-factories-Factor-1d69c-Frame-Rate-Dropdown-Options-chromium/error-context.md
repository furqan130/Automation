# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: factories/factories.spec.js >> Factory Detail Page >> Verify Frame Rate Dropdown Options
- Location: tests/factories/factories.spec.js:189:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('div').filter({ hasText: /^Packer line/i }).first().getByRole('combobox')

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
            - button "Refresh count data" [ref=e133] [cursor=pointer]:
              - img [ref=e134]
              - text: Refresh
          - generic [ref=e139]:
            - generic [ref=e141]:
              - paragraph [ref=e142]: Period type
              - button "Select filter" [ref=e143] [cursor=pointer]:
                - generic [ref=e144]: Select filter
                - img [ref=e145]
            - generic [ref=e147]:
              - generic [ref=e148]: Aftab Textile Factorys · Today & this month · current year in charts
              - generic [ref=e149]:
                - img [ref=e150]
                - text: Updated 3:44 PM
                - generic [ref=e155]: · auto-refreshes every 2.5 min
        - generic [ref=e156]:
          - generic [ref=e157]:
            - heading "Factory totals" [level=2] [ref=e158]
            - paragraph [ref=e159]: Aggregated across all packer lines at this factory.
          - generic [ref=e160]:
            - generic [ref=e161]:
              - generic [ref=e162]:
                - paragraph [ref=e163]: Count (day)
                - img [ref=e165]
              - paragraph [ref=e169]: "29"
              - paragraph [ref=e170]: August 6, 2026
            - generic [ref=e171]:
              - generic [ref=e172]:
                - paragraph [ref=e173]: Count (month)
                - img [ref=e175]
              - paragraph [ref=e179]: "53"
              - paragraph [ref=e180]: August 2026
        - generic [ref=e181]:
          - generic [ref=e182]:
            - generic [ref=e183]:
              - heading "Packer line" [level=2] [ref=e184]
              - paragraph [ref=e185]: Select a line to view its count breakdown and optional live view.
            - generic [ref=e186]:
              - paragraph [ref=e187]: Production section
              - tablist [ref=e189]:
                - tab "Kiln" [selected] [ref=e190] [cursor=pointer]
                - tab "Packaging" [ref=e191] [cursor=pointer]
          - generic [ref=e193]:
            - img [ref=e194]
            - generic [ref=e197]:
              - paragraph [ref=e198]: No packer lines found
              - paragraph [ref=e199]: This factory has no camera lines configured yet. Set up devices to start tracking count.
            - link "Go to Devices" [ref=e200] [cursor=pointer]:
              - /url: /factories/Aftab Textile Factorys/devices
  - alert [ref=e201]: Factories & Companies | Digital Eye
```

# Test source

```ts
  8   |     // The breadcrumb repeats the current section's name as a disabled crumb (e.g. a second,
  9   |     // non-interactive "Analytics" link) - exclude it via disabled:false so only the real
  10  |     // side-nav item matches.
  11  |     this.analyticsTab = page.getByRole('tab', { name: /^analytics$/i }).or(page.getByRole('link', { name: /^analytics$/i, disabled: false }));
  12  |     this.devicesTab = page.getByRole('tab', { name: /^devices$/i }).or(page.getByRole('link', { name: /^devices$/i, disabled: false }));
  13  |     this.performanceTab = page.getByRole('tab', { name: /^performance$/i }).or(page.getByRole('link', { name: /^performance$/i, disabled: false }));
  14  |     this.liveViewTab = page.getByRole('tab', { name: /live view/i }).or(page.getByRole('link', { name: /live view/i, disabled: false }));
  15  | 
  16  |     // Analytics tab
  17  |     this.factoryMapButton = page.getByRole('link', { name: /factory map/i }).or(page.getByRole('button', { name: /factory map/i }));
  18  |     this.globalAnalyticsButton = page.getByRole('link', { name: /global analytics/i }).or(
  19  |       page.getByRole('button', { name: /global analytics/i })
  20  |     );
  21  |     this.filtersSection = page.locator('section, div').filter({ hasText: /filters/i }).first();
  22  |     // "Select filter" is a menu-trigger button, not a native/combobox dropdown.
  23  |     this.selectFilterDropdown = page.getByRole('button', { name: /select filter/i });
  24  |     this.byDateOption = page.getByRole('menuitem', { name: /^by date$/i }).or(page.getByText(/^by date$/i));
  25  |     this.byMonthOption = page.getByRole('menuitem', { name: /^by month$/i }).or(page.getByText(/^by month$/i));
  26  |     this.dateRangeOption = page.getByRole('menuitem', { name: /date range/i }).or(page.getByText(/date range/i));
  27  |     // The date/range pickers are button-triggered calendar popovers, not native inputs. Once
  28  |     // "By Date" is chosen, the trigger button's label becomes the *currently selected* date
  29  |     // (e.g. "July 23rd, 2026"), so it's located via the "Date" label next to it, not by text.
  30  |     this.datePicker = page.getByText('Date', { exact: true }).locator('xpath=following-sibling::button').first();
  31  |     this.startDatePicker = page.getByRole('button', { name: /start date|from date|pick start date/i }).first();
  32  |     this.endDatePicker = page.getByRole('button', { name: /end date|to date|pick end date/i }).first();
  33  | 
  34  |     // The count-unit label varies by factory/industry - "Aftab Textile Factorys" (the fixture
  35  |     // these tests exercise) shows generic "Count (day)/(month)", not "Cement Bags", confirmed live.
  36  |     this.cementBagsDayBox = page.locator('div').filter({ hasText: /(cement bags|count).*\bday\b/i }).first();
  37  |     this.cementBagsMonthBox = page.locator('div').filter({ hasText: /(cement bags|count).*\bmonth\b/i }).first();
  38  | 
  39  |     // The packer line picker is a searchable combobox (cmdk-style), not a plain list of items.
  40  |     this.packerLineDropdown = page.locator('div').filter({ hasText: /^Packer line/i }).first().getByRole('combobox');
  41  |     this.hourlyGraph = page.locator('[data-testid="hourly-production-graph"]').or(
  42  |       page.locator('div').filter({ hasText: /hourly production/i }).first()
  43  |     );
  44  |     this.hourlyGraphCalendar = page.locator('[data-testid="hourly-graph-calendar"], .calendar, [role="grid"]');
  45  | 
  46  |     // Live view
  47  |     this.liveViewHelperText = page.getByText(/on-demand annotated stream/i);
  48  |     this.qualityDropdown = page.getByRole('combobox', { name: /quality|resolution/i });
  49  |     this.frameRateDropdown = page.getByRole('combobox', { name: /frame rate/i });
  50  |     this.goLiveButton = page.getByRole('button', { name: /go live/i });
  51  |     this.videoPanel = page.locator('[data-testid="live-view-panel"], video').first();
  52  | 
  53  |     // Devices tab
  54  |     this.devicesTable = page.locator('table');
  55  |     const deviceRows = this.devicesTable.locator('tbody tr');
  56  |     this.deviceSearchInput = page.getByPlaceholder(/search/i);
  57  |     this.addDeviceButton = page.getByRole('button', { name: /add device/i });
  58  |     this.deviceNameInput = page.getByLabel(/device name/i);
  59  |     this.deviceTypeDropdown = page.getByRole('combobox', { name: /device type/i });
  60  |     this.saveDeviceButton = page.getByRole('dialog').getByRole('button', { name: /save|add|create/i });
  61  |     // Row action icons carry no accessible name; each row renders [view, edit, delete] in that order.
  62  |     this.deviceEditIcon = deviceRows.locator('button').nth(1);
  63  |     this.deviceDeleteIcon = deviceRows.locator('button').nth(2);
  64  |     this.deleteConfirmButton = page.getByRole('button', { name: /confirm|yes|delete/i });
  65  | 
  66  |     // Performance tab
  67  |     this.performanceDateFilter = page.getByRole('button', { name: /select date/i });
  68  |     this.performanceDownloadButton = page.getByRole('button', { name: /download/i });
  69  |     // There are no GPU/CPU usage metrics in this build; Performance surfaces downtime instead.
  70  |     this.downtimeBox = page.locator('div').filter({ hasText: /^Downtime(?!\s*Percentage)/i }).first();
  71  |     this.downtimePercentageBox = page.locator('div').filter({ hasText: /Downtime Percentage/i }).first();
  72  |   }
  73  | 
  74  |   async goToTab(tabName) {
  75  |     const tab = { Analytics: this.analyticsTab, Devices: this.devicesTab, Performance: this.performanceTab }[tabName];
  76  |     await tab.click();
  77  |   }
  78  | 
  79  |   async selectFilter(option) {
  80  |     await this.selectFilterDropdown.click();
  81  |     const opt = { 'By Date': this.byDateOption, 'By Month': this.byMonthOption, 'Date Range': this.dateRangeOption }[option];
  82  |     await opt.click();
  83  |   }
  84  | 
  85  |   async pickDate(dateStr) {
  86  |     await this._clickResilient(this.datePicker);
  87  |     await this.selectCalendarDate(dateStr);
  88  |   }
  89  | 
  90  |   // The start-date popover doesn't auto-close once a day is picked, and the end-date trigger
  91  |   // sits underneath it - confirmed live this still opens the end-date popover fine when clicked
  92  |   // deliberately, but the background "Updating..." refetch triggered by the new filter can
  93  |   // detach/re-render these trigger buttons in the same window, so both trigger clicks use the
  94  |   // same retry-on-detach handling as the calendar's own nav/day cells.
  95  |   async pickDateRange(startStr, endStr) {
  96  |     await this._clickResilient(this.startDatePicker);
  97  |     await this.selectCalendarDate(startStr);
  98  |     await this._clickResilient(this.endDatePicker);
  99  |     await this.selectCalendarDate(endStr);
  100 |   }
  101 | 
  102 |   async pickPerformanceDate(dateStr) {
  103 |     await this._clickResilient(this.performanceDateFilter);
  104 |     await this.selectCalendarDate(dateStr);
  105 |   }
  106 | 
  107 |   async selectFirstPackerLine() {
> 108 |     await this.packerLineDropdown.click();
      |                                   ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  109 |     await this.page.getByRole('listbox').getByRole('option').first().click();
  110 |   }
  111 | }
  112 | 
  113 | module.exports = { FactoryDetailPage };
  114 | 
```