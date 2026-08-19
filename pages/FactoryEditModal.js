const { BasePage } = require('./BasePage');

// The Factories list has three distinct edit-ish modals:
//  - FactoryEditModal ("Update Factory"): the rich GPS/ownership/logo/images form, reached via
//    the edit icon on a factory row - but that icon only appears once the factory has at least
//    one device/production record. Factories with none only expose "Factory status graph" and
//    "View analytics" (see FactoriesPage.factoryEditButton).
//  - UpdateCompanyModal: a single Company Name field, reached via the edit icon on a company row.
//  - CreateFactoryModal: reached via the "Factory" button in the list header, which actually
//    triggers factory *creation*, not a view toggle.
class FactoryEditModal extends BasePage {
  constructor(page) {
    super(page);

    this.modal = page.getByRole('dialog').filter({ hasText: /update factory/i });
    this.closeIcon = this.modal.getByRole('button', { name: /close/i });
    this.cancelButton = this.modal.getByRole('button', { name: /cancel/i });
    this.updateButton = this.modal.getByRole('button', { name: /^update$/i });

    this.factoryNameInput = this.modal.getByLabel(/factory name/i);
    this.parentCompanyDropdown = this.modal.getByLabel(/parent company/i).or(this.modal.getByRole('combobox', { name: /company/i }));
    this.registeredAddressInput = this.modal.getByLabel(/registered address/i);
    this.gpsLatitudeInput = this.modal.getByLabel(/latitude/i);
    this.gpsLongitudeInput = this.modal.getByLabel(/longitude/i);
    this.ownershipStructureInput = this.modal.getByLabel(/ownership structure/i);
    this.companyWebsiteInput = this.modal.getByLabel(/website/i);
    this.aggregationStartHourDropdown = this.modal.getByLabel(/aggregation.*start hour/i).or(
      this.modal.getByRole('combobox', { name: /aggregation/i })
    );
    // Confirmed live: the field's accessible label is just "Capacity", not "Production Capacity".
    this.productionCapacityInput = this.modal.getByLabel(/^capacity$/i);
    this.unitInput = this.modal.getByLabel(/^unit$/i);
    this.ntnNumberInput = this.modal.getByLabel(/ntn number/i);
    this.publicCompanyCheckbox = this.modal.getByLabel(/public compan/i);

    this.companyLogo = this.modal.locator('[data-testid="company-logo"], img[alt*="logo" i]');
    this.changeLogoButton = this.modal.getByRole('button', { name: /change|upload/i });
    this.removeLogoButton = this.modal.getByRole('button', { name: /remove/i }).first();
    this.logoFileInput = this.modal.locator('input[type="file"]').first();

    // Confirmed live: "Add images" renders as a clickable div, not a <button> - no accessible role.
    this.addImagesButton = this.modal.getByText(/add images?/i);
    this.imagesFileInput = this.modal.locator('input[type="file"]').last();
    this.imageThumbnails = this.modal.locator('[data-testid="factory-image-thumbnail"]');
    this.removeImageIcon = this.modal.locator('[data-testid="remove-image"], .image-thumbnail button');

    this.validationError = this.modal.locator('[role="alert"], .error-message, .text-red-500, .text-danger');
  }

  async waitForOpen() {
    await this.modal.waitFor({ state: 'visible', timeout: 10_000 });
  }

  async scrollToBottom() {
    await this.modal.evaluate((el) => el.scrollTo(0, el.scrollHeight));
  }
}

class UpdateCompanyModal extends BasePage {
  constructor(page) {
    super(page);

    this.modal = page.getByRole('dialog').filter({ hasText: /update company/i });
    this.closeIcon = this.modal.getByRole('button', { name: /close/i });
    this.cancelButton = this.modal.getByRole('button', { name: /cancel/i });
    this.updateButton = this.modal.getByRole('button', { name: /update/i });

    this.companyNameInput = this.modal.getByLabel(/company name/i);
    this.validationError = this.modal.locator('[role="alert"], .error-message, .text-red-500, .text-danger');
  }

  async waitForOpen() {
    await this.modal.waitFor({ state: 'visible', timeout: 10_000 });
  }
}

class CreateFactoryModal extends BasePage {
  constructor(page) {
    super(page);

    this.modal = page.getByRole('dialog').filter({ hasText: /create factory/i });
    this.closeIcon = this.modal.getByRole('button', { name: /close/i });
    this.cancelButton = this.modal.getByRole('button', { name: /cancel/i });
    this.createButton = this.modal.getByRole('button', { name: /^create$/i });

    this.factoryNameInput = this.modal.getByLabel(/factory name/i);
    this.parentCompanyDropdown = this.modal.getByLabel(/parent company/i).or(this.modal.getByRole('combobox', { name: /company/i }));
    this.registeredAddressInput = this.modal.getByLabel(/registered address/i);
    this.gpsLatitudeInput = this.modal.getByLabel(/latitude/i);
    this.gpsLongitudeInput = this.modal.getByLabel(/longitude/i);
    this.ownershipStructureInput = this.modal.getByLabel(/ownership structure/i);
    this.companyWebsiteInput = this.modal.getByLabel(/website/i);
    this.aggregationStartHourDropdown = this.modal.getByLabel(/aggregation.*start hour/i).or(
      this.modal.getByRole('combobox', { name: /aggregation/i })
    );
    // Confirmed live: the field's accessible label is just "Capacity", not "Production Capacity".
    this.productionCapacityInput = this.modal.getByLabel(/^capacity$/i);
    this.unitInput = this.modal.getByLabel(/^unit$/i);
    this.ntnNumberInput = this.modal.getByLabel(/ntn number/i);
    this.publicCompanyCheckbox = this.modal.getByLabel(/public compan/i);

    this.companyLogo = this.modal.locator('[data-testid="company-logo"], img[alt*="logo" i]');
    this.uploadLogoButton = this.modal.getByRole('button', { name: /upload/i });
    this.logoFileInput = this.modal.locator('input[type="file"]').first();

    // Confirmed live: "Add images" renders as a clickable div, not a <button> - no accessible role.
    this.addImagesButton = this.modal.getByText(/add images?/i);
    this.imagesFileInput = this.modal.locator('input[type="file"]').last();
    this.imageThumbnails = this.modal.locator('[data-testid="factory-image-thumbnail"]');
    this.removeImageIcon = this.modal.locator('[data-testid="remove-image"], .image-thumbnail button');

    this.validationError = this.modal.locator('[role="alert"], .error-message, .text-red-500, .text-danger');
  }

  async waitForOpen() {
    await this.modal.waitFor({ state: 'visible', timeout: 10_000 });
  }

  async scrollToBottom() {
    await this.modal.evaluate((el) => el.scrollTo(0, el.scrollHeight));
  }
}

module.exports = { FactoryEditModal, UpdateCompanyModal, CreateFactoryModal };
