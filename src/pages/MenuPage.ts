import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { PromoDialog } from './components/PromoDialog';

export class MenuPage extends BasePage {
  readonly promo: PromoDialog;
  readonly cartLink: Locator;
  readonly checkoutButton: Locator;
  private itemsAdded = 0; // the promo triggers on every 3rd item

  constructor(page: Page) {
    super(page);
    this.promo = new PromoDialog(page);
    this.cartLink = page.getByLabel('Cart page');
    this.checkoutButton = page.getByTestId('checkout');
  }

  coffeeCup(name: string): Locator {
    return this.page.getByTestId(name);
  }

  // Scoped through the cup so it still works after the title is translated.
  coffeeTitle(name: string): Locator {
    return this.page
      .getByRole('listitem')
      .filter({ has: this.coffeeCup(name) })
      .getByRole('heading');
  }

  async addProduct(name: string): Promise<void> {
    await this.coffeeCup(name).click();
    this.itemsAdded++;
  }

  /** Adds a product and, if it was the 3rd/6th/9th item, handles the promo popup. */
  async addProductHandlingPromo(name: string, opts: { acceptPromo?: boolean } = {}): Promise<void> {
    await this.addProduct(name);
    if (this.itemsAdded % 3 === 0) {
      await this.promo.expectVisible();
      if (opts.acceptPromo) await this.promo.accept();
      else await this.promo.decline();
    }
  }

  async openCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.cartLink).toHaveText(new RegExp(`cart \\(${count}\\)`, 'i'));
  }

  async expectTotal(amount: number): Promise<void> {
    await expect(this.checkoutButton).toContainText(`$${amount.toFixed(2)}`);
  }

  async openContextMenuAddDialog(name: string): Promise<void> {
    await this.coffeeCup(name).click({ button: 'right' });
  }

  async translateTitle(name: string): Promise<void> {
    await this.coffeeTitle(name).dblclick();
  }
}