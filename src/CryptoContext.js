import { createContext, useContext, useEffect, useState } from "react";
import { cryptoAPI } from "./services/api";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contextReady, setContextReady] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState(0); // 0 for login, 1 for signup
  const [walletModalOpen, setWalletModalOpen] = useState(false);



  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const userDisplayName = localStorage.getItem('userDisplayName');
    
    if (token && userId) {
      setUser({
        uid: userId,
        email: userEmail,
        displayName: userDisplayName,
      });
    }
    
    // Mark context as ready
    setContextReady(true);
  }, []);

  // Listen for session expiration events
  useEffect(() => {
    const handleSessionExpired = (event) => {
      setUser(null);
      setAlert({
        open: true,
        message: event.detail?.message || 'Your session has expired. Please login again.',
        type: 'warning',
      });
    };

    window.addEventListener('sessionExpired', handleSessionExpired);
    
    return () => {
      window.removeEventListener('sessionExpired', handleSessionExpired);
    };
  }, []);



  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await cryptoAPI.getCoinList(currency);
      setCoins(data);
    } catch (error) {
      console.error("Failed to fetch coins:", error);
      setAlert({
        open: true,
        message: error.message || "Failed to fetch coin data. Please ensure the server is running.",
        type: "error",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");

    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // Don't render children until context is ready
  if (!contextReady) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#14161a',
        color: '#EEBC1D'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        setAlert,
        user,
        setUser,
        coins,
        loading,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        walletModalOpen,
        setWalletModalOpen,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  const context = useContext(Crypto);
  
  // Provide default values if context is undefined
  if (!context) {
    console.warn('CryptoState must be used within a CryptoContext provider');
    return {
      currency: "USD",
      setCurrency: () => {},
      symbol: "$",
      alert: { open: false, message: "", type: "success" },
      setAlert: () => {},
      user: null,
      setUser: () => {},
      coins: [],
      loading: false,
    };
  }
  
  return context;
};
