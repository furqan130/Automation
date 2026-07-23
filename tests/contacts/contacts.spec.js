const { test, expect } = require('@playwright/test');
const { ContactListPage } = require('../../pages/ContactListPage');

const uniqueSuffix = () => Date.now().toString().slice(-6);

test.describe('Contact List Page', () => {
  let contacts;

  test.beforeEach(async ({ page }) => {
    contacts = new ContactListPage(page);
    await contacts.open();
  });

  test('Verify Contact List Page Loads', async () => {
    await expect(contacts.searchInput).toBeVisible();
    await expect(contacts.addContactButton).toBeVisible();
    await expect(contacts.table).toBeVisible();
  });

  test('Verify Table Columns', async () => {
    const headerRow = contacts.table.locator('thead');
    for (const col of ['S.No', 'Name', 'Email', 'Address', 'Number', 'Factory', 'Actions']) {
      await expect(headerRow).toContainText(new RegExp(col, 'i'));
    }
  });

  test('Verify Existing Contacts Displayed', async () => {
    const count = await contacts.tableRows.count();
    if (count > 0) {
      await expect(contacts.tableRows.first()).toBeVisible();
    } else {
      await expect(contacts.emptyState).toBeVisible();
    }
  });

  test('Verify Empty State', async () => {
    await contacts.searchInput.fill('zzz_no_such_contact_zzz');
    await expect(contacts.emptyState.or(contacts.page.getByText(/no results/i))).toBeVisible();
  });

  test('Verify Serial Numbering', async () => {
    const count = await contacts.tableRows.count();
    if (count >= 2) {
      await expect(contacts.tableRows.nth(0)).toContainText('1');
      await expect(contacts.tableRows.nth(1)).toContainText('2');
    }
  });

  test('Verify Add Contact Modal Opens', async () => {
    await contacts.addContactButton.click();
    await expect(contacts.modal).toBeVisible();
    await expect(contacts.submitButton).toBeVisible();
    await expect(contacts.cancelButton).toBeVisible();
  });

  test('Verify All Form Fields Present', async () => {
    await contacts.addContactButton.click();
    await expect(contacts.nameInput).toBeVisible();
    await expect(contacts.emailInput).toBeVisible();
    await expect(contacts.addressInput).toBeVisible();
    await expect(contacts.contactNumberInput).toBeVisible();
    await expect(contacts.factoryDropdown).toBeVisible();
  });

  test('Verify Factory Dropdown Options', async () => {
    await contacts.addContactButton.click();
    await contacts.factoryDropdown.click();
    expect(await contacts.page.getByRole('option').count()).toBeGreaterThan(0);
  });

  test('Verify Add Contact With Valid Data', async () => {
    const suffix = uniqueSuffix();
    await contacts.addContactButton.click();
    await contacts.fillForm({
      name: `Automation Contact ${suffix}`,
      email: `automation.${suffix}@example.com`,
      address: '123 Test Street',
      phone: '03001234567',
    });
    await contacts.factoryDropdown.click();
    await contacts.page.getByRole('option').first().click();
    await contacts.submitButton.click();
    await expect(contacts.modal).toBeHidden({ timeout: 10_000 });
    await expect(contacts.page.getByText(`Automation Contact ${suffix}`)).toBeVisible();
  });

  test('Verify Contact Linked to Selected Factory', async () => {
    const suffix = uniqueSuffix();
    await contacts.addContactButton.click();
    await contacts.fillForm({
      name: `Linked Contact ${suffix}`,
      email: `linked.${suffix}@example.com`,
      address: '123 Test Street',
      phone: '03001234567',
    });
    await contacts.factoryDropdown.click();
    const firstFactory = contacts.page.getByRole('option').first();
    const factoryName = await firstFactory.innerText();
    await firstFactory.click();
    await contacts.submitButton.click();
    await expect(contacts.modal).toBeHidden({ timeout: 10_000 });
    const row = contacts.rowByText(`Linked Contact ${suffix}`);
    await expect(row).toContainText(factoryName);
  });

  test('Verify Cancel Button', async () => {
    await contacts.addContactButton.click();
    await contacts.nameInput.fill('Should Not Save');
    await contacts.cancelButton.click();
    await expect(contacts.modal).toBeHidden();
    await expect(contacts.page.getByText('Should Not Save')).toHaveCount(0);
  });

  test('Verify Close (X) Button', async () => {
    await contacts.addContactButton.click();
    await contacts.closeIcon.click();
    await expect(contacts.modal).toBeHidden();
  });

  test('Verify Form Resets After Submit', async () => {
    const suffix = uniqueSuffix();
    await contacts.addContactButton.click();
    await contacts.fillForm({
      name: `Reset Test ${suffix}`,
      email: `reset.${suffix}@example.com`,
      address: '123 Test Street',
      phone: '03001234567',
    });
    await contacts.factoryDropdown.click();
    await contacts.page.getByRole('option').first().click();
    await contacts.submitButton.click();
    await expect(contacts.modal).toBeHidden({ timeout: 10_000 });
    await contacts.addContactButton.click();
    await expect(contacts.nameInput).toHaveValue('');
  });

  test('Verify Success Feedback', async () => {
    const suffix = uniqueSuffix();
    await contacts.addContactButton.click();
    await contacts.fillForm({
      name: `Feedback Test ${suffix}`,
      email: `feedback.${suffix}@example.com`,
      address: '123 Test Street',
      phone: '03001234567',
    });
    await contacts.factoryDropdown.click();
    await contacts.page.getByRole('option').first().click();
    await contacts.submitButton.click();
    await expect(contacts.successMessage.first()).toBeVisible({ timeout: 10_000 });
  });

  test('Verify Submit With All Fields Empty', async () => {
    await contacts.addContactButton.click();
    await contacts.submitButton.click();
    await expect(contacts.validationError.first()).toBeVisible();
    await expect(contacts.modal).toBeVisible();
  });

  test('Verify Name Required', async () => {
    await contacts.addContactButton.click();
    await contacts.fillForm({ email: 'valid@example.com', address: 'x', phone: '03001234567' });
    await contacts.submitButton.click();
    await expect(contacts.validationError.first()).toBeVisible();
  });

  test('Verify Email Required', async () => {
    await contacts.addContactButton.click();
    await contacts.fillForm({ name: 'No Email', address: 'x', phone: '03001234567' });
    await contacts.submitButton.click();
    await expect(contacts.validationError.first()).toBeVisible();
  });

  test('Verify Invalid Email Format', async () => {
    await contacts.addContactButton.click();
    await contacts.fillForm({ name: 'Bad Email', email: 'abc@', address: 'x', phone: '03001234567' });
    await contacts.submitButton.click();
    await expect(contacts.validationError.first()).toBeVisible();
  });

  test('Verify Factory Required', async () => {
    await contacts.addContactButton.click();
    await contacts.fillForm({ name: 'No Factory', email: 'nofactory@example.com', address: 'x', phone: '03001234567' });
    await contacts.submitButton.click();
    await expect(contacts.validationError.first()).toBeVisible();
  });

  test('Verify Phone Number Length', async () => {
    await contacts.addContactButton.click();
    await contacts.fillForm({ name: 'Bad Phone', email: 'phone@example.com', address: 'x', phone: '123' });
    await contacts.submitButton.click();
    await expect(contacts.validationError.first()).toBeVisible();
  });

  test('Verify Search by Name', async () => {
    const firstRowText = await contacts.tableRows.first().innerText().catch(() => '');
    const name = firstRowText.split('\t')[1] || firstRowText.split(' ')[0];
    if (name) {
      await contacts.searchInput.fill(name);
      await expect(contacts.tableRows.first()).toContainText(name);
    }
  });

  test('Verify Search by Email', async () => {
    const firstRowText = await contacts.tableRows.first().innerText().catch(() => '');
    const emailMatch = firstRowText.match(/[\w.-]+@[\w.-]+/);
    if (emailMatch) {
      await contacts.searchInput.fill(emailMatch[0]);
      await expect(contacts.tableRows.first()).toContainText(emailMatch[0]);
    }
  });

  test('Verify Search by Factory', async () => {
    await contacts.factoryFilterDropdown.click();
    const option = contacts.page.getByRole('option').first();
    const name = await option.innerText();
    await option.click();
    const rows = await contacts.tableRows.count();
    if (rows > 0) await expect(contacts.tableRows.first()).toContainText(name);
  });

  test('Verify Clear Search', async () => {
    const before = await contacts.tableRows.count();
    await contacts.searchInput.fill('zzz_no_such_contact_zzz');
    await contacts.searchInput.fill('');
    await expect(async () => {
      expect(await contacts.tableRows.count()).toBe(before);
    }).toPass({ timeout: 5_000 });
  });

  test('Verify Edit Contact', async () => {
    const row = contacts.tableRows.first();
    await contacts.editIconInRow(row).click();
    await expect(contacts.modal).toBeVisible();
    const suffix = uniqueSuffix();
    await contacts.nameInput.fill(`Edited Contact ${suffix}`);
    await contacts.submitButton.click();
    await expect(contacts.modal).toBeHidden({ timeout: 10_000 });
    await expect(contacts.page.getByText(`Edited Contact ${suffix}`)).toBeVisible();
  });

  test('Verify Edit Validation', async () => {
    const row = contacts.tableRows.first();
    await contacts.editIconInRow(row).click();
    await contacts.emailInput.fill('invalid-email');
    await contacts.submitButton.click();
    await expect(contacts.validationError.first()).toBeVisible();
  });

  test('Verify Change Assigned Factory', async () => {
    const row = contacts.tableRows.first();
    await contacts.editIconInRow(row).click();
    await contacts.factoryDropdown.click();
    const option = contacts.page.getByRole('option').last();
    const name = await option.innerText();
    await option.click();
    await contacts.submitButton.click();
    await expect(contacts.modal).toBeHidden({ timeout: 10_000 });
  });

  test('Verify Cancel Edit', async () => {
    const row = contacts.tableRows.first();
    const originalText = await row.innerText();
    await contacts.editIconInRow(row).click();
    await contacts.nameInput.fill('Should Not Persist');
    await contacts.cancelButton.click();
    await expect(contacts.modal).toBeHidden();
    await expect(contacts.tableRows.first()).toHaveText(originalText);
  });

  test('Verify Delete Contact', async () => {
    const suffix = uniqueSuffix();
    await contacts.addContactButton.click();
    await contacts.fillForm({
      name: `To Delete ${suffix}`,
      email: `todelete.${suffix}@example.com`,
      address: 'x',
      phone: '03001234567',
    });
    await contacts.factoryDropdown.click();
    await contacts.page.getByRole('option').first().click();
    await contacts.submitButton.click();
    await expect(contacts.modal).toBeHidden({ timeout: 10_000 });

    const row = contacts.rowByText(`To Delete ${suffix}`);
    await contacts.deleteIconInRow(row).click();
    await contacts.deleteConfirmButton.click();
    await expect(contacts.page.getByText(`To Delete ${suffix}`)).toHaveCount(0);
  });

  test('Verify Delete Confirmation', async () => {
    const row = contacts.tableRows.first();
    await contacts.deleteIconInRow(row).click();
    await expect(contacts.page.getByText(/are you sure|confirm delete/i)).toBeVisible();
    await contacts.cancelDeleteButton.click();
  });

  test('Verify Cancel Delete', async () => {
    const row = contacts.tableRows.first();
    const originalText = await row.innerText();
    await contacts.deleteIconInRow(row).click();
    await contacts.cancelDeleteButton.click();
    await expect(contacts.tableRows.first()).toHaveText(originalText);
  });

  test('Verify S.No Reorders After Delete', async () => {
    const rowCountBefore = await contacts.tableRows.count();
    if (rowCountBefore >= 2) {
      const secondRow = contacts.tableRows.nth(1);
      await contacts.deleteIconInRow(secondRow).click();
      await contacts.deleteConfirmButton.click();
      await expect(contacts.tableRows.nth(0)).toContainText('1');
      await expect(contacts.tableRows.nth(1)).toContainText('2');
    }
  });

  test('Verify Pagination (if many contacts)', async () => {
    if (await contacts.page.getByRole('button', { name: /next/i }).isVisible().catch(() => false)) {
      const before = await contacts.tableRows.first().innerText();
      await contacts.page.getByRole('button', { name: /next/i }).click();
      await expect(async () => {
        const after = await contacts.tableRows.first().innerText();
        expect(after).not.toBe(before);
      }).toPass({ timeout: 10_000 });
    }
  });
});
