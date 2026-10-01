import { describe, it, expect } from 'vitest';
import { calculateTaxesAndTotal } from '../src/lib/pricing';

describe('Pricing and Tax Calculator (Integer Paise)', () => {
  it('should apply 0% tax for declared tariff <= 1000 INR', () => {
    const result = calculateTaxesAndTotal(99900, 99900); // 999 INR
    expect(result.tax).toBe(0);
    expect(result.cgst).toBe(0);
    expect(result.sgst).toBe(0);
    expect(result.grandTotal).toBe(99900);
  });

  it('should apply 5% tax for declared tariff between 1001 and 7500 INR', () => {
    // Exactly 7500 INR -> 5%
    const result = calculateTaxesAndTotal(750000, 750000);
    const expectedTax = 750000 * 0.05; // 37500
    expect(result.tax).toBe(expectedTax);
    expect(result.cgst).toBe(expectedTax / 2);
    expect(result.sgst).toBe(expectedTax / 2);
    expect(result.grandTotal).toBe(750000 + expectedTax);
  });

  it('should apply 18% tax when seasonal declared tariff pushes above 7500 INR, even if actual price is lower', () => {
    // Base rate is 7000 INR, but declared (rack rate) is 8000 INR for the season.
    // Tax slab is based on 8000 (>7500 -> 18%), but tax is computed on 7000.
    const result = calculateTaxesAndTotal(800000, 700000);
    const expectedTax = Math.round(700000 * 0.18); // 126000
    expect(result.tax).toBe(expectedTax);
    expect(result.grandTotal).toBe(700000 + expectedTax);
  });
});
