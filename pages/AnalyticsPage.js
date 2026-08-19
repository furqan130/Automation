const { BasePage } = require('./BasePage');

class AnalyticsPage extends BasePage {
  constructor(page) {
    super(page);

    this.factoryFilterDropdown = page.getByRole('combobox', { name: /all factories|factory/i }).or(
      page.getByPlaceholder(/all factories/i)
    ).or(page.getByRole('combobox'));
    this.factoryFilterSearch = page.getByPlaceholder(/search/i);
    // "Select filter" is a menu-trigger button, not a native/combobox dropdown.
    this.dateFilterDropdown = page.getByRole('button', { name: /select filter/i });
    this.byDateOption = page.getByRole('menuitem', { name: /^by date$/i }).or(page.getByText(/^by date$/i));
    this.byMonthOption = page.getByRole('menuitem', { name: /^by month$/i }).or(page.getByText(/^by month$/i));
    this.byYearOption = page.getByRole('menuitem', { name: /^by year$/i }).or(page.getByText(/^by year$/i));
    // The date filter is a button-triggered calendar popover, not a native input. Once a period
    // type is chosen, the trigger button's label becomes the *currently selected* date/period
    // (e.g. "July 23rd, 2026"), not literal placeholder text - locate it via the "Period" label.
    this.datePicker = page.getByText('Period', { exact: true }).locator('xpath=following-sibling::button').first();
    this.resetFilterButton = page.getByRole('button', { name: /reset|clear/i });

    // Cards render as "Sugar bags (day)" / "Sugar bags (month)" in this build.
    this.todayBagsCard = page.locator('div').filter({ hasText: /sugar bags.*day/i }).first();
    this.monthBagsCard = page.locator('div').filter({ hasText: /sugar bags.*month/i }).first();

    this.dailyProductionChart = page.locator('div').filter({ hasText: /daily production/i }).first();
    this.monthlyProductionChart = page.locator('div').filter({ hasText: /monthly production/i }).first();
    this.trendLineChart = page.locator('[data-testid="production-trend-chart"], .recharts-line').first();

    // Bar clicks/hovers must target the drawn <path>, not the invisible <g> wrapper Recharts renders it in.
    this.chartBars = page.locator('.recharts-bar-rectangle path');
    this.linePoints = page.locator('.recharts-line-dot, .recharts-dot');
    this.tooltip = page.locator('.recharts-tooltip-wrapper, [role="tooltip"]');

    this.pieChartModal = page.getByRole('dialog').filter({ hasText: /breakdown/i });
    this.pieChart = this.pieChartModal.locator('.recharts-pie, svg').first();
    this.breakdownTable = this.pieChartModal.locator('table');
    this.pieChartCloseButton = this.pieChartModal.getByRole('button', { name: /close|x/i }).or(
      this.pieChartModal.locator('[aria-label="Close"]')
    );
  }

  async open() {
    await this.goto('/analytics');
  }

  async selectFactory(name) {
    await this.factoryFilterDropdown.click();
    await this.factoryFilterSearch.fill(name);
    await this.page.getByRole('option', { name }).click();
  }

  async selectDateFilter(option) {
    await this.dateFilterDropdown.click();
    const opt = { 'By Date': this.byDateOption, 'By Month': this.byMonthOption, 'By Year': this.byYearOption }[option];
    await opt.click();
  }

  async pickDate(dateStr) {
    await this.datePicker.click();
    await this.selectCalendarDate(dateStr);
  }

  async hoverBar(index = 0) {
    await this.chartBars.nth(index).hover();
  }

  async clickBar(index = 0) {
    await this.chartBars.nth(index).click();
  }

  async hoverLinePoint(index = 0) {
    await this.linePoints.nth(index).hover();
  }
}

module.exports = { AnalyticsPage };
