const { BasePage } = require('./BasePage');

class ContactListPage extends BasePage {
  constructor(page) {
    super(page);

    this.searchInput = page.getByPlaceholder(/search/i);
    this.factoryFilterDropdown = page.getByRole('combobox', { name: /factor/i });
    this.addContactButton = page.getByRole('button', { name: /add contact/i });

    this.table = page.locator('table');
    this.tableRows = this.table.locator('tbody tr');
    this.emptyState = page.getByText(/no contacts/i);

    this.modal = page.getByRole('dialog');
    this.nameInput = this.modal.getByLabel(/^(contact )?name$/i);
    this.emailInput = this.modal.getByLabel(/email/i);
    this.addressInput = this.modal.getByLabel(/address/i);
    this.contactNumberInput = this.modal.getByLabel(/contact number|phone/i);
    this.factoryDropdown = this.modal.getByRole('combobox', { name: /factor/i });
    this.submitButton = this.modal.getByRole('button', { name: /submit|save|update|create/i });
    this.cancelButton = this.modal.getByRole('button', { name: /cancel/i });
    this.closeIcon = this.modal.getByRole('button', { name: /close/i }).or(
      this.modal.locator('[aria-label="Close"], button:has-text("X")')
    ).first();
    this.validationError = this.modal.locator('[role="alert"], .error-message, .text-red-500, .text-danger');
    this.successMessage = page.locator('[role="status"], .toast, .Toastify__toast--success');

    // Row action buttons are named "Edit <full name>" / "Delete <full name>", not bare "Edit"/"Delete".
    this.editIconInRow = (row) => row.locator('[data-testid="edit-contact"]').or(row.getByRole('button', { name: /^edit/i }));
    this.deleteIconInRow = (row) => row.locator('[data-testid="delete-contact"]').or(row.getByRole('button', { name: /^delete/i }));
    this.deleteConfirmButton = page.getByRole('button', { name: /confirm|yes|delete/i });
    this.cancelDeleteButton = page.getByRole('button', { name: /cancel|no/i });
  }

  async open() {
    await this.goto('/contact-list');
  }

  async fillForm({ name, email, address, phone, factory }) {
    if (name !== undefined) await this.nameInput.fill(name);
    if (email !== undefined) await this.emailInput.fill(email);
    if (address !== undefined) await this.addressInput.fill(address);
    if (phone !== undefined) await this.contactNumberInput.fill(phone);
    if (factory) {
      await this.factoryDropdown.click();
      await this.page.getByRole('option', { name: factory }).click();
    }
  }

  rowByText(text) {
    return this.tableRows.filter({ hasText: text });
  }
}

module.exports = { ContactListPage };
