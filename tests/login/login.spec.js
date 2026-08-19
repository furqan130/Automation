const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('Verify Email Input Field', async () => {
    await expect(loginPage.emailInput.first()).toBeVisible();
    await expect(loginPage.emailInput.first()).toBeEnabled();
  });

  test('Verify Password Input Field', async () => {
    await expect(loginPage.passwordInput.first()).toBeVisible();
    await expect(loginPage.passwordInput.first()).toHaveAttribute('type', 'password');
  });

  test('Verify Login Button Enabled', async () => {
    await loginPage.emailInput.first().fill(process.env.USER_EMAIL);
    await loginPage.passwordInput.first().fill(process.env.USER_PASSWORD);
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('Verify Error Message on Invalid Login', async ({ page }) => {
    await loginPage.login('invalid.user@example.com', 'wrongPassword123');
    await expect(loginPage.errorMessage.first()).toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/login|\//i);
  });

  test('Verify Successful Login', async ({ page }) => {
    await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    await expect(page.getByText(/overview/i).first()).toBeVisible({ timeout: 20_000 });
    await expect(page).not.toHaveURL(/login/i);
  });
});
