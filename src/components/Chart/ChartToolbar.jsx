import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@material-ui/core";

export default function ChartToolbar({
  chartType,
  onChartTypeChange,
  showSMA,
  onToggleSMA,
  smaPeriod,
  onSmaPeriodChange,
  showEMA,
  onToggleEMA,
  emaPeriod,
  onEmaPeriodChange,
  onFitContent,
  onResetTimeScale,
  onToggleFullscreen,
  isFullscreen,
  onExport,
}) {
  return (
    <Box display="flex" flexWrap="wrap" gridGap={12} mb={2} alignItems="center">
      <FormControl variant="outlined" size="small">
        <Select
          value={chartType}
          onChange={(event) => onChartTypeChange(event.target.value)}
        >
          <MenuItem value="line">Line</MenuItem>
          <MenuItem value="area">Area</MenuItem>
          <MenuItem value="baseline">Baseline</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={<Switch checked={showSMA} onChange={onToggleSMA} color="primary" />}
        label="SMA"
      />

      <TextField
        type="number"
        label="SMA"
        variant="outlined"
        size="small"
        value={smaPeriod}
        onChange={(event) => onSmaPeriodChange(Number(event.target.value))}
        inputProps={{ min: 2, max: 200 }}
        style={{ width: 90 }}
      />

      <FormControlLabel
        control={<Switch checked={showEMA} onChange={onToggleEMA} color="primary" />}
        label="EMA"
      />

      <TextField
        type="number"
        label="EMA"
        variant="outlined"
        size="small"
        value={emaPeriod}
        onChange={(event) => onEmaPeriodChange(Number(event.target.value))}
        inputProps={{ min: 2, max: 200 }}
        style={{ width: 90 }}
      />

      <Button variant="outlined" onClick={onFitContent}>
        Fit content
      </Button>

      <Button variant="outlined" onClick={onResetTimeScale}>
        Reset view
      </Button>

      <Button variant="outlined" onClick={onToggleFullscreen}>
        {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
      </Button>

      <Button variant="contained" color="primary" onClick={onExport}>
        Export PNG
      </Button>
    </Box>
  );
}