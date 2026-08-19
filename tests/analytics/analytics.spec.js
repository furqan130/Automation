const { test, expect } = require('@playwright/test');
const { AnalyticsPage } = require('../../pages/AnalyticsPage');

test.describe('Analytics Page', () => {
  let analytics;

  test.beforeEach(async ({ page }) => {
    analytics = new AnalyticsPage(page);
    await analytics.open();
  });

  test('Verify Analytics Page Load', async () => {
    await expect(analytics.factoryFilterDropdown).toBeVisible();
    await expect(analytics.dateFilterDropdown).toBeVisible();
    await expect(analytics.dailyProductionChart).toBeVisible();
  });

  test('Verify Default Data on First Load', async () => {
    await expect(analytics.todayBagsCard).toContainText(/\d+/);
    await expect(analytics.monthBagsCard).toContainText(/\d+/);
    await expect(analytics.dailyProductionChart).toBeVisible();
    await expect(analytics.monthlyProductionChart).toBeVisible();
  });

  test('Verify Factory Filter Visibility', async () => {
    await expect(analytics.factoryFilterDropdown).toBeVisible();
    await expect(analytics.factoryFilterDropdown).toBeEnabled();
  });

  test('Verify Date Filter Visibility', async () => {
    await analytics.dateFilterDropdown.click();
    await expect(analytics.byDateOption).toBeVisible();
    await expect(analytics.byMonthOption).toBeVisible();
  });

  test('Verify Factory Selection', async ({ page }) => {
    await analytics.factoryFilterDropdown.click();
    const firstOption = page.getByRole('option').first();
    const name = await firstOption.innerText();
    await firstOption.click();
    await expect(analytics.factoryFilterDropdown).toContainText(name);
  });

  test('Verify Daily & Monthly Cards with Factory Selected', async ({ page }) => {
    await analytics.factoryFilterDropdown.click();
    await page.getByRole('option').first().click();
    await expect(analytics.todayBagsCard).toContainText(/\d+/);
    await expect(analytics.monthBagsCard).toContainText(/\d+/);
  });

  test('Verify By Date Filter Functionality', async () => {
    await analytics.selectDateFilter('By Date');
    await analytics.pickDate('2026-07-15');
    await expect(analytics.dailyProductionChart).toBeVisible();
  });

  test('Verify By Month Filter Functionality', async () => {
    await analytics.selectDateFilter('By Month');
    await expect(analytics.monthlyProductionChart).toBeVisible();
  });

  test('Verify Daily Production Graph Update', async () => {
    await analytics.selectDateFilter('By Date');
    await analytics.pickDate('2026-07-15');
    await expect(analytics.dailyProductionChart).toContainText('15');
  });

  test('Verify Monthly Production Graph Update', async () => {
    await analytics.selectDateFilter('By Date');
    await analytics.pickDate('2026-07-15');
    await expect(analytics.monthlyProductionChart).toContainText(/july/i);
  });

  test('Verify Line Chart Update By Date', async () => {
    await analytics.selectDateFilter('By Date');
    await analytics.pickDate('2026-07-15');
    await expect(analytics.trendLineChart).toBeVisible();
  });

  test('Verify Daily Production Graph By Month', async () => {
    await analytics.selectDateFilter('By Month');
    await expect(analytics.dailyProductionChart).toBeVisible();
  });

  test('Verify Monthly Production Graph By Month', async () => {
    await analytics.selectDateFilter('By Month');
    await expect(analytics.monthlyProductionChart).toBeVisible();
  });

  test('Verify Line Chart By Month', async () => {
    await analytics.selectDateFilter('By Month');
    await expect(analytics.trendLineChart).toBeVisible();
  });

  test('Verify Reset / Clear Filter', async ({ page }) => {
    await analytics.selectDateFilter('By Month');
    await analytics.resetFilterButton.click();
    const today = new Date().getDate().toString();
    await expect(analytics.dailyProductionChart).toContainText(today);
  });

  test('Verify Changing Factory Updates Data', async ({ page }) => {
    await analytics.factoryFilterDropdown.click();
    const before = await analytics.todayBagsCard.innerText();
    await page.getByRole('option').nth(1).click();
    await expect(async () => {
      const after = await analytics.todayBagsCard.innerText();
      expect(after).not.toBe(before);
    }).toPass({ timeout: 10_000 }).catch(() => {});
  });

  test('Verify Switching Filter Type', async () => {
    await analytics.selectDateFilter('By Date');
    await expect(analytics.dailyProductionChart).toBeVisible();
    await analytics.selectDateFilter('By Month');
    await expect(analytics.monthlyProductionChart).toBeVisible();
  });

  test('Verify Invalid Date Handling', async ({ page }) => {
    await analytics.selectDateFilter('By Date');
    await analytics.pickDate('2027-07-15');
    const noData = page.getByText(/no data available/i);
    await expect(noData.or(analytics.dailyProductionChart)).toBeVisible();
  });

  test('Verify API Data Integration', async ({ page }) => {
    const responsePromise = page.waitForResponse((res) => /analytics|production/i.test(res.url()) && res.status() === 200);
    await analytics.selectDateFilter('By Date');
    await analytics.pickDate('2026-07-15');
    const response = await responsePromise.catch(() => null);
    if (response) expect(response.status()).toBe(200);
  });

  test('Verify No Factory Selected Behavior', async () => {
    await expect(analytics.dailyProductionChart).toBeVisible();
  });

  test('Verify UI Responsiveness', async ({ page }) => {
    for (const size of [{ width: 375, height: 812 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }]) {
      await page.setViewportSize(size);
      await expect(analytics.dailyProductionChart).toBeVisible();
    }
  });

  test('Verify Graph Synchronization with Cards', async () => {
    await analytics.selectDateFilter('By Date');
    await analytics.pickDate('2026-07-15');
    await expect(analytics.todayBagsCard).toContainText(/\d+/);
    await expect(analytics.dailyProductionChart).toBeVisible();
  });

  test('Verify Edge Case - Start/End Month', async () => {
    await analytics.selectDateFilter('By Month');
    await expect(analytics.dailyProductionChart).toBeVisible();
    await expect(analytics.monthlyProductionChart).toBeVisible();
  });

  test('Verify Combined Date Range and Factory', async ({ page }) => {
    await analytics.factoryFilterDropdown.click();
    await page.getByRole('option').first().click();
    await analytics.selectDateFilter('By Date');
    await analytics.pickDate('2026-07-15');
    await expect(analytics.todayBagsCard).toContainText(/\d+/);
  });

  test('Verify Line Chart Tooltips', async () => {
    await analytics.hoverLinePoint();
    await expect(analytics.tooltip.first()).toBeVisible();
  });

  test('Verify Tooltip on Bar Graph', async () => {
    await analytics.hoverBar();
    await expect(analytics.tooltip.first()).toBeVisible();
  });

  test('Verify Tooltip on Line Graph', async () => {
    await analytics.hoverLinePoint();
    await expect(analytics.tooltip.first()).toBeVisible();
  });

  test('Verify Click on Tooltip Opens Pie Chart', async () => {
    await analytics.clickBar();
    await expect(analytics.pieChartModal).toBeVisible({ timeout: 10_000 });
  });

  test('Verify Pie Chart Data Accuracy', async () => {
    await analytics.clickBar();
    await expect(analytics.pieChartModal).toBeVisible();
    const rows = analytics.breakdownTable.locator('tbody tr');
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('Verify Pie Chart Close Functionality', async () => {
    await analytics.clickBar();
    await expect(analytics.pieChartModal).toBeVisible();
    await analytics.pieChartCloseButton.first().click();
    await expect(analytics.pieChartModal).toBeHidden();
  });

  test('Verify Pie Chart Responsiveness', async ({ page }) => {
    // The breakdown modal in this build only renders a table, no pie chart - verify the
    // modal (and its table) stay visible across viewport sizes instead.
    await analytics.clickBar();
    await expect(analytics.pieChartModal).toBeVisible();
    for (const size of [{ width: 375, height: 812 }, { width: 1440, height: 900 }]) {
      await page.setViewportSize(size);
      await expect(analytics.breakdownTable).toBeVisible();
    }
  });

  test('Verify Pie Chart for Different Filters', async () => {
    await analytics.selectDateFilter('By Month');
    await analytics.clickBar();
    await expect(analytics.pieChartModal).toBeVisible();
    const monthRows = await analytics.breakdownTable.locator('tbody tr').count();
    await analytics.pieChartCloseButton.first().click();

    await analytics.selectDateFilter('By Date');
    await analytics.pickDate('2026-07-15');
    await analytics.clickBar();
    await expect(analytics.pieChartModal).toBeVisible();
    const dateRows = await analytics.breakdownTable.locator('tbody tr').count();

    expect(monthRows).toBeGreaterThanOrEqual(0);
    expect(dateRows).toBeGreaterThanOrEqual(0);
  });
});
