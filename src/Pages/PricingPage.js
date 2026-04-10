import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Switch, Tooltip, Dialog, DialogContent, IconButton } from "@material-ui/core";
import { Check, InfoOutlined, Close } from "@material-ui/icons";
import { CryptoState } from "../CryptoContext";
import WalletModal from "../components/Authentication/WalletModal";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    paddingTop: "120px",
    paddingBottom: "120px",
    background: "transparent",
    position: "relative",
  },
  header: {
    textAlign: "center",
    marginBottom: "60px",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 50%, #EEBC1D 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "30px",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "1px",
    textShadow: "0 4px 20px rgba(238, 188, 29, 0.3)",
    "@media (max-width: 768px)": {
      fontSize: "2.8rem",
    },
  },
  subtitle: {
    fontSize: "1.3rem",
    color: "#d1d5db",
    marginBottom: "50px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
    maxWidth: "600px",
    margin: "0 auto 50px",
    lineHeight: "1.6",
  },
  toggleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  toggleLabel: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#fff",
  },
  toggleLabelActive: {
    color: "#EEBC1D",
  },
  trialBanner: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "15px 30px",
    borderRadius: "50px",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1rem",
    margin: "0 auto 60px",
    width: "fit-content",
    boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
  },
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  pricingCard: {
    background: "linear-gradient(135deg, rgba(30, 35, 41, 0.8) 0%, rgba(42, 46, 55, 0.6) 100%)",
    borderRadius: "24px",
    padding: "50px 35px",
    paddingTop: "65px", // Extra padding to accommodate the badge
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: "all 0.4s ease",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backdropFilter: "blur(20px)",
    overflow: "visible", // Changed from hidden to visible
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(238, 188, 29, 0.05) 0%, transparent 100%)",
      opacity: 0,
      transition: "opacity 0.4s ease",
    },
    "&:hover": {
      transform: "translateY(-12px)",
      border: "1px solid rgba(238, 188, 29, 0.3)",
      boxShadow: "0 25px 50px rgba(238, 188, 29, 0.15), 0 10px 30px rgba(0, 0, 0, 0.4)",
      "&::before": {
        opacity: 1,
      },
    },
  },
  popularBadge: {
    position: "absolute",
    top: "-12px",
    right: "30px",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    color: "#000",
    padding: "10px 24px",
    borderRadius: "25px",
    fontSize: "0.85rem",
    fontWeight: "700",
    boxShadow: "0 6px 20px rgba(238, 188, 29, 0.5)",
    letterSpacing: "0.5px",
    zIndex: 10,
    border: "2px solid rgba(255, 255, 255, 0.1)",
  },
  planName: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "10px",
    fontFamily: "'Orbitron', sans-serif",
  },
  priceContainer: {
    marginBottom: "10px",
  },
  price: {
    fontSize: "3rem",
    fontWeight: "900",
    color: "#EEBC1D",
    fontFamily: "'Orbitron', sans-serif",
  },
  priceUnit: {
    fontSize: "1rem",
    color: "#888",
    fontWeight: "400",
  },
  savings: {
    fontSize: "0.9rem",
    color: "#4CAF50",
    marginBottom: "20px",
    fontWeight: "600",
  },
  description: {
    fontSize: "0.95rem",
    color: "#888",
    marginBottom: "30px",
    minHeight: "40px",
  },
  featuresList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 30px 0",
    flex: 1,
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "15px",
    fontSize: "0.95rem",
    color: "#ccc",
    lineHeight: "1.5",
  },
  checkIcon: {
    color: "#4CAF50",
    fontSize: "20px",
    marginTop: "2px",
    flexShrink: 0,
  },
  ctaButton: {
    padding: "15px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "1rem",
    textTransform: "none",
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    color: "#000",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 20px rgba(238, 188, 29, 0.4)",
    },
  },
  ctaButtonOutline: {
    background: "transparent",
    border: "2px solid #EEBC1D",
    color: "#EEBC1D",
    "&:hover": {
      background: "rgba(238, 188, 29, 0.1)",
    },
  },
  disclaimer: {
    textAlign: "center",
    marginTop: "60px",
    fontSize: "0.9rem",
    color: "#666",
    maxWidth: "800px",
    margin: "60px auto 0",
  },
  comparisonSection: {
    marginTop: "100px",
    paddingTop: "60px",
    borderTop: "1px solid rgba(238, 188, 29, 0.1)",
  },
  comparisonTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
    marginBottom: "50px",
    fontFamily: "'Orbitron', sans-serif",
  },
  comparisonTable: {
    background: "transparent",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
    background: "transparent",
    padding: "25px 30px",
    fontWeight: "700",
    fontSize: "1.1rem",
    color: "#EEBC1D",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "1px",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
    padding: "20px 30px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(238, 188, 29, 0.05)",
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
  featureColumn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "500",
    fontFamily: "'Inter', sans-serif",
  },
  planColumn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
  },
  checkIconTable: {
    color: "#4CAF50",
    fontSize: "24px",
  },
  crossIcon: {
    color: "#666",
    fontSize: "20px",
    fontWeight: "300",
  },
  expandedRow: {
    gridColumn: "1 / -1",
    padding: "20px 30px",
    background: "rgba(238, 188, 29, 0.05)",
    borderLeft: "3px solid #EEBC1D",
    marginTop: "-1px",
  },
  expandedContent: {
    color: "#ccc",
    fontSize: "1rem",
    lineHeight: "1.6",
    fontFamily: "'Inter', sans-serif",
  },
  clickableRow: {
    cursor: "pointer",
  },
  testimonialsSection: {
    marginTop: "100px",
    paddingTop: "60px",
    borderTop: "1px solid rgba(238, 188, 29, 0.1)",
  },
  testimonialsTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
    marginBottom: "10px",
    fontFamily: "'Orbitron', sans-serif",
  },
  testimonialsSubtitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
    marginBottom: "50px",
    fontFamily: "'Orbitron', sans-serif",
  },
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  testimonialCard: {
    background: "transparent",
    borderRadius: "20px",
    padding: "30px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-5px)",
      border: "1px solid #EEBC1D",
      boxShadow: "0 10px 30px rgba(238, 188, 29, 0.15)",
    },
  },
  testimonialHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  testimonialName: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
  },
  testimonialStars: {
    color: "#FFD700",
    fontSize: "1.2rem",
    letterSpacing: "2px",
  },
  testimonialText: {
    fontSize: "0.95rem",
    color: "#ccc",
    lineHeight: "1.6",
    fontFamily: "'Inter', sans-serif",
    flex: 1,
  },
  testimonialFooter: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingTop: "15px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  readMoreButton: {
    color: "#EEBC1D",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "color 0.2s ease",
    fontFamily: "'Inter', sans-serif",
    "&:hover": {
      color: "#FFD700",
    },
  },
  reviewDialog: {
    "& .MuiDialog-paper": {
      background: "#14161a",
      borderRadius: "20px",
      border: "1px solid #EEBC1D",
      maxWidth: "600px",
      width: "100%",
    },
  },
  reviewDialogContent: {
    padding: "40px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: "15px",
    top: "15px",
    color: "#888",
    "&:hover": {
      color: "#EEBC1D",
    },
  },
  reviewModalHeader: {
    marginBottom: "20px",
  },
  reviewModalName: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "10px",
    fontFamily: "'Inter', sans-serif",
  },
  reviewModalStars: {
    color: "#FFD700",
    fontSize: "1.3rem",
    letterSpacing: "3px",
  },
  reviewModalText: {
    fontSize: "1.1rem",
    color: "#ccc",
    lineHeight: "1.8",
    fontFamily: "'Inter', sans-serif",
  },
  legalDisclaimer: {
    background: "transparent",
    padding: "30px 0",
    marginTop: "60px",
    textAlign: "left",
  },
  legalDisclaimerText: {
    color: "#888",
    fontSize: "0.9rem",
    lineHeight: "1.8",
    fontFamily: "'Inter', sans-serif",
    textAlign: "justify",
    fontWeight: "400",
    "& strong": {
      color: "#888",
      fontWeight: "400",
      fontFamily: "'Inter', sans-serif",
      letterSpacing: "normal",
    },
  },
  infoIcon: {
    color: "#888",
    fontSize: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#EEBC1D",
      transform: "scale(1.1)",
    },
  },
  tooltip: {
    backgroundColor: "#14161a",
    color: "#ccc",
    fontSize: "0.9rem",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(238, 188, 29, 0.3)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
    maxWidth: "300px",
    fontFamily: "'Inter', sans-serif",
    lineHeight: "1.5",
  },
}));

const PricingPage = () => {
  const classes = useStyles();
  const { user, setAlert } = CryptoState();
  const [isAnnual, setIsAnnual] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      // User is logged in, open wallet modal
      setWalletModalOpen(true);
    } else {
      // User is not logged in, show alert
      setAlert({
        open: true,
        message: "Please log in to get started",
        type: "info",
      });
    }
  };

  const plans = [
    {
      name: "Pioneer",
      price: isAnnual ? 0 : 0,
      originalPrice: null,
      description: "No payment required",
      popular: false,
      features: [
        "Unlimited Copy Bots, plus:",
        "20 open positions / exchange",
        "Portfolio Management",
        "Free manual trading on all exchanges",
      ],
      cta: "Get started",
      outline: true,
    },
    {
      name: "Explorer",
      price: isAnnual ? 24.16 : 29,
      originalPrice: isAnnual ? 58 : null,
      savings: isAnnual ? "You're saving $58 annually!" : null,
      description: "Everything from Pioneer +",
      popular: true,
      features: [
        "80 open positions / exchange",
        "10 min strategy interval checks",
        "Scan markets with the power of 15 bots",
        "2 event based triggers",
        "Backtesting",
        "Strategy Designer",
        "Paper (simulated) trading",
        "Trading signals (Signalers)",
      ],
      cta: "Get started",
      outline: false,
    },
    {
      name: "Adventurer",
      price: isAnnual ? 57.5 : 69,
      originalPrice: isAnnual ? 138 : null,
      savings: isAnnual ? "You're saving $138 annually!" : null,
      description: "Everything from Explorer +",
      popular: false,
      features: [
        "200 open positions / exchange",
        "5 min strategy interval checks",
        "Scan markets with the power of 50 bots",
        "5 event based triggers",
        "25 Portfolio Bots",
      ],
      cta: "Get started",
      outline: false,
    },
    {
      name: "Hero",
      price: isAnnual ? 107.5 : 129,
      originalPrice: isAnnual ? 258 : null,
      savings: isAnnual ? "You're saving $258 annually!" : null,
      description: "Everything from Adventurer +",
      popular: false,
      features: [
        "500 open positions / exchange",
        "2 minute strategy interval checks",
        "Scan markets with the power of 75 bots",
        "10 event based triggers",
        "A.I. strategies and A.I. designer",
        "All coins for trading signals",
        "Market Making & Arbitrage",
        "Extra Technical Indicators",
        "65 Portfolio Bots",
      ],
      cta: "Get started",
      outline: false,
    },
  ];

  return (
    <div className={classes.container}>
      <Container>
        <div className={classes.header}>
          <h1 className={classes.title}>Choose Your Plan</h1>
          <p className={classes.subtitle}>
            Start trading smarter with CyrionTrade
          </p>

          <div className={classes.toggleContainer}>
            <span
              className={`${classes.toggleLabel} ${
                !isAnnual ? classes.toggleLabelActive : ""
              }`}
            >
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
              style={{
                color: isAnnual ? "#EEBC1D" : "#888",
              }}
            />
            <span
              className={`${classes.toggleLabel} ${
                isAnnual ? classes.toggleLabelActive : ""
              }`}
            >
              Annually
            </span>
          </div>
        </div>

        <div className={classes.pricingGrid}>
          {plans.map((plan, index) => (
            <div key={index} className={classes.pricingCard}>
              {plan.popular && (
                <div className={classes.popularBadge}>MOST POPULAR</div>
              )}

              <div className={classes.planName}>{plan.name}</div>

              <div className={classes.priceContainer}>
                <span className={classes.price}>
                  ${plan.price}
                  <span className={classes.priceUnit}>/mo</span>
                </span>
              </div>

              {plan.savings && (
                <div className={classes.savings}>{plan.savings}</div>
              )}

              <div className={classes.description}>{plan.description}</div>

              <ul className={classes.featuresList}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={classes.featureItem}>
                    <Check className={classes.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="contained"
                fullWidth
                className={`${classes.ctaButton} ${
                  plan.outline ? classes.ctaButtonOutline : ""
                }`}
                onClick={handleGetStarted}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className={classes.disclaimer}>
          All prices on this website are exclusive VAT (if applicable). Free 3
          day trial for Explorer package starts directly with each sign up.
        </div>

        {/* Feature Comparison Table - MOVED HERE */}
        <div className={classes.comparisonSection}>
          <h2 className={classes.comparisonTitle}>Compare features</h2>
          
          <div className={classes.comparisonTable}>
            {/* Header Row */}
            <div className={classes.tableHeader}>
              <div className={classes.featureColumn}>Bot types</div>
              <div className={classes.planColumn}>Pioneer</div>
              <div className={classes.planColumn}>Explorer</div>
              <div className={classes.planColumn}>Adventurer</div>
              <div className={classes.planColumn}>Hero</div>
            </div>

            {/* Feature Rows */}
            {[
              { 
                name: "Manual Bot", 
                info: "Connect to all exchanges and trade manually for free. No automated trading features included",
                description: "Connect to all exchanges and trade manually for free. No automated trading features included. Perfect for traders who prefer full control over their trades.",
                pioneer: true, explorer: true, adventurer: true, hero: true 
              },
              { 
                name: "Copy Bot", 
                info: "Automatically copy trades from successful traders. Perfect for beginners who want to learn from experts",
                description: "Skip years of practice and copy another trader 1 on 1. Automatically replicate the trades of successful traders in real-time. Perfect for beginners who want to learn from experts while earning.",
                pioneer: true, explorer: true, adventurer: true, hero: true 
              },
              { 
                name: "Trading Bot", 
                info: "Automated trading bot with customizable strategies. Execute trades 24/7 based on your parameters",
                description: "Design trading strategies or follow trading signals and use automated selling features to increase your profits. Execute trades 24/7 based on your custom parameters and technical indicators.",
                pioneer: false, explorer: true, adventurer: true, hero: true 
              },
              { 
                name: "Market Making Bot", 
                info: "Provide liquidity to markets and earn from bid-ask spreads. Advanced strategy for experienced traders",
                description: "Profit on the spread of trading pairs. Provide liquidity to markets and earn from bid-ask spreads. Advanced strategy for experienced traders looking to maximize returns.",
                pioneer: false, explorer: false, adventurer: false, hero: true 
              },
              { 
                name: "Exchange Arbitrage Bot", 
                info: "Profit from price differences between exchanges. Automatically buy low on one exchange and sell high on another",
                description: "Profit from the price difference among exchanges. Automatically buy low on one exchange and sell high on another. Exploit market inefficiencies across multiple platforms.",
                pioneer: false, explorer: false, adventurer: false, hero: true 
              },
              { 
                name: "Triangular Arbitrage Bot", 
                info: "Exploit price differences between three currencies on the same exchange. Advanced arbitrage strategy",
                description: "Profit from discrepancies between three different currencies. Exploit price differences between three currencies on the same exchange. Advanced arbitrage strategy for maximum efficiency.",
                pioneer: false, explorer: false, adventurer: false, hero: true 
              },
            ].map((feature, index) => (
              <React.Fragment key={index}>
                <div 
                  className={`${classes.tableRow} ${classes.clickableRow}`}
                  onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                >
                  <div className={classes.featureColumn}>
                    <span>{feature.name}</span>
                    <Tooltip 
                      title={feature.info} 
                      placement="right"
                      classes={{ tooltip: classes.tooltip }}
                      arrow
                    >
                      <InfoOutlined className={classes.infoIcon} />
                    </Tooltip>
                  </div>
                  <div className={classes.planColumn}>
                    {feature.pioneer ? (
                      <Check className={classes.checkIconTable} />
                    ) : (
                      <span className={classes.crossIcon}>✕</span>
                    )}
                  </div>
                  <div className={classes.planColumn}>
                    {feature.explorer ? (
                      <Check className={classes.checkIconTable} />
                    ) : (
                      <span className={classes.crossIcon}>✕</span>
                    )}
                  </div>
                  <div className={classes.planColumn}>
                    {feature.adventurer ? (
                      <Check className={classes.checkIconTable} />
                    ) : (
                      <span className={classes.crossIcon}>✕</span>
                    )}
                  </div>
                  <div className={classes.planColumn}>
                    {feature.hero ? (
                      <Check className={classes.checkIconTable} />
                    ) : (
                      <span className={classes.crossIcon}>✕</span>
                    )}
                  </div>
                </div>
                {expandedFeature === index && (
                  <div className={classes.expandedRow}>
                    <div className={classes.expandedContent}>
                      {feature.description}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className={classes.testimonialsSection}>
          <h2 className={classes.testimonialsTitle}>What successful traders say</h2>
          <p className={classes.testimonialsSubtitle}>about CyrionTrade</p>
          
          <div className={classes.testimonialsGrid}>
            {[
              {
                name: "Richard Engel",
                stars: 4,
                text: "I enjoy working with the trading step-loss. It gives me peace of mind that I know that the hopper will take profit at the moments the prices fall again. Since crypto prices are very volatile, I...",
                fullText: "I enjoy working with the trading step-loss. It gives me peace of mind that I know that the hopper will take profit at the moments the prices fall again. Since crypto prices are very volatile, I do not want to wait until I reach the set profit percentage with the risk that the price drops hard before that setmargin is reached.",
              },
              {
                name: "Andrew Uda",
                stars: 5,
                text: "CYRIONTRADE: This is exactly how I always envisaged automated trading to be. This trading bot has changed my life in so many ways, but why did I find it a great way to earn passive income using...",
                fullText: "CYRIONTRADE: This is exactly how I always envisaged automated trading to be. This trading bot has changed my life in so many ways, but why did I find it a great way to earn passive income using cryptocurrency? The platform is user-friendly, powerful, and has helped me achieve consistent profits in the volatile crypto market.",
              },
              {
                name: "Greg Valliappilai, synapseDeFi, Inc.",
                stars: 5,
                text: "CyrionTrade's Algorithmic Intelligence (AI) platform has allowed us to visualize, deploy and automate various trading strategies to applicable markets. This has lead to an exponential increase...",
                fullText: "CyrionTrade's Algorithmic Intelligence (AI) platform has allowed us to visualize, deploy and automate various trading strategies to applicable markets. This has lead to an exponential increase in our trading efficiency and profitability. The AI-powered features are truly game-changing for professional traders.",
              },
              {
                name: "Emiel Fellinger",
                stars: 5,
                text: "I have been running CyrionTrade with a paid signal and strategy for over one year. And even in the rollercoaster market, I am still up 35% for the year. Easy to use and lots of features...",
                fullText: "I have been running CyrionTrade with a paid signal and strategy for over one year. And even in the rollercoaster market, I am still up 35% for the year. Easy to use and lots of features that help maximize profits while minimizing risks. Highly recommended for both beginners and experienced traders.",
              },
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className={classes.testimonialCard}
                onClick={() => setSelectedReview(testimonial)}
              >
                <div className={classes.testimonialHeader}>
                  <div className={classes.testimonialName}>{testimonial.name}</div>
                  <div className={classes.testimonialStars}>
                    {"★".repeat(testimonial.stars)}{"☆".repeat(5 - testimonial.stars)}
                  </div>
                </div>
                <div className={classes.testimonialText}>
                  {testimonial.text}
                </div>
                <div className={classes.testimonialFooter}>
                  <div className={classes.readMoreButton}>
                    <span>Read full review</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer Section */}
        <div className={classes.legalDisclaimer}>
          <p className={classes.legalDisclaimerText}>
            <strong>DISCLAIMER:</strong> CyrionTrade is not a regulated entity. Cryptocurrency bot trading involves substantial risks, and past performance is not indicative of future results. The profits shown in product screenshots are for illustrative purposes and may be exaggerated. Only engage in bot trading if you possess sufficient knowledge or seek guidance from a qualified financial advisor. Under no circumstances shall CyrionTrade accept any liability to any person or entity for (a) any loss or damage, in whole or in part, caused by, arising out of, or in connection with transactions involving our software or (b) any direct, indirect, special, consequential, or incidental damages. Please note that the content available on the CyrionTrade social trading platform is generated by members of the CyrionTrade community and does not constitute advice or recommendations from CyrionTrade or on its behalf. Profits shown on the Marketplace are not indicative of future results. By using CyrionTrade's services, you acknowledge and accept the inherent risks involved in cryptocurrency trading and agree to hold CyrionTrade harmless from any liabilities or losses incurred. It is essential to review and understand our Terms of Service and Risk Disclosure Policy before using our software or engaging in any trading activities. Please consult legal and financial professionals for personalized advice based on your specific circumstances.
          </p>
        </div>

        {/* Review Modal */}
        <Dialog
          open={Boolean(selectedReview)}
          onClose={() => setSelectedReview(null)}
          className={classes.reviewDialog}
          maxWidth="md"
        >
          <DialogContent className={classes.reviewDialogContent}>
            <IconButton
              className={classes.closeButton}
              onClick={() => setSelectedReview(null)}
            >
              <Close />
            </IconButton>
            
            {selectedReview && (
              <>
                <div className={classes.reviewModalHeader}>
                  <div className={classes.reviewModalName}>{selectedReview.name}</div>
                  <div className={classes.reviewModalStars}>
                    {"★".repeat(selectedReview.stars)}{"☆".repeat(5 - selectedReview.stars)}
                  </div>
                </div>
                <div className={classes.reviewModalText}>
                  {selectedReview.fullText}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Wallet Modal */}
        <WalletModal
          open={walletModalOpen}
          handleClose={() => setWalletModalOpen(false)}
        />
      </Container>
    </div>
  );
};

export default PricingPage;
