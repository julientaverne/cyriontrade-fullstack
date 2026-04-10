import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Grid, Card, CardContent, Typography } from "@material-ui/core";
import { TrendingUp, Security, FlashOn, Assessment } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";
import WelcomeModal from "../components/Modals/WelcomeModal";

const useStyles = makeStyles(() => ({
  container: {
    background: "transparent",
  },
  featuresSection: {
    padding: "120px 0",
    background: "transparent",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "800px",
      height: "800px",
      background: "radial-gradient(circle, rgba(238, 188, 29, 0.03) 0%, transparent 70%)",
      borderRadius: "50%",
      zIndex: -1,
    },
  },
  sectionTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textAlign: "center",
    marginBottom: "30px",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "1px",
    textShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
    "@media (max-width: 768px)": {
      fontSize: "2.5rem",
    },
  },
  sectionSubtitle: {
    fontSize: "1.3rem",
    color: "#d1d5db",
    textAlign: "center",
    marginBottom: "80px",
    fontFamily: "'Inter', sans-serif",
    maxWidth: "700px",
    margin: "0 auto 80px",
    lineHeight: "1.6",
    fontWeight: "400",
  },
  featureCard: {
    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 22, 26, 0.9) 100%)",
    border: "none",
    borderRadius: "24px",
    padding: "50px 35px",
    textAlign: "center",
    height: "100%",
    transition: "all 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
    backdropFilter: "blur(20px)",
    position: "relative",
    overflow: "hidden",
    transformStyle: "preserve-3d",
    perspective: "1000px",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(238, 188, 29, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)",
      opacity: 0,
      transition: "opacity 0.6s ease",
      borderRadius: "24px",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "-2px",
      bottom: "-2px",
      background: "linear-gradient(45deg, #EEBC1D, #FFD700, #B8860B, #EEBC1D)",
      borderRadius: "26px",
      zIndex: -1,
      opacity: 0,
      transition: "opacity 0.6s ease",
    },
    "&:hover": {
      transform: "translateY(-20px) rotateX(15deg) rotateY(5deg) scale(1.05)",
      boxShadow: `
        0 40px 80px rgba(0, 0, 0, 0.6),
        0 20px 40px rgba(238, 188, 29, 0.3),
        inset 0 0 0 1px rgba(255, 255, 255, 0.1)
      `,
      "&::before": {
        opacity: 1,
      },
      "&::after": {
        opacity: 0.3,
      },
    },
  },
  featureCardWithBg: {
    background: `
      linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(20, 22, 26, 0.95) 100%),
      url('/6187658.jpg')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    border: "none",
    borderRadius: "24px",
    padding: "50px 35px",
    textAlign: "center",
    height: "100%",
    transition: "all 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
    backdropFilter: "blur(20px)",
    position: "relative",
    overflow: "hidden",
    transformStyle: "preserve-3d",
    perspective: "1000px",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(238, 188, 29, 0.25) 0%, rgba(184, 134, 11, 0.15) 100%)",
      opacity: 0,
      transition: "opacity 0.6s ease",
      borderRadius: "24px",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "-2px",
      bottom: "-2px",
      background: "linear-gradient(45deg, #EEBC1D, #FFD700, #B8860B, #EEBC1D)",
      borderRadius: "26px",
      zIndex: -1,
      opacity: 0,
      transition: "opacity 0.6s ease",
    },
    "&:hover": {
      transform: "translateY(-22px) rotateX(18deg) rotateY(-5deg) scale(1.06)",
      boxShadow: `
        0 45px 90px rgba(0, 0, 0, 0.7),
        0 22px 45px rgba(238, 188, 29, 0.4),
        inset 0 0 0 1px rgba(238, 188, 29, 0.2),
        0 0 40px rgba(238, 188, 29, 0.3)
      `,
      backgroundSize: "110%",
      "&::before": {
        opacity: 1,
      },
      "&::after": {
        opacity: 0.5,
      },
    },
  },
  featureIcon: {
    fontSize: "3rem",
    color: "#EEBC1D",
    marginBottom: "20px",
  },
  // Bank-Level Security Card
  featureCardSecurity: {
    background: `
      linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(20, 22, 26, 0.95) 100%),
      url('/dashboard/ONZFBD0.jpg')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    border: "none",
    borderRadius: "24px",
    padding: "50px 35px",
    textAlign: "center",
    height: "100%",
    transition: "all 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
    backdropFilter: "blur(20px)",
    position: "relative",
    overflow: "hidden",
    transformStyle: "preserve-3d",
    perspective: "1000px",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(238, 188, 29, 0.2) 0%, rgba(184, 134, 11, 0.1) 100%)",
      opacity: 0,
      transition: "opacity 0.6s ease",
      borderRadius: "24px",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "-2px",
      bottom: "-2px",
      background: "linear-gradient(45deg, #DAA520, #EEBC1D, #B8860B, #DAA520)",
      borderRadius: "26px",
      zIndex: -1,
      opacity: 0,
      transition: "opacity 0.6s ease",
    },
    "&:hover": {
      transform: "translateY(-22px) rotateX(18deg) rotateY(8deg) scale(1.06)",
      boxShadow: `
        0 45px 90px rgba(0, 0, 0, 0.7),
        0 22px 45px rgba(218, 165, 32, 0.3),
        inset 0 0 0 1px rgba(238, 188, 29, 0.2),
        0 0 40px rgba(218, 165, 32, 0.25)
      `,
      backgroundSize: "110%",
      "&::before": {
        opacity: 1,
      },
      "&::after": {
        opacity: 0.4,
      },
    },
  },
  // Lightning Fast Card
  featureCardSpeed: {
    background: `
      linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(20, 22, 26, 0.95) 100%),
      url('/dashboard/3683628.jpg')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    border: "none",
    borderRadius: "24px",
    padding: "50px 35px",
    textAlign: "center",
    height: "100%",
    transition: "all 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
    backdropFilter: "blur(20px)",
    position: "relative",
    overflow: "hidden",
    transformStyle: "preserve-3d",
    perspective: "1000px",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(238, 188, 29, 0.18) 0%, rgba(184, 134, 11, 0.08) 100%)",
      opacity: 0,
      transition: "opacity 0.6s ease",
      borderRadius: "24px",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "-2px",
      bottom: "-2px",
      background: "linear-gradient(45deg, #CD853F, #EEBC1D, #DAA520, #CD853F)",
      borderRadius: "26px",
      zIndex: -1,
      opacity: 0,
      transition: "opacity 0.6s ease",
    },
    "&:hover": {
      transform: "translateY(-22px) rotateX(18deg) rotateY(-8deg) scale(1.06)",
      boxShadow: `
        0 45px 90px rgba(0, 0, 0, 0.7),
        0 22px 45px rgba(205, 133, 63, 0.3),
        inset 0 0 0 1px rgba(238, 188, 29, 0.2),
        0 0 40px rgba(205, 133, 63, 0.25)
      `,
      backgroundSize: "110%",
      "&::before": {
        opacity: 1,
      },
      "&::after": {
        opacity: 0.4,
      },
    },
  },
  // Smart Analytics Card
  featureCardAnalytics: {
    background: `
      linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(20, 22, 26, 0.95) 100%),
      url('/dashboard/ai-powered-device-concept.jpg')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    border: "none",
    borderRadius: "24px",
    padding: "50px 35px",
    textAlign: "center",
    height: "100%",
    transition: "all 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
    backdropFilter: "blur(20px)",
    position: "relative",
    overflow: "hidden",
    transformStyle: "preserve-3d",
    perspective: "1000px",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(238, 188, 29, 0.15) 0%, rgba(184, 134, 11, 0.05) 100%)",
      opacity: 0,
      transition: "opacity 0.6s ease",
      borderRadius: "24px",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "-2px",
      bottom: "-2px",
      background: "linear-gradient(45deg, #B8860B, #EEBC1D, #FFD700, #B8860B)",
      borderRadius: "26px",
      zIndex: -1,
      opacity: 0,
      transition: "opacity 0.6s ease",
    },
    "&:hover": {
      transform: "translateY(-22px) rotateX(18deg) rotateY(6deg) scale(1.06)",
      boxShadow: `
        0 45px 90px rgba(0, 0, 0, 0.7),
        0 22px 45px rgba(184, 134, 11, 0.3),
        inset 0 0 0 1px rgba(238, 188, 29, 0.2),
        0 0 40px rgba(184, 134, 11, 0.22)
      `,
      backgroundSize: "110%",
      "&::before": {
        opacity: 1,
      },
      "&::after": {
        opacity: 0.4,
      },
    },
  },
  featureTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "15px",
    fontFamily: "'Inter', sans-serif",
  },
  featureDescription: {
    fontSize: "1rem",
    color: "#bbb",
    lineHeight: "1.6",
    fontFamily: "'Inter', sans-serif",
  },
  ctaSection: {
    padding: "100px 0",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 50%, #EEBC1D 100%)",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.1) 0%, transparent 50%)
      `,
    },
  },
  ctaTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#000",
    marginBottom: "20px",
    fontFamily: "'Orbitron', sans-serif",
  },
  ctaSubtitle: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "40px",
    fontFamily: "'Inter', sans-serif",
  },
  ctaButton: {
    padding: "15px 40px",
    fontSize: "1.1rem",
    fontWeight: "600",
    background: "#000",
    color: "#EEBC1D",
    borderRadius: "50px",
    textTransform: "none",
    fontFamily: "'Inter', sans-serif",
    "&:hover": {
      background: "#333",
      transform: "translateY(-2px)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    },
  },
  // Trading Stats Section
  statsSection: {
    padding: "100px 0",
    background: "transparent",
    position: "relative",
    overflow: "hidden",
  },
  statsContainer: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
    marginBottom: "80px",
  },
  statsFlow: {
    display: "flex",
    position: "absolute",
    animation: "flowRight 20s linear infinite",
    gap: "30px",
    width: "200%",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "30px",
    marginBottom: "80px",
  },
  statCard: {
    background: "linear-gradient(135deg, rgba(238, 188, 29, 0.08) 0%, rgba(255, 215, 0, 0.03) 100%)",
    border: "1px solid rgba(238, 188, 29, 0.15)",
    borderRadius: "20px",
    padding: "30px 25px",
    textAlign: "center",
    transition: "all 0.4s ease",
    backdropFilter: "blur(20px)",
    animation: "floatAnimation 6s ease-in-out infinite",
    "&:nth-child(even)": {
      animationDelay: "3s",
    },
    "&:hover": {
      transform: "translateY(-10px) scale(1.02)",
      boxShadow: "0 20px 40px rgba(238, 188, 29, 0.2)",
      border: "1px solid rgba(238, 188, 29, 0.3)",
    },
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#888",
    marginBottom: "10px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "500",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#EEBC1D",
    marginBottom: "5px",
    fontFamily: "'Orbitron', sans-serif",
  },
  statChange: {
    fontSize: "0.85rem",
    color: "#4CAF50",
    fontWeight: "600",
    fontFamily: "'Inter', sans-serif",
  },
  // Performance Section
  performanceSection: {
    padding: "100px 0",
    margin: "0 20px",
  },
  performanceGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    "@media (max-width: 968px)": {
      gridTemplateColumns: "1fr",
      gap: "50px",
    },
  },
  performanceCard: {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(238, 188, 29, 0.03) 100%)",
    borderRadius: "24px",
    padding: "50px 40px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 25px 50px rgba(238, 188, 29, 0.15)",
      border: "1px solid rgba(238, 188, 29, 0.2)",
    },
  },
  performanceTitle: {
    fontSize: "2.2rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "40px",
    fontFamily: "'Orbitron', sans-serif",
    textAlign: "center",
  },
  performanceList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  performanceItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 25px",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(238, 188, 29, 0.05) 100%)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.4s ease",
    animation: "slideInAnimation 0.6s ease-out",
    backdropFilter: "blur(10px)",
    "&:hover": {
      background: "linear-gradient(135deg, rgba(238, 188, 29, 0.15) 0%, rgba(255, 215, 0, 0.08) 100%)",
      borderColor: "rgba(238, 188, 29, 0.3)",
      transform: "translateX(8px) scale(1.02)",
      boxShadow: "0 8px 25px rgba(238, 188, 29, 0.2)",
    },
  },
  performanceItemLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  performanceItemRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "5px",
  },
  performanceItemName: {
    fontSize: "1.2rem",
    color: "#fff",
    fontWeight: "700",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "0.5px",
  },
  performanceItemSubtext: {
    fontSize: "0.9rem",
    color: "#999",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
  },
  performanceItemValue: {
    fontSize: "1.4rem",
    color: "#EEBC1D",
    fontWeight: "800",
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "0 2px 10px rgba(238, 188, 29, 0.3)",
  },
  performanceItemChange: {
    fontSize: "1rem",
    color: "#4CAF50",
    fontWeight: "700",
    fontFamily: "'Inter', sans-serif",
  },
  // Continuous Animations
  "@keyframes floatAnimation": {
    "0%, 100%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: "translateY(-10px)",
    },
  },
  "@keyframes slideInAnimation": {
    "0%": {
      opacity: 0,
      transform: "translateX(-30px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  "@keyframes pulseGlow": {
    "0%, 100%": {
      boxShadow: "0 0 20px rgba(238, 188, 29, 0.2)",
    },
    "50%": {
      boxShadow: "0 0 30px rgba(238, 188, 29, 0.4)",
    },
  },
  "@keyframes flowRight": {
    "0%": {
      transform: "translateX(-100%)",
    },
    "100%": {
      transform: "translateX(0%)",
    },
  },
  "@keyframes flowLeft": {
    "0%": {
      transform: "translateX(0%)",
    },
    "100%": {
      transform: "translateX(-100%)",
    },
  },
  // Flowing Cards
  flowingSection: {
    padding: "80px 0",
    background: "transparent",
    position: "relative",
    overflow: "hidden",
  },
  flowingContainer: {
    position: "relative",
    height: "180px",
    overflow: "hidden",
    marginBottom: "60px",
  },
  flowingTrack: {
    display: "flex",
    position: "absolute",
    animation: "flowLeft 25s linear infinite",
    gap: "25px",
    whiteSpace: "nowrap",
  },
  flowingTrackReverse: {
    display: "flex",
    position: "absolute",
    animation: "flowRight 30s linear infinite",
    gap: "25px",
    whiteSpace: "nowrap",
  },
  flowingTrackSlow: {
    display: "flex",
    position: "absolute",
    animation: "flowLeft 35s linear infinite",
    gap: "25px",
    whiteSpace: "nowrap",
  },
  flowingCard: {
    minWidth: "280px",
    background: "linear-gradient(135deg, rgba(238, 188, 29, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
    border: "1px solid rgba(238, 188, 29, 0.2)",
    borderRadius: "20px",
    padding: "25px",
    backdropFilter: "blur(20px)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px) scale(1.02)",
      boxShadow: "0 15px 30px rgba(238, 188, 29, 0.2)",
    },
  },
  flowingCardTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#EEBC1D",
    fontFamily: "'Orbitron', sans-serif",
  },
  flowingCardValue: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#fff",
    fontFamily: "'Orbitron', sans-serif",
  },
  flowingCardChange: {
    fontSize: "0.9rem",
    color: "#4CAF50",
    fontWeight: "600",
    fontFamily: "'Inter', sans-serif",
  },
}));

const Homepage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user, setAlert } = CryptoState();

  const handleGetStarted = () => {
    if (user) {
      // User is logged in, redirect to marketplace
      history.push("/marketplace");
    } else {
      // User is not logged in, show alert and redirect to login
      setAlert({
        open: true,
        message: "Please log in to get started with trading",
        type: "info",
      });
      // You can redirect to a login page here if you have one
      // For now, the AuthModal in header will handle login
    }
  };

  const features = [
    {
      icon: <TrendingUp className={classes.featureIcon} />,
      title: "Advanced Trading",
      description: "Professional-grade trading tools with real-time market data and advanced charting capabilities."
    },
    {
      icon: <Security className={classes.featureIcon} />,
      title: "Bank-Level Security",
      description: "Your funds and data are protected with industry-leading security measures and encryption."
    },
    {
      icon: <FlashOn className={classes.featureIcon} />,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our high-performance trading engine and infrastructure."
    },
    {
      icon: <Assessment className={classes.featureIcon} />,
      title: "Smart Analytics",
      description: "AI-powered insights and analytics to help you make informed trading decisions."
    }
  ];

  const topPerformers = [
    { name: "BTC/USDT", price: "$43,250", change: "+5.2%", volume: "$1.2B" },
    { name: "ETH/USDT", price: "$2,680", change: "+3.8%", volume: "$890M" },
    { name: "BNB/USDT", price: "$315", change: "+7.1%", volume: "$245M" },
    { name: "ADA/USDT", price: "$0.52", change: "+4.5%", volume: "$180M" },
    { name: "SOL/USDT", price: "$98", change: "+6.3%", volume: "$165M" },
    { name: "DOT/USDT", price: "$7.2", change: "+2.9%", volume: "$120M" }
  ];

  const botPerformance = [
    { name: "AI Scalper Pro", roi: "+24.5%", trades: "1,250", winRate: "87%" },
    { name: "DCA Master", roi: "+18.2%", trades: "890", winRate: "92%" },
    { name: "Trend Follower", roi: "+31.7%", trades: "2,100", winRate: "78%" },
    { name: "Grid Trader", roi: "+15.8%", trades: "3,400", winRate: "85%" }
  ];

  return (
    <div className={classes.container}>
      {/* Welcome Modal */}
      <WelcomeModal />
      
      <Banner />
      
      <CoinsTable />

      {/* Features Section */}
      <section className={classes.featuresSection}>
        <Container maxWidth="lg">
          <Typography className={classes.sectionTitle}>
            Why Choose CyrionTrade?
          </Typography>
          <Typography className={classes.sectionSubtitle}>
            Experience the future of cryptocurrency trading with our cutting-edge platform designed for both beginners and professionals.
          </Typography>
          
          <Grid 
            container 
            spacing={4}
            style={{
              perspective: "1200px",
              perspectiveOrigin: "center center"
            }}
          >
            {features.map((feature, index) => {
              // Determine which card style to use based on title
              let cardClass = classes.featureCard;
              if (feature.title === "Advanced Trading") {
                cardClass = classes.featureCardWithBg;
              } else if (feature.title === "Bank-Level Security") {
                cardClass = classes.featureCardSecurity;
              } else if (feature.title === "Lightning Fast") {
                cardClass = classes.featureCardSpeed;
              } else if (feature.title === "Smart Analytics") {
                cardClass = classes.featureCardAnalytics;
              }

              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card 
                    className={cardClass}
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <CardContent style={{ position: 'relative', zIndex: 2 }}>
                      {feature.icon}
                      <Typography className={classes.featureTitle}>
                        {feature.title}
                      </Typography>
                      <Typography className={classes.featureDescription}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </section>

      {/* Performance Section */}
      <Container maxWidth="xl">
        <section className={classes.performanceSection}>
          <div className={classes.performanceGrid}>
            {/* Top Performers */}
            <div className={classes.performanceCard}>
              <Typography className={classes.performanceTitle}>
                Top Performers (24h)
              </Typography>
              <div className={classes.performanceList}>
                {topPerformers.map((coin, index) => (
                  <div key={index} className={classes.performanceItem} style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={classes.performanceItemLeft}>
                      <div className={classes.performanceItemName}>{coin.name}</div>
                      <div className={classes.performanceItemSubtext}>Vol: {coin.volume}</div>
                    </div>
                    <div className={classes.performanceItemRight}>
                      <div className={classes.performanceItemValue}>{coin.price}</div>
                      <div className={classes.performanceItemChange}>{coin.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bot Performance */}
            <div className={classes.performanceCard}>
              <Typography className={classes.performanceTitle}>
                Top Trading Bots
              </Typography>
              <div className={classes.performanceList}>
                {botPerformance.map((bot, index) => (
                  <div key={index} className={classes.performanceItem} style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
                    <div className={classes.performanceItemLeft}>
                      <div className={classes.performanceItemName}>{bot.name}</div>
                      <div className={classes.performanceItemSubtext}>{bot.trades} trades</div>
                    </div>
                    <div className={classes.performanceItemRight}>
                      <div className={classes.performanceItemValue}>{bot.roi}</div>
                      <div className={classes.performanceItemChange}>{bot.winRate} win rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Container>

      {/* CTA Section */}
      <section className={classes.ctaSection}>
        <Container maxWidth="md">
          <Typography className={classes.ctaTitle}>
            Ready to Start Trading?
          </Typography>
          <Typography className={classes.ctaSubtitle}>
            Join thousands of traders who trust CyrionTrade for their cryptocurrency investments.
          </Typography>
          <Button className={classes.ctaButton} onClick={handleGetStarted}>
            Get Started Today
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default Homepage;
