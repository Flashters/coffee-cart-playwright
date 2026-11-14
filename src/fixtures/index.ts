import { test as base } from '@playwright/test';
import { MenuPage } from '../pages/MenuPage';
import { PaymentModal } from '../pages/components/PaymentModal';
import { buildCustomer, Customer } from '../data/customers';

type Fixtures = {
  menuPage: MenuPage;
  paymentModal: PaymentModal;
  customer: Customer;
};

export const test = base.extend<Fixtures>({
  // Setup: open the app with a fresh browser context (empty cart).
  // Teardown: Playwright discards the context automatically.
  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);
    await menuPage.goto();
    await use(menuPage);
  },
  paymentModal: async ({ page }, use) => {
    await use(new PaymentModal(page));
  },
  customer: async ({}, use) => {
    await use(buildCustomer());
  },
});

export { expect } from '@playwright/test';