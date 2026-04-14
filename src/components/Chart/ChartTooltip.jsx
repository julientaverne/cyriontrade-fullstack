import React from "react";

export default function ChartTooltip({ tooltip }) {
  if (!tooltip.visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: tooltip.left,
        top: tooltip.top,
        minWidth: 180,
        padding: 12,
        borderRadius: 10,
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        fontSize: 12,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{tooltip.date}</div>
      <div>Price: {tooltip.price}</div>
      {tooltip.sma && <div>SMA: {tooltip.sma}</div>}
      {tooltip.ema && <div>EMA: {tooltip.ema}</div>}
    </div>
  );
}