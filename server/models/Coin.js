const axios = require('axios');

class Coin {
  constructor(data) {
    this.id = data.id;
    this.symbol = data.symbol;
    this.name = data.name;
    this.image = data.image;
    this.current_price = data.current_price;
    this.market_cap = data.market_cap;
    this.market_cap_rank = data.market_cap_rank;
    this.price_change_percentage_24h = data.price_change_percentage_24h;
  }

  /**
   * Get API URL with key
   */
  static getApiUrl(endpoint) {
    const API_KEY = process.env.COINGECKO_API_KEY;
    if (API_KEY) {
      return `${endpoint}${endpoint.includes('?') ? '&' : '?'}x_cg_demo_api_key=${API_KEY}`;
    }
    return endpoint;
  }

  /**
   * Fetch all coins by currency
   */
  static async fetchAll(currency = 'USD') {
    try {
      const url = this.getApiUrl(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      
      const { data } = await axios.get(url);
      return data.map(coinData => new Coin(coinData));
    } catch (error) {
      console.error('Error fetching coins:', error.message);
      throw new Error('Failed to fetch coin list');
    }
  }

  /**
   * Fetch single coin by ID
   */
  static async fetchById(coinId) {
    try {
      if (!coinId || typeof coinId !== 'string') {
        throw new Error('Invalid coin ID');
      }
      
      const url = this.getApiUrl(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.error || error.message;
      
      console.error(`[Coin Model] Error fetching coin (${coinId}):`, { status, message });
      
      if (status === 404) throw new Error('Coin not found');
      if (status === 429) throw new Error('CoinGecko Rate limit exceeded. Please wait a moment.');
      
      throw new Error(message || 'Failed to fetch coin details');
    }
  }

  /**
   * Fetch historical chart data
   */
  static async fetchChartData(coinId, days = 365, currency = 'USD') {
    try {
      if (!coinId || typeof coinId !== 'string') {
        throw new Error('Invalid coin ID');
      }
      
      const url = this.getApiUrl(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
      );
      
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.error || error.message;

      console.error(`[Coin Model] Error fetching chart data (${coinId}):`, { status, message });

      if (status === 429) throw new Error('Rate limit exceeded. Try again in a minute.');
      throw new Error(message || 'Failed to fetch chart data');
    }
  }

  /**
   * Fetch trending coins
   */
  static async fetchTrending(currency = 'USD') {
    try {
      const url = this.getApiUrl(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      );
      
      const { data } = await axios.get(url);
      return data.map(coinData => new Coin(coinData));
    } catch (error) {
      console.error('Error fetching trending coins:', error.message);
      throw new Error('Failed to fetch trending coins');
    }
  }

  /**
   * Validate coin ID format
   */
  static isValidId(coinId) {
    return typeof coinId === 'string' && 
           coinId.length > 0 && 
           coinId.length < 100 &&
           /^[a-z0-9-]+$/.test(coinId);
  }

  /**
   * Convert to JSON
   */
  toJSON() {
    return {
      id: this.id,
      symbol: this.symbol,
      name: this.name,
      image: this.image,
      current_price: this.current_price,
      market_cap: this.market_cap,
      market_cap_rank: this.market_cap_rank,
      price_change_percentage_24h: this.price_change_percentage_24h
    };
  }
}

module.exports = Coin;
