export const PRODUCTS = {
  espresso: { name: 'Espresso', price: 10 },
  mocha: { name: 'Mocha', price: 8 },
  americano: { name: 'Americano', price: 7 },
  cappuccino: { name: 'Cappuccino', price: 19 },
} as const;

export type Product = (typeof PRODUCTS)[keyof typeof PRODUCTS];