const { BasePage } = require('./BasePage');

class FactoryDetailPage extends BasePage {
  constructor(page) {
    super(page);

    this.factoryNameHeader = page.locator('h1, h2').first();
    // The breadcrumb repeats the current section's name as a disabled crumb (e.g. a second,
    // non-interactive "Analytics" link) - exclude it via disabled:false so only the real
    // side-nav item matches.
    this.analyticsTab = page.getByRole('tab', { name: /^analytics$/i }).or(page.getByRole('link', { name: /^analytics$/i, disabled: false }));
    this.devicesTab = page.getByRole('tab', { name: /^devices$/i }).or(page.getByRole('link', { name: /^devices$/i, disabled: false }));
    this.performanceTab = page.getByRole('tab', { name: /^performance$/i }).or(page.getByRole('link', { name: /^performance$/i, disabled: false }));
    this.liveViewTab = page.getByRole('tab', { name: /live view/i }).or(page.getByRole('link', { name: /live view/i, disabled: false }));

    // Analytics tab
    this.factoryMapButton = page.getByRole('link', { name: /factory map/i }).or(page.getByRole('button', { name: /factory map/i }));
    this.globalAnalyticsButton = page.getByRole('link', { name: /global analytics/i }).or(
      page.getByRole('button', { name: /global analytics/i })
    );
    this.filtersSection = page.locator('section, div').filter({ hasText: /filters/i }).first();
    // "Select filter" is a menu-trigger button, not a native/combobox dropdown.
    this.selectFilterDropdown = page.getByRole('button', { name: /select filter/i });
    this.byDateOption = page.getByRole('menuitem', { name: /^by date$/i }).or(page.getByText(/^by date$/i));
    this.byMonthOption = page.getByRole('menuitem', { name: /^by month$/i }).or(page.getByText(/^by month$/i));
    this.dateRangeOption = page.getByRole('menuitem', { name: /date range/i }).or(page.getByText(/date range/i));
    // The date/range pickers are button-triggered calendar popovers, not native inputs. Once
    // "By Date" is chosen, the trigger button's label becomes the *currently selected* date
    // (e.g. "July 23rd, 2026"), so it's located via the "Date" label next to it, not by text.
    this.datePicker = page.getByText('Date', { exact: true }).locator('xpath=following-sibling::button').first();
    this.startDatePicker = page.getByRole('button', { name: /start date|from date|pick start date/i }).first();
    this.endDatePicker = page.getByRole('button', { name: /end date|to date|pick end date/i }).first();

    // The count-unit label varies by factory/industry - "Aftab Textile Factorys" (the fixture
    // these tests exercise) shows generic "Count (day)/(month)", not "Cement Bags", confirmed live.
    this.cementBagsDayBox = page.locator('div').filter({ hasText: /(cement bags|count).*\bday\b/i }).first();
    this.cementBagsMonthBox = page.locator('div').filter({ hasText: /(cement bags|count).*\bmonth\b/i }).first();

    // The packer line picker is a searchable combobox (cmdk-style), not a plain list of items.
    this.packerLineDropdown = page.locator('div').filter({ hasText: /^Packer line/i }).first().getByRole('combobox');
    this.hourlyGraph = page.locator('[data-testid="hourly-production-graph"]').or(
      page.locator('div').filter({ hasText: /hourly production/i }).first()
    );
    this.hourlyGraphCalendar = page.locator('[data-testid="hourly-graph-calendar"], .calendar, [role="grid"]');

    // Live view
    this.liveViewHelperText = page.getByText(/on-demand annotated stream/i);
    this.qualityDropdown = page.getByRole('combobox', { name: /quality|resolution/i });
    this.frameRateDropdown = page.getByRole('combobox', { name: /frame rate/i });
    this.goLiveButton = page.getByRole('button', { name: /go live/i });
    this.videoPanel = page.locator('[data-testid="live-view-panel"], video').first();

    // Devices tab
    this.devicesTable = page.locator('table');
    const deviceRows = this.devicesTable.locator('tbody tr');
    this.deviceSearchInput = page.getByPlaceholder(/search/i);
    this.addDeviceButton = page.getByRole('button', { name: /add device/i });
    this.deviceNameInput = page.getByLabel(/device name/i);
    this.deviceTypeDropdown = page.getByRole('combobox', { name: /device type/i });
    this.saveDeviceButton = page.getByRole('dialog').getByRole('button', { name: /save|add|create/i });
    // Row action icons carry no accessible name; each row renders [view, edit, delete] in that order.
    this.deviceEditIcon = deviceRows.locator('button').nth(1);
    this.deviceDeleteIcon = deviceRows.locator('button').nth(2);
    this.deleteConfirmButton = page.getByRole('button', { name: /confirm|yes|delete/i });

    // Performance tab
    this.performanceDateFilter = page.getByRole('button', { name: /select date/i });
    this.performanceDownloadButton = page.getByRole('button', { name: /download/i });
    // There are no GPU/CPU usage metrics in this build; Performance surfaces downtime instead.
    this.downtimeBox = page.locator('div').filter({ hasText: /^Downtime(?!\s*Percentage)/i }).first();
    this.downtimePercentageBox = page.locator('div').filter({ hasText: /Downtime Percentage/i }).first();
  }

  async goToTab(tabName) {
    const tab = { Analytics: this.analyticsTab, Devices: this.devicesTab, Performance: this.performanceTab }[tabName];
    await tab.click();
  }

  async selectFilter(option) {
    await this.selectFilterDropdown.click();
    const opt = { 'By Date': this.byDateOption, 'By Month': this.byMonthOption, 'Date Range': this.dateRangeOption }[option];
    await opt.click();
  }

  async pickDate(dateStr) {
    await this._clickResilient(this.datePicker);
    await this.selectCalendarDate(dateStr);
  }

  // The start-date popover doesn't auto-close once a day is picked, and the end-date trigger
  // sits underneath it - confirmed live this still opens the end-date popover fine when clicked
  // deliberately, but the background "Updating..." refetch triggered by the new filter can
  // detach/re-render these trigger buttons in the same window, so both trigger clicks use the
  // same retry-on-detach handling as the calendar's own nav/day cells.
  async pickDateRange(startStr, endStr) {
    await this._clickResilient(this.startDatePicker);
    await this.selectCalendarDate(startStr);
    await this._clickResilient(this.endDatePicker);
    await this.selectCalendarDate(endStr);
  }

  async pickPerformanceDate(dateStr) {
    await this._clickResilient(this.performanceDateFilter);
    await this.selectCalendarDate(dateStr);
  }

  async selectFirstPackerLine() {
    await this.packerLineDropdown.click();
    await this.page.getByRole('listbox').getByRole('option').first().click();
  }
}

module.exports = { FactoryDetailPage };
