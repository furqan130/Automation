const { BasePage } = require('./BasePage');

class ReportsPage extends BasePage {
  constructor(page) {
    super(page);

    // Period is a single "Select period" button opening a dialog with a fiscal-year picker,
    // a quarter checkbox list, and a two-month range calendar - there are no separate
    // fiscal-year/quarter/month/date <select> or <input type=date> controls in this build.
    // Once a period is chosen, this button's label changes from "Select period" to the
    // selected value (e.g. "FY 2025-2026"), so anchor on the stable instructional text instead.
    this.periodButton = page.locator('div').filter({ hasText: /pick a fiscal year/i }).first().getByRole('button');
    this.periodDialog = page.getByRole('dialog', { name: /select period/i });
    this.fiscalYearButton = this.periodDialog.getByRole('button', { name: /select year|^\d{4}-\d{4}$/ });
    this.quarterButton = this.periodDialog.getByRole('button', { name: /select\.\.\.|qtr/i });
    this.periodApplyButton = this.periodDialog.getByRole('button', { name: /^apply$/i });
    this.periodClearButton = this.periodDialog.getByRole('button', { name: /^clear$/i });
    this.periodCloseButton = this.periodDialog.getByRole('button', { name: /close/i });

    // Scope narrows Company -> Factory -> Production line, each its own checkbox list with a
    // "Search..." box (not a combobox), inside the Scope panel.
    const scopeSection = page.locator('div').filter({ hasText: /^Scope/i }).first();
    this.companiesSection = scopeSection.locator('div').filter({ hasText: /^Companies/i }).first();
    this.factoriesSection = scopeSection.locator('div').filter({ hasText: /^Factories/i }).first();
    this.productionLinesSection = scopeSection.locator('div').filter({ hasText: /^Production Lines/i }).first();
    this.companySearch = this.companiesSection.getByPlaceholder('Search...');
    this.factorySearch = this.factoriesSection.getByPlaceholder('Search...');
    this.packerSearch = this.productionLinesSection.getByPlaceholder('Search...');

    this.applyFilterButton = page.getByRole('button', { name: /apply filters/i });
    this.resetButton = page.getByRole('button', { name: /^reset$/i });
    // There's one combined "Download" action, not separate PDF/Excel buttons.
    this.downloadButton = page.getByRole('button', { name: /^download/i });
    this.downloadPdfOption = page.getByRole('menuitem', { name: /pdf/i }).or(page.getByText(/^pdf$/i));
    this.downloadExcelOption = page.getByRole('menuitem', { name: /excel|xlsx/i }).or(page.getByText(/excel/i));

    this.reportTable = page.locator('table');
    this.tableRows = this.reportTable.locator('tbody tr');
    this.noDataMessage = page.getByText(/select a fiscal year|no data/i);

    this.pagination = page.locator('[data-testid="pagination"], nav[aria-label="pagination"]');
    this.nextPageButton = page.getByRole('button', { name: /next/i });
    this.prevPageButton = page.getByRole('button', { name: /previous|prev/i });
    this.rowsPerPageDropdown = page.getByRole('combobox', { name: /rows per page/i });
  }

  async open() {
    await this.goto('/reports');
  }

  async selectFiscalYear(label) {
    await this.periodButton.click();
    await this.fiscalYearButton.click();
    await this.page.getByText(label, { exact: true }).click();
    await this.periodApplyButton.click();
  }

  async selectQuarter(q) {
    const map = { Q1: 'Qtr 1', Q2: 'Qtr 2', Q3: 'Qtr 3', Q4: 'Qtr 4' };
    await this.periodButton.click();
    await this.quarterButton.click();
    await this.page.getByRole('checkbox', { name: map[q] }).check();
    await this.periodApplyButton.click();
  }

  async selectDate(dateStr) {
    await this.periodButton.click();
    await this.selectCalendarDate(dateStr);
    await this.periodApplyButton.click();
  }

  companyCheckbox(name) {
    return this.companiesSection.getByRole('checkbox', { name });
  }

  factoryCheckbox(name) {
    return this.factoriesSection.getByRole('checkbox', { name });
  }

  packerCheckbox(name) {
    return this.productionLinesSection.getByRole('checkbox', { name });
  }

  async selectCompany(name) {
    await this.companyCheckbox(name).check();
  }

  async selectFactory(name) {
    await this.factoryCheckbox(name).check();
  }

  async selectPacker(name) {
    await this.packerCheckbox(name).check();
  }

  async downloadAs(format) {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadButton.click();
    const option = format === 'pdf' ? this.downloadPdfOption : this.downloadExcelOption;
    if (await option.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await option.click();
    }
    return downloadPromise;
  }
}

module.exports = { ReportsPage };
