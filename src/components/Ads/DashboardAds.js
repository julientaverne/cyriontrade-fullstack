import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button, Grid, CircularProgress } from '@material-ui/core';
import axios from 'axios';

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
  adImage: {
    width: '100%',
    height: '180px',
    borderRadius: '15px',
    objectFit: 'cover',
    marginBottom: '15px',
  },
  adTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '10px',
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
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px',
  },
  noAdsMessage: {
    textAlign: 'center',
    color: '#888',
    padding: '40px',
    fontSize: '1rem',
  },
}));

const DashboardAds = () => {
  const classes = useStyles();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ads/active`);
      if (response.data.success) {
        setAds(response.data.ads);
      }
    } catch (error) {
      console.error('Failed to fetch ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress style={{ color: '#EEBC1D' }} />
      </Box>
    );
  }

  if (ads.length === 0) {
    return null; // Don't show anything if no ads
  }

  return (
    <Box className={classes.adsContainer}>
      <Typography className={classes.sectionTitle}>
        🎁 Special Offers
      </Typography>
      
      <Grid container spacing={3}>
        {ads.map((ad) => (
          <Grid item xs={12} sm={6} md={4} key={ad.id}>
            <Box 
              className={classes.adCard}
              onClick={() => handleAdClick(ad.buttonLink)}
            >
              {ad.imageUrl && (
                <img 
                  src={ad.imageUrl} 
                  alt={ad.title}
                  className={classes.adImage}
                />
              )}

              <Typography className={classes.adTitle}>
                {ad.title}
              </Typography>

              <Typography className={classes.adDescription}>
                {ad.description}
              </Typography>

              <Button className={classes.adButton}>
                {ad.buttonText}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardAds;
