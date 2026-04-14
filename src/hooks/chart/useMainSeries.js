import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AreaSeries,
  BaselineSeries,
  LineSeries,
} from "lightweight-charts";

export default function useMainSeries({
  chartRef,
  isReady,
  chartType,
  data,
}) {
  const mainSeriesRef = useRef(null);
  const [mainSeries, setMainSeries] = useState(null);

  const baselinePrice = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return 0;
    }

    return data[0].value;
  }, [data]);

  useLayoutEffect(() => {
    if (!isReady || !chartRef.current) {
      return;
    }

    const chart = chartRef.current;

    if (mainSeriesRef.current) {
      try {
        chart.removeSeries(mainSeriesRef.current);
      } catch (error) {
        // ignore
      } finally {
        mainSeriesRef.current = null;
        setMainSeries(null);
      }
    }

    let createdSeries;

    if (chartType === "area") {
      createdSeries = chart.addSeries(AreaSeries, {
        lineColor: "#EEBC1D",
        topColor: "rgba(238, 188, 29, 0.35)",
        bottomColor: "rgba(238, 188, 29, 0.02)",
        lineWidth: 2,
      });
    } else if (chartType === "baseline") {
      createdSeries = chart.addSeries(BaselineSeries, {
        baseValue: { type: "price", price: baselinePrice },
        topLineColor: "#EEBC1D",
        topFillColor1: "rgba(238, 188, 29, 0.28)",
        topFillColor2: "rgba(238, 188, 29, 0.04)",
        bottomLineColor: "#ef5350",
        bottomFillColor1: "rgba(239, 83, 80, 0.20)",
        bottomFillColor2: "rgba(239, 83, 80, 0.03)",
        lineWidth: 2,
      });
    } else {
      createdSeries = chart.addSeries(LineSeries, {
        color: "#EEBC1D",
        lineWidth: 2,
      });
    }

    // très important : on hydrate la série immédiatement
    if (Array.isArray(data) && data.length > 0) {
      createdSeries.setData(data);
    }

    mainSeriesRef.current = createdSeries;
    setMainSeries(createdSeries);

    chart.timeScale().fitContent();
  }, [chartRef, isReady, chartType, data, baselinePrice]);

  return {
    mainSeries,
  };
}