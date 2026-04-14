import { useEffect, useRef, useState } from "react";
import { createChart, AreaSeries, BaselineSeries, LineSeries } from "lightweight-charts";

export default function useLightweightChart({ containerRef, chartType }) {
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || chartRef.current) {
      return undefined;
    }

    const chart = createChart(containerRef.current, {
      autoSize: true,
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

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
      setIsReady(false);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const chart = chartRef.current;

    if (seriesRef.current) {
      chart.removeSeries(seriesRef.current);
      seriesRef.current = null;
    }

    let series;

    if (chartType === "area") {
      series = chart.addSeries(AreaSeries, {
        lineColor: "#EEBC1D",
        topColor: "rgba(238, 188, 29, 0.35)",
        bottomColor: "rgba(238, 188, 29, 0.02)",
        lineWidth: 2,
      });
    } else if (chartType === "baseline") {
      series = chart.addSeries(BaselineSeries, {
        baseValue: { type: "price", price: 0 },
        topLineColor: "#EEBC1D",
        topFillColor1: "rgba(238, 188, 29, 0.28)",
        topFillColor2: "rgba(238, 188, 29, 0.04)",
        bottomLineColor: "#ef5350",
        bottomFillColor1: "rgba(239, 83, 80, 0.20)",
        bottomFillColor2: "rgba(239, 83, 80, 0.03)",
        lineWidth: 2,
      });
    } else {
      series = chart.addSeries(LineSeries, {
        color: "#EEBC1D",
        lineWidth: 2,
      });
    }

    seriesRef.current = series;
  }, [chartType]);

  return {
    chartRef,
    seriesRef,
    isReady,
  };
}