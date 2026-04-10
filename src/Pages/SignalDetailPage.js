import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Tabs, Tab } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { ArrowBack, Person, TrendingUp, Star, VerifiedUser, Info } from "@material-ui/icons";
import { CryptoState } from "../CryptoContext";
import WalletModal from "../components/Authentication/WalletModal";
import { MARKETPLACE_ITEMS } from "../constants/marketplaceData";
import { SIGNAL_DESCRIPTIONS } from "../constants/signalDescriptions";

const useStyles = makeStyles(() => ({
  container: {
    minHeight: "100vh",
    paddingTop: "120px",
    background: "transparent",
    position: "relative",
  },
  backButton: {
    color: "#EEBC1D",
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    "&:hover": {
      gap: "12px",
    },
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "350px 1fr",
    gap: "40px",
  },
  sidebar: {
    background: "linear-gradient(145deg, rgba(20, 22, 26, 0.8) 0%, rgba(30, 35, 41, 0.6) 100%)",
    borderRadius: "24px",
    padding: "0",
    height: "fit-content",
    border: "1px solid rgba(238, 188, 29, 0.1)",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(20px)",
  },
  sidebarHeader: {
    background: "linear-gradient(135deg, rgba(238, 188, 29, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
    padding: "35px 30px",
    borderBottom: "1px solid rgba(238, 188, 29, 0.15)",
  },
  sidebarTitle: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "20px",
    fontFamily: "'Inter', sans-serif",
    lineHeight: "1.4",
    textAlign: "center",
  },
  sidebarMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "25px",
    marginTop: "15px",
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    "& svg": {
      fontSize: "20px",
      color: "#EEBC1D",
      marginBottom: "5px",
    },
    "& span:first-of-type": {
      fontSize: "0.75rem",
      color: "#888",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      fontWeight: "600",
    },
    "& span:last-of-type": {
      fontSize: "1.1rem",
      color: "#EEBC1D",
      fontWeight: "700",
    },
  },
  rating: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    "& > div:first-of-type": {
      fontSize: "0.75rem",
      color: "#888",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      fontWeight: "600",
    },
    "& > div:last-of-type": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#FFD700",
      fontSize: "1.2rem",
    },
  },
  sidebarBody: {
    padding: "35px 30px",
  },
  priceDisplay: {
    textAlign: "center",
    marginBottom: "25px",
    "& > div:first-of-type": {
      fontSize: "0.85rem",
      color: "#888",
      marginBottom: "8px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      fontWeight: "600",
    },
    "& > div:last-of-type": {
      fontSize: "2.5rem",
      fontWeight: "900",
      color: "#EEBC1D",
      fontFamily: "'Orbitron', sans-serif",
      textShadow: "0 2px 10px rgba(238, 188, 29, 0.3)",
    },
  },
  buyButton: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    color: "#000",
    fontWeight: "700",
    fontSize: "1.1rem",
    borderRadius: "10px",
    marginBottom: "15px",
    transition: "all 0.3s ease",
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(238, 188, 29, 0.3)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 25px rgba(238, 188, 29, 0.5)",
    },
  },
  priceNote: {
    fontSize: "0.8rem",
    color: "#888",
    textAlign: "center",
    lineHeight: "1.5",
  },
  userCount: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "20px",
    padding: "12px",
    background: "rgba(238, 188, 29, 0.05)",
    borderRadius: "8px",
    "& svg": {
      color: "#EEBC1D",
      fontSize: "18px",
    },
    "& span": {
      color: "#ccc",
      fontSize: "0.9rem",
      fontWeight: "500",
    },
  },
  mainContent: {
    background: "linear-gradient(145deg, rgba(30, 35, 41, 0.6) 0%, rgba(20, 22, 26, 0.4) 100%)",
    borderRadius: "24px",
    border: "1px solid rgba(238, 188, 29, 0.08)",
    overflow: "hidden",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
  },
  banner: {
    width: "100%",
    height: "auto",
    background: "#0a0e27",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    "& img": {
      width: "100%",
      height: "auto",
      objectFit: "contain",
      display: "block",
      maxHeight: "400px",
    },
    "& span": {
      fontSize: "6rem",
    },
  },
  tabs: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    "& .MuiTabs-indicator": {
      backgroundColor: "#EEBC1D",
      height: "3px",
    },
  },
  tab: {
    color: "#888",
    fontWeight: "600",
    fontSize: "1rem",
    textTransform: "none",
    fontFamily: "'Inter', sans-serif",
    minWidth: "120px",
    "&.Mui-selected": {
      color: "#EEBC1D",
    },
  },
  tabContent: {
    padding: "40px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "40px",
  },
  statCard: {
    background: "linear-gradient(145deg, rgba(20, 22, 26, 0.8) 0%, rgba(30, 35, 41, 0.8) 100%)",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid rgba(238, 188, 29, 0.15)",
    transition: "all 0.3s ease",
    "&:hover": {
      border: "1px solid rgba(238, 188, 29, 0.4)",
      transform: "translateY(-3px)",
      boxShadow: "0 8px 20px rgba(238, 188, 29, 0.2)",
    },
  },
  statLabel: {
    fontSize: "0.85rem",
    color: "#888",
    marginBottom: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontFamily: "'Inter', sans-serif",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "900",
    color: "#EEBC1D",
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "0 2px 10px rgba(238, 188, 29, 0.3)",
  },
  statValuePercentage: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "& svg": {
      fontSize: "1.5rem",
      color: "#888",
    },
  },
  sectionTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "20px",
    fontFamily: "'Inter', sans-serif",
  },
  description: {
    fontSize: "1rem",
    color: "#ccc",
    lineHeight: "1.8",
    marginBottom: "30px",
    fontFamily: "'Inter', sans-serif",
    whiteSpace: "pre-line",
    "& p": {
      marginBottom: "15px",
    },
  },
  descriptionSection: {
    marginBottom: "25px",
    "& strong": {
      display: "block",
      fontSize: "1.1rem",
      fontWeight: "700",
      color: "#EEBC1D",
      marginBottom: "10px",
      marginTop: "20px",
      fontFamily: "'Orbitron', sans-serif",
      letterSpacing: "0.5px",
    },
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "700",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    background: "rgba(255, 152, 0, 0.15)",
    color: "#FF9800",
    border: "1px solid rgba(255, 152, 0, 0.3)",
  },
  disclaimer: {
    marginTop: "60px",
    marginBottom: "60px",
    padding: "0 20px",
  },
  disclaimerText: {
    fontSize: "0.9rem",
    color: "#aaa",
    lineHeight: "1.6",
    fontFamily: "'Inter', sans-serif",
    textAlign: "center",
    marginBottom: "15px",
    "& strong": {
      color: "#aaa",
      fontWeight: "600",
    },
  },
  pricingNote: {
    fontSize: "0.85rem",
    color: "#888",
    fontFamily: "'Inter', sans-serif",
    textAlign: "center",
    fontStyle: "italic",
  },
  ctaBanner: {
    padding: "50px 40px",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(238, 188, 29, 0.3)",
    width: "100%",
  },
  ctaTitle: {
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#000",
    marginBottom: "15px",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "0.5px",
  },
  ctaSubtitle: {
    fontSize: "1.1rem",
    color: "#333",
    marginBottom: "30px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "500",
  },
  ctaButton: {
    padding: "16px 40px",
    background: "#000",
    color: "#EEBC1D",
    fontWeight: "700",
    fontSize: "1.1rem",
    borderRadius: "10px",
    textTransform: "none",
    fontFamily: "'Inter', sans-serif",
    border: "2px solid #000",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.8)",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
    },
  },
}));

const SignalDetailPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { user, setAlert } = CryptoState();
  const [activeTab, setActiveTab] = useState(0);
  const [signal, setSignal] = useState(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const handlePurchase = () => {
    if (user) {
      setWalletModalOpen(true);
    } else {
      setAlert({
        open: true,
        message: "Please log in to purchase",
        type: "info",
      });
    }
  };

  const handleStartNow = () => {
    if (user) {
      setAlert({
        open: true,
        message: "You're already logged in! Start exploring the marketplace.",
        type: "success",
      });
    } else {
      setAlert({
        open: true,
        message: "Please log in to start trading",
        type: "info",
      });
    }
  };

  useEffect(() => {
    // Find the signal from marketplace items
    const signals = MARKETPLACE_ITEMS["Signals"] || [];
    const foundSignal = signals.find(item => {
      const slug = item.title.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '').replace(/\|/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\//g, '-');
      return slug === id;
    });
    
    if (foundSignal) {
      // Get description from constants or use default
      const descriptionData = SIGNAL_DESCRIPTIONS?.[id] || {
        overview: `This is a premium signal service designed for professional traders.

DESCRIPTION

${foundSignal.title} provides advanced trading signals to help you maximize your trading potential.

This signal service uses cutting-edge technology and proven strategies to deliver consistent results in various market conditions.

=== Disclaimer ===

Trading involves risk. Do your own research and risk assessment. CyrionTrade is not a financial advisor. Always paper trade first before using real funds.`
      };
      
      setSignal({
        ...foundSignal,
        type: "Signal",
        rating: foundSignal.rating || 5,
        reviews: foundSignal.reviews || 0,
        image: foundSignal.image || null,
        banner: foundSignal.banner || foundSignal.image || null,
        description: descriptionData.overview,
      });
    } else {
      // Signal not found, redirect back
      history.push('/marketplace/signals');
    }
  }, [id, history]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!signal) {
    return (
      <div className={classes.container}>
        <Container maxWidth="xl">
          <div style={{ textAlign: 'center', color: '#fff', padding: '100px 0' }}>
            Loading...
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Container maxWidth="xl">
        <div className={classes.backButton} onClick={() => history.push('/marketplace/signals')}>
          <ArrowBack />
          <span>View all signals</span>
        </div>

        <div className={classes.layout}>
          {/* Sidebar */}
          <div className={classes.sidebar}>
            <div className={classes.sidebarHeader}>
              <div className={classes.sidebarTitle}>{signal.title}</div>
              
              <div className={classes.sidebarMeta}>
                <div className={classes.metaItem}>
                  <span>Type</span>
                  <span>{signal.type}</span>
                </div>
                <div className={classes.rating}>
                  <div>Rating</div>
                  <div>
                    {"★".repeat(signal.rating)}
                    <span style={{ color: "#aaa", fontSize: "0.85rem", marginLeft: "5px" }}>
                      ({signal.reviews})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.sidebarBody}>
              <div className={classes.priceDisplay}>
                <div>Price</div>
                <div>{signal.price}</div>
              </div>

              <Button className={classes.buyButton} onClick={handlePurchase}>
                Purchase Now
              </Button>

              <div className={classes.priceNote}>
                Includes 1 month of updates and support
              </div>

              <div className={classes.userCount}>
                <Person />
                <span>{signal.users} users</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={classes.mainContent}>
            <div className={classes.banner}>
              {signal.banner ? (
                <img src={signal.banner} alt={signal.title} />
              ) : (
                <span style={{ fontSize: "6rem" }}>{signal.emoji}</span>
              )}
            </div>

            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              className={classes.tabs}
            >
              <Tab label="Overview" className={classes.tab} />
              <Tab label="Reviews" className={classes.tab} />
            </Tabs>

            <div className={classes.tabContent}>
              {activeTab === 0 && (
                <div>
                  {/* Statistics Grid */}
                  <div className={classes.statsGrid}>
                    <div className={classes.statCard}>
                      <div className={classes.statLabel}>Signals last 3 months:</div>
                      <div className={classes.statValue}>7791</div>
                    </div>
                    <div className={classes.statCard}>
                      <div className={classes.statLabel}>
                        <div className={classes.statValuePercentage}>
                          <Info />
                          Average Profit
                        </div>
                      </div>
                      <div className={classes.statValue}>4.65%</div>
                    </div>
                    <div className={classes.statCard}>
                      <div className={classes.statLabel}>Total subscribers:</div>
                      <div className={classes.statValue}>{signal.users}</div>
                    </div>
                  </div>

                  <div className={classes.sectionTitle}>Description</div>
                  
                  {signal.badge && (
                    <div className={classes.badge}>
                      {signal.badge === "HIGH WIN RATE" && <TrendingUp style={{ fontSize: "14px" }} />}
                      {signal.badge === "AI CONFIRMATION" && <VerifiedUser style={{ fontSize: "14px" }} />}
                      {signal.badge === "POPULAR" && <Star style={{ fontSize: "14px" }} />}
                      {signal.badge}
                    </div>
                  )}

                  <div className={classes.descriptionSection}>
                    {signal.description.split('\n\n').map((section, index) => {
                      const lines = section.split('\n');
                      const isHeader = lines[0] && lines[0] === lines[0].toUpperCase() && lines[0].length < 30;
                      
                      if (isHeader) {
                        return (
                          <div key={index}>
                            <strong>{lines[0]}</strong>
                            <div className={classes.description}>
                              {lines.slice(1).map((line, i) => (
                                <p key={i}>{line}</p>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <div key={index} className={classes.description}>
                          {lines.map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div>
                  <div className={classes.sectionTitle}>Reviews</div>
                  <div className={classes.description}>
                    User reviews and ratings will be displayed here.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className={classes.disclaimer}>
          <div className={classes.disclaimerText}>
            The products provided on this page are not provided by <strong>CyrionTrade</strong>, but by external advisors and trading professionals. 
            Although we check and validate each marketplace seller, <strong>CyrionTrade</strong> will not be liable or responsible for any loss or damage due to the use of these templates, strategies, and signals.
          </div>
          <div className={classes.pricingNote}>
            * All prices on this website are excluding VAT and excluding payment provider fees (if applicable).
          </div>
        </div>
      </Container>
      
      {/* CTA Banner - Full Width - Only show if user is NOT logged in */}
      {!user && (
        <div className={classes.ctaBanner}>
          <div className={classes.ctaTitle}>Start trading with CyrionTrade for free!</div>
          <div className={classes.ctaSubtitle}>Free to use - no credit card required</div>
          <Button className={classes.ctaButton} onClick={handleStartNow}>
            START NOW
          </Button>
        </div>
      )}

      {/* Wallet Modal */}
      <WalletModal
        open={walletModalOpen}
        handleClose={() => setWalletModalOpen(false)}
      />
    </div>
  );
};

export default SignalDetailPage;
