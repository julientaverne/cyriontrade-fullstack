import { makeStyles } from "@material-ui/core";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

const useStyles = makeStyles(() => ({
  carousel: {
    minHeight: "300px",
    display: "flex",
    alignItems: "center",
    padding: "20px 0",
    width: "100%",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    color: "white",
    padding: "20px",
    transition: "all 0.3s ease",
    borderRadius: "16px",
    backgroundColor: "transparent",
    textDecoration: "none",
    "&:hover": {
      transform: "scale(1.05)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
  },
}));

const Carousel = () => {
  const { coins, loading, symbol } = CryptoState();
  const classes = useStyles();

  // Create mock data if no coins available
  const mockCoins = [
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin", image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png", current_price: 43250, price_change_percentage_24h: 5.2 },
    { id: "ethereum", symbol: "ETH", name: "Ethereum", image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png", current_price: 2680, price_change_percentage_24h: 3.8 },
    { id: "binancecoin", symbol: "BNB", name: "BNB", image: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png", current_price: 315, price_change_percentage_24h: 7.1 },
    { id: "cardano", symbol: "ADA", name: "Cardano", image: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png", current_price: 0.52, price_change_percentage_24h: 4.5 },
    { id: "solana", symbol: "SOL", name: "Solana", image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png", current_price: 98, price_change_percentage_24h: 6.3 },
  ];

  // Use real coins if available, otherwise use mock data
  const displayCoins = coins.length > 0 ? coins.slice(0, 10) : mockCoins;

  const items = displayCoins.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link key={coin.id} className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ 
            marginBottom: 15,
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
          }}
        />
        <span style={{
          fontSize: "1.1rem",
          fontWeight: "700",
          letterSpacing: "1px",
          color: "#EEBC1D",
          marginBottom: "8px",
          fontFamily: "Montserrat",
        }}>
          {coin?.symbol?.toUpperCase()}
        </span>
        <span
          style={{
            color: profit ? "#0ecb81" : "#f6465d",
            fontWeight: 600,
            fontSize: "1rem",
            marginBottom: "8px",
            fontFamily: "Montserrat",
          }}
        >
          {coin?.price_change_percentage_24h !== null ? (
            <>
              {profit && "+"}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </>
          ) : "N/A"}
        </span>
        <span style={{ 
          fontSize: "1.2rem", 
          fontWeight: 700,
          color: "#fff",
          fontFamily: "Montserrat",
        }}>
          {symbol} {coin?.current_price ? numberWithCommas(coin.current_price.toFixed(2)) : "N/A"}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 3 },
    768: { items: 4 },
    1024: { items: 5 },
    1440: { items: 6 },
  };

  if (loading) {
    return (
      <div className={classes.carousel}>
        <div style={{ color: "#EEBC1D", fontSize: "1.2rem", textAlign: "center", width: "100%" }}>
          Loading trending coins...
        </div>
      </div>
    );
  }

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={2000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
