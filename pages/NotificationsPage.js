const { BasePage } = require('./BasePage');

class NotificationsPage extends BasePage {
  constructor(page) {
    super(page);

    // This build has no User/System tabs, no type filter, and no per-page pagination -
    // notifications render as a flat, timestamp-ordered list, each tagged inline with its
    // category ("system" or "user"), with a single "Load more" button for pagination.
    this.heading = page.getByRole('heading', { name: /^notifications/i });
    this.markAllAsReadButton = page.getByRole('button', { name: /mark all as read/i });
    // Anchor on the category tag ("user"/"system"), not the "Mark as read" button - that
    // button disappears once an item is read, but the category tag is always present.
    this.notificationItems = page.locator(
      "xpath=//h3/ancestor::*[.//*[normalize-space(text())='user' or normalize-space(text())='system']][1]"
    );
    this.emptyState = page.getByText(/no notifications/i);
    this.loadMoreButton = page.getByRole('button', { name: /load more/i });
  }

  async open() {
    await this.goto('/notifications');
  }

  bell() {
    // The bell shows an unread-count badge (e.g. "9+") as its accessible name when there are
    // unread notifications, but has no name/badge at all once the count reaches 0 - so it can't
    // be located by name alone. It's the header icon button right after "Settings".
    return this.page.getByRole('button', { name: /^\d+\+?$/ }).or(
      this.page.getByRole('button', { name: /^settings$/i }).locator('xpath=following-sibling::button[1]')
    ).first();
  }

  async openNotificationsBell() {
    await this.bell().click();
  }

  itemsByCategory(category) {
    return this.notificationItems.filter({ hasText: new RegExp(`\\b${category}\\b`, 'i') });
  }

  markAsReadButtonInItem(item) {
    return item.getByRole('button', { name: /mark as read/i });
  }

  notificationTimestamps() {
    return this.notificationItems.locator('h3 + *');
  }
}

module.exports = { NotificationsPage };
