import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  CircularProgress
} from '@material-ui/core';
import {
  CardGiftcard
} from '@material-ui/icons';
import { CryptoState } from '../../CryptoContext';
import { bonusAPI } from '../../services/api';
import NotFoundPage from '../../Pages/NotFoundPage';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
    paddingTop: '120px',
    paddingBottom: '60px',
    background: 'transparent',
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: "'Orbitron', sans-serif",
    marginBottom: '15px',
  },
  balanceCard: {
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    borderRadius: '24px',
    padding: '40px',
    textAlign: 'center',
    marginBottom: '40px',
    boxShadow: '0 10px 40px rgba(238, 188, 29, 0.3)',
  },
  balanceAmount: {
    fontSize: '4rem',
    fontWeight: '800',
    color: '#000',
    fontFamily: "'Orbitron', sans-serif",
    marginBottom: '10px',
  },
  balanceLabel: {
    fontSize: '1.2rem',
    color: '#333',
    fontWeight: '600',
    fontFamily: "'Inter', sans-serif",
  },
  bonusCard: {
    background: 'linear-gradient(145deg, rgba(20, 22, 26, 0.95) 0%, rgba(30, 35, 41, 0.95) 100%)',
    borderRadius: '20px',
    padding: '25px',
    border: '1px solid rgba(238, 188, 29, 0.2)',
    height: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 30px rgba(238, 188, 29, 0.2)',
    },
  },
  bonusHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  bonusType: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  bonusIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      fontSize: '1.8rem',
      color: '#000',
    },
  },
  bonusTypeText: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
    fontFamily: "'Inter', sans-serif",
  },
  bonusAmount: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#EEBC1D',
    fontFamily: "'Orbitron', sans-serif",
  },
  bonusDescription: {
    fontSize: '0.95rem',
    color: '#aaa',
    marginBottom: '15px',
    lineHeight: '1.6',
    fontFamily: "'Inter', sans-serif",
  },
  bonusFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  bonusDate: {
    fontSize: '0.85rem',
    color: '#888',
    fontFamily: "'Inter', sans-serif",
  },
  statusChip: {
    fontWeight: '600',
    fontFamily: "'Inter', sans-serif",
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyIcon: {
    fontSize: '5rem',
    color: '#444',
    marginBottom: '20px',
  },
  emptyText: {
    fontSize: '1.2rem',
    color: '#888',
    fontFamily: "'Inter', sans-serif",
  },
}));

const BonusPage = () => {
  const classes = useStyles();
  const { user, setAlert } = CryptoState();
  const [loading, setLoading] = useState(true);
  const [bonuses, setBonuses] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      fetchBonuses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchBonuses = async () => {
    try {
      setLoading(true);
      const [bonusesRes, balanceRes] = await Promise.all([
        bonusAPI.getBonuses(),
        bonusAPI.getBonusBalance(),
      ]);

      setBonuses(bonusesRes.data);
      setBalance(balanceRes.data.balance);
    } catch (error) {
      console.error('Failed to fetch bonuses:', error);
      // Set default values on error
      setBonuses([]);
      setBalance(0);
      
      // Only show error if it's not a 404 (no data yet)
      if (error.response?.status !== 404) {
        setAlert({
          open: true,
          message: 'Failed to load bonuses',
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { background: 'rgba(76, 175, 80, 0.2)', color: '#4CAF50' };
      case 'claimed':
        return { background: 'rgba(33, 150, 243, 0.2)', color: '#2196F3' };
      case 'expired':
        return { background: 'rgba(244, 67, 54, 0.2)', color: '#F44336' };
      default:
        return { background: 'rgba(255, 152, 0, 0.2)', color: '#FF9800' };
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
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
          My Bonuses
        </Typography>
      </Box>

      {/* Balance Card */}
      <Box className={classes.balanceCard}>
        <Typography className={classes.balanceAmount}>
          ${balance.toFixed(2)}
        </Typography>
        <Typography className={classes.balanceLabel}>
          Available Bonus Balance
        </Typography>
      </Box>

      {/* Bonuses Grid */}
      {bonuses.length === 0 ? (
        <Box className={classes.emptyState}>
          <CardGiftcard className={classes.emptyIcon} />
          <Typography className={classes.emptyText}>
            No bonuses yet. Start referring friends to earn rewards!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {bonuses.map((bonus) => (
            <Grid item xs={12} sm={6} md={4} key={bonus.id}>
              <Box className={classes.bonusCard}>
                <Box className={classes.bonusHeader}>
                  <Box className={classes.bonusType}>
                    <Box className={classes.bonusIcon}>
                      <CardGiftcard />
                    </Box>
                    <Box>
                      <Typography className={classes.bonusTypeText}>
                        {bonus.type.replace('_', ' ')}
                      </Typography>
                      <Typography className={classes.bonusAmount}>
                        ${bonus.amount}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography className={classes.bonusDescription}>
                  {bonus.description}
                </Typography>

                <Box className={classes.bonusFooter}>
                  <Typography className={classes.bonusDate}>
                    {formatDate(bonus.createdAt)}
                  </Typography>
                  <Chip
                    label={bonus.status}
                    size="small"
                    className={classes.statusChip}
                    style={getStatusColor(bonus.status)}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BonusPage;
