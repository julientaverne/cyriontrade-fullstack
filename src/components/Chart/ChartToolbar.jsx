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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: theme.spacing(2),
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  leftGroup: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    marginLeft: "auto",
  },
  select: {
    minWidth: 140,
    color: "#EEBC1D",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(238, 188, 29, 0.6)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EEBC1D",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EEBC1D",
    },
    "& .MuiSelect-icon": {
      color: "#EEBC1D",
    },
  },
  input: {
    width: 90,
    "& .MuiInputLabel-root": {
      color: "rgba(238, 188, 29, 0.75)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#EEBC1D",
    },
    "& .MuiOutlinedInput-root": {
      color: "#EEBC1D",
      "& fieldset": {
        borderColor: "rgba(238, 188, 29, 0.6)",
      },
      "&:hover fieldset": {
        borderColor: "#EEBC1D",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#EEBC1D",
      },
    },
    "& input": {
      color: "#EEBC1D",
    },
  },
  switchLabel: {
    marginRight: 4,
    "& .MuiFormControlLabel-label": {
      color: "#EEBC1D",
      fontWeight: 500,
    },
  },
  switchRoot: {
    "& .MuiSwitch-switchBase": {
      color: "#EEBC1D",
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#EEBC1D",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#EEBC1D",
      opacity: 0.5,
    },
    "& .MuiSwitch-track": {
      backgroundColor: "rgba(238, 188, 29, 0.35)",
    },
  },
  outlinedButton: {
    borderColor: "#EEBC1D",
    color: "#EEBC1D",
    textTransform: "none",
    fontWeight: 600,
    "&:hover": {
      borderColor: "#EEBC1D",
      backgroundColor: "rgba(238, 188, 29, 0.08)",
    },
  },
  primaryButton: {
    backgroundColor: "#EEBC1D",
    color: "#111",
    textTransform: "none",
    fontWeight: 700,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#d9a90f",
      boxShadow: "none",
    },
  },
}));

export default function ChartToolbar({
  chartType,
  onChartTypeChange,
  days,
  onDaysChange,
  ranges,
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
  const classes = useStyles();

  return (
    <Box className={classes.toolbar}>
      <Box className={classes.row}>
        <Box className={classes.leftGroup}>
          {ranges.map((range) => (
            <Button
              key={range.value}
              variant={range.value === days ? "contained" : "outlined"}
              onClick={() => onDaysChange(range.value)}
              className={
                range.value === days
                  ? classes.primaryButton
                  : classes.outlinedButton
              }
            >
              {range.label}
            </Button>
          ))}
        </Box>

        <Box className={classes.rightGroup}>
          <Button
            variant="outlined"
            onClick={onFitContent}
            className={classes.outlinedButton}
          >
            Fit content
          </Button>

          <Button
            variant="outlined"
            onClick={onResetTimeScale}
            className={classes.outlinedButton}
          >
            Reset view
          </Button>

          <Button
            variant="outlined"
            onClick={onToggleFullscreen}
            className={classes.outlinedButton}
          >
            {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          </Button>

          <Button
            variant="contained"
            onClick={onExport}
            className={classes.primaryButton}
          >
            Export PNG
          </Button>
        </Box>
      </Box>

      <Box className={classes.row}>
        <Box className={classes.leftGroup}>
          <FormControl variant="outlined" size="small">
            <Select
              value={chartType}
              onChange={(event) => onChartTypeChange(event.target.value)}
              className={classes.select}
            >
              <MenuItem value="line">Line</MenuItem>
              <MenuItem value="area">Area</MenuItem>
              <MenuItem value="baseline">Baseline</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className={classes.rightGroup}>
          <FormControlLabel
            className={classes.switchLabel}
            control={
              <Switch
                checked={showSMA}
                onChange={onToggleSMA}
                className={classes.switchRoot}
              />
            }
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
            className={classes.input}
          />

          <FormControlLabel
            className={classes.switchLabel}
            control={
              <Switch
                checked={showEMA}
                onChange={onToggleEMA}
                className={classes.switchRoot}
              />
            }
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
            className={classes.input}
          />
        </Box>
      </Box>
    </Box>
  );
}