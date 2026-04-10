import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Snackbar,
  CircularProgress
} from '@material-ui/core';
import {
  FileCopy,
  Share,
  People,
  AttachMoney,
  TrendingUp,
  CardGiftcard
} from '@material-ui/icons';
import { CryptoState } from '../../CryptoContext';
import { referralAPI, bonusAPI } from '../../services/api';
import NotFoundPage from '../../Pages/NotFoundPage';
import DashboardAds from '../Ads/DashboardAds';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    paddingTop: '100px',
    paddingBottom: '80px',
    background: 'transparent',
  },
  header: {
    marginBottom: '50px',
    textAlign: 'center',
    position: 'relative',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 50%, #EEBC1D 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: "'Orbitron', sans-serif",
    marginBottom: '12px',
    letterSpacing: '2px',
    textShadow: '0 0 40px rgba(238, 188, 29, 0.3)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    },
  },
  subtitle: {
    fontSize: '1.15rem',
    color: '#999',
    fontFamily: "'Inter', sans-serif",
    fontWeight: '400',
    letterSpacing: '0.5px',
  },
  statsGrid: {
    marginBottom: '50px',
  },
  statCard: {
    background: 'linear-gradient(145deg, rgba(15, 17, 21, 0.98) 0%, rgba(25, 28, 33, 0.98) 100%)',
    borderRadius: '20px',
    padding: '32px 28px',
    border: '1px solid rgba(238, 188, 29, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, transparent, #EEBC1D, transparent)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
    },
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 40px rgba(238, 188, 29, 0.25)',
      borderColor: 'rgba(238, 188, 29, 0.4)',
      '&::before': {
        opacity: 1,
      },
    },
  },
  statIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '18px',
    boxShadow: '0 4px 15px rgba(238, 188, 29, 0.3)',
    '& svg': {
      fontSize: '1.8rem',
      color: '#000',
    },
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#888',
    marginBottom: '10px',
    fontFamily: "'Inter', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '600',
  },
  statValue: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#fff',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '1px',
  },
  referralCard: {
    background: 'linear-gradient(145deg, rgba(15, 17, 21, 0.98) 0%, rgba(25, 28, 33, 0.98) 100%)',
    borderRadius: '24px',
    padding: '50px',
    border: '1px solid rgba(238, 188, 29, 0.15)',
    marginBottom: '40px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
  referralTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '30px',
    fontFamily: "'Inter', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
    opacity: 0.9,
  },
  referralCodeBox: {
    background: 'linear-gradient(135deg, rgba(238, 188, 29, 0.08) 0%, rgba(255, 215, 0, 0.05) 100%)',
    border: '2px solid rgba(238, 188, 29, 0.3)',
    borderRadius: '16px',
    padding: '28px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: 'rgba(238, 188, 29, 0.5)',
      background: 'linear-gradient(135deg, rgba(238, 188, 29, 0.12) 0%, rgba(255, 215, 0, 0.08) 100%)',
      boxShadow: '0 4px 20px rgba(238, 188, 29, 0.15)',
    },
  },
  referralCode: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#EEBC1D',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '4px',
    textShadow: '0 2px 10px rgba(238, 188, 29, 0.3)',
  },
  copyButton: {
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    color: '#000',
    padding: '14px 32px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '0.95rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(238, 188, 29, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #FFD700 0%, #EEBC1D 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(238, 188, 29, 0.4)',
    },
  },
  linkBox: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    padding: '18px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(238, 188, 29, 0.2)',
    },
  },
  linkText: {
    flex: 1,
    color: '#999',
    fontSize: '0.95rem',
    fontFamily: "'Roboto Mono', monospace",
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    letterSpacing: '0.5px',
  },
  bonusCard: {
    background: 'linear-gradient(135deg, rgba(238, 188, 29, 0.12) 0%, rgba(255, 215, 0, 0.08) 100%)',
    borderRadius: '24px',
    padding: '45px',
    border: '2px solid rgba(238, 188, 29, 0.25)',
    marginBottom: '50px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(238, 188, 29, 0.15)',
    transition: 'all 0.3s ease',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(238, 188, 29, 0.1) 0%, transparent 70%)',
      animation: '$pulse 4s ease-in-out infinite',
    },
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 12px 48px rgba(238, 188, 29, 0.25)',
    },
  },
  '@keyframes pulse': {
    '0%, 100%': {
      transform: 'scale(1)',
      opacity: 0.5,
    },
    '50%': {
      transform: 'scale(1.1)',
      opacity: 0.8,
    },
  },
  bonusAmount: {
    fontSize: '4rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: "'Orbitron', sans-serif",
    marginBottom: '12px',
    letterSpacing: '2px',
    textShadow: '0 4px 20px rgba(238, 188, 29, 0.4)',
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
    },
  },
  bonusLabel: {
    fontSize: '1.15rem',
    color: '#bbb',
    fontFamily: "'Inter', sans-serif",
    fontWeight: '500',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    position: 'relative',
    zIndex: 1,
  },
  howItWorks: {
    background: 'linear-gradient(145deg, rgba(15, 17, 21, 0.98) 0%, rgba(25, 28, 33, 0.98) 100%)',
    borderRadius: '24px',
    padding: '50px',
    border: '1px solid rgba(238, 188, 29, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    [theme.breakpoints.down('sm')]: {
      padding: '35px 25px',
    },
  },
  step: {
    display: 'flex',
    gap: '24px',
    marginBottom: '32px',
    padding: '20px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.02)',
    transition: 'all 0.3s ease',
    '&:last-child': {
      marginBottom: 0,
    },
    '&:hover': {
      background: 'rgba(238, 188, 29, 0.05)',
      transform: 'translateX(8px)',
    },
  },
  stepNumber: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#000',
    flexShrink: 0,
    boxShadow: '0 4px 15px rgba(238, 188, 29, 0.4)',
    fontFamily: "'Orbitron', sans-serif",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '8px',
    fontFamily: "'Inter', sans-serif",
    letterSpacing: '0.5px',
  },
  stepDescription: {
    fontSize: '1rem',
    color: '#999',
    lineHeight: '1.7',
    fontFamily: "'Inter', sans-serif",
  },
}));

const ReferralDashboard = () => {
  const classes = useStyles();
  const { user, setAlert } = CryptoState();
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    totalEarned: 0,
  });
  const [bonusBalance, setBonusBalance] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch referral code and stats
      const [codeRes, statsRes, bonusRes] = await Promise.all([
        referralAPI.getReferralCode(),
        referralAPI.getReferralStats(),
        bonusAPI.getBonusBalance(),
      ]);

      setReferralCode(codeRes.data.referralCode);
      setReferralLink(codeRes.data.referralLink);
      setStats(statsRes.data);
      setBonusBalance(bonusRes.data.balance);
    } catch (error) {
      console.error('Failed to fetch referral data:', error);
      // Set default values on error
      setStats({
        total: 0,
        completed: 0,
        pending: 0,
        totalEarned: 0,
      });
      setBonusBalance(0);
      
      // Only show error if it's not a 404 (no data yet)
      if (error.response?.status !== 404) {
        setAlert({
          open: true,
          message: 'Failed to load referral data',
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setSnackbarOpen(true);
    setAlert({
      open: true,
      message: `${label} copied to clipboard!`,
      type: 'success',
    });
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join CyrionTrade',
        text: `Join CyrionTrade using my referral code ${referralCode} and get $10 bonus!`,
        url: referralLink,
      });
    } else {
      copyToClipboard(referralLink, 'Referral link');
    }
  };

  if (!user) {
    return <NotFoundPage />;
  }

  if (loading) {
    return (
      <Container className={classes.container}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress style={{ color: '#EEBC1D' }} size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container className={classes.container} maxWidth="lg">
      {/* Header */}
      <Box className={classes.header}>
        <Typography className={classes.title}>
          Invite friends and earn rewards together
        </Typography>
        <Typography className={classes.subtitle}>
          Share your referral code and get rewarded for every successful referral
        </Typography>
      </Box>

      {/* Bonus Balance */}
      <Box className={classes.bonusCard} textAlign="center">
        <CardGiftcard style={{ fontSize: '3rem', color: '#EEBC1D', marginBottom: '15px' }} />
        <Typography className={classes.bonusAmount}>
          ${bonusBalance.toFixed(2)}
        </Typography>
        <Typography className={classes.bonusLabel}>
          Total Bonus Balance
        </Typography>
      </Box>

      {/* Dashboard Ads */}
      <DashboardAds />

      {/* Stats Grid */}
      <Grid container spacing={3} className={classes.statsGrid}>
        <Grid item xs={12} sm={6} md={3}>
          <Box className={classes.statCard}>
            <Box className={classes.statIcon}>
              <People />
            </Box>
            <Typography className={classes.statLabel}>Total Referrals</Typography>
            <Typography className={classes.statValue}>{stats.total}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box className={classes.statCard}>
            <Box className={classes.statIcon}>
              <TrendingUp />
            </Box>
            <Typography className={classes.statLabel}>Completed</Typography>
            <Typography className={classes.statValue}>{stats.completed}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box className={classes.statCard}>
            <Box className={classes.statIcon}>
              <AttachMoney />
            </Box>
            <Typography className={classes.statLabel}>Total Earned</Typography>
            <Typography className={classes.statValue}>${stats.totalEarned}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box className={classes.statCard}>
            <Box className={classes.statIcon}>
              <People />
            </Box>
            <Typography className={classes.statLabel}>Pending</Typography>
            <Typography className={classes.statValue}>{stats.pending}</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Referral Code Section */}
      <Box className={classes.referralCard}>
        <Typography className={classes.referralTitle}>
          Your Referral Code
        </Typography>
        
        <Box className={classes.referralCodeBox}>
          <Typography className={classes.referralCode}>
            {referralCode}
          </Typography>
          <Button
            className={classes.copyButton}
            startIcon={<FileCopy />}
            onClick={() => copyToClipboard(referralCode, 'Referral code')}
          >
            Copy Code
          </Button>
        </Box>

        <Box className={classes.linkBox}>
          <Typography className={classes.linkText}>
            {referralLink}
          </Typography>
          <Tooltip title="Copy Link">
            <IconButton
              size="small"
              onClick={() => copyToClipboard(referralLink, 'Referral link')}
              style={{ color: '#EEBC1D' }}
            >
              <FileCopy />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton
              size="small"
              onClick={shareReferral}
              style={{ color: '#EEBC1D' }}
            >
              <Share />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* How It Works */}
      <Box className={classes.howItWorks}>
        <Typography className={classes.referralTitle}>
          How It Works
        </Typography>

        <Box className={classes.step}>
          <Box className={classes.stepNumber}>1</Box>
          <Box className={classes.stepContent}>
            <Typography className={classes.stepTitle}>
              Share Your Code
            </Typography>
            <Typography className={classes.stepDescription}>
              Share your unique referral code or link with friends and family
            </Typography>
          </Box>
        </Box>

        <Box className={classes.step}>
          <Box className={classes.stepNumber}>2</Box>
          <Box className={classes.stepContent}>
            <Typography className={classes.stepTitle}>
              They Sign Up
            </Typography>
            <Typography className={classes.stepDescription}>
              Your friend signs up using your referral code and gets $10 welcome bonus
            </Typography>
          </Box>
        </Box>

        <Box className={classes.step}>
          <Box className={classes.stepNumber}>3</Box>
          <Box className={classes.stepContent}>
            <Typography className={classes.stepTitle}>
              You Both Earn
            </Typography>
            <Typography className={classes.stepDescription}>
              When they complete their first trade, you earn $25 referral bonus!
            </Typography>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      />
    </Container>
  );
};

export default ReferralDashboard;
