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
  seriesRef,
  containerRef,
  fullscreenRef,
  currency,
  days,
  seriesVersion,
}) {
  const [tooltip, setTooltip] = useState(hiddenTooltip);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!chartRef.current || !seriesRef.current || !containerRef.current) {
      return undefined;
    }

    const chart = chartRef.current;
    const series = seriesRef.current;

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

      const data = param.seriesData.get(series);

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
  }, [chartRef, seriesRef, containerRef, currency, days, seriesVersion]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === fullscreenRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [fullscreenRef]);

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