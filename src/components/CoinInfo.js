/**
 * CoinInfo
 *
 * This component was refactored from the original implementation to improve
 * separation of concerns.
 *
 * Original behavior:
 * - fetched historical data
 * - rendered the chart directly with Chart.js / react-chartjs-2
 * - rendered the time-range buttons locally below the chart
 *
 * Updated behavior:
 * - still owns historical data fetching
 * - still owns the selected time-range state (`days`)
 * - delegates all chart rendering and chart-specific interactions to `PriceChart`
 *
 * Key improvements introduced by this refactor:
 * - charting concerns are now isolated in a dedicated component
 * - the time-range controls are no longer rendered separately below the chart;
 *   they are passed into the chart toolbar for a more cohesive UX
 * - `coin.id` was added to the effect dependencies to ensure chart data is
 *   refreshed correctly when the displayed asset changes
 *
 * Architectural intent:
 * - keep `CoinInfo` focused on data loading and high-level state ownership
 * - move visualization logic, chart lifecycle, interactions, and chart controls
 *   into a specialized chart component
 *
 * This makes the code easier to maintain, test, and extend while keeping the
 * API/data flow explicit.
 */

import { useEffect, useState } from "react";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import { cryptoAPI } from "../services/api";
import PriceChart from "./Chart/PriceChart";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency, setAlert } = CryptoState();
  const classes = useStyles();

  const fetchHistoricData = async () => {
    try {
      const { data } = await cryptoAPI.getHistoricalChart(
        coin.id,
        days,
        currency
      );
      setHistoricData(data.prices);
    } catch (error) {
      setAlert({
        open: true,
        message:
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch chart data. Please ensure the server is running.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, currency, coin.id]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <PriceChart
              historicData={historicData}
              currency={currency}
              days={days}
              onDaysChange={setDays}
              ranges={chartDays}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
