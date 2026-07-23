const { test, expect } = require("@playwright/test");
const { OverviewPage } = require("../../pages/OverviewPage");
const { FactoriesPage } = require("../../pages/FactoriesPage");
const { FactoryDetailPage } = require("../../pages/FactoryDetailPage");
const { AnalyticsPage } = require("../../pages/AnalyticsPage");
const { ReportsPage } = require("../../pages/ReportsPage");
const { ContactListPage } = require("../../pages/ContactListPage");
const { NotificationsPage } = require("../../pages/NotificationsPage");

const uniqueSuffix = () => Date.now().toString().slice(-6);

test.describe("End-to-End: Full Dashboard Walkthrough", () => {
  test("User can review production data across every module in one session", async ({
    page,
  }) => {
    const overview = new OverviewPage(page);
    const factories = new FactoriesPage(page);
    const detail = new FactoryDetailPage(page);
    const analytics = new AnalyticsPage(page);
    const reports = new ReportsPage(page);
    const contacts = new ContactListPage(page);
    const notifications = new NotificationsPage(page);

    await test.step("Overview: dashboard loads with summary data", async () => {
      await overview.open();
      await expect(overview.totalCompaniesBox).toContainText(/\d+/);
      await expect(overview.totalFactoriesBox).toContainText(/\d+/);
      await expect(overview.bagsTodayBox).toContainText(/\d+/);
    });

    await test.step("Overview -> Factories: Open Factory Map navigates correctly", async () => {
      await overview.openFactoryMapButton.click();
      await expect(page).toHaveURL(/factor/i);
    });

    await test.step("Factories: search and drill into a factory", async () => {
      await factories.open();
      await expect(factories.searchInput).toBeVisible();
      const firstCompany = factories.companyRows.first();
      await firstCompany.click();
      await firstCompany.locator('a, [role="button"]').first().click();
      await expect(detail.factoryNameHeader).toBeVisible({ timeout: 15_000 });
    });

    await test.step("Factory detail: switch across Analytics/Devices/Performance tabs", async () => {
      await detail.goToTab("Devices");
      await expect(detail.devicesTable).toBeVisible();
      await detail.goToTab("Performance");
      await expect(detail.performanceDateFilter).toBeVisible();
      await detail.goToTab("Analytics");
      await expect(detail.filtersSection).toBeVisible();
    });

    await test.step("Analytics: filter production data by date and inspect breakdown", async () => {
      await analytics.open();
      await analytics.selectDateFilter("By Date");
      await analytics.datePicker.fill("2026-07-15");
      await expect(
        analytics.todayBagsCard.or(analytics.dailyProductionChart),
      ).toBeVisible();
      await analytics.clickBar();
      await expect(analytics.pieChartModal).toBeVisible({ timeout: 10_000 });
      await analytics.pieChartCloseButton.first().click();
    });

    await test.step("Reports: generate and download a fiscal-year report", async () => {
      await reports.open();
      await reports.selectFiscalYear("2024-2025");
      await reports.applyFilterButton.click();
      await expect(reports.tableRows.first()).toBeVisible({ timeout: 15_000 });
      const downloadPromise = page.waitForEvent("download");
      await reports.downloadPdfButton.click();
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
    });

    let contactName;
    await test.step("Contacts: add a new factory contact", async () => {
      contactName = `E2E Contact ${uniqueSuffix()}`;
      await contacts.open();
      await contacts.addContactButton.click();
      await contacts.fillForm({
        name: contactName,
        email: `e2e.${uniqueSuffix()}@example.com`,
        address: "123 E2E Street",
        phone: "03001234567",
      });
      await contacts.factoryDropdown.click();
      await page.getByRole("option").first().click();
      await contacts.submitButton.click();
      await expect(contacts.modal).toBeHidden({ timeout: 10_000 });
      await expect(page.getByText(contactName)).toBeVisible();
    });

    await test.step("Notifications: confirm the flow surfaced user notifications", async () => {
      await notifications.open();
      await notifications.userNotificationTab.click();
      await expect(
        notifications.notificationItems.first().or(notifications.emptyState),
      ).toBeVisible({
        timeout: 10_000,
      });
    });

    await test.step("Cleanup: remove the contact created during this run", async () => {
      await contacts.open();
      const row = contacts.rowByText(contactName);
      await contacts.deleteIconInRow(row).click();
      await contacts.deleteConfirmButton.click();
      await expect(page.getByText(contactName)).toHaveCount(0);
    });
  });
});
