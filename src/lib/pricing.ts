export interface PricingResult {
  basePrice: number;
  tax: number;
  cgst: number;
  sgst: number;
  grandTotal: number;
}

/**
 * Calculates taxes based on the declared tariff, applied to the actual price.
 * All amounts are in integer paise.
 */
export function calculateTaxesAndTotal(declaredTariffPaise: number, actualPricePaise: number): PricingResult {
  let slab = 0;
  if (declaredTariffPaise <= 100000) {
    slab = 0.0;
  } else if (declaredTariffPaise <= 750000) {
    slab = 0.05;
  } else {
    slab = 0.18;
  }

  const tax = Math.round(actualPricePaise * slab);
  const cgst = Math.round(tax / 2);
  const sgst = tax - cgst; // Ensure exact split

  return {
    basePrice: actualPricePaise,
    tax,
    cgst,
    sgst,
    grandTotal: actualPricePaise + tax
  };
}
