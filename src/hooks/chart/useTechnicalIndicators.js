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