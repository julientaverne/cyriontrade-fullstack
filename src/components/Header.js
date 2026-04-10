import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
} from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import WalletModal from "./Authentication/WalletModal";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const { user, walletModalOpen, setWalletModalOpen } = CryptoState();
  const history = useHistory();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar 
        color="transparent" 
        position="sticky" 
        elevation={0}
        style={{ 
          background: "linear-gradient(180deg, #0a0e27 0%, #14161a 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(238, 188, 29, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar style={{ 
            padding: "12px 0", 
            minHeight: "60px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "20px",
          }}>
            {/* Logo Section */}
            <div
              onClick={() => history.push(`/`)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "3px",
                transition: "all 0.3s ease",
                justifySelf: "start",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Logo Icon */}
              <div style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "900",
                fontSize: "20px",
                color: "#000",
                boxShadow: "0 4px 15px rgba(238, 188, 29, 0.4)",
                fontFamily: "'Orbitron', sans-serif",
              }}>
                C
              </div>
              
              {/* Logo Text */}
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "1.4rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 50%, #EEBC1D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.5px",
              }}>
                yrionTrade
              </div>
              
              {/* Pro Badge */}
              <div style={{
                padding: "3px 8px",
                borderRadius: "5px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontSize: "9px",
                fontWeight: "700",
                color: "#fff",
                letterSpacing: "0.5px",
                boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
              }}>
                PRO
              </div>
            </div>
            
            {/* Center Navigation Links */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "35px",
              justifySelf: "center",
            }}>
              {user && (
                <div
                  onClick={() => history.push("/")}
                  style={{
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    color: "#ccc",
                    transition: "all 0.3s ease",
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: "nowrap",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#EEBC1D";
                    e.currentTarget.style.backgroundColor = "rgba(238, 188, 29, 0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#ccc";
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Dashboard
                </div>
              )}
              
              <div
                onClick={() => history.push("/marketplace")}
                style={{
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#ccc",
                  transition: "all 0.3s ease",
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: "nowrap",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#EEBC1D";
                  e.currentTarget.style.backgroundColor = "rgba(238, 188, 29, 0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "#ccc";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Marketplace
              </div>
              
              <div
                onClick={() => history.push("/pricing")}
                style={{
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#ccc",
                  transition: "all 0.3s ease",
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: "nowrap",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#EEBC1D";
                  e.currentTarget.style.backgroundColor = "rgba(238, 188, 29, 0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "#ccc";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Pricing
              </div>
              
              <div
                onClick={() => history.push("/about")}
                style={{
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#ccc",
                  transition: "all 0.3s ease",
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: "nowrap",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#EEBC1D";
                  e.currentTarget.style.backgroundColor = "rgba(238, 188, 29, 0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "#ccc";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                About Us
              </div>
              
              {user && (
                <div
                  onClick={() => history.push("/referrals")}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: "8px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(238, 188, 29, 0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <img 
                    src="/icon-box.svg" 
                    alt="Referrals" 
                    style={{ 
                      width: "28px", 
                      height: "28px",
                      display: "block"
                    }}
                  />
                  {/* NEW Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      background: "linear-gradient(135deg, #ff4444 0%, #cc0000 100%)",
                      color: "#fff",
                      fontSize: "8px",
                      fontWeight: "800",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      letterSpacing: "0.5px",
                      fontFamily: "'Inter', sans-serif",
                      boxShadow: "0 2px 6px rgba(255, 68, 68, 0.4)",
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  >
                    NEW
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Section */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              justifySelf: "end",
            }}>
              {user ? (
                <UserSidebar />
              ) : (
                <AuthModal />
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Global Wallet Modal */}
      {user && (
        <WalletModal
          open={walletModalOpen}
          handleClose={() => setWalletModalOpen(false)}
        />
      )}
    </ThemeProvider>
  );
}

export default Header;
