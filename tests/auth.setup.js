const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

  await expect(page.getByText(/overview/i).first()).toBeVisible({ timeout: 20_000 });
  await expect(page).not.toHaveURL(/login/i);

  await page.context().storageState({ path: authFile });
});
