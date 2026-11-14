import { test } from '../src/fixtures';
import { PRODUCTS } from '../src/data/products';

test.describe('Checkout flow', () => {
  test('buys a single coffee end to end', async ({ menuPage, paymentModal, customer }) => {
    await menuPage.addProductHandlingPromo(PRODUCTS.espresso.name);
    await menuPage.expectCartCount(1);
    await menuPage.expectTotal(PRODUCTS.espresso.price);

    await menuPage.openCheckout();
    await paymentModal.fillAndSubmit(customer);
    await paymentModal.expectSuccess();
  });

  test('buys three coffees and declines the promo popup', async ({ menuPage, paymentModal, customer }) => {
    const { espresso, americano, cappuccino } = PRODUCTS;
    await menuPage.addProductHandlingPromo(espresso.name);
    await menuPage.addProductHandlingPromo(americano.name);
    await menuPage.addProductHandlingPromo(cappuccino.name); // 3rd item: promo appears, declined

    await menuPage.expectCartCount(3);
    await menuPage.expectTotal(espresso.price + americano.price + cappuccino.price);

    await menuPage.openCheckout();
    await paymentModal.fillAndSubmit(customer);
    await paymentModal.expectSuccess();
  });
});