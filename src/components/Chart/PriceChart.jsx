import React, { useEffect, useMemo, useRef, useState } from "react";
import { LineSeries } from "lightweight-charts";
import ChartToolbar from "./ChartToolbar";
import ChartTooltip from "./ChartTooltip";
import useChartExport from "../../hooks/chart/useChartExport";
import useChartInteractions from "../../hooks/chart/useChartInteractions";
import useLightweightChart from "../../hooks/chart/useLightweightChart";
import useMainSeries from "../../hooks/chart/useMainSeries";
import useTechnicalIndicators from "../../hooks/chart/useTechnicalIndicators";
import { normalizePriceData } from "../../utils/chart/priceChartAdapter";

function safeRemoveSeries(chart, seriesRef) {
  if (!chart || !seriesRef.current) {
    return;
  }

  try {
    chart.removeSeries(seriesRef.current);
  } catch (error) {
    // ignore: déjà supprimée ou chart en destruction
  } finally {
    seriesRef.current = null;
  }
}

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

  const { chartRef, isReady } = useLightweightChart({
    containerRef,
  });

  const { mainSeries } = useMainSeries({
    chartRef,
    isReady,
    chartType,
    data: normalizedData,
  });

  const { smaData, emaData } = useTechnicalIndicators({
    data: normalizedData,
    showSMA,
    smaPeriod,
    showEMA,
    emaPeriod,
  });

  useEffect(() => {
    if (!isReady || !chartRef.current) {
      return;
    }

    const chart = chartRef.current;

    if (!showSMA) {
      safeRemoveSeries(chart, smaSeriesRef);
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

    return () => {
      // pas de remove ici : on laisse l’effet suivant ou le démontage gérer
    };
  }, [chartRef, isReady, showSMA, smaData]);

  useEffect(() => {
    if (!isReady || !chartRef.current) {
      return;
    }

    const chart = chartRef.current;

    if (!showEMA) {
      safeRemoveSeries(chart, emaSeriesRef);
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

    return () => {
      // pas de remove ici non plus
    };
  }, [chartRef, isReady, showEMA, emaData]);

  useEffect(() => {
    const chart = chartRef.current;
  
    return () => {
      if (!chart) {
        return;
      }
  
      safeRemoveSeries(chart, smaSeriesRef);
      safeRemoveSeries(chart, emaSeriesRef);
    };
  }, [chartRef]);

  const {
    tooltip,
    isFullscreen,
    fitContent,
    resetTimeScale,
    toggleFullscreen,
  } = useChartInteractions({
    chartRef,
    mainSeries,
    smaSeries: smaSeriesRef.current,
    emaSeries: emaSeriesRef.current,
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
            minHeight: 300,
          }}
        />
        <ChartTooltip tooltip={tooltip} />
      </div>
    </div>
  );
}