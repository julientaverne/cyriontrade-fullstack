/**
 * useChartInteractions
 *
 * Centralizes user-facing chart interaction behavior.
 *
 * Responsibilities:
 * - compute tooltip state from crosshair movement
 * - expose chart navigation helpers (`fitContent`, `resetTimeScale`)
 * - synchronize fullscreen state with the browser fullscreen API
 * - resize/refit the chart after fullscreen transitions
 *
 * Architectural notes:
 * - this hook isolates imperative chart event handling away from React components
 * - it converts low-level chart callbacks into a small declarative state surface
 * - it keeps the chart container component focused on orchestration and layout
 *
 * @param {Object} params
 * @param {{ current: any }} params.chartRef Mutable ref containing the chart instance.
 * @param {any} params.mainSeries Main chart series used as the tooltip anchor.
 * @param {any} params.smaSeries Optional SMA overlay series.
 * @param {any} params.emaSeries Optional EMA overlay series.
 * @param {{ current: HTMLDivElement | null }} params.containerRef DOM ref for the chart container.
 * @param {{ current: HTMLElement | null }} params.fullscreenRef DOM ref used as the fullscreen target.
 * @param {string} params.currency Active currency code for price formatting.
 * @param {number} params.days Current selected chart range in days.
 * @returns {{
 *   tooltip: {
 *     visible: boolean,
 *     left: number,
 *     top: number,
 *     date: string,
 *     price: string,
 *     sma: string,
 *     ema: string
 *   },
 *   isFullscreen: boolean,
 *   fitContent: () => void,
 *   resetTimeScale: () => void,
 *   toggleFullscreen: () => Promise<void>
 * }}
 */

import { useCallback, useEffect, useState } from "react";
import { formatChartTime, formatPrice } from "../../utils/chart/formatters";

const hiddenTooltip = {
  visible: false,
  left: 0,
  top: 0,
  date: "",
  price: "",
  sma: "",
  ema: "",
};

function extractSeriesValue(seriesData) {
  if (!seriesData) {
    return undefined;
  }

  if (seriesData.value !== undefined) {
    return seriesData.value;
  }

  if (seriesData.close !== undefined) {
    return seriesData.close;
  }

  return undefined;
}

export default function useChartInteractions({
  chartRef,
  mainSeries,
  smaSeries,
  emaSeries,
  containerRef,
  fullscreenRef,
  currency,
  days,
}) {
  const [tooltip, setTooltip] = useState(hiddenTooltip);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!chartRef.current || !mainSeries || !containerRef.current) {
      setTooltip(hiddenTooltip);
      return undefined;
    }

    const chart = chartRef.current;

    const handleCrosshairMove = (param) => {
      if (
        !param.point ||
        !param.time ||
        param.point.x < 0 ||
        param.point.y < 0
      ) {
        setTooltip(hiddenTooltip);
        return;
      }

      const mainData = param.seriesData.get(mainSeries);

      if (!mainData) {
        setTooltip(hiddenTooltip);
        return;
      }

      const smaData = smaSeries ? param.seriesData.get(smaSeries) : undefined;
      const emaData = emaSeries ? param.seriesData.get(emaSeries) : undefined;

      const mainValue = extractSeriesValue(mainData);
      const smaValue = extractSeriesValue(smaData);
      const emaValue = extractSeriesValue(emaData);

      const width = containerRef.current.clientWidth;
      const left = Math.min(param.point.x + 12, Math.max(width - 220, 0));

      setTooltip({
        visible: true,
        left,
        top: Math.max(param.point.y + 12, 12),
        date: formatChartTime(param.time, days),
        price: formatPrice(mainValue, currency),
        sma: smaValue !== undefined ? formatPrice(smaValue, currency) : "",
        ema: emaValue !== undefined ? formatPrice(emaValue, currency) : "",
      });
    };

    chart.subscribeCrosshairMove(handleCrosshairMove);

    return () => {
      chart.unsubscribeCrosshairMove(handleCrosshairMove);
    };
  }, [
    chartRef,
    mainSeries,
    smaSeries,
    emaSeries,
    containerRef,
    currency,
    days,
  ]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === fullscreenRef.current);

      requestAnimationFrame(() => {
        if (chartRef.current && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          chartRef.current.resize(
            Math.max(Math.floor(rect.width), 300),
            Math.max(Math.floor(rect.height), 300)
          );
          chartRef.current.timeScale().fitContent();
        }
      });
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [fullscreenRef, chartRef, containerRef]);

  const fitContent = useCallback(() => {
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [chartRef]);

  const resetTimeScale = useCallback(() => {
    if (chartRef.current) {
      chartRef.current.timeScale().resetTimeScale();
    }
  }, [chartRef]);

  const toggleFullscreen = useCallback(async () => {
    const element = fullscreenRef.current;

    if (!element) {
      return;
    }

    if (document.fullscreenElement === element) {
      await document.exitFullscreen();
    } else {
      await element.requestFullscreen();
    }
  }, [fullscreenRef]);

  return {
    tooltip,
    isFullscreen,
    fitContent,
    resetTimeScale,
    toggleFullscreen,
  };
}
