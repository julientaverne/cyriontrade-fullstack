import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import MarketplaceCard from "../components/Marketplace/MarketplaceCard";
import MarketplaceSidebar from "../components/Marketplace/MarketplaceSidebar";
import { MARKETPLACE_CATEGORIES, MARKETPLACE_ITEMS } from "../constants/marketplaceData";
import { categoryToUrl, urlToCategory } from "../utils/urlHelpers";

const useStyles = makeStyles(() => ({
  container: {
    minHeight: "100vh",
    paddingTop: "120px",
    background: "transparent",
    position: "relative",
  },
  header: {
    marginBottom: "60px",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "50px",
    fontFamily: "'Orbitron', sans-serif",
    textAlign: "center",
    letterSpacing: "1px",
    textShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
    "@media (max-width: 768px)": {
      fontSize: "2.8rem",
    },
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "40px",
  },
  mainContent: {
    flex: 1,
  },
  contentHeader: {
    background: "linear-gradient(135deg, rgba(238, 188, 29, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
    borderRadius: "24px 24px 0 0",
    padding: "50px 60px",
    marginBottom: "0",
    borderBottom: "1px solid rgba(238, 188, 29, 0.15)",
    backdropFilter: "blur(20px)",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background: "linear-gradient(90deg, transparent 0%, rgba(238, 188, 29, 0.3) 50%, transparent 100%)",
    },
  },
  contentTitle: {
    fontSize: "3rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "0.8px",
    "@media (max-width: 768px)": {
      fontSize: "2.2rem",
    },
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "35px",
    padding: "50px",
    background: "linear-gradient(145deg, rgba(20, 22, 26, 0.8) 0%, rgba(30, 35, 41, 0.6) 100%)",
    borderRadius: "0 0 24px 24px",
    backdropFilter: "blur(20px)",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      padding: "30px",
    },
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

const MarketplacePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { category } = useParams();
  const { user, setAlert } = CryptoState();
  const [selectedCategory, setSelectedCategory] = useState("Strategies");

  useEffect(() => {
    if (category) {
      const formattedCategory = urlToCategory(category);
      setSelectedCategory(formattedCategory);
    }
  }, [category]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    const urlCategory = categoryToUrl(categoryName);
    history.push(`/marketplace/${urlCategory}`);
  };

  const currentItems = MARKETPLACE_ITEMS[selectedCategory] || [];

  const handleStartNow = () => {
    if (user) {
      // User is already logged in, just show a message
      setAlert({
        open: true,
        message: "You're already logged in! Start exploring the marketplace.",
        type: "success",
      });
    } else {
      // User is not logged in, show alert to log in
      setAlert({
        open: true,
        message: "Please log in to start trading",
        type: "info",
      });
    }
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="xl">
        <div className={classes.layout}>
          <MarketplaceSidebar
            selectedCategory={selectedCategory}
            categories={MARKETPLACE_CATEGORIES}
            onCategoryChange={handleCategoryChange}
          />

          {/* Main Content */}
          <div className={classes.mainContent}>
            <div className={classes.contentHeader}>
              <div className={classes.contentTitle}>{selectedCategory}</div>
            </div>
            
            <div className={classes.cardsGrid}>
              {currentItems.map((item, index) => (
                <MarketplaceCard key={index} item={item} category={selectedCategory} />
              ))}
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
    </div>
  );
};

export default MarketplacePage;
