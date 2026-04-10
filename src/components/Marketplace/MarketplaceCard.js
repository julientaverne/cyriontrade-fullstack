import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Person, TrendingUp, Star, VerifiedUser } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  card: {
    background: "rgba(30, 35, 41, 0.6)",
    borderRadius: "20px",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    border: "1px solid rgba(238, 188, 29, 0.1)",
    backdropFilter: "blur(10px)",
    position: "relative",
    "&:hover": {
      transform: "translateY(-8px)",
      border: "1px solid rgba(238, 188, 29, 0.5)",
      boxShadow: "0 20px 40px rgba(238, 188, 29, 0.3), 0 0 20px rgba(238, 188, 29, 0.1)",
      background: "rgba(30, 35, 41, 0.8)",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #EEBC1D 0%, #FFD700 100%)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover::before": {
      opacity: 1,
    },
  },
  cardImage: {
    width: "100%",
    height: "260px",
    background: "linear-gradient(135deg, #0a0e27 0%, #14161a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    borderBottom: "1px solid #2a2e37",
    overflow: "hidden",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  cardContent: {
    padding: "24px",
    background: "linear-gradient(180deg, rgba(20, 22, 26, 0.4) 0%, rgba(20, 22, 26, 0.8) 100%)",
  },
  cardTitle: {
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "18px",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    letterSpacing: "0.3px",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "15px",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
  },
  cardStats: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#aaa",
    fontSize: "0.95rem",
    fontWeight: "500",
    "& svg": {
      fontSize: "18px",
      color: "#EEBC1D",
    },
  },
  cardPrice: {
    fontSize: "1.4rem",
    fontWeight: "900",
    color: "#EEBC1D",
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "0 2px 10px rgba(238, 188, 29, 0.3)",
  },
  cardPriceFree: {
    color: "#4CAF50",
    textShadow: "0 2px 10px rgba(76, 175, 80, 0.3)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.7rem",
    fontWeight: "700",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    border: "1px solid",
  },
  badgeHighWin: {
    background: "rgba(255, 152, 0, 0.15)",
    color: "#FF9800",
    borderColor: "rgba(255, 152, 0, 0.3)",
    boxShadow: "0 2px 10px rgba(255, 152, 0, 0.2)",
  },
  badgeAI: {
    background: "rgba(156, 39, 176, 0.15)",
    color: "#9C27B0",
    borderColor: "rgba(156, 39, 176, 0.3)",
    boxShadow: "0 2px 10px rgba(156, 39, 176, 0.2)",
  },
  badgePopular: {
    background: "rgba(238, 188, 29, 0.15)",
    color: "#EEBC1D",
    borderColor: "rgba(238, 188, 29, 0.3)",
    boxShadow: "0 2px 10px rgba(238, 188, 29, 0.2)",
  },
}));

const MarketplaceCard = ({ item, category }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    const slug = item.title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\./g, '')
      .replace(/\|/g, '')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/\//g, '-');
    
    // Redirect based on category type
    if (category === "Strategies") {
      history.push(`/strategy/${slug}`);
    } else if (category === "Templates") {
      history.push(`/template/${slug}`);
    } else if (category === "Signals") {
      history.push(`/signal/${slug}`);
    } else if (category === "Copy Bots") {
      history.push(`/copybot/${slug}`);
    } else {
      // Default fallback
      history.push(`/strategy/${slug}`);
    }
  };

  return (
    <div className={classes.card} onClick={handleClick}>
      <div className={classes.cardImage}>
        {item.image ? (
          <img src={item.image} alt={item.title} />
        ) : (
          <span style={{ fontSize: "4rem" }}>{item.emoji}</span>
        )}
      </div>
      <div className={classes.cardContent}>
        {item.badge && (
          <div
            className={`${classes.badge} ${
              item.badge === "AI CONFIRMATION"
                ? classes.badgeAI
                : item.badge === "POPULAR"
                ? classes.badgePopular
                : classes.badgeHighWin
            }`}
          >
            {item.badge === "HIGH WIN RATE" && <TrendingUp style={{ fontSize: "14px" }} />}
            {item.badge === "AI CONFIRMATION" && <VerifiedUser style={{ fontSize: "14px" }} />}
            {item.badge === "POPULAR" && <Star style={{ fontSize: "14px" }} />}
            {item.badge}
          </div>
        )}
        <div className={classes.cardTitle}>{item.title}</div>
        <div className={classes.cardFooter}>
          <div className={classes.cardStats}>
            <Person />
            <span>{item.users}</span>
          </div>
          <div
            className={`${classes.cardPrice} ${
              item.price === "FREE" ? classes.cardPriceFree : ""
            }`}
          >
            {item.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;
