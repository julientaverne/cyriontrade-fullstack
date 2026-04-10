import React, { useState } from 'react';
import { Box, Typography, CircularProgress, IconButton } from '@material-ui/core';
import { AccountBalanceWallet, Close } from '@material-ui/icons';
import { CryptoState } from '../../CryptoContext';
import { authAPI } from '../../services/api';

const WalletConnection = ({ userData, onComplete, onBack }) => {
  const [connecting, setConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const { setAlert } = CryptoState();

  // Debug logging

  // Safety check
  if (!userData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
        <p>Loading user data...</p>
      </div>
    );
  }

  // Wallet options
  const wallets = [
    { name: 'MetaMask', icon: '/wallet/metamask.png', type: 'metamask', available: true },
  ];

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  // Handle wallet selection
  const handleWalletSelect = (wallet) => {
    if (!wallet.available) {
      setAlert({
        open: true,
        message: `${wallet.name} integration coming soon!`,
        type: 'info'
      });
      return;
    }
    setSelectedWallet(wallet);
    if (wallet.type === 'metamask') {
      connectWallet();
    }
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setAlert({
        open: true,
        message: 'MetaMask is not installed.',
        type: 'error'
      });
      return;
    }

    setConnecting(true);

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask.');
      }

      const address = accounts[0];

      // Complete registration with wallet address
      await completeRegistration(address);

    } catch (error) {
      console.error('Wallet connection error:', error);
      
      let errorMessage = 'Failed to connect wallet';
      
      if (error.code === 4001) {
        errorMessage = 'Wallet connection rejected by user';
      } else if (error.code === -32002) {
        errorMessage = 'Wallet connection request already pending';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setAlert({
        open: true,
        message: errorMessage,
        type: 'error'
      });
      
      setSelectedWallet(null);
    } finally {
      setConnecting(false);
    }
  };

  // Complete registration with wallet address
  const completeRegistration = async (address) => {
    try {
      const { data } = await authAPI.completeSignup(
        userData.uid,
        address,
        null // signature can be added later for additional security
      );

      // Add $99 welcome bonus
      try {
        const { bonusAPI } = require('../../services/api');
        await bonusAPI.createBonus({
          amount: 99,
          type: 'welcome',
          description: 'Welcome bonus for connecting wallet'
        });
        
        setAlert({
          open: true,
          message: '🎉 Wallet connected successfully! $99 bonus added to your account!',
          type: 'success'
        });
      } catch (bonusError) {
        console.error('Bonus error:', bonusError);
        // Still show success even if bonus fails
        setAlert({
          open: true,
          message: data.message || 'Wallet connected successfully!',
          type: 'success'
        });
      }

      // Mark wallet as connected in localStorage (per user)
      if (userData.uid) {
        localStorage.setItem(`walletConnected_${userData.uid}`, 'true');
      }

      // Call completion callback
      onComplete({
        walletAddress: address,
        registrationComplete: true
      });

      // Call completion callback with wallet data
      onComplete({
        walletAddress: address,
        registrationComplete: true,
        walletConnected: true
      });

    } catch (error) {
      console.error('Complete registration error:', error);
      
      const errorMessage = error.response?.data?.error || 'Failed to complete registration';
      
      setAlert({
        open: true,
        message: errorMessage,
        type: 'error'
      });
    }
  };



  return (
    <div
      className="wallet-connection-container"
      style={{
        background: 'linear-gradient(135deg, #14161a 0%, #1a1d24 100%)',
        maxHeight: '90vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        className="wallet-connection-scroll"
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          overflow: 'hidden',
        }}
      >
      {/* Close Button */}
      {onBack && (
        <IconButton
          onClick={onBack}
          style={{
            position: 'absolute',
            right: '15px',
            top: '15px',
            color: '#888',
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FF6B35';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#888';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          <Close />
        </IconButton>
      )}

      {/* Header Section */}
      <Box 
        style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.05) 100%)',
          padding: '40px 30px 30px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
          position: 'relative',
          overflow: 'visible'
        }}
      >
        {/* Decorative elements */}
        <Box
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)',
            borderRadius: '50%'
          }}
        />
        <Box
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(247, 147, 30, 0.08) 0%, transparent 70%)',
            borderRadius: '50%'
          }}
        />

        {/* Wallet Icon */}
        <Box
          style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 15px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
            position: 'relative',
            zIndex: 1
          }}
        >
          <AccountBalanceWallet 
            style={{ 
              fontSize: '2rem', 
              color: '#fff'
            }} 
          />
        </Box>

        <Typography 
          style={{ 
            color: '#fff', 
            fontWeight: '600',
            marginBottom: '8px',
            fontFamily: "'Roboto', 'Arial', sans-serif",
            fontSize: '1.4rem',
            letterSpacing: '0.3px',
            position: 'relative',
            zIndex: 1
          }}
        >
          Connect Your Wallet
        </Typography>
        <Typography 
          style={{ 
            color: '#bbb',
            fontSize: '0.95rem',
            fontFamily: "'Roboto', 'Arial', sans-serif",
            fontWeight: '300',
            position: 'relative',
            zIndex: 1
          }}
        >
          Securely connect your wallet to continue
        </Typography>
      </Box>

      {/* Content Section */}
      <Box style={{ padding: '30px' }}>




        {/* MetaMask Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Box
            onClick={() => handleWalletSelect(wallets[0])}
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              borderRadius: '12px',
              padding: '0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(255, 107, 53, 0.3)',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '350px',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 107, 53, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 107, 53, 0.3)';
            }}
          >
            {/* Left side - MetaMask Icon */}
            <Box
              style={{
                width: '70px',
                height: '70px',
                background: 'rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <img 
                src="/wallet/metamask.png" 
                alt="MetaMask"
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  filter: 'contrast(1.1) saturate(0.8) hue-rotate(-10deg)',
                }}
              />
            </Box>

            {/* Right side - Text */}
            <Box
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px',
              }}
            >
              <Typography
                style={{
                  color: '#8B2500',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '1px',
                  marginBottom: '2px',
                }}
              >
                CONNECT WITH
              </Typography>
              <Typography
                style={{
                  color: '#FFFFFF',
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '1px',
                }}
              >
                METAMASK
              </Typography>
            </Box>
          </Box>
        </div>

        {/* Connecting Status */}
        {connecting && (
          <Box 
            style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.05) 100%)',
              border: '1px solid rgba(255, 107, 53, 0.3)',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              marginBottom: '20px',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          >
            <CircularProgress size={24} style={{ color: '#FF6B35' }} />
            <Typography style={{ color: '#FF6B35', fontSize: '1rem', fontWeight: '700', fontFamily: "'Inter', sans-serif" }}>
              Connecting to {selectedWallet?.name}...
            </Typography>
          </Box>
        )}

        {/* Security Info - Embedded Text Style */}
        <Typography 
          style={{ 
            color: '#999', 
            fontSize: '0.8rem',
            textAlign: 'center',
            lineHeight: '1.4',
            fontFamily: "'Roboto', 'Arial', sans-serif",
            fontWeight: '300',
            marginTop: '20px',
            padding: '0 20px',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
            opacity: 0.9
          }}
        >
          Your wallet connection is secure and encrypted. We never store your private keys or seed phrases.
        </Typography>
      </Box>

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }
        `}
      </style>
      </div>
    </div>
  );
};

export default WalletConnection;