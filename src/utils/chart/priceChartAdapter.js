/**
 * Price data normalization utilities.
 *
 * This module converts raw API price history into the shape expected by
 * Lightweight Charts single-value series.
 *
 * Design goals:
 * - isolate API-specific data shaping from chart components
 * - guarantee a stable, chart-ready structure before rendering
 * - keep normalization logic pure, predictable, and easy to test
 *
 * Input assumptions:
 * - `prices` follows the backend/API format:
 *   [timestampInMilliseconds, price]
 * - timestamps may not always be sorted
 * - price values may arrive as numbers or numeric strings
 *
 * Output shape:
 * - Lightweight Charts expects objects such as:
 *   { time: <unix timestamp in seconds>, value: <number> }
 *
 * Architectural note:
 * normalizing data once at the boundary of the chart layer keeps
 * rendering components simpler and avoids repeating transformation logic
 * across hooks and UI components.
 */

/**
 * Normalizes raw price history into a chart-ready series.
 *
 * Responsibilities:
 * - clone the input to avoid mutating external state
 * - sort points chronologically
 * - convert timestamps from milliseconds to seconds
 * - coerce raw prices into numeric values
 *
 * Why this matters:
 * - Lightweight Charts expects time values in seconds for Unix timestamps
 * - chart rendering depends on chronologically ordered input
 * - explicit normalization makes downstream indicator calculations
 *   and tooltip formatting more reliable
 *
 * @param {Array<[number, number | string]>} [prices=[]] Raw price history as [timestamp, price] tuples.
 * @returns {Array<{ time: number, value: number }>} Normalized price series ready to be consumed by the chart.
 */
export function normalizePriceData(prices = []) {
  return [...prices]
    .sort((a, b) => a[0] - b[0])
    .map(([timestamp, price]) => ({
      time: Math.floor(timestamp / 1000),
      value: Number(price),
    }));
}
