const { BasePage } = require('./BasePage');

class FactoriesPage extends BasePage {
  constructor(page) {
    super(page);

    this.searchInput = page.getByPlaceholder(/search/i);
    // The map's list panel toggles render as plain buttons, not tabs.
    this.companyTab = page.getByRole('tab', { name: /compan/i }).or(page.getByRole('button', { name: 'Company', exact: true }));
    this.factoryTab = page.getByRole('tab', { name: /factor/i }).or(page.getByRole('button', { name: 'Factory', exact: true }));

    // The map is a three.js WebGL scene rendered to <canvas> - there is no Leaflet DOM and no
    // per-marker DOM nodes, so individual markers/tooltips are not reachable via locators.
    this.map = page.locator('canvas').or(page.locator('[data-testid="factory-map"]'));

    this.filterAll = page.getByRole('button', { name: /^all$/i });
    this.filterOnline = page.getByRole('button', { name: /^online$/i });
    this.filterOffline = page.getByRole('button', { name: /^offline$/i });

    // Each stat renders as "<number><label>" with no separating text, e.g. "291total".
    const factorySummaryPanel = page.locator('div').filter({ hasText: /^All Cement Factories/i }).first();
    this.totalFactoriesSummary = factorySummaryPanel.locator('div').filter({ hasText: /^\d+\s*total$/i }).first();
    this.onlineFactoriesSummary = factorySummaryPanel.locator('div').filter({ hasText: /^\d+\s*online$/i }).first();
    this.offlineFactoriesSummary = factorySummaryPanel.locator('div').filter({ hasText: /^\d+\s*offline$/i }).first();

    // Rows have no data-testid; match the leaf div carrying the "<online>/<total>" fraction,
    // excluding ancestor containers that also happen to contain that same text.
    const rowCandidates = page.locator('div').filter({ hasText: /\d+\/\d+/ });
    this.companyRows = rowCandidates.filter({ hasNot: rowCandidates });
    // Row action icons have no accessible name; they render as an [edit, delete] button pair per row.
    this.editCompanyButton = this.companyRows.locator('button').nth(0);
    this.deleteCompanyButton = this.companyRows.locator('button').nth(1);
  }

  async open() {
    await this.goto('/factories');
    // The page (and especially the map/company list) can be slow to hydrate, particularly on
    // the very first navigation after login; give it generous room before interacting.
    await this.searchInput.waitFor({ state: 'visible', timeout: 30_000 });
    await this.companyRows.first().waitFor({ state: 'visible', timeout: 30_000 }).catch(() => {});
  }

  async search(term) {
    await this.searchInput.fill(term);
    // The list filters via a debounced API call; give it time to settle before querying rows.
    await this.page.waitForTimeout(800);
  }

  companyRowByName(name) {
    // Anchored at the start: substring matching on a plain string would also match renamed
    // fixtures from prior test runs (e.g. "Automated Test Company 123456" contains "Test Company").
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return this.companyRows.filter({ hasText: new RegExp(`^${escaped}\\b`) });
  }

  async expandCompany(name) {
    await this.companyRowByName(name).click();
  }

  // Expanding a company row inserts its factory rows as *following siblings*, not children,
  // so the factory's "View analytics" action must be located relative to the company row, not inside it.
  factoryLinkByName(companyRow, factoryName) {
    return companyRow
      .locator('xpath=following-sibling::*')
      .filter({ hasText: factoryName })
      .getByRole('button', { name: /view analytics/i });
  }

  firstFactoryLink(companyRow) {
    return companyRow.locator('xpath=following-sibling::*[1]').getByRole('button', { name: /view analytics/i });
  }

  async openFirstFactoryOf(companyRow) {
    await companyRow.waitFor({ state: 'visible', timeout: 30_000 });
    // The list periodically re-renders (background refresh), which can detach the row/link
    // mid-click; retry the click sequence a few times rather than failing on the first race.
    let lastError;
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        await companyRow.click({ force: true, timeout: 10_000 });
        await this.firstFactoryLink(companyRow).click({ force: true, timeout: 10_000 });
        return;
      } catch (error) {
        lastError = error;
        await this.page.waitForTimeout(1_000);
      }
    }
    throw lastError;
  }

  // The factory row's icon buttons are [status graph, view analytics, edit, delete, copy id] -
  // but edit/delete only render once the factory has at least one device/production record.
  // Factories with none only expose the first two icons.
  factoryEditButton(companyRow) {
    return companyRow.locator('xpath=following-sibling::*[1]').getByRole('button').nth(2);
  }

  factoryDeleteButton(companyRow) {
    return companyRow.locator('xpath=following-sibling::*[1]').getByRole('button').nth(3);
  }

  async applyFilter(status) {
    const btn = { All: this.filterAll, Online: this.filterOnline, Offline: this.filterOffline }[status];
    // These render inside the map HUD, which only mounts once the (slow) 3D map has loaded.
    await btn.waitFor({ state: 'visible', timeout: 30_000 });
    await btn.click();
  }
}

module.exports = { FactoriesPage };
