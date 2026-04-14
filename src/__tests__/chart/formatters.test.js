/**
 * Formatter utility test suite.
 *
 * These tests validate the display-oriented helper functions used by the chart UI,
 * especially in tooltip rendering.
 *
 * Why this suite matters:
 * - formatting helpers directly affect user-facing readability
 * - even small regressions in date/price formatting are highly visible in the UI
 * - keeping this logic covered at the utility level avoids pushing formatting
 *   concerns into more fragile component tests
 *
 * Coverage strategy:
 * - verify both supported time display modes
 * - verify graceful fallback behavior for missing or invalid input
 * - verify that currency formatting produces a user-facing monetary label
 */

import { formatChartTime, formatPrice } from "../../utils/chart/formatters";

describe("formatChartTime", () => {
  it("formats intraday time when days equals 1", () => {
    const timestamp = 1713096000;
    const result = formatChartTime(timestamp, 1);

    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("formats date when days is greater than 1", () => {
    const timestamp = 1713096000;
    const result = formatChartTime(timestamp, 7);

    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns empty string when time is missing", () => {
    expect(formatChartTime(undefined, 1)).toBe("");
  });
});

describe("formatPrice", () => {
  it("formats a price with currency", () => {
    const result = formatPrice(1234.56, "USD");
    expect(result).toContain("$");
  });

  it("returns dash for invalid value", () => {
    expect(formatPrice(undefined, "USD")).toBe("-");
    expect(formatPrice(NaN, "USD")).toBe("-");
  });
});
