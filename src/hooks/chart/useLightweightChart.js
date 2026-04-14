/**
 * useLightweightChart
 *
 * Creates and manages the lifecycle of a Lightweight Charts instance.
 *
 * Responsibilities:
 * - initialize the chart once the container DOM node is available
 * - apply the shared base chart configuration
 * - keep the chart dimensions synchronized with its container
 * - clean up chart and observer resources on unmount
 *
 * Why this logic lives in a hook:
 * - Lightweight Charts exposes an imperative API
 * - chart creation depends on a mounted DOM element
 * - resize management is an infrastructure concern rather than a UI concern
 *
 * Architectural notes:
 * - the hook deliberately owns only the chart instance lifecycle
 * - series creation and data binding are handled elsewhere
 * - this keeps responsibilities separated between:
 *   - chart bootstrap
 *   - series orchestration
 *   - interactions
 *   - export behavior
 *
 * @param {Object} params
 * @param {{ current: HTMLDivElement | null }} params.containerRef Ref pointing to the chart container element.
 * @returns {{ chartRef: { current: any }, isReady: boolean }}
 */

import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function useLightweightChart({ containerRef }) {
  const chartRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const frameRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || chartRef.current) {
      return undefined;
    }

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const chart = createChart(container, {
      width: Math.max(Math.floor(rect.width), 300),
      height: Math.max(Math.floor(rect.height), 300),
      layout: {
        background: { type: "solid", color: "transparent" },
        textColor: "#FFFFFF",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.08)" },
        horzLines: { color: "rgba(255,255,255,0.08)" },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        rightOffset: 8,
        barSpacing: 12,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    chartRef.current = chart;
    setIsReady(true);

    const resizeChart = () => {
      if (!chartRef.current || !containerRef.current) {
        return;
      }

      const nextRect = containerRef.current.getBoundingClientRect();
      const width = Math.max(Math.floor(nextRect.width), 300);
      const height = Math.max(Math.floor(nextRect.height), 300);

      chartRef.current.resize(width, height);
    };

    resizeObserverRef.current = new ResizeObserver(() => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        resizeChart();
      });
    });

    resizeObserverRef.current.observe(container);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }

      chart.remove();
      chartRef.current = null;
      setIsReady(false);
    };
  }, [containerRef]);

  return {
    chartRef,
    isReady,
  };
}
