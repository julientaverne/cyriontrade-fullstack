import { useEffect, useMemo, useState } from "react";
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
  const [mainSeries, setMainSeries] = useState(null);

  const baselinePrice = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return 0;
    }

    return data[0].value;
  }, [data]);

  useEffect(() => {
    if (!isReady || !chartRef.current) {
      return undefined;
    }

    const chart = chartRef.current;
    let createdSeries = null;

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

    setMainSeries(createdSeries);

    return () => {
      chart.removeSeries(createdSeries);
      setMainSeries(null);
    };
  }, [chartRef, isReady, chartType, baselinePrice]);

  useEffect(() => {
    if (!mainSeries || !Array.isArray(data)) {
      return;
    }

    mainSeries.setData(data);

    if (chartType === "baseline" && baselinePrice) {
      mainSeries.applyOptions({
        baseValue: { type: "price", price: baselinePrice },
      });
    }

    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [mainSeries, data, chartType, baselinePrice, chartRef]);

  return {
    mainSeries,
  };
}