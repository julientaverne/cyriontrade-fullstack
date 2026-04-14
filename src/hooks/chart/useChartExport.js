import { useCallback } from "react";

export default function useChartExport({ chartRef, fileName }) {
  const exportAsPng = useCallback(() => {
    if (!chartRef.current) {
      return;
    }

    const canvas = chartRef.current.takeScreenshot(true, false);

    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.png`;
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [chartRef, fileName]);

  return {
    exportAsPng,
  };
}