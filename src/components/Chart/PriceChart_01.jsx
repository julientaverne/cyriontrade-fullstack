import React, { useEffect, useMemo, useRef, useState } from "react";
import { LineSeries } from "lightweight-charts";
import ChartToolbar from "./ChartToolbar";
import ChartTooltip from "./ChartTooltip";
import useChartExport from "../../hooks/chart/useChartExport";
import useChartInteractions from "../../hooks/chart/useChartInteractions";
import useLightweightChart from "../../hooks/chart/useLightweightChart";
import useTechnicalIndicators from "../../hooks/chart/useTechnicalIndicators";
import { normalizePriceData } from "../../utils/chart/priceChartAdapter";

export default function PriceChart({ historicData, currency, days }) {
  const fullscreenRef = useRef(null);
  const containerRef = useRef(null);
  const smaSeriesRef = useRef(null);
  const emaSeriesRef = useRef(null);

  const [chartType, setChartType] = useState("line");
  const [showSMA, setShowSMA] = useState(true);
  const [showEMA, setShowEMA] = useState(false);
  const [smaPeriod, setSmaPeriod] = useState(7);
  const [emaPeriod, setEmaPeriod] = useState(14);

  const normalizedData = useMemo(
    () => normalizePriceData(historicData),
    [historicData]
  );

  const { chartRef, seriesRef, isReady } = useLightweightChart({
    containerRef,
    chartType,
  });

  const { smaData, emaData } = useTechnicalIndicators({
    data: normalizedData,
    showSMA,
    smaPeriod,
    showEMA,
    emaPeriod,
  });

  useEffect(() => {
    if (!isReady || !seriesRef.current) {
      return;
    }

    seriesRef.current.setData(normalizedData);

    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [isReady, normalizedData, seriesRef, chartRef]);

  useEffect(() => {
    if (!isReady || !chartRef.current) {
      return;
    }

    const chart = chartRef.current;

    if (!showSMA) {
      if (smaSeriesRef.current) {
        chart.removeSeries(smaSeriesRef.current);
        smaSeriesRef.current = null;
      }
      return;
    }

    if (!smaSeriesRef.current) {
      smaSeriesRef.current = chart.addSeries(LineSeries, {
        color: "#42a5f5",
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: false,
      });
    }

    smaSeriesRef.current.setData(smaData);
  }, [chartRef, isReady, showSMA, smaData]);

  useEffect(() => {
    if (!isReady || !chartRef.current) {
      return;
    }

    const chart = chartRef.current;

    if (!showEMA) {
      if (emaSeriesRef.current) {
        chart.removeSeries(emaSeriesRef.current);
        emaSeriesRef.current = null;
      }
      return;
    }

    if (!emaSeriesRef.current) {
      emaSeriesRef.current = chart.addSeries(LineSeries, {
        color: "#ab47bc",
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: false,
      });
    }

    emaSeriesRef.current.setData(emaData);
  }, [chartRef, isReady, showEMA, emaData]);

  const {
    tooltip,
    isFullscreen,
    fitContent,
    resetTimeScale,
    toggleFullscreen,
  } = useChartInteractions({
    chartRef,
    seriesRef,
    containerRef,
    fullscreenRef,
    currency,
    days,
  });

  const { exportAsPng } = useChartExport({
    chartRef,
    fileName: `coin-chart-${days}d-${currency}`,
  });

  return (
    <div
      ref={fullscreenRef}
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <ChartToolbar
        chartType={chartType}
        onChartTypeChange={setChartType}
        showSMA={showSMA}
        onToggleSMA={() => setShowSMA((prev) => !prev)}
        smaPeriod={smaPeriod}
        onSmaPeriodChange={setSmaPeriod}
        showEMA={showEMA}
        onToggleEMA={() => setShowEMA((prev) => !prev)}
        emaPeriod={emaPeriod}
        onEmaPeriodChange={setEmaPeriod}
        onFitContent={fitContent}
        onResetTimeScale={resetTimeScale}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        onExport={exportAsPng}
      />

      <div style={{ position: "relative" }}>
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: isFullscreen ? "calc(100vh - 180px)" : 500,
          }}
        />
        <ChartTooltip tooltip={tooltip} />
      </div>
    </div>
  );
}