const { BasePage } = require('./BasePage');

class OverviewPage extends BasePage {
  constructor(page) {
    super(page);

    // Summary cards
    this.totalCompaniesBox = page.locator('[data-testid="total-companies"]').or(
      page.locator('div').filter({ hasText: /^Total Companies/i }).first()
    );
    this.totalFactoriesBox = page.locator('[data-testid="total-factories"]').or(
      page.locator('div').filter({ hasText: /^Total Factories/i }).first()
    );
    this.connectivityBox = page.locator('[data-testid="factory-connectivity"]').or(
      page.locator('div').filter({ hasText: /online/i }).filter({ hasText: /offline/i }).first()
    );
    this.bagsTodayBox = page.locator('[data-testid="bags-today"]').or(
      page.locator('div').filter({ hasText: /bags today/i }).first()
    );
    this.bagsThisMonthBox = page.locator('[data-testid="bags-this-month"]').or(
      page.locator('div').filter({ hasText: /bags this month/i }).first()
    );
    this.topProducerBox = page.locator('[data-testid="top-producer"]').or(
      page.locator('div').filter({ hasText: /top produc/i }).first()
    );

    this.openFactoryMapButton = page.getByRole('link', { name: /open factory map/i }).or(
      page.getByRole('button', { name: /open factory map/i })
    );

    // Charts
    this.dailyProductionChart = page.locator('[data-testid="daily-production-chart"]').or(
      page.locator('section, div').filter({ hasText: /daily production/i }).first()
    );
    this.monthlyProductionChart = page.locator('[data-testid="monthly-production-chart"]').or(
      page.locator('section, div').filter({ hasText: /monthly production/i }).first()
    );
    // Bar clicks/hovers must target the drawn <path>, not the invisible <g> wrapper Recharts renders it in.
    this.chartBars = page.locator('.recharts-bar-rectangle path');

    // Breakdown modal
    this.breakdownModal = page.getByRole('dialog').filter({ hasText: /breakdown/i });
    this.breakdownPieChart = this.breakdownModal.locator('.recharts-pie, svg').first();
    this.breakdownTable = this.breakdownModal.locator('table');
    this.breakdownModalCloseButton = this.breakdownModal.getByRole('button', { name: /close|x/i }).or(
      this.breakdownModal.locator('[aria-label="Close"]')
    );

    // Factory status
    this.factoryStatusSection = page.locator('section, div').filter({ hasText: /factory status/i }).first();
    // The online/offline counts live in a paragraph next to the heading, not inside it.
    this.factoryStatusHeader = this.factoryStatusSection.locator('h2, h3').first().locator('xpath=..');
    this.viewAllLink = this.factoryStatusSection.getByRole('link', { name: /view all/i }).or(
      this.factoryStatusSection.getByRole('button', { name: /view all/i })
    );
    // Each company row renders as a button named "<Company name> <online>/<total>" with no test id.
    this.companyRows = this.factoryStatusSection.getByRole('button', { name: /\d+\/\d+/ });
  }

  async open() {
    await this.goto('/');
  }

  companyRowByName(name) {
    return this.companyRows.filter({ hasText: name });
  }

  async clickChartBar(chart, index = 0) {
    const bars = chart.locator('.recharts-bar-rectangle path');
    await bars.nth(index).click();
  }

  async hoverChartBar(chart, index = 0) {
    const bars = chart.locator('.recharts-bar-rectangle path');
    await bars.nth(index).hover();
  }
}

module.exports = { OverviewPage };
