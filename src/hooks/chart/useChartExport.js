/**
 * useChartExport
 *
 * Encapsulates chart image export behavior behind a small React hook API.
 *
 * Responsibilities:
 * - request a chart screenshot from the Lightweight Charts instance
 * - convert the resulting canvas into a downloadable PNG blob
 * - trigger a browser-side file download
 * - release temporary object URL resources after export
 *
 * Why this lives in a hook:
 * - export logic is imperative and browser-specific
 * - the chart component should remain focused on orchestration and rendering
 * - isolating export behavior keeps the component tree cleaner and easier to test
 *
 * Architectural notes:
 * - the hook exposes a stable callback so consuming components can wire export
 *   actions directly into buttons or menus
 * - it depends on a chart ref because the chart instance is managed outside
 *   React's declarative rendering model
 *
 * @param {Object} params
 * @param {{ current: any }} params.chartRef Mutable ref containing the active chart instance.
 * @param {string} params.fileName Base file name used for the exported PNG.
 * @returns {{ exportAsPng: () => void }} Export API for the chart toolbar or parent component.
 */

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
