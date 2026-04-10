import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { Close, CardGiftcard, TrendingUp, Security } from '@material-ui/icons';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      background: 'transparent',
      boxShadow: 'none',
      overflow: 'visible',
      maxWidth: '600px',
      width: '100%',
      margin: '20px',
      maxHeight: 'calc(100vh - 40px)',
    },
    '& .MuiDialogContent-root': {
      padding: 0,
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(238, 188, 29, 0.5)',
        borderRadius: '10px',
        '&:hover': {
          background: 'rgba(238, 188, 29, 0.7)',
        },
      },
    },
  },
  modalContent: {
    position: 'relative',
    background: 'linear-gradient(145deg, rgba(15, 17, 21, 0.98) 0%, rgba(25, 28, 33, 0.98) 100%)',
    borderRadius: '9px',
    padding: 0,
    overflow: 'hidden',
    border: '2px solid rgba(238, 188, 29, 0.3)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    minHeight: '400px',
  },

  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    color: '#fff',
    zIndex: 100,
    background: 'rgba(0, 0, 0, 0.5)',
    '&:hover': {
      background: 'rgba(238, 188, 29, 0.2)',
    },
  },
  imageSection: {
    position: 'relative',
    height: '280px',
    backgroundImage: 'url(/bg-activity-reward_day.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(15, 17, 21, 0.95) 100%)',
    },
  },
  bonusBadge: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
  },
  bonusAmount: {
    fontSize: '5rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '3px',
    textShadow: '0 4px 30px rgba(238, 188, 29, 0.6)',
    lineHeight: 1,
    marginBottom: '10px',
  },
  bonusLabel: {
    fontSize: '1.5rem',
    color: '#fff',
    fontWeight: '700',
    fontFamily: "'Inter', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
  },
  contentSection: {
    padding: '40px',
    '@media (max-width: 600px)': {
      padding: '30px 20px',
    },
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#fff',
    fontFamily: "'Orbitron', sans-serif",
    marginBottom: '15px',
    textAlign: 'center',
    letterSpacing: '1px',
  },
  description: {
    fontSize: '1.05rem',
    color: '#aaa',
    lineHeight: '1.7',
    textAlign: 'center',
    marginBottom: '30px',
    fontFamily: "'Inter', sans-serif",
  },
  featuresBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    background: 'rgba(238, 188, 29, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(238, 188, 29, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(238, 188, 29, 0.08)',
      borderColor: 'rgba(238, 188, 29, 0.2)',
    },
  },
  featureIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '& svg': {
      fontSize: '1.5rem',
      color: '#000',
    },
  },
  featureText: {
    fontSize: '1rem',
    color: '#ccc',
    fontFamily: "'Inter', sans-serif",
    fontWeight: '500',
  },
  actionButton: {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    color: '#000',
    fontSize: '1.1rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    borderRadius: '12px',
    boxShadow: '0 6px 25px rgba(238, 188, 29, 0.4)',
    transition: 'all 0.3s ease',
    fontFamily: "'Orbitron', sans-serif",
    '&:hover': {
      background: 'linear-gradient(135deg, #FFD700 0%, #EEBC1D 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(238, 188, 29, 0.5)',
    },
  },
  skipText: {
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '0.9rem',
    color: '#666',
    fontFamily: "'Inter', sans-serif",
  },
  checkboxContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '10px',
  },
  checkbox: {
    color: '#888',
    '&.Mui-checked': {
      color: '#EEBC1D',
    },
  },
  checkboxLabel: {
    fontSize: '0.95rem',
    color: '#aaa',
    fontFamily: "'Inter', sans-serif",
    userSelect: 'none',
  },
}));

const WelcomeModal = () => {
  const classes = useStyles();
  const { user, setAuthModalOpen, setAuthModalTab, setWalletModalOpen } = CryptoState();
  const [open, setOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Only check user-specific data, not browser-wide localStorage
    // Check if user has chosen not to see the modal again (per user)
    const hideModalKey = user ? `hideWelcomeModal_${user.uid}` : 'hideWelcomeModal';
    const hideModal = localStorage.getItem(hideModalKey);
    
    // Check if user already has wallet connected from server data
    // Don't rely on localStorage for walletConnected as it's browser-wide
    const walletConnected = user?.walletConnected;
    
    // Don't show modal if user chose to hide it or already connected wallet
    if (!hideModal && !walletConnected) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleClose = () => {
    // Save preference if checkbox is checked (per user)
    if (dontShowAgain && user) {
      localStorage.setItem(`hideWelcomeModal_${user.uid}`, 'true');
    }
    setOpen(false);
  };

  const handleGetStarted = () => {
    // Save preference if checkbox is checked (per user)
    if (dontShowAgain && user) {
      localStorage.setItem(`hideWelcomeModal_${user.uid}`, 'true');
    }
    
    setOpen(false);
    
    if (!user) {
      // Open the existing login modal
      setAuthModalTab(0); // Set to login tab
      setAuthModalOpen(true);
    } else {
      // Open the existing wallet modal
      setWalletModalOpen(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.dialog}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent className={classes.modalContent}>
        <IconButton
          className={classes.closeButton}
          onClick={handleClose}
          size="small"
        >
          <Close />
        </IconButton>

        {/* Image Section with Bonus */}
        <Box className={classes.imageSection}>
          <Box className={classes.bonusBadge}>
            <Typography className={classes.bonusAmount}>
              $99
            </Typography>
            <Typography className={classes.bonusLabel}>
              Welcome Bonus
            </Typography>
          </Box>
        </Box>

        {/* Content Section */}
        <Box className={classes.contentSection}>
          <Typography className={classes.title}>
            Start Trading Today!
          </Typography>
          
          <Typography className={classes.description}>
            Join thousands of traders and unlock exclusive rewards. Get started with our premium trading platform and receive up to $99 in welcome bonuses.
          </Typography>

          {/* Features */}
          <Box className={classes.featuresBox}>
            <Box className={classes.feature}>
              <Box className={classes.featureIcon}>
                <CardGiftcard />
              </Box>
              <Typography className={classes.featureText}>
                Instant $99 bonus on your first deposit
              </Typography>
            </Box>

            <Box className={classes.feature}>
              <Box className={classes.featureIcon}>
                <TrendingUp />
              </Box>
              <Typography className={classes.featureText}>
                Access to advanced AI-powered trading bots
              </Typography>
            </Box>

            <Box className={classes.feature}>
              <Box className={classes.featureIcon}>
                <Security />
              </Box>
              <Typography className={classes.featureText}>
                Bank-level security with 24/7 support
              </Typography>
            </Box>
          </Box>

          <Button
            className={classes.actionButton}
            onClick={handleGetStarted}
          >
            {user ? 'Connect Wallet' : 'Get Started Now'}
          </Button>

          {/* Don't Show Again Checkbox */}
          <Box className={classes.checkboxContainer}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className={classes.checkbox}
                />
              }
              label={
                <Typography className={classes.checkboxLabel}>
                  Don't show this again
                </Typography>
              }
            />
          </Box>

          <Typography className={classes.skipText}>
            Limited time offer - Don't miss out!
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
