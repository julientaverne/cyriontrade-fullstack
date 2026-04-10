import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Facebook, Telegram } from "@material-ui/icons";
import { FaDiscord, FaSlack } from "react-icons/fa";

const useStyles = makeStyles(() => ({
  footer: {
    background: "#0a0e1a",
    borderTop: "1px solid rgba(238, 188, 29, 0.08)",
    padding: "60px 0 25px",
    marginTop: "auto",
  },
  footerContent: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
  },
  copyright: {
    color: "#6b7280",
  },
  brand: {
    color: "#EEBC1D",
    fontWeight: "700",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "0.5px",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "60px",
    marginBottom: "40px",
    paddingBottom: "40px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    "@media (max-width: 1024px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "40px",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "40px",
    },
  },
  footerSection: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "700",
    marginBottom: "10px",
    fontFamily: "'Inter', sans-serif",
  },
  socialIcons: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  socialIcon: {
    color: "#888",
    fontSize: "24px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      color: "#EEBC1D",
      transform: "translateY(-2px)",
    },
  },
  footerLink: {
    color: "#888",
    fontSize: "0.9rem",
    textDecoration: "none",
    transition: "color 0.3s ease",
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    "&:hover": {
      color: "#EEBC1D",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <Container>
        {/* Footer Grid */}
        <div className={classes.footerGrid}>
          {/* Social Media */}
          <div className={classes.footerSection}>
            <div className={classes.sectionTitle}>Follow us on social media</div>
            <div className={classes.socialIcons}>
              <Facebook className={classes.socialIcon} />
              <Telegram className={classes.socialIcon} />
              <FaDiscord className={classes.socialIcon} />
              <FaSlack className={classes.socialIcon} />
            </div>
          </div>

          {/* Explore */}
          <div className={classes.footerSection}>
            <div className={classes.sectionTitle}>Explore</div>
            <a href="/" className={classes.footerLink}>Home</a>
            <a href="/marketplace" className={classes.footerLink}>Marketplace</a>
            <a href="/marketplace/strategies" className={classes.footerLink}>Trading Strategies</a>
          </div>

          {/* Services */}
          <div className={classes.footerSection}>
            <div className={classes.sectionTitle}>Services</div>
            <a href="/marketplace/signals" className={classes.footerLink}>Signals</a>
            <a href="/marketplace/copybots" className={classes.footerLink}>Copy Bots</a>
            <a href="/pricing" className={classes.footerLink}>Pricing</a>
          </div>

          {/* Company */}
          <div className={classes.footerSection}>
            <div className={classes.sectionTitle}>Company</div>
            <a href="/about" className={classes.footerLink}>About CyrionTrade</a>
            <a href="/contact" className={classes.footerLink}>Contact Us</a>
            <a href="/terms" className={classes.footerLink}>Terms of Service</a>
          </div>
        </div>

        {/* Copyright */}
        <div className={classes.footerContent}>
          <span className={classes.copyright}>
            ©2017 - {currentYear} Copyright by{" "}
          </span>
          <span className={classes.brand}>CyrionTrade™</span>
          <span className={classes.copyright}> - All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
