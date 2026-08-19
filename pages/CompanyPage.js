const { BasePage } = require('./BasePage');

// Company management lives on the Factories screen (/factories): the "Company" button in the
// list header is not a view-toggle tab, it opens a Create Company modal (see FactoriesPage /
// CreateFactoryModal for the equivalent "Factory" button behavior). Existing companies are
// listed as rows alongside factories, each exposing [edit, delete] icon buttons.
class CompanyPage extends BasePage {
  constructor(page) {
    super(page);

    this.searchInput = page.getByPlaceholder(/search/i);
    this.companyTabButton = page.getByRole('button', { name: 'Company', exact: true });
    this.factoryTabButton = page.getByRole('button', { name: 'Factory', exact: true });

    // Rows have no data-testid; match the leaf div carrying the "<online>/<total>" fraction,
    // excluding ancestor containers that also happen to contain that same text (see FactoriesPage).
    const rowCandidates = page.locator('div').filter({ hasText: /\d+\/\d+/ });
    this.companyRows = rowCandidates.filter({ hasNot: rowCandidates });

    this.noResultsMessage = page.getByText(/no factories match the filter/i);

    // Create Company modal, opened via companyTabButton.
    this.createModal = page.getByRole('dialog').filter({ hasText: /create company/i });
    this.createModalCloseIcon = this.createModal.getByRole('button', { name: /close/i });
    this.createModalCancelButton = this.createModal.getByRole('button', { name: /cancel/i });
    this.createModalCreateButton = this.createModal.getByRole('button', { name: /^create$/i });
    this.createModalNameInput = this.createModal.getByLabel(/company name/i).or(
      this.createModal.getByPlaceholder(/enter company name/i)
    );
    this.createModalValidationError = this.createModal.getByText(/company name is required/i);

    // Update Company modal, opened via a row's edit icon.
    this.updateModal = page.getByRole('dialog').filter({ hasText: /update company/i });
    this.updateModalCloseIcon = this.updateModal.getByRole('button', { name: /close/i });
    this.updateModalCancelButton = this.updateModal.getByRole('button', { name: /cancel/i });
    this.updateModalUpdateButton = this.updateModal.getByRole('button', { name: /^update$/i });
    this.updateModalNameInput = this.updateModal.getByLabel(/company name/i).or(
      this.updateModal.getByPlaceholder(/enter company name/i)
    );

    // Delete Company confirmation, opened via a row's delete icon.
    this.deleteDialog = page.getByRole('alertdialog').filter({ hasText: /delete company/i });
    this.deleteDialogCancelButton = this.deleteDialog.getByRole('button', { name: /cancel/i });
    this.deleteDialogConfirmButton = this.deleteDialog.getByRole('button', { name: /^delete$/i });

    // Success/error toasts render in the "Notifications (F8)" region.
    this.toastRegion = page.getByRole('region', { name: /notifications/i });
  }

  async open() {
    await this.goto('/factories');
    await this.searchInput.waitFor({ state: 'visible', timeout: 30_000 });
    await this.companyRows.first().waitFor({ state: 'visible', timeout: 30_000 }).catch(() => {});
  }

  async search(term) {
    await this.searchInput.fill(term);
    // The list filters via a debounced API call; give it time to settle before querying rows.
    await this.page.waitForTimeout(800);
  }

  async clearSearch() {
    await this.search('');
  }

  companyRowByName(name) {
    // The row's text is "<name><online>/<total>" with NO separator between name and fraction
    // (confirmed live: textContent is literally "...6958080/0") - a trailing \b anchor never
    // matches when the name ends in digits directly followed by more digits, since both sides
    // are word characters. Anchor on the fraction itself instead, requiring it to run to the
    // end of the row's text so a shorter name can't accidentally prefix-match a longer one.
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return this.companyRows.filter({ hasText: new RegExp(`^${escaped}(?=\\d+/\\d+$)`) });
  }

  editButtonFor(row) {
    return row.locator('button').nth(0);
  }

  deleteButtonFor(row) {
    return row.locator('button').nth(1);
  }

  // The company row-count total updates immediately on create/delete, but the search index
  // that backs the search box lags behind by a few seconds (confirmed live: right after create,
  // the header count increments while the exact-name search still returns "No factories match
  // the filter."). Re-issuing the search (not just waiting longer) is what surfaces the update.
  async waitUntilFindable(name, { timeout = 30_000, pollInterval = 2_000 } = {}) {
    const deadline = Date.now() + timeout;
    let lastError;
    while (Date.now() < deadline) {
      try {
        await this.search(name);
        await this.companyRowByName(name).waitFor({ state: 'visible', timeout: 3_000 });
        return;
      } catch (error) {
        lastError = error;
        await this.page.waitForTimeout(pollInterval);
      }
    }
    throw lastError;
  }

  async waitUntilNotFindable(name, { timeout = 20_000, pollInterval = 1_500 } = {}) {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      await this.search(name);
      if ((await this.companyRowByName(name).count()) === 0) return;
      await this.page.waitForTimeout(pollInterval);
    }
    throw new Error(`Company "${name}" is still findable via search after ${timeout}ms`);
  }

  // The list periodically re-renders (background refresh), which can detach a row/button
  // mid-click - retry the whole locate-and-click sequence rather than failing on the first race
  // (same pattern as FactoriesPage.openFirstFactoryOf).
  async clickRowActionButton(name, buttonIndex, { retries = 4, clickTimeout = 8_000 } = {}) {
    let lastError;
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const row = this.companyRowByName(name);
        await row.waitFor({ state: 'visible', timeout: clickTimeout });
        await row.locator('button').nth(buttonIndex).click({ force: true, timeout: clickTimeout });
        return;
      } catch (error) {
        lastError = error;
        await this.page.waitForTimeout(1_000);
      }
    }
    throw lastError;
  }

  async openCreateModal() {
    await this.companyTabButton.click();
    await this.createModal.waitFor({ state: 'visible', timeout: 10_000 });
  }

  async createCompany(name) {
    await this.openCreateModal();
    await this.createModalNameInput.fill(name);
    await this.createModalCreateButton.click();
    await this.createModal.waitFor({ state: 'hidden', timeout: 10_000 });
  }

  async openEditModalFor(name) {
    await this.clickRowActionButton(name, 0);
    await this.updateModal.waitFor({ state: 'visible', timeout: 10_000 });
  }

  async renameCompany(currentName, newName) {
    await this.openEditModalFor(currentName);
    await this.updateModalNameInput.fill(newName);
    await this.updateModalUpdateButton.click();
    await this.updateModal.waitFor({ state: 'hidden', timeout: 10_000 });
  }

  async openDeleteDialogFor(name) {
    await this.clickRowActionButton(name, 1);
    await this.deleteDialog.waitFor({ state: 'visible', timeout: 10_000 });
  }

  async deleteCompany(name) {
    await this.openDeleteDialogFor(name);
    await this.deleteDialogConfirmButton.click();
    await this.deleteDialog.waitFor({ state: 'hidden', timeout: 10_000 });
  }
}

module.exports = { CompanyPage };
