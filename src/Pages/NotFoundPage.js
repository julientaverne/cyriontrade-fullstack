import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Typography, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Home, ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    padding: '20px',
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
  },
  errorCode: {
    fontSize: '10rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: "'Orbitron', sans-serif",
    lineHeight: '1',
    marginBottom: '20px',
    textShadow: '0 0 80px rgba(238, 188, 29, 0.3)',
    '@media (max-width: 768px)': {
      fontSize: '6rem',
    },
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '15px',
    fontFamily: "'Inter', sans-serif",
    '@media (max-width: 768px)': {
      fontSize: '1.8rem',
    },
  },
  description: {
    fontSize: '1.1rem',
    color: '#aaa',
    marginBottom: '40px',
    lineHeight: '1.6',
    fontFamily: "'Inter', sans-serif",
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    padding: '14px 30px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '1rem',
    textTransform: 'none',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.3s ease',
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)',
    color: '#000',
    '&:hover': {
      background: 'linear-gradient(135deg, #FFD700 0%, #EEBC1D 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(238, 188, 29, 0.4)',
    },
  },
  secondaryButton: {
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-2px)',
    },
  },
  illustration: {
    marginBottom: '30px',
    '& svg': {
      fontSize: '8rem',
      color: '#EEBC1D',
      opacity: 0.3,
    },
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container className={classes.container}>
      <Box className={classes.content}>
        <Typography className={classes.errorCode}>
          404
        </Typography>
        
        <Typography className={classes.title}>
          Page Not Found
        </Typography>
        
        <Typography className={classes.description}>
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </Typography>
        
        <Box className={classes.buttonGroup}>
          <Button
            className={`${classes.button} ${classes.primaryButton}`}
            startIcon={<Home />}
            onClick={() => history.push('/')}
          >
            Go Home
          </Button>
          
          <Button
            className={`${classes.button} ${classes.secondaryButton}`}
            startIcon={<ArrowBack />}
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
