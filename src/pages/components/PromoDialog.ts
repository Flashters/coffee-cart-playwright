import { expect, Locator, Page } from '@playwright/test';

export class PromoDialog {
  readonly message: Locator;
  readonly acceptButton: Locator;
  readonly declineButton: Locator;

  constructor(page: Page) {
    this.message = page.getByText("It's your lucky day!");
    this.acceptButton = page.getByRole('button', { name: /Yes, of course/i });
    this.declineButton = page.getByRole('button', { name: /Nah, I'll skip/i });
  }

  async expectVisible(): Promise<void> {
    await expect(this.message).toBeVisible();
  }

  async expectHidden(): Promise<void> {
    await expect(this.message).toBeHidden();
  }

  async accept(): Promise<void> {
    await this.acceptButton.click();
  }

  async decline(): Promise<void> {
    await this.declineButton.click();
  }
}