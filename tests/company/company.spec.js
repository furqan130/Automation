const { test, expect } = require('@playwright/test');
const { CompanyPage } = require('../../pages/CompanyPage');

const uniqueSuffix = () => Date.now().toString().slice(-6);

test.describe('Company Management', () => {
  let company;
  // Names created during a test that should be removed in afterEach if the test itself
  // didn't already delete them (e.g. because it failed partway through).
  const createdNames = [];

  test.beforeEach(async ({ page }) => {
    company = new CompanyPage(page);
    await company.open();
  });

  test.afterEach(async () => {
    // Best-effort cleanup so a failing assertion mid-test doesn't leave permanent fixtures
    // behind in the shared UAT dataset.
    for (const name of createdNames.splice(0)) {
      try {
        await company.waitUntilFindable(name, { timeout: 15_000 });
        await company.deleteCompany(name);
      } catch {
        // Already deleted by the test itself, or never actually got created - nothing to clean up.
      }
    }
  });

  test('Verify Company Button Opens Create Company Modal', async () => {
    await company.openCreateModal();
    await expect(company.createModal.getByRole('heading', { name: /create company/i })).toBeVisible();
    await expect(company.createModalNameInput).toBeVisible();
    await expect(company.createModalNameInput).toBeEmpty();
    await expect(company.createModalCancelButton).toBeVisible();
    await expect(company.createModalCreateButton).toBeVisible();
  });

  test('Verify Company Name Field Is Required', async () => {
    await company.openCreateModal();
    await company.createModalCreateButton.click();
    await expect(company.createModalValidationError).toBeVisible();
    // Modal stays open on validation failure - no company should have been created.
    await expect(company.createModal).toBeVisible();
  });

  test('Verify Cancel Button Discards Create Company Modal', async () => {
    const name = `Automated Test Company ${uniqueSuffix()}`;
    await company.openCreateModal();
    await company.createModalNameInput.fill(name);
    await company.createModalCancelButton.click();
    await expect(company.createModal).toBeHidden();

    await company.search(name);
    await expect(company.noResultsMessage).toBeVisible();
  });

  test('Verify Close Icon Discards Create Company Modal', async () => {
    const name = `Automated Test Company ${uniqueSuffix()}`;
    await company.openCreateModal();
    await company.createModalNameInput.fill(name);
    await company.createModalCloseIcon.click();
    await expect(company.createModal).toBeHidden();

    await company.search(name);
    await expect(company.noResultsMessage).toBeVisible();
  });

  test('Verify Successful Company Creation', async () => {
    const name = `Automated Test Company ${uniqueSuffix()}`;
    await company.createCompany(name);
    createdNames.push(name);

    // The header's total count updates instantly, but the search index that backs the search
    // box lags a few seconds behind - waitUntilFindable re-issues the search until it catches up.
    await company.waitUntilFindable(name);
    await expect(company.companyRowByName(name)).toBeVisible();
  });

  test('Verify Created Company Is Findable Via Search Filter', async () => {
    const name = `Automated Test Company ${uniqueSuffix()}`;
    await company.createCompany(name);
    createdNames.push(name);
    await company.waitUntilFindable(name);

    await company.search('Nonexistent Company XYZ 000000');
    await expect(company.noResultsMessage).toBeVisible();

    await company.search(name);
    await expect(company.companyRowByName(name)).toBeVisible();
    await expect(company.companyRowByName(name)).toHaveCount(1);
  });

  test('Verify Edit Icon Opens Update Company Modal Pre-Filled With Current Name', async () => {
    const name = `Automated Test Company ${uniqueSuffix()}`;
    await company.createCompany(name);
    createdNames.push(name);
    await company.waitUntilFindable(name);

    await company.openEditModalFor(name);
    await expect(company.updateModal.getByRole('heading', { name: /update company/i })).toBeVisible();
    await expect(company.updateModalNameInput).toHaveValue(name);
  });

  test('Verify Cancel Button Discards Company Rename', async () => {
    const name = `Automated Test Company ${uniqueSuffix()}`;
    await company.createCompany(name);
    createdNames.push(name);
    await company.waitUntilFindable(name);

    await company.openEditModalFor(name);
    await company.updateModalNameInput.fill(`${name} Should Not Save`);
    await company.updateModalCancelButton.click();
    await expect(company.updateModal).toBeHidden();

    await company.search(name);
    await expect(company.companyRowByName(name)).toBeVisible();
  });

  test('Verify Successful Company Rename', async () => {
    const name = `Automated Test Company ${uniqueSuffix()}`;
    // Company name is capped at 35 characters (confirmed live via the "Company name cannot
    // exceed 35 characters" inline error) - " Renamed" would push the 29-char base over that,
    // so the update silently fails to close the modal. " Edit" keeps it at 34.
    const renamed = `${name} Edit`;
    await company.createCompany(name);
    createdNames.push(name);
    await company.waitUntilFindable(name);

    await company.renameCompany(name, renamed);
    // Track the post-rename name for cleanup instead of the original.
    createdNames[createdNames.length - 1] = renamed;

    await company.waitUntilFindable(renamed);
    await expect(company.companyRowByName(renamed)).toBeVisible();

    await company.waitUntilNotFindable(name);
  });

  test('Verify Delete Icon Opens Confirmation Dialog With Company Name', async () => {
    const name = `Automated Test Company ${uniqueSuffix()}`;
    await company.createCompany(name);
    createdNames.push(name);
    await company.waitUntilFindable(name);

    await company.openDeleteDialogFor(name);
    await expect(company.deleteDialog.getByRole('heading', { name: /delete company/i })).toBeVisible();
    await expect(company.deleteDialog).toContainText(name);
    await expect(company.deleteDialog).toContainText(/cannot be undone/i);
  });

  test('Verify Cancel On Delete Confirmation Keeps The Company', async () => {
    const name = `Automated Test Company ${uniqueSuffix()}`;
    await company.createCompany(name);
    createdNames.push(name);
    await company.waitUntilFindable(name);

    await company.openDeleteDialogFor(name);
    await company.deleteDialogCancelButton.click();
    await expect(company.deleteDialog).toBeHidden();

    await company.search(name);
    await expect(company.companyRowByName(name)).toBeVisible();
  });

  test('Verify Successful Company Deletion', async () => {
    const name = `Automated Test Company ${uniqueSuffix()}`;
    await company.createCompany(name);
    await company.waitUntilFindable(name);

    await company.deleteCompany(name);

    await company.waitUntilNotFindable(name);
  });

  test('Verify Create/Edit/Delete Flow Retains One Company For Future Factory Setup', async () => {
    const suffix = uniqueSuffix();
    const nameA = `Automated Test Company ${suffix}A`;
    const nameB = `Automated Test Company ${suffix}B`;
    // Company name is capped at 35 characters (confirmed live via the "Company name cannot
    // exceed 35 characters" inline error) - the 30-char base only leaves room for " Edit".
    const renamedA = `${nameA} Edit`;
    const renamedB = `${nameB} Edit`;
    // Fixed (non-timestamped) name so the company this suite leaves behind is easy to find
    // afterward when creating a Factory against it.
    const retainedName = 'E2E Factory Base Company';
    const retainedDraftName = `Automated Test Company ${suffix}C`;

    // Create two disposable companies.
    await company.createCompany(nameA);
    createdNames.push(nameA);
    await company.waitUntilFindable(nameA);
    await expect(company.companyRowByName(nameA)).toBeVisible();

    await company.createCompany(nameB);
    createdNames.push(nameB);
    await company.waitUntilFindable(nameB);
    await expect(company.companyRowByName(nameB)).toBeVisible();

    // Edit both and verify the rename took effect. Each rename re-searches its target first -
    // the row list is filtered by whatever the search box currently holds, which is left on the
    // previous action's name otherwise (confirmed live: a stale filter hides the target row).
    await company.waitUntilFindable(nameA);
    await company.renameCompany(nameA, renamedA);
    createdNames[createdNames.indexOf(nameA)] = renamedA;
    await company.waitUntilFindable(renamedA);
    await expect(company.companyRowByName(renamedA)).toBeVisible();
    await company.waitUntilNotFindable(nameA);

    await company.waitUntilFindable(nameB);
    await company.renameCompany(nameB, renamedB);
    createdNames[createdNames.indexOf(nameB)] = renamedB;
    await company.waitUntilFindable(renamedB);
    await expect(company.companyRowByName(renamedB)).toBeVisible();
    await company.waitUntilNotFindable(nameB);

    // Create (only if it doesn't already exist from a previous run) and edit the company that
    // should remain afterward for a Factory to be attached to.
    await company.search(retainedName);
    const retainedAlreadyExists = (await company.companyRowByName(retainedName).count()) > 0;
    if (!retainedAlreadyExists) {
      await company.createCompany(retainedDraftName);
      createdNames.push(retainedDraftName);
      await company.waitUntilFindable(retainedDraftName);
      await expect(company.companyRowByName(retainedDraftName)).toBeVisible();

      await company.renameCompany(retainedDraftName, retainedName);
      // Retained company must survive this suite - drop it from the cleanup list.
      createdNames.splice(createdNames.indexOf(retainedDraftName), 1);
      await company.waitUntilFindable(retainedName);
      await company.waitUntilNotFindable(retainedDraftName);
    }
    await company.waitUntilFindable(retainedName);
    await expect(company.companyRowByName(retainedName)).toBeVisible();

    // Delete the two disposable companies; the retained one is intentionally left behind.
    await company.waitUntilFindable(renamedA);
    await company.deleteCompany(renamedA);
    await company.waitUntilNotFindable(renamedA);

    await company.waitUntilFindable(renamedB);
    await company.deleteCompany(renamedB);
    await company.waitUntilNotFindable(renamedB);

    // Confirm the retained company is still there, ready for a Factory to be created against it.
    await company.waitUntilFindable(retainedName);
    await expect(company.companyRowByName(retainedName)).toBeVisible();
  });
});
