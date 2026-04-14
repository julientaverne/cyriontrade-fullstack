import { useCallback, useEffect, useState } from "react";
import { formatChartTime, formatPrice } from "../../utils/chart/formatters";

const hiddenTooltip = {
  visible: false,
  left: 0,
  top: 0,
  date: "",
  price: "",
};

export default function useChartInteractions({
  chartRef,
  mainSeries,
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

      const data = param.seriesData.get(mainSeries);

      if (!data) {
        setTooltip(hiddenTooltip);
        return;
      }

      const price = data.value !== undefined ? data.value : data.close;
      const width = containerRef.current.clientWidth;
      const left = Math.min(param.point.x + 12, Math.max(width - 200, 0));

      setTooltip({
        visible: true,
        left,
        top: Math.max(param.point.y + 12, 12),
        date: formatChartTime(param.time, days),
        price: formatPrice(price, currency),
      });
    };

    chart.subscribeCrosshairMove(handleCrosshairMove);

    return () => {
      chart.unsubscribeCrosshairMove(handleCrosshairMove);
    };
  }, [chartRef, mainSeries, containerRef, currency, days]);

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