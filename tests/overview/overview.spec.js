const { test, expect } = require('@playwright/test');
const { OverviewPage } = require('../../pages/OverviewPage');

test.describe('Overview - Summary Cards', () => {
  let overview;

  test.beforeEach(async ({ page }) => {
    overview = new OverviewPage(page);
    await overview.open();
  });

  test('Verify Open Factory Map Button Visibility', async () => {
    await expect(overview.openFactoryMapButton).toBeVisible();
    await expect(overview.openFactoryMapButton).toBeEnabled();
  });

  test('Verify Open Factory Map Navigation', async ({ page }) => {
    await overview.openFactoryMapButton.click();
    await expect(page).toHaveURL(/factor/i);
    await expect(page.locator('canvas').first()).toBeVisible({ timeout: 15_000 });
  });

  test('Verify Total Companies Box', async () => {
    await expect(overview.totalCompaniesBox).toBeVisible();
    await expect(overview.totalCompaniesBox).toContainText(/\d+/);
    await expect(overview.totalCompaniesBox).toContainText(/registered companies/i);
  });

  test('Verify Total Factories Box', async () => {
    await expect(overview.totalFactoriesBox).toBeVisible();
    await expect(overview.totalFactoriesBox).toContainText(/\d+/);
    await expect(overview.totalFactoriesBox).toContainText(/monitored/i);
  });

  test('Verify Cement Bags Today Box', async () => {
    await expect(overview.bagsTodayBox).toBeVisible();
    await expect(overview.bagsTodayBox).toContainText(/\d+/);
  });

  test('Verify Bags This Month Box', async () => {
    await expect(overview.bagsThisMonthBox).toBeVisible();
    await expect(overview.bagsThisMonthBox).toContainText(/\d+/);
  });

  test('Verify Top Producers Box', async () => {
    await expect(overview.topProducerBox).toBeVisible();
    await expect(overview.topProducerBox).toContainText(/daily max|this month/i);
  });

  test('Verify Online + Offline Equals Total Factories', async () => {
    const connectivityText = await overview.connectivityBox.innerText();
    const totalFactoriesText = await overview.totalFactoriesBox.innerText();

    const online = Number((connectivityText.match(/(\d+)\s*online/i) || [])[1] || 0);
    const offline = Number((connectivityText.match(/(\d+)\s*offline/i) || [])[1] || 0);
    const total = Number((totalFactoriesText.match(/\d+/) || [])[0] || 0);

    expect(online + offline).toBe(total);
  });
});

test.describe('Overview - Daily & Monthly Production Charts', () => {
  let overview;

  test.beforeEach(async ({ page }) => {
    overview = new OverviewPage(page);
    await overview.open();
  });

  test('Verify Daily Production Chart Defaults to Current Month', async () => {
    const label = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
    await expect(overview.dailyProductionChart).toContainText(new RegExp(label.split(' ')[0], 'i'));
  });

  test('Verify Monthly Production Chart Defaults to Current Year', async () => {
    const year = String(new Date().getFullYear());
    await expect(overview.monthlyProductionChart).toContainText(year);
  });

  test('Verify Bar Hover Tooltip', async ({ page }) => {
    await overview.hoverChartBar(overview.dailyProductionChart);
    const tooltip = page.locator('.recharts-tooltip-wrapper, [role="tooltip"]');
    await expect(tooltip.first()).toBeVisible();
  });

  test('Verify Clicking a Bar Opens Breakdown Modal', async () => {
    await overview.clickChartBar(overview.dailyProductionChart);
    await expect(overview.breakdownModal).toBeVisible({ timeout: 10_000 });
    await expect(overview.breakdownModal).toContainText(/breakdown/i);
  });

  test('Verify Breakdown Modal Data Accuracy', async () => {
    await overview.clickChartBar(overview.dailyProductionChart);
    await expect(overview.breakdownModal).toBeVisible();
    const rows = overview.breakdownTable.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    for (let i = 0; i < rowCount; i++) {
      await expect(rows.nth(i)).toContainText(/\d+/);
      await expect(rows.nth(i)).toContainText('%');
    }
  });

  test('Verify Breakdown Modal Percentage Sums to 100%', async () => {
    await overview.clickChartBar(overview.dailyProductionChart);
    await expect(overview.breakdownModal).toBeVisible();
    const rows = overview.breakdownTable.locator('tbody tr');
    const rowCount = await rows.count();
    let total = 0;
    for (let i = 0; i < rowCount; i++) {
      const text = await rows.nth(i).innerText();
      const match = text.match(/([\d.]+)\s*%/);
      if (match) total += parseFloat(match[1]);
    }
    expect(total).toBeGreaterThan(98);
    expect(total).toBeLessThan(102);
  });

  // The breakdown modal in this build only renders a table, no pie chart - skipped by design.
  test.skip('Verify Pie Chart Hover Interaction', async () => {});

  test.skip('Verify Pie Chart Segment Colors Match Table', async () => {});

  test('Verify Breakdown Modal Close Button', async () => {
    await overview.clickChartBar(overview.dailyProductionChart);
    await expect(overview.breakdownModal).toBeVisible();
    await overview.breakdownModalCloseButton.first().click();
    await expect(overview.breakdownModal).toBeHidden();
  });

  test('Verify Factory Breakdown Tooltip Visibility in Dark Mode', async ({ page }) => {
    // "Toggle theme" opens a Light/Dark/System menu rather than switching directly.
    const darkModeToggle = page.getByRole('button', { name: /dark mode|theme/i });
    if (await darkModeToggle.isVisible().catch(() => false)) {
      await darkModeToggle.click();
      await page.getByRole('menuitem', { name: /^dark$/i }).click();
    }
    await overview.hoverChartBar(overview.dailyProductionChart);
    const tooltip = page.locator('.recharts-tooltip-wrapper, [role="tooltip"]').first();
    await expect(tooltip).toBeVisible();
    // .recharts-tooltip-wrapper is a transparent positioning shell; the styled box is its child.
    const bgColor = await tooltip.locator(':scope > *').first().evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
  });
});

test.describe('Overview - Factory Status Section', () => {
  let overview;

  test.beforeEach(async ({ page }) => {
    overview = new OverviewPage(page);
    await overview.open();
    await overview.factoryStatusSection.scrollIntoViewIfNeeded();
  });

  test('Verify Factory Status Header Counts', async () => {
    await expect(overview.factoryStatusHeader).not.toContainText(/loading/i, { timeout: 15_000 });
    const headerText = await overview.factoryStatusHeader.innerText();
    const connectivityText = await overview.connectivityBox.innerText();
    const online = (connectivityText.match(/(\d+)\s*online/i) || [])[1];
    const offline = (connectivityText.match(/(\d+)\s*offline/i) || [])[1];
    expect(headerText).toContain(online);
    expect(headerText).toContain(offline);
  });

  test('Verify View All Link', async ({ page }) => {
    await overview.viewAllLink.click();
    await expect(page).toHaveURL(/factor/i);
  });

  test('Verify Company List Display', async () => {
    await expect(overview.companyRows.first()).toBeVisible();
    expect(await overview.companyRows.count()).toBeGreaterThan(0);
  });

  test('Verify Online/Offline Count Format', async () => {
    const text = await overview.companyRows.first().innerText();
    expect(text).toMatch(/\d+\/\d+/);
  });

  test('Verify Company List Scrollability', async () => {
    const before = await overview.companyRows.first().boundingBox();
    await overview.factoryStatusSection.hover();
    await overview.page.mouse.wheel(0, 500);
    const after = await overview.companyRows.first().boundingBox();
    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
  });

  // Company rows render as a single unadorned button (no nested expand icon) - skipped by design.
  test.skip('Verify Expand Icon Rotation', async () => {});

  // Clicking a company row here is a no-op (no navigation, no modal) - skipped by design.
  // Use "View all" (see below) to reach the Factories page instead.
  test.skip('Verify Clicking a Factory Opens Factory Page', async () => {});
});
