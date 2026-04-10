import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { cryptoAPI } from "../services/api";

const CoinPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [coin, setCoin] = useState();

  const { currency, symbol, setAlert } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await cryptoAPI.getSingleCoin(id);
      setCoin(data);
    } catch (error) {
      setAlert({
        open: true,
        message: error.response?.data?.error || error.message || "Failed to fetch coin details. Please ensure the server is running.",
        type: "error",
      });
    }
  };



  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      minHeight: "100vh",
      paddingTop: "100px",
      background: "transparent",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "35%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        maxWidth: "600px",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 30px",
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(238, 188, 29, 0.01) 100%)",
      borderRadius: "24px",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      margin: "20px",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        width: "1px",
        height: "100%",
        background: "linear-gradient(180deg, transparent 0%, rgba(238, 188, 29, 0.2) 50%, transparent 100%)",
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      },
    },
    heading: {
      fontWeight: "700",
      marginBottom: 25,
      fontFamily: "'Orbitron', sans-serif",
      color: "#fff",
      fontSize: "2rem",
      textAlign: "center",
      letterSpacing: "0.5px",
    },
    description: {
      width: "100%",
      fontFamily: "'Inter', sans-serif",
      padding: "25px 0",
      textAlign: "justify",
      color: "#d1d5db",
      fontSize: "1.1rem",
      lineHeight: "1.7",
    },
    marketData: {
      alignSelf: "start",
      padding: "25px 0",
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <Button
          variant="contained"
          style={{
            alignSelf: "flex-start",
            margin: "0 0 20px 25px",
            backgroundColor: "#EEBC1D",
            color: "black",
            fontWeight: "700",
            borderRadius: "50%",
            minWidth: "45px",
            width: "45px",
            height: "45px",
            padding: "0",
            fontSize: "20px",
            boxShadow: "0 2px 8px rgba(238, 188, 29, 0.3)",
          }}
          onClick={() => history.push("/")}
        >
          ←
        </Button>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
            padding: "15px 20px",
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}>
            <Typography variant="h5" style={{
              fontWeight: "700",
              fontFamily: "'Orbitron', sans-serif",
              color: "#fff",
              fontSize: "1.3rem",
            }}>
              Rank:
            </Typography>
            <Typography variant="h5" style={{
              fontFamily: "Montserrat",
              color: "#EEBC1D",
              fontSize: "1.3rem",
              fontWeight: "600",
            }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </div>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
            padding: "15px 20px",
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}>
            <Typography variant="h5" style={{
              fontWeight: "700",
              fontFamily: "'Orbitron', sans-serif",
              color: "#fff",
              fontSize: "1.3rem",
            }}>
              Current Price:
            </Typography>
            <Typography variant="h5" style={{
              fontFamily: "Montserrat",
              color: "#EEBC1D",
              fontSize: "1.3rem",
              fontWeight: "600",
            }}>
              {symbol} {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </div>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
            padding: "15px 20px",
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}>
            <Typography variant="h5" style={{
              fontWeight: "700",
              fontFamily: "'Orbitron', sans-serif",
              color: "#fff",
              fontSize: "1.3rem",
            }}>
              Market Cap:
            </Typography>
            <Typography variant="h5" style={{
              fontFamily: "Montserrat",
              color: "#EEBC1D",
              fontSize: "1.3rem",
              fontWeight: "600",
            }}>
              {symbol} {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}M
            </Typography>
          </div>

        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
