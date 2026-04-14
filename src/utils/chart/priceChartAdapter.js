/**
 * JTA___ DO DOCS
 * Example: ...
 */
export function normalizePriceData(prices = []) {
    return [...prices]
      .sort((a, b) => a[0] - b[0])
      .map(([timestamp, price]) => ({
        time: Math.floor(timestamp / 1000),
        value: Number(price),
      }));
  }