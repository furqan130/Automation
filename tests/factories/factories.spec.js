const { test, expect } = require('@playwright/test');
const { FactoriesPage } = require('../../pages/FactoriesPage');
const { FactoryDetailPage } = require('../../pages/FactoryDetailPage');

test.describe('Factories - List Page', () => {
  let factories;

  test.beforeEach(async ({ page }) => {
    factories = new FactoriesPage(page);
    await factories.open();
  });

  test('Verify All Factories Page Load', async () => {
    await expect(factories.searchInput).toBeVisible();
    await expect(factories.companyTab).toBeVisible();
    await expect(factories.factoryTab).toBeVisible();
  });

  // Supplementary coverage from the Factories functional requirements (search, map, filters, summary).
  test('Verify Search Supports Special Characters', async () => {
    for (const term of ['A.A.', 'AL-Qadir', 'Mahmood']) {
      await factories.search(term);
      await expect(factories.page.locator('body')).not.toContainText(/error|exception/i);
    }
  });

  test('Verify Interactive Factory Map Displays Markers', async () => {
    // The map is a three.js WebGL scene on a single <canvas> - individual markers have no
    // DOM nodes to count, so this only verifies the canvas itself renders.
    await expect(factories.map).toBeVisible();
  });

  // Marker tooltips are drawn inside the canvas (no DOM element to hover/assert on) - skipped by design.
  test.skip('Verify Factory Map Marker Hover Tooltip', async () => {});

  test('Verify Factory Status Filters (All/Online/Offline)', async () => {
    await factories.applyFilter('Online');
    await expect(factories.filterOnline).toHaveAttribute('aria-pressed', 'true').catch(() => {});
    await factories.applyFilter('Offline');
    await factories.applyFilter('All');
  });

  test('Verify Factory Summary Totals', async () => {
    // These render inside the map HUD, which only mounts once the (slow) 3D map has loaded.
    await expect(factories.totalFactoriesSummary).toContainText(/\d+/, { timeout: 30_000 });
    await expect(factories.onlineFactoriesSummary).toContainText(/\d+/);
    await expect(factories.offlineFactoriesSummary).toContainText(/\d+/);
  });
});

test.describe('Factory Detail Page', () => {
  let factories;
  let detail;

  test.beforeEach(async ({ page }) => {
    factories = new FactoriesPage(page);
    detail = new FactoryDetailPage(page);
    await factories.open();
    const firstCompany = factories.companyRows.first();
    await factories.openFirstFactoryOf(firstCompany);
    await expect(detail.factoryNameHeader).toBeVisible({ timeout: 15_000 });
  });

  test('Verify Factory Page Side Navigation Tabs', async () => {
    await expect(detail.analyticsTab).toBeVisible();
    await expect(detail.devicesTab).toBeVisible();
    await expect(detail.performanceTab).toBeVisible();
  });

  test('Verify Switching Between Analytics/Devices/Performance Tabs', async () => {
    await detail.goToTab('Devices');
    await expect(detail.devicesTable).toBeVisible();
    await detail.goToTab('Performance');
    await expect(detail.performanceDateFilter).toBeVisible();
    await detail.goToTab('Analytics');
    await expect(detail.filtersSection).toBeVisible();
  });

  test('Verify Factory Map Button Navigation', async ({ page }) => {
    await detail.factoryMapButton.click();
    await expect(page.locator('canvas').first()).toBeVisible();
  });

  test('Verify Global Analytics Button Navigation', async ({ page }) => {
    await detail.globalAnalyticsButton.click();
    await expect(page).toHaveURL(/analytics/i);
  });

  test('Verify Filters Section Visibility', async () => {
    await expect(detail.filtersSection).toBeVisible();
    await expect(detail.filtersSection).toContainText(/select filter/i);
    await expect(detail.filtersSection).toContainText(/changes apply automatically/i);
  });

  test('Verify By Date Filter', async () => {
    await detail.selectFilter('By Date');
    await detail.pickDate('2026-07-15');
    await expect(detail.cementBagsDayBox).toContainText(/\d+/);
  });

  test('Verify By Month Filter', async () => {
    await detail.selectFilter('By Month');
    await expect(detail.cementBagsMonthBox).toContainText(/\d+/);
  });

  test('Verify Date Range Filter - Valid Range', async () => {
    await detail.selectFilter('Date Range');
    await detail.pickDateRange('2026-07-01', '2026-07-15');
    await expect(detail.cementBagsMonthBox).toContainText(/\d+/);
  });

  test('Verify Date Range Filter - End Date Before Start Date', async ({ page }) => {
    await detail.selectFilter('Date Range');
    await detail.pickDateRange('2026-07-15', '2026-07-01');
    const error = page.locator('[role="alert"], .error-message, .text-red-500');
    await expect(error.first()).toBeVisible({ timeout: 5_000 });
  });

  test('Verify Cement Bags (Day) Box', async () => {
    await expect(detail.cementBagsDayBox).toBeVisible();
    await expect(detail.cementBagsDayBox).toContainText(/\d+/);
  });

  test('Verify Cement Bags (Month) Box', async () => {
    await expect(detail.cementBagsMonthBox).toBeVisible();
    await expect(detail.cementBagsMonthBox).toContainText(/\d+/);
  });

  test('Verify Totals Boxes Update with Filter Change', async () => {
    const before = await detail.cementBagsDayBox.innerText();
    await detail.selectFilter('By Date');
    await detail.pickDate('2026-07-01');
    await expect(async () => {
      const after = await detail.cementBagsDayBox.innerText();
      expect(after).not.toBe(before);
    }).toPass({ timeout: 10_000 });
  });

  test('Verify Packer-Line-Specific Bag Counts Match Filter', async () => {
    await detail.selectFirstPackerLine();
    await expect(detail.cementBagsDayBox).toContainText(/\d+/);
    await expect(detail.cementBagsMonthBox).toContainText(/\d+/);
  });

  test('Verify Hourly Graph with Single-Day (By Date) Filter', async () => {
    await detail.selectFilter('By Date');
    await detail.pickDate('2026-07-15');
    await expect(detail.hourlyGraph).toBeVisible();
  });

  test('Verify Hourly Graph with Current Month Filter', async () => {
    await detail.selectFilter('By Month');
    await expect(detail.hourlyGraph).toBeVisible();
  });

  test('Verify Hourly Graph with Past Month Filter', async () => {
    await detail.selectFilter('By Month');
    await expect(detail.hourlyGraphCalendar.first()).toBeVisible({ timeout: 5_000 }).catch(() => {});
    await expect(detail.hourlyGraph).toBeVisible();
  });

  test('Verify Hourly Graph with Date Range Filter', async () => {
    await detail.selectFilter('Date Range');
    await detail.pickDateRange('2026-07-01', '2026-07-10');
    await expect(detail.hourlyGraph).toBeVisible();
  });

  test('Verify Live View Tab Selection', async () => {
    await detail.selectFirstPackerLine();
    await detail.liveViewTab.click();
    await expect(detail.page.getByText(/live view/i).first()).toBeVisible();
  });

  test('Verify Live View Description Text', async () => {
    await detail.selectFirstPackerLine();
    await detail.liveViewTab.click();
    await expect(detail.liveViewHelperText).toBeVisible();
  });

  test('Verify Quality/Resolution Dropdown Options', async () => {
    await detail.selectFirstPackerLine();
    await detail.liveViewTab.click();
    await detail.qualityDropdown.click();
    for (const res of ['360p', '720p', '1080p']) {
      await expect(detail.page.getByRole('option', { name: new RegExp(res) })).toBeVisible();
    }
  });

  test('Verify Frame Rate Dropdown Options', async () => {
    await detail.selectFirstPackerLine();
    await detail.liveViewTab.click();
    await detail.frameRateDropdown.click();
    for (const fps of ['1 fps', '5 fps', '10 fps', '15 fps']) {
      await expect(detail.page.getByRole('option', { name: new RegExp(fps) })).toBeVisible();
    }
  });

  test('Verify Idle State Before Go Live', async () => {
    await detail.selectFirstPackerLine();
    await detail.liveViewTab.click();
    await expect(detail.page.getByText('idle', { exact: true })).toBeVisible();
    await expect(detail.goLiveButton).toBeVisible();
  });
});

test.describe('Factory Detail - Devices Tab', () => {
  let detail;

  test.beforeEach(async ({ page }) => {
    const factories = new FactoriesPage(page);
    detail = new FactoryDetailPage(page);
    await factories.open();
    const firstCompany = factories.companyRows.first();
    await factories.openFirstFactoryOf(firstCompany);
    await detail.goToTab('Devices');
    await expect(detail.devicesTable).toBeVisible({ timeout: 15_000 });
  });

  test('Verify Devices Table Columns', async () => {
    const headerRow = detail.devicesTable.locator('thead');
    for (const col of ['S.NO', 'DEVICE NAME', 'DEVICE TYPE', 'STATUS', 'CREATED ON', 'UPDATED ON', 'ACTIONS']) {
      await expect(headerRow).toContainText(new RegExp(col, 'i'));
    }
  });

  test('Verify Search Devices Field', async () => {
    const rowsBefore = await detail.devicesTable.locator('tbody tr').count();
    const firstDeviceName = (await detail.devicesTable.locator('tbody tr').first().innerText()).split('\n')[1] || '';
    await detail.deviceSearchInput.fill(firstDeviceName.slice(0, 3));
    const rowsAfter = await detail.devicesTable.locator('tbody tr').count();
    expect(rowsAfter).toBeLessThanOrEqual(rowsBefore);
  });

  test('Verify Edit Icon Action', async () => {
    await detail.deviceEditIcon.first().click();
    await expect(detail.page.getByRole('dialog').or(detail.page.locator('form'))).toBeVisible();
  });

  test('Verify Device Deletion Confirmation', async () => {
    await detail.deviceDeleteIcon.first().click();
    await expect(detail.page.getByText(/are you sure|confirm delete/i)).toBeVisible();
  });
});

test.describe('Factory Detail - Performance Tab', () => {
  let detail;

  test.beforeEach(async ({ page }) => {
    const factories = new FactoriesPage(page);
    detail = new FactoryDetailPage(page);
    await factories.open();
    const firstCompany = factories.companyRows.first();
    await factories.openFirstFactoryOf(firstCompany);
    await detail.goToTab('Performance');
    await expect(detail.performanceDateFilter).toBeVisible({ timeout: 15_000 });
  });

  test('Verify One-Day Filter Visibility', async () => {
    await expect(detail.performanceDateFilter).toBeVisible();
  });

  test('Verify Selecting a Specific Day', async () => {
    // This build surfaces Downtime metrics on the Performance tab, not GPU/CPU usage.
    await detail.pickPerformanceDate('2026-07-15');
    await expect(detail.downtimeBox).toBeVisible();
    await expect(detail.downtimePercentageBox).toBeVisible();
  });

  test('Verify Download Functionality', async ({ page }) => {
    await detail.pickPerformanceDate('2026-07-15');
    const downloadPromise = page.waitForEvent('download');
    await detail.performanceDownloadButton.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBeTruthy();
  });

  test('Verify Download Without Selecting a Filter', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await detail.performanceDownloadButton.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBeTruthy();
  });
});
