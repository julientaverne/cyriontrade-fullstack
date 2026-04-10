import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  sidebar: {
    background: "linear-gradient(145deg, rgba(20, 22, 26, 0.95) 0%, rgba(30, 35, 41, 0.95) 100%)",
    borderRadius: "20px",
    padding: "0",
    height: "fit-content",
    position: "sticky",
    top: "100px",
    border: "1px solid rgba(238, 188, 29, 0.15)",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
  },
  sidebarHeader: {
    background: "linear-gradient(135deg, rgba(238, 188, 29, 0.15) 0%, rgba(255, 215, 0, 0.08) 100%)",
    padding: "35px 30px",
    borderBottom: "1px solid rgba(238, 188, 29, 0.15)",
  },
  sidebarTitle: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#fff",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "0.5px",
    textAlign: "center",
  },
  sidebarBody: {
    padding: "30px",
  },
  categoriesTitle: {
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "#666",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    fontFamily: "'Inter', sans-serif",
  },
  categoryItem: {
    padding: "16px 20px",
    marginBottom: "10px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#888",
    fontFamily: "'Inter', sans-serif",
    fontSize: "1rem",
    fontWeight: "600",
    border: "1px solid transparent",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      background: "rgba(238, 188, 29, 0.08)",
      color: "#EEBC1D",
      border: "1px solid rgba(238, 188, 29, 0.2)",
      transform: "translateX(5px)",
    },
    "&:hover $categoryLabel": {
      color: "#EEBC1D",
    },
  },
  categoryItemActive: {
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    color: "#000",
    fontWeight: "700",
    border: "1px solid #EEBC1D",
    boxShadow: "0 4px 15px rgba(238, 188, 29, 0.3)",
    "&:hover": {
      transform: "translateX(0)",
      background: "linear-gradient(135deg, #FFD700 0%, #EEBC1D 100%)",
    },
    "& $categoryLabel": {
      color: "#000",
    },
    "& $categoryCount": {
      background: "rgba(0, 0, 0, 0.15)",
      color: "#000",
    },
  },
  categoryContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  categoryLabel: {
    fontSize: "1rem",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
  categoryCount: {
    padding: "4px 10px",
    borderRadius: "8px",
    background: "rgba(238, 188, 29, 0.1)",
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "#EEBC1D",
    minWidth: "35px",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
}));

const MarketplaceSidebar = ({ selectedCategory, categories, onCategoryChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarHeader}>
        <div className={classes.sidebarTitle}>Marketplace</div>
      </div>
      
      <div className={classes.sidebarBody}>
        <div className={classes.categoriesTitle}>CATEGORIES</div>
        
        {categories.map((category) => (
          <div
            key={category.name}
            className={`${classes.categoryItem} ${
              selectedCategory === category.name ? classes.categoryItemActive : ""
            }`}
            onClick={() => onCategoryChange(category.name)}
          >
            <div className={classes.categoryContent}>
              <span className={classes.categoryLabel}>{category.name}</span>
            </div>
            <span className={classes.categoryCount}>{category.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceSidebar;
