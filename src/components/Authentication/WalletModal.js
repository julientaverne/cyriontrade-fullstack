import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import WalletConnection from "./WalletConnection";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  paper: {
    backgroundColor: "transparent",
    border: "2px solid rgba(238, 188, 29, 0.3)",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.9), 0 0 60px rgba(238, 188, 29, 0.15)",
    padding: "0",
    maxWidth: "400px",
    width: "100%",
    maxHeight: "80vh",
    overflow: "hidden",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, transparent 0%, #EEBC1D 50%, transparent 100%)",
      zIndex: 1,
    },
  },
}));

const WalletModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const { user, setAlert } = CryptoState();

  const handleWalletComplete = (walletData) => {
    setAlert({
      open: true,
      message: "Wallet connected successfully!",
      type: "success",
    });
    handleClose();
  };

  const handleBack = () => {
    handleClose();
  };

  // Create a mock userData object if user is logged in
  const userData = user ? { uid: user.uid, email: user.email } : null;
  
  // Debug logging

  return (
    <Modal
      aria-labelledby="wallet-modal"
      aria-describedby="wallet-connection-modal"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        style: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {userData ? (
            <WalletConnection
              userData={userData}
              onComplete={handleWalletComplete}
              onBack={handleBack}
            />
          ) : (
            <div style={{ padding: "40px", textAlign: "center", color: "#fff" }}>
              <p>Please log in first to connect your wallet.</p>
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default WalletModal;
