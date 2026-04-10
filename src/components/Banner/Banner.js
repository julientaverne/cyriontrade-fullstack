import { Container, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    minHeight: "600px",
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(20, 22, 26, 0.8) 100%)",
      backdropFilter: "blur(3px)",
    },
  },
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 60,
    paddingBottom: 60,
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    width: "100%",
  },
  tagline: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: "60px",
  },
  carousel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: "1.4rem",
    color: "rgba(255, 255, 255, 0.9)",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
    letterSpacing: "0.5px",
    lineHeight: "1.6",
    marginBottom: "40px",
    maxWidth: "600px",
    margin: "0 auto 40px",
  },
  ctaButtons: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "30px",
  },
  primaryButton: {
    padding: "15px 35px",
    fontSize: "1.1rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    color: "#000",
    borderRadius: "50px",
    textTransform: "none",
    fontFamily: "'Inter', sans-serif",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 15px 35px rgba(238, 188, 29, 0.4)",
    },
  },
  secondaryButton: {
    padding: "15px 35px",
    fontSize: "1.1rem",
    fontWeight: "600",
    background: "transparent",
    color: "#fff",
    borderRadius: "50px",
    textTransform: "none",
    fontFamily: "'Inter', sans-serif",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.1)",
      borderColor: "#EEBC1D",
      color: "#EEBC1D",
    },
  },
}));

function Banner() {
  const classes = useStyles();
  const history = useHistory();
  const { user, setAlert } = CryptoState();

  const handleStartTrading = () => {
    if (user) {
      // User is logged in, redirect to marketplace
      history.push("/marketplace");
    } else {
      // User is not logged in, show alert and redirect to login
      setAlert({
        open: true,
        message: "Please log in to start trading",
        type: "info",
      });
      // You can redirect to a login page here if you have one
      // For now, the AuthModal in header will handle login
    }
  };

  const handleLearnMore = () => {
    history.push("/about");
  };

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent} maxWidth="lg">
        <div className={classes.tagline}>
          <Typography
            variant="h1"
            style={{
              fontWeight: "800",
              marginBottom: 25,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: "3px",
              fontSize: "4rem",
              color: "#EEBC1D",
              textShadow: "0 6px 25px rgba(238, 188, 29, 0.5)",
            }}
          >
            CyrionTrade
          </Typography>
          <Typography className={classes.subtitle}>
            The most advanced cryptocurrency trading platform designed for professionals. 
            Trade with confidence using our AI-powered tools and real-time market insights.
          </Typography>
          
          <div className={classes.ctaButtons}>
            <button className={classes.primaryButton} onClick={handleStartTrading}>
              Start Trading Now
            </button>
            <button className={classes.secondaryButton} onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
        <div className={classes.carousel}>
          <Carousel />
        </div>
      </Container>
    </div>
  );
}

export default Banner;
