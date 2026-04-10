import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { Close as CloseIcon, Add as AddIcon } from "@material-ui/icons";
import { CryptoState } from "../../CryptoContext";
import { authAPI, userAPI, bonusAPI } from "../../services/api";


const useStyles = makeStyles((theme) => ({
  container: {
    width: 380,
    padding: 0,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
    backgroundColor: "#14161a",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "92%",
    overflowY: "auto",
  },
  profileHeader: {
    width: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "30px 25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  logout: {
    width: "100%",
    backgroundColor: "#EEBC1D",
    padding: "15px",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#000",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#ffd700",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(238, 188, 29, 0.4)",
    },
  },
  picture: {
    width: 100,
    height: 100,
    cursor: "pointer",
    border: "4px solid #EEBC1D",
    objectFit: "contain",
    boxShadow: "0 4px 15px rgba(238, 188, 29, 0.3)",
  },
  watchlist: {
    flex: 1,
    width: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  watchlistHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#888",
    fontSize: 14,
  },
  coin: {
    padding: "15px 18px",
    borderRadius: 12,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e2329 0%, #2a2e37 100%)",
    border: "1px solid #2a2e37",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      transform: "translateX(-5px)",
      border: "1px solid #EEBC1D",
      boxShadow: "0 4px 15px rgba(238, 188, 29, 0.2)",
    },
  },
  coinLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  coinName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  coinSymbol: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
  },
  coinRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  coinPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EEBC1D",
  },
  deleteButton: {
    cursor: "pointer",
    color: "#ff4444",
    transition: "all 0.2s ease",
    padding: 8,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "rgba(255, 68, 68, 0.1)",
      transform: "scale(1.1)",
    },
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    wordWrap: "break-word",
    maxWidth: "100%",
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
  walletSection: {
    width: "100%",
    padding: "20px 25px",
    background: "linear-gradient(135deg, rgba(238, 188, 29, 0.1) 0%, rgba(238, 188, 29, 0.05) 100%)",
    borderTop: "1px solid rgba(238, 188, 29, 0.2)",
    borderBottom: "1px solid rgba(238, 188, 29, 0.2)",
  },
  walletHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  walletCard: {
    background: "linear-gradient(135deg, #1e2329 0%, #2a2e37 100%)",
    border: "1px solid rgba(238, 188, 29, 0.3)",
    borderRadius: 12,
    padding: "15px",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  walletIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    objectFit: "contain",
    background: "rgba(255, 255, 255, 0.05)",
    padding: 5,
    mixBlendMode: "multiply",
    filter: "contrast(1.2) saturate(1.1)",
  },
  walletInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  walletType: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  walletAddress: {
    fontSize: 12,
    color: "#EEBC1D",
    fontFamily: "monospace",
  },
  disconnectButton: {
    minWidth: "auto",
    padding: "6px 8px",
    color: "#ff4444",
    border: "1px solid #ff4444",
    borderRadius: 8,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 68, 68, 0.1)",
      transform: "scale(1.05)",
    },
  },
  noWallet: {
    textAlign: "center",
    padding: "15px",
    color: "#888",
    fontSize: 13,
  },
  addWalletButton: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    color: "#000",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "all 0.3s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #FFD700 0%, #EEBC1D 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(238, 188, 29, 0.4)",
    },
  },
  bonusSection: {
    width: "100%",
    padding: "20px 25px",
    background: "linear-gradient(135deg, rgba(238, 188, 29, 0.1) 0%, rgba(238, 188, 29, 0.05) 100%)",
    borderTop: "1px solid rgba(238, 188, 29, 0.2)",
  },
  bonusHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  bonusCard: {
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    borderRadius: 12,
    padding: "20px",
    textAlign: "center",
  },
  bonusAmount: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000",
    fontFamily: "'Orbitron', sans-serif",
    marginBottom: 5,
  },
  bonusLabel: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
}));

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const [bonusBalance, setBonusBalance] = useState(0);
  const { user, setUser, setAlert, setWalletModalOpen } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Fetch user profile data including wallet info and bonus balance
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && state.right) {
        try {
          const [profileRes, bonusRes] = await Promise.all([
            userAPI.getProfile(),
            bonusAPI.getBonusBalance()
          ]);
          
          if (profileRes.data.walletAddress && profileRes.data.walletConnected) {
            setWalletData({
              address: profileRes.data.walletAddress,
              type: 'MetaMask',
              icon: '/wallet/metamask.png'
            });
          }
          
          setBonusBalance(bonusRes.data.balance || 0);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          setBonusBalance(0);
        }
      }
    };

    fetchUserProfile();
  }, [user, state.right]);

  // Shorten wallet address for display
  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      setLoading(true);
      
      // Update user profile to remove wallet connection
      await userAPI.updateProfile({
        walletAddress: null,
        walletConnected: false
      });

      setWalletData(null);
      
      setAlert({
        open: true,
        type: "success",
        message: "Wallet disconnected successfully!",
      });
    } catch (error) {
      console.error('Disconnect wallet error:', error);
      setAlert({
        open: true,
        type: "error",
        message: "Failed to disconnect wallet. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle add wallet button click
  const handleAddWallet = () => {
    // Close the sidebar
    setState({ ...state, right: false });
    
    // Open wallet modal after a short delay
    setTimeout(() => {
      setWalletModalOpen(true);
    }, 300);
  };

  const logOut = async () => {
    setLoggingOut(true);
    
    // Add a smooth delay for animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      await authAPI.logout();
      
      // Clear local storage (including user-specific items)
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userDisplayName');
      
      // Clear user-specific wallet and modal preferences
      if (user?.uid) {
        localStorage.removeItem(`walletConnected_${user.uid}`);
        localStorage.removeItem(`hideWelcomeModal_${user.uid}`);
      }
      
      // Clear user state
      setUser(null);
      
      setAlert({
        open: true,
        type: "success",
        message: "Logout Successful!",
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local data even if server call fails
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userDisplayName');
      
      // Clear user-specific items
      if (user?.uid) {
        localStorage.removeItem(`walletConnected_${user.uid}`);
        localStorage.removeItem(`hideWelcomeModal_${user.uid}`);
      }
      
      setUser(null);
    }

    setLoggingOut(false);
    toggleDrawer();
  };



  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <div className={classes.profileHeader}>
                  <Avatar
                    className={classes.picture}
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                  />
                  <div className={classes.userName}>
                    {user.displayName || "Crypto Trader"}
                  </div>
                  <div className={classes.userEmail}>
                    {user.email}
                  </div>
                </div>

                {/* Wallet Connection Section */}
                <div className={classes.walletSection}>
                  <div className={classes.walletHeader}>
                    Wallet Connection
                  </div>
                  
                  {walletData ? (
                    <div className={classes.walletCard}>
                      <img 
                        src={walletData.icon} 
                        alt={walletData.type}
                        className={classes.walletIcon}
                      />
                      <div className={classes.walletInfo}>
                        <div className={classes.walletType}>
                          {walletData.type}
                        </div>
                        <div className={classes.walletAddress}>
                          {shortenAddress(walletData.address)}
                        </div>
                      </div>
                      <IconButton
                        size="small"
                        className={classes.disconnectButton}
                        onClick={disconnectWallet}
                        disabled={loading}
                        title="Disconnect Wallet"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </div>
                  ) : (
                    <Button
                      className={classes.addWalletButton}
                      onClick={handleAddWallet}
                    >
                      <AddIcon />
                      Add Wallet
                    </Button>
                  )}
                </div>

                {/* Bonus Balance Section */}
                <div className={classes.bonusSection}>
                  <div className={classes.bonusHeader}>
                    Bonus Balance
                  </div>
                  <div className={classes.bonusCard}>
                    <div className={classes.bonusAmount}>
                      ${bonusBalance.toFixed(2)}
                    </div>
                    <div className={classes.bonusLabel}>
                      Available Rewards
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
                disabled={loggingOut}
                style={{
                  opacity: loggingOut ? 0.7 : 1,
                  transform: loggingOut ? 'scale(0.98)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                }}
              >
                {loggingOut ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '3px solid #000',
                        borderTop: '3px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                      }}
                    />
                    Logging out...
                  </div>
                ) : (
                  'LOGOUT'
                )}
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
