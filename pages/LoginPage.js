const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByLabel(/email/i).or(page.locator('input[type="email"], input[name="email"]'));
    this.passwordInput = page
      .getByLabel(/password/i)
      .or(page.locator('input[type="password"], input[name="password"]'));
    this.loginButton = page.getByRole('button', { name: /log ?in|sign ?in/i });
    this.errorMessage = page.locator(
      '[role="alert"], .error-message, .text-red-500, .text-danger, [data-testid="login-error"]'
    );
  }

  async open() {
    await this.goto('/');
  }

  async login(email, password) {
    await this.emailInput.first().fill(email);
    await this.passwordInput.first().fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
