/**
 * useTechnicalIndicators
 *
 * Computes derived technical indicator datasets for the chart.
 *
 * Responsibilities:
 * - derive SMA data from the normalized price series when enabled
 * - derive EMA data from the normalized price series when enabled
 * - avoid unnecessary recalculation through memoization
 *
 * Why this logic lives in a hook:
 * - indicator computation is derived state, not raw source state
 * - the chart container should not embed calculation details directly
 * - memoizing at the hook level keeps the consuming component focused on orchestration
 *
 * Architectural notes:
 * - this hook does not create or manage chart series instances
 * - it only returns chart-ready datasets for optional overlay rendering
 * - the actual financial calculations remain in pure utility functions,
 *   which makes them easier to test and reuse
 *
 * @param {Object} params
 * @param {Array<{ time: any, value: number }>} params.data Normalized source series used for indicator calculation.
 * @param {boolean} params.showSMA Whether the SMA indicator is enabled.
 * @param {number} params.smaPeriod SMA calculation period.
 * @param {boolean} params.showEMA Whether the EMA indicator is enabled.
 * @param {number} params.emaPeriod EMA calculation period.
 * @returns {{
 *   smaData: Array<{ time: any, value: number }>,
 *   emaData: Array<{ time: any, value: number }>
 * }}
 */

import { useMemo } from "react";
import { calculateEMA, calculateSMA } from "../../utils/chart/indicator";

export default function useTechnicalIndicators({
  data,
  showSMA,
  smaPeriod,
  showEMA,
  emaPeriod,
}) {
  const smaData = useMemo(() => {
    if (!showSMA) {
      return [];
    }

    return calculateSMA(data, smaPeriod);
  }, [data, showSMA, smaPeriod]);

  const emaData = useMemo(() => {
    if (!showEMA) {
      return [];
    }

    return calculateEMA(data, emaPeriod);
  }, [data, showEMA, emaPeriod]);

  return {
    smaData,
    emaData,
  };
}
