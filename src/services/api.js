import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout
});

// Add auth token to requests if available
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear user data and reload
        const errorCode = data.code;
        
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        
        // Check if it's a session expiration
        if (errorCode === 'SESSION_EXPIRED' || errorCode === 'SESSION_REVOKED') {
          console.error('Session expired. Redirecting to login...');
          
          // Dispatch custom event for session expiration
          window.dispatchEvent(new CustomEvent('sessionExpired', { 
            detail: { message: data.error } 
          }));
          
          // Reload page to clear state and show login
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.error('Authentication failed:', data.error);
        }
      } else if (status === 403) {
        console.error('Access forbidden:', data.error);
      } else if (status === 404) {
        console.error('Resource not found:', data.error);
      } else if (status === 500) {
        console.error('Server error:', data.error);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error: Unable to reach server');
      error.message = 'Network error. Server is not reachable. Please ensure the server is running.';
    } else {
      // Something else happened
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (email, password, displayName) => api.post('/auth/signup', { email, password, displayName }),
  completeSignup: (userId, walletAddress, signature) => api.post('/auth/complete-signup', { userId, walletAddress, signature }),
  logout: () => api.post('/auth/logout'),
  resetPassword: (email) => api.post('/auth/reset-password', { email }),
  getConfig: () => api.get('/auth/config'),
  verifyToken: () => api.get('/auth/verify'),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
};

// Watchlist API
export const watchlistAPI = {
  getWatchlist: () => api.get('/watchlist'),
  addCoin: (coinId) => api.post('/watchlist', { coinId }),
  removeCoin: (coinId) => api.delete(`/watchlist/${coinId}`),
};

// Crypto API
export const cryptoAPI = {
  getCoinList: (currency = 'USD') => api.get('/crypto/coins', { params: { currency } }),
  getSingleCoin: (id) => api.get(`/crypto/coin/${id}`),
  getHistoricalChart: (id, days = 365, currency = 'USD') => 
    api.get(`/crypto/chart/${id}`, { params: { days, currency } }),
  getTrendingCoins: (currency = 'USD') => api.get('/crypto/trending', { params: { currency } }),
};

// Referral API
export const referralAPI = {
  getReferralCode: () => api.get('/referral/code'),
  getReferralStats: () => api.get('/referral/stats'),
  getReferrals: () => api.get('/referral/list'),
  applyReferralCode: (referralCode, newUserId) => api.post('/referral/apply', { referralCode, newUserId }),
  completeReferral: (referredUserId) => api.post('/referral/complete', { referredUserId }),
};

// Bonus API
export const bonusAPI = {
  getBonuses: () => api.get('/bonus/list'),
  getActiveBonuses: () => api.get('/bonus/active'),
  getBonusBalance: () => api.get('/bonus/balance'),
  getBonusStats: () => api.get('/bonus/stats'),
  claimBonus: (bonusId) => api.post(`/bonus/claim/${bonusId}`),
  createBonus: (data) => api.post('/bonus/create', data),
};

export default api;
