import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button, Grid } from '@material-ui/core';
import { CardGiftcard } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  adsContainer: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '20px',
    fontFamily: "'Inter', sans-serif",
  },
  adCard: {
    background: 'linear-gradient(145deg, rgba(20, 22, 26, 0.95) 0%, rgba(30, 35, 41, 0.95) 100%)',
    borderRadius: '20px',
    padding: '25px',
    border: '1px solid rgba(238, 188, 29, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 30px rgba(238, 188, 29, 0.3)',
      borderColor: '#EEBC1D',
    },
  },
  adHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
  },
  adLogo: {
    width: '50px',
    height: '50px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#000',
  },
  adPlatformName: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#fff',
    fontFamily: "'Orbitron', sans-serif",
  },
  adBonusBadge: {
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    color: '#000',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '1rem',
    fontWeight: '700',
    marginBottom: '15px',
    display: 'inline-block',
    fontFamily: "'Orbitron', sans-serif",
  },
  adDescription: {
    fontSize: '0.95rem',
    color: '#aaa',
    lineHeight: '1.6',
    marginBottom: '15px',
    flex: 1,
    fontFamily: "'Inter', sans-serif",
  },
  adFeatures: {
    marginBottom: '15px',
  },
  adFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
    fontSize: '0.9rem',
    color: '#ccc',
    '& svg': {
      fontSize: '1rem',
      color: '#EEBC1D',
    },
  },
  adButton: {
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    color: '#000',
    padding: '12px 24px',
    borderRadius: '10px',
    fontWeight: '700',
    width: '100%',
    '&:hover': {
      background: 'linear-gradient(135deg, #FFD700 0%, #EEBC1D 100%)',
    },
  },
}));

const TradingPlatformAds = () => {
  const classes = useStyles();
  const [ads] = useState([
    {
      id: 1,
      platform: 'Binance',
      logo: 'B',
      bonus: 'Get 100 USDT',
      description: 'World\'s largest crypto exchange. Trade 350+ cryptocurrencies with the lowest fees.',
      features: [
        'Up to 100 USDT welcome bonus',
        '0.1% trading fees',
        'Advanced trading tools',
      ],
      link: 'https://www.binance.com/en/register',
    },
    {
      id: 2,
      platform: 'Bybit',
      logo: 'BY',
      bonus: 'Get 30 USDT',
      description: 'Leading derivatives exchange with up to 100x leverage and lightning-fast execution.',
      features: [
        '30 USDT deposit bonus',
        'Copy trading available',
        '24/7 customer support',
      ],
      link: 'https://www.bybit.com/en-US/invite',
    },
    {
      id: 3,
      platform: 'OKX',
      logo: 'OKX',
      bonus: 'Get 50 USDT',
      description: 'Comprehensive crypto platform with spot, futures, and DeFi all in one place.',
      features: [
        '50 USDT welcome bonus',
        'Earn up to 20% APY',
        'Web3 wallet included',
      ],
      link: 'https://www.okx.com/join',
    },
    {
      id: 4,
      platform: 'KuCoin',
      logo: 'KC',
      bonus: 'Get 20 USDT',
      description: 'People\'s exchange with 700+ coins and tokens. Discover new gems early.',
      features: [
        '20 USDT trading bonus',
        'Low 0.1% fees',
        'Passive income options',
      ],
      link: 'https://www.kucoin.com/ucenter/signup',
    },
    {
      id: 5,
      platform: 'Gate.io',
      logo: 'GT',
      bonus: 'Get 15 USDT',
      description: 'Trusted since 2013. Access to 1,400+ cryptocurrencies and innovative products.',
      features: [
        '15 USDT welcome reward',
        'Copy trading & bots',
        'High liquidity',
      ],
      link: 'https://www.gate.io/signup',
    },
    {
      id: 6,
      platform: 'MEXC',
      logo: 'MX',
      bonus: 'Get 10 USDT',
      description: 'Fast-growing exchange with early access to new tokens and airdrops.',
      features: [
        '10 USDT bonus + 1,000 USDT',
        'New token listings',
        'Zero fees on select pairs',
      ],
      link: 'https://www.mexc.com/register',
    },
  ]);

  const handleAdClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box className={classes.adsContainer}>
      <Typography className={classes.sectionTitle}>
        🎁 Exclusive Trading Platform Offers
      </Typography>
      
      <Grid container spacing={3}>
        {ads.map((ad) => (
          <Grid item xs={12} sm={6} md={4} key={ad.id}>
            <Box 
              className={classes.adCard}
              onClick={() => handleAdClick(ad.link)}
            >
              <Box className={classes.adHeader}>
                <Box className={classes.adLogo}>{ad.logo}</Box>
                <Typography className={classes.adPlatformName}>
                  {ad.platform}
                </Typography>
              </Box>

              <Typography className={classes.adBonusBadge}>
                {ad.bonus}
              </Typography>

              <Typography className={classes.adDescription}>
                {ad.description}
              </Typography>

              <Box className={classes.adFeatures}>
                {ad.features.map((feature, index) => (
                  <Box key={index} className={classes.adFeature}>
                    <CardGiftcard />
                    <span>{feature}</span>
                  </Box>
                ))}
              </Box>

              <Button className={classes.adButton}>
                Claim Bonus Now
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TradingPlatformAds;
