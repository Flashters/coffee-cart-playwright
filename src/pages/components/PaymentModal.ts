import { expect, Locator, Page } from '@playwright/test';
import { Customer } from '../../data/customers';

export class PaymentModal {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly promotionCheckbox: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.nameInput = page.getByLabel('Name');
    this.emailInput = page.getByLabel('Email');
    this.promotionCheckbox = page.getByLabel(/promotion/i);
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage = page.getByText(/Thanks for your purchase/i);
  }

  async fillAndSubmit(customer: Customer): Promise<void> {
    await this.nameInput.fill(customer.name);
    await this.emailInput.fill(customer.email);
    await this.submitButton.click();
  }

  async expectSuccess(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }
}