/**
 * Technical indicator utilities.
 *
 * This module contains pure calculation helpers for derived chart overlays.
 *
 * Design goals:
 * - keep financial computations outside React components and hooks
 * - make indicator logic deterministic and easy to test
 * - return chart-ready datasets that can be consumed directly by
 *   Lightweight Charts line-based series
 *
 * Input assumptions:
 * - `data` is an ordered array of points shaped like:
 *   { time: <chart time>, value: <numeric price> }
 * - points are already normalized before reaching this module
 *
 * Architectural note:
 * these functions are intentionally pure and side-effect free.
 * That makes them ideal for memoization in hooks and straightforward
 * to validate with unit tests.
 */

/**
 * Calculates a Simple Moving Average (SMA) series.
 *
 * SMA is computed as the arithmetic mean of the last `period` values
 * for each eligible point.
 *
 * Example:
 * - with a period of 3
 * - point #3 is the average of points 1, 2 and 3
 * - point #4 is the average of points 2, 3 and 4
 *
 * Why this implementation:
 * - it favors clarity and correctness over premature optimization
 * - it returns a chart-ready dataset aligned with the last point
 *   of each averaging window
 *
 * Output behavior:
 * - the first `period - 1` points are omitted because a full moving
 *   average window is not available yet
 *
 * @param {Array<{ time: any, value: number }>} data Normalized price series.
 * @param {number} period Number of points used in each averaging window.
 * @returns {Array<{ time: any, value: number }>} SMA series ready to be plotted.
 */
export function calculateSMA(data, period) {
  if (!Array.isArray(data) || period <= 0 || data.length < period) {
    return [];
  }

  const result = [];

  for (let index = period - 1; index < data.length; index += 1) {
    const slice = data.slice(index - period + 1, index + 1);
    const sum = slice.reduce((acc, point) => acc + point.value, 0);

    result.push({
      time: data[index].time,
      value: Number((sum / period).toFixed(2)),
    });
  }

  return result;
}

/**
 * Calculates an Exponential Moving Average (EMA) series.
 *
 * EMA gives more weight to recent values than older ones, which makes it
 * more reactive than SMA.
 *
 * Implementation strategy:
 * - initialize the EMA with the SMA of the first full window
 * - then apply the standard recursive EMA formula for each following point
 *
 * Formula:
 * EMA(current) = currentValue * multiplier + previousEMA * (1 - multiplier)
 * where:
 * multiplier = 2 / (period + 1)
 *
 * Why initialize with SMA:
 * - it provides a stable, standard starting value
 * - it avoids a biased EMA bootstrap based on a single raw point
 *
 * Output behavior:
 * - like SMA, EMA starts only once enough points exist to initialize the series
 * - the first output point is aligned with `data[period - 1]`
 *
 * @param {Array<{ time: any, value: number }>} data Normalized price series.
 * @param {number} period Number of points used for EMA smoothing.
 * @returns {Array<{ time: any, value: number }>} EMA series ready to be plotted.
 */
export function calculateEMA(data, period) {
  if (!Array.isArray(data) || period <= 0 || data.length < period) {
    return [];
  }

  const multiplier = 2 / (period + 1);
  const initialSlice = data.slice(0, period);
  const initialSma =
    initialSlice.reduce((acc, point) => acc + point.value, 0) / period;

  const result = [
    {
      time: data[period - 1].time,
      value: Number(initialSma.toFixed(2)),
    },
  ];

  let previousEma = initialSma;

  for (let index = period; index < data.length; index += 1) {
    const current = data[index].value;
    const ema = current * multiplier + previousEma * (1 - multiplier);

    result.push({
      time: data[index].time,
      value: Number(ema.toFixed(2)),
    });

    previousEma = ema;
  }

  return result;
}
