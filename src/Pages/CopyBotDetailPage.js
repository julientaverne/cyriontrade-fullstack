import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Tabs, Tab } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { ArrowBack, Person, TrendingUp, Star, VerifiedUser } from "@material-ui/icons";
import { CryptoState } from "../CryptoContext";
import WalletModal from "../components/Authentication/WalletModal";
import { MARKETPLACE_ITEMS } from "../constants/marketplaceData";

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

const CopyBotDetailPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { user, setAlert } = CryptoState();
  const [activeTab, setActiveTab] = useState(0);
  const [copyBot, setCopyBot] = useState(null);
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
    // Find the copy bot from Copy Bots category
    const copyBots = MARKETPLACE_ITEMS["Copy Bots"] || [];
    const foundBot = copyBots.find(item => {
      const slug = item.title.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
      return slug === id;
    });
    
    if (foundBot) {
      // Custom description for GPTrader
      let description = `${foundBot.title} is an advanced automated trading bot designed to help you maximize your trading potential.\n\nKey Features:\n• Automated copy trading from top performers\n• Real-time market analysis\n• Risk management tools\n• 24/7 trading execution\n• Customizable trading parameters\n\nThis bot uses sophisticated algorithms to identify and execute profitable trades automatically.`;
      
      if (id === 'gptrader---chatgpt-powered-trading') {
        description = `Experience the power of ChatGPT's cutting-edge technology with GPTrader, the ultimate copy bot solution. Say goodbye to guesswork and hello to informed decision-making as GPTrader provides you with real-time insights and expert recommendations to maximize your trading success.

UNLEASH THE POTENTIAL
With GPTrader, you gain access to a treasure trove of invaluable trading signals, powered by the unrivaled intelligence of ChatGPT. Harness the capabilities of advanced algorithms and machine learning, empowering you to stay ahead of the market curve and make winning trades with confidence.

PROFITABLE OPPORTUNITIES, DELIVERED INSTANTLY
Receive high-quality trading signals directly to your bot, ensuring you never miss an opportunity again. GPTrader analyzes complex market data, identifies trends, and predicts price movements, delivering concise and actionable signals in real-time. Seamlessly integrated with CyrionTrade, GPTrader allows you to execute trades swiftly, ensuring you capitalize on every profit-making potential.

PRECISION AND ACCURACY, REDEFINED
Forget about second-guessing and emotional trading. GPTrader's AI-powered signals are backed by state-of-the-art data analysis, enabling you to make informed decisions based on solid market intelligence. Stay on top of the game with accurate predictions and finely-tuned recommendations, giving you the competitive edge you need to succeed.

DISCLAIMER
This product and product description is generated/powered by ChatGPT. We are not affiliated or owned by OpenAI. ChatGPT-powered signals is a test to see how public AIs perform and should be considered an experiment. We do not guarantee profits.`;
      }
      
      if (id === 'binance-dca-copy-bot--starbots-usdc') {
        description = `Binance DCA Copy Bot, trading multiple coins (10-20) on 2.5% of the balance. We are using sell strategies, DCA and stop loss on this signals. You subscribe only to this copy bot on the CyrionTrade marketplace.

RESULTS
Look at the Results by month columns only, $USD graphs are calculated wrong - that is not how the history balance is looking.

TRADING
These strategies are scalping and buying oversold markets. They shine in bear markets. Trades are closed in average of 1-4h, 2 or 3 assets are usually allowed to hold longer for bigger profits.

• There should be around 5-20 signals a week or more if our markets are volatile. Weekends can be quiet if the market is flat and it will also not trade if the markets are very heavily 'UP-trending'. It's very good in bear markets actually.
• We are trading 10-20 carefully selected coins
• Bot is able to rebuy a position up to 2-5 times and DCA it if there are certain opportunities. We use a sell strategy to control the risk and stop loss!
• This are 95%+ win rate strategies, although most of them would finish every trade in profit if you hold it for a longer time, I don't like to be that kind of DCA trader. I like to close trades and hunt for new opportunities without holding bags.
• We close the trades in a profit and loss. Average trade on most of the markets is around 1.5% profit while the best trading setups have 3% average profit optimized over the past 5-7 years of data.
• This bot is usually slowly earning 1-5% a month and making ~50% APY. It's considered safe.

SETUP
This is a Binance Copy Bot. We are trading with USDC pairs. You need to have USDC in your spot wallet. You don't need to do any special configurations to run it, just connect CyrionTrade Copy Bot to your Binance account with API.`;
      }
      
      if (id === 'axon-x--ai-bot-live-on-x--btcusdt--coinbase') {
        description = `The Axon-X Copy Bot mirrors the live AI model that trades Bitcoin 24/7 with adaptive precision. No setups, no guesswork — just connect and copy every move Axon X makes.

WHY TRADERS CHOOSE IT
• Trades only BTC/USDT for maximum signal accuracy
• Automatically closes longs and flips to shorts when trends reverse
• Built on the same live model powering Axon-X Signals on CyrionTrade
• Integrated with live visual dashboard showing the open position and the 5-minute decision process
• Smart risk controls with dynamic take-profit and AI-weighted stop logic

HOW TO GET STARTED
1. Subscribe to the Axon-X Bitcoin AI Bot
2. Choose your exchange and allocate funds (BTC-USDT pair)
3. Click Start Bot — it automatically syncs with the live Axon AI model
4. Watch performance in your dashboard or view the live trade cycle`;
      }
      
      setCopyBot({
        ...foundBot,
        type: "Copy Bot",
        rating: foundBot.rating || 5,
        reviews: foundBot.reviews || 0,
        description: description,
      });
    } else {
      history.push('/marketplace');
    }
  }, [id, history]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!copyBot) {
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
        <div className={classes.backButton} onClick={() => history.goBack()}>
          <ArrowBack />
          <span>Back to marketplace</span>
        </div>

        <div className={classes.layout}>
          {/* Sidebar */}
          <div className={classes.sidebar}>
            <div className={classes.sidebarHeader}>
              <div className={classes.sidebarTitle}>{copyBot.title}</div>
              
              <div className={classes.sidebarMeta}>
                <div className={classes.metaItem}>
                  <span>Type</span>
                  <span>{copyBot.type}</span>
                </div>
                <div className={classes.rating}>
                  <div>Rating</div>
                  <div>
                    {"★".repeat(copyBot.rating)}
                    <span style={{ color: "#aaa", fontSize: "0.85rem", marginLeft: "5px" }}>
                      ({copyBot.reviews})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.sidebarBody}>
              <div className={classes.priceDisplay}>
                <div>Price</div>
                <div>{copyBot.price}</div>
              </div>

              <Button className={classes.buyButton} onClick={handlePurchase}>
                Purchase Now
              </Button>

              <div className={classes.priceNote}>
                Includes 1 month of updates and support
              </div>

              <div className={classes.userCount}>
                <Person />
                <span>{copyBot.users} users</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={classes.mainContent}>
            <div className={classes.banner}>
              {copyBot.banner ? (
                <img src={copyBot.banner} alt={copyBot.title} />
              ) : (
                <span style={{ fontSize: "6rem" }}>{copyBot.emoji}</span>
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
                  <div className={classes.sectionTitle}>Overview</div>
                  
                  {copyBot.badge && (
                    <div className={classes.badge}>
                      {copyBot.badge === "HIGH WIN RATE" && <TrendingUp style={{ fontSize: "14px" }} />}
                      {copyBot.badge === "AI CONFIRMATION" && <VerifiedUser style={{ fontSize: "14px" }} />}
                      {copyBot.badge === "POPULAR" && <Star style={{ fontSize: "14px" }} />}
                      {copyBot.badge}
                    </div>
                  )}

                  <div className={classes.descriptionSection}>
                    {copyBot.description.split('\n\n').map((section, index) => {
                      const lines = section.split('\n');
                      const isHeader = lines[0] && lines[0] === lines[0].toUpperCase() && lines[0].length < 50;
                      
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

export default CopyBotDetailPage;
