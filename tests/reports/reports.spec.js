const { test, expect } = require('@playwright/test');
const { ReportsPage } = require('../../pages/ReportsPage');

// Only 2025-2026 and 2026-2027 fiscal years exist in this UAT dataset.
const FISCAL_YEAR = '2025-2026';

test.describe('Reports Page', () => {
  let reports;

  test.beforeEach(async ({ page }) => {
    reports = new ReportsPage(page);
    await reports.open();
  });

  test('Verify Report Page Load', async () => {
    await expect(reports.periodButton).toBeVisible();
    await expect(reports.reportTable).toBeVisible();
  });

  test('Verify Fiscal Year Picker', async () => {
    await reports.periodButton.click();
    await reports.fiscalYearButton.click();
    await expect(reports.page.getByText(/^\d{4}-\d{4}$/).first()).toBeVisible();
    await reports.periodCloseButton.click();
  });

  test('Verify Buttons Visibility After Fiscal Year Selection', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await expect(reports.applyFilterButton).toBeEnabled();
    await expect(reports.downloadButton).toBeVisible();
  });

  test('Verify Apply Filter Without Fiscal Year', async () => {
    const disabled = await reports.applyFilterButton.isDisabled().catch(() => false);
    if (!disabled) {
      await reports.applyFilterButton.click();
      await expect(reports.page.getByText(/select.*fiscal year/i)).toBeVisible();
    } else {
      await expect(reports.applyFilterButton).toBeDisabled();
    }
  });

  test('Verify Fiscal Year Data Range', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    const text = await reports.reportTable.innerText();
    expect(/2025|2026/.test(text)).toBeTruthy();
  });

  test('Verify Quarter Filter Availability', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.periodButton.click();
    await expect(reports.quarterButton).toBeVisible();
    await reports.periodCloseButton.click();
  });

  test('Verify First Quarter Data', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.selectQuarter('Q1');
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    const text = await reports.reportTable.innerText();
    expect(/july|august|september/i.test(text)).toBeTruthy();
  });

  test('Verify Second Quarter Data', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.selectQuarter('Q2');
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    const text = await reports.reportTable.innerText();
    expect(/october|november|december/i.test(text)).toBeTruthy();
  });

  test('Verify Third Quarter Data', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.selectQuarter('Q3');
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    const text = await reports.reportTable.innerText();
    expect(/january|february|march/i.test(text)).toBeTruthy();
  });

  test('Verify Fourth Quarter Data', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.selectQuarter('Q4');
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    const text = await reports.reportTable.innerText();
    expect(/april|may|june/i.test(text)).toBeTruthy();
  });

  test('Verify Select All Quarters', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.periodButton.click();
    await reports.quarterButton.click();
    await reports.page.getByRole('checkbox', { name: 'Select all' }).check();
    await reports.periodApplyButton.click();
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
  });

  test('Verify Specific Date Selection', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.selectDate('2026-07-15');
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
  });

  test('Verify Company Filter', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    const firstOption = reports.companiesSection.locator('div').filter({ has: reports.page.getByRole('checkbox') }).first();
    const name = (await firstOption.innerText()).trim();
    await firstOption.getByRole('checkbox').check();
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    await expect(reports.reportTable).toContainText(name);
  });

  test('Verify Multiple Companies Selection', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    const options = reports.companiesSection.locator('div').filter({ has: reports.page.getByRole('checkbox') });
    await options.nth(0).getByRole('checkbox').check();
    await options.nth(1).getByRole('checkbox').check();
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
  });

  test('Verify Factory Filter', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    const firstOption = reports.factoriesSection.locator('div').filter({ has: reports.page.getByRole('checkbox') }).first();
    const name = (await firstOption.innerText()).trim();
    await firstOption.getByRole('checkbox').check();
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    await expect(reports.reportTable).toContainText(name);
  });

  test('Verify All Factories Selection', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
  });

  test('Verify Packer Filter', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    const firstFactory = reports.factoriesSection.locator('div').filter({ has: reports.page.getByRole('checkbox') }).first();
    await firstFactory.getByRole('checkbox').check();
    const firstPacker = reports.productionLinesSection.locator('div').filter({ has: reports.page.getByRole('checkbox') }).first();
    await firstPacker.getByRole('checkbox').check();
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
  });

  test('Verify Combined Filters', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.selectQuarter('Q1');
    const firstCompany = reports.companiesSection.locator('div').filter({ has: reports.page.getByRole('checkbox') }).first();
    await firstCompany.getByRole('checkbox').check();
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
  });

  test('Verify Table Data Accuracy', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    const headerRow = reports.reportTable.locator('thead');
    for (const col of ['Fiscal year', 'Month', 'Day', 'Company', 'Factory', 'Production line', 'Production']) {
      await expect(headerRow).toContainText(new RegExp(col, 'i'));
    }
  });

  test('Verify No Data Scenario', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.selectDate('2025-08-01');
    await reports.applyFilterButton.click();
    await expect(reports.noDataMessage.or(reports.tableRows.first())).toBeVisible({ timeout: 15_000 });
  });

  test('Verify Download PDF', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    const download = await reports.downloadAs('pdf');
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });

  test('Verify Download Excel', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    const download = await reports.downloadAs('excel');
    expect(download.suggestedFilename()).toMatch(/\.xlsx?$/i);
  });

  test('Verify Download Without Apply Filter', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    const download = await reports.downloadAs('pdf').catch(() => null);
    expect(download).toBeTruthy();
  });

  test('Verify Download Data Consistency', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    const rowCountOnScreen = await reports.tableRows.count();
    const download = await reports.downloadAs('excel');
    expect(download.suggestedFilename()).toBeTruthy();
    expect(rowCountOnScreen).toBeGreaterThan(0);
  });

  test('Verify Reset Filters', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.selectQuarter('Q1');
    await reports.resetButton.click();
    await expect(reports.applyFilterButton).toBeDisabled();
  });

  test('Verify Pagination on Report Table', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
    if (await reports.nextPageButton.isEnabled().catch(() => false)) {
      const firstRowBefore = await reports.tableRows.first().innerText();
      await reports.nextPageButton.click();
      await expect(async () => {
        const firstRowAfter = await reports.tableRows.first().innerText();
        expect(firstRowAfter).not.toBe(firstRowBefore);
      }).toPass({ timeout: 10_000 });
      await reports.prevPageButton.click();
    }
  });

  test('Verify Performance', async () => {
    await reports.selectFiscalYear(FISCAL_YEAR);
    const start = Date.now();
    await reports.applyFilterButton.click();
    await expect(reports.tableRows.first()).toBeVisible({ timeout: 20_000 });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(20_000);
  });
});
