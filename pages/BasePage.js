class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  /** Left sidebar navigation link, by visible label. */
  navLink(name) {
    return this.page.getByRole('link', { name, exact: false });
  }

  async gotoViaSidebar(name) {
    await this.navLink(name).click();
  }

  async waitForLoadingToFinish() {
    const spinner = this.page.locator(
      '[data-testid="loading-spinner"], .loading-spinner, .spinner, [role="progressbar"]'
    );
    const count = await spinner.count();
    if (count > 0) {
      await spinner
        .first()
        .waitFor({ state: 'hidden', timeout: 15_000 })
        .catch(() => {});
    }
  }

  async closeModalIfOpen() {
    const closeBtn = this.page.locator(
      'button[aria-label="Close"], .modal button:has-text("X"), [data-testid="modal-close"]'
    );
    if (await closeBtn.first().isVisible().catch(() => false)) {
      await closeBtn.first().click();
    }
  }

  // The calendar popover's content re-renders (and its nav button briefly detaches/reattaches)
  // during the burst of data refetches right after the page loads - confirmed live via the
  // "element is not stable" / "element was detached from the DOM, retrying" trace on a plain
  // .click(). Retry the whole locate-and-click on failure instead of failing on the first race
  // (same pattern as FactoriesPage.openFirstFactoryOf / CompanyPage.clickRowActionButton).
  async _clickResilient(locator, { retries = 5, clickTimeout = 5_000 } = {}) {
    let lastError;
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        await locator.click({ force: true, timeout: clickTimeout });
        return;
      } catch (error) {
        lastError = error;
        await this.page.waitForTimeout(500);
      }
    }
    throw lastError;
  }

  /**
   * Navigates the currently open react-day-picker style calendar grid to the given
   * date and clicks the day cell. Assumes the calendar opens on the current month.
   */
  async selectCalendarDate(dateStr) {
    const target = new Date(`${dateStr}T00:00:00`);
    const today = new Date();
    const monthsDiff = (target.getFullYear() - today.getFullYear()) * 12 + (target.getMonth() - today.getMonth());
    const navButton = this.page.getByRole('button', { name: monthsDiff >= 0 ? /go to next month/i : /go to previous month/i }).first();
    for (let i = 0; i < Math.abs(monthsDiff); i++) {
      await this._clickResilient(navButton);
    }
    const monthLabel = `${target.toLocaleString('en-US', { month: 'long' })} ${target.getFullYear()}`;
    const grid = this.page.getByRole('grid', { name: monthLabel });
    const dayCell = grid.getByRole('gridcell', { name: String(target.getDate()), exact: true, disabled: false }).first();
    await this._clickResilient(dayCell);
  }
}

module.exports = { BasePage };
