/**
 * Chart formatting utilities.
 *
 * This module centralizes display formatting rules used by the chart UI,
 * especially in the tooltip layer.
 *
 * Design goals:
 * - keep formatting logic outside React components
 * - make display behavior consistent across the chart experience
 * - isolate locale- and representation-specific decisions in one place
 *
 * This separation helps keep presentation components simple and makes
 * formatting behavior much easier to test independently.
 */

/**
 * Formats a chart timestamp for tooltip display.
 *
 * Behavior:
 * - for a 1-day range, the tooltip shows an intraday time label
 * - for longer ranges, it switches to a date-based representation
 *
 * Why this matters:
 * - intraday data benefits from time precision
 * - multi-day or multi-month views are easier to scan with dates instead
 *
 * Assumptions:
 * - incoming `time` is a Unix timestamp expressed in seconds
 * - `days` reflects the currently selected chart range
 *
 * @param {number | string} time Unix timestamp in seconds.
 * @param {number} days Selected chart range in days.
 * @returns {string} Human-readable time or date label.
 */
export function formatChartTime(time, days) {
  if (!time) {
    return "";
  }

  const date = new Date(Number(time) * 1000);

  if (days === 1) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  }

  return date.toLocaleDateString();
}

/**
 * Formats a numeric value as a currency string for chart display.
 *
 * Behavior:
 * - invalid values are rendered as a placeholder
 * - large values use fewer decimals to reduce visual noise
 * - smaller values preserve more precision for readability
 *
 * Why this matters:
 * - price formatting should remain stable and legible in a dense tooltip UI
 * - overly precise large values are usually not helpful to the user
 *
 * @param {number} value Numeric value to format.
 * @param {string} currency ISO currency code (e.g. "USD", "EUR").
 * @returns {string} Formatted currency label or placeholder.
 */
export function formatPrice(value, currency) {
  if (value === undefined || Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: value > 1000 ? 0 : 2,
  }).format(value);
}
