import { useEffect, useState } from "react";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
//import SelectButton from "./SelectButton";
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
      const { data } = await cryptoAPI.getHistoricalChart(coin.id, days, currency);
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