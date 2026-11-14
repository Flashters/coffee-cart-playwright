import { randomUUID } from 'crypto';

export interface Customer {
  name: string;
  email: string;
}

// Unique per call, so parallel tests never share data.
export function buildCustomer(overrides: Partial<Customer> = {}): Customer {
  return {
    name: 'QA Tester',
    email: `qa.${randomUUID().slice(0, 8)}@example.com`,
    ...overrides,
  };
}