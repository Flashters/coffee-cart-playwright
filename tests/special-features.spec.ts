import { test, expect } from '../src/fixtures';
import { PRODUCTS } from '../src/data/products';

const CHINESE_CHARS = /[\u4e00-\u9fff]/;

test.describe('Special features', () => {
  test('double-clicking a coffee title translates it to Chinese', async ({ menuPage }) => {
    const title = menuPage.coffeeTitle(PRODUCTS.espresso.name);
    await expect(title).not.toHaveText(CHINESE_CHARS);
    await menuPage.translateTitle(PRODUCTS.espresso.name);
    await expect(title).toHaveText(CHINESE_CHARS);
  });

  test('right-clicking a coffee cup opens an add-to-cart dialog', async ({ menuPage, page }) => {
    await menuPage.openContextMenuAddDialog(PRODUCTS.mocha.name);
    await expect(page.getByText(/Add .* to the cart\?/i)).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();
    await menuPage.expectCartCount(1);
  });

  for (const milestone of [3, 6]) {
    test(`promo popup appears on item #${milestone} only`, async ({ menuPage }) => {
      for (let i = 1; i < milestone; i++) {
        await menuPage.addProductHandlingPromo(PRODUCTS.americano.name); // handles earlier promos
        if (i % 3 !== 0) await menuPage.promo.expectHidden();
      }
      await menuPage.addProduct(PRODUCTS.americano.name);
      await menuPage.promo.expectVisible();
    });
  }

  test('accepting the promo adds the discounted extra item', async ({ menuPage }) => {
    const { espresso, americano, cappuccino } = PRODUCTS;
    await menuPage.addProductHandlingPromo(espresso.name);
    await menuPage.addProductHandlingPromo(americano.name);
    await menuPage.addProductHandlingPromo(cappuccino.name, { acceptPromo: true });
    await menuPage.expectCartCount(4);
  });
});