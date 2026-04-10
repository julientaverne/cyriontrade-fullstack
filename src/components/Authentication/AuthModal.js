import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import Signup from "./Signup";
import Login from "./Login";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 450,
    background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)",
    color: "white",
    borderRadius: 20,
    border: "1px solid rgba(238, 188, 29, 0.2)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
  },
}));

export default function AuthModal() {
  const classes = useStyles();
  const { authModalOpen, setAuthModalOpen, authModalTab, setAuthModalTab } = CryptoState();

  const handleClose = () => {
    setAuthModalOpen(false);
  };

  const handleOpenLogin = () => {
    setAuthModalTab(0);
    setAuthModalOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthModalTab(1);
    setAuthModalOpen(true);
  };

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <Button
        variant="outlined"
        style={{
          height: 40,
          padding: "0 20px",
          color: "#EEBC1D",
          borderColor: "#EEBC1D",
          fontWeight: "600",
          borderRadius: "8px",
          textTransform: "none",
          transition: "all 0.3s ease",
        }}
        onClick={handleOpenLogin}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(238, 188, 29, 0.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        style={{
          height: 40,
          padding: "0 20px",
          backgroundColor: "#EEBC1D",
          color: "black",
          fontWeight: "600",
          borderRadius: "8px",
          textTransform: "none",
          boxShadow: "0 2px 8px rgba(238, 188, 29, 0.3)",
          transition: "all 0.3s ease",
        }}
        onClick={handleOpenSignup}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(238, 188, 29, 0.4)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(238, 188, 29, 0.3)";
        }}
      >
        Sign Up
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={authModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={authModalOpen}>
          <div className={classes.paper}>
            {authModalTab === 0 && (
              <Login 
                handleClose={handleClose} 
                switchToSignup={() => setAuthModalTab(1)}
              />
            )}
            {authModalTab === 1 && (
              <Signup 
                handleClose={handleClose} 
                switchToLogin={() => setAuthModalTab(0)}
              />
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
