// Snack Component - https://material-ui.com/components/snackbars/
import { Snackbar, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    "& .MuiAlert-root": {
      fontSize: "1rem",
      fontWeight: "500",
      fontFamily: "'Inter', sans-serif",
      minWidth: "300px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      borderRadius: "12px",
      padding: "12px 16px",
    },
    "& .MuiAlert-filledSuccess": {
      backgroundColor: "#0ecb81 !important",
      color: "#fff !important",
    },
    "& .MuiAlert-filledError": {
      backgroundColor: "#f6465d !important",
      color: "#fff !important",
    },
    "& .MuiAlert-filledWarning": {
      backgroundColor: "#ff9800 !important",
      color: "#fff !important",
    },
    "& .MuiAlert-filledInfo": {
      backgroundColor: "#2196f3 !important",
      color: "#fff !important",
    },
    "& .MuiAlert-icon": {
      fontSize: "24px",
      color: "#fff !important",
    },
    "& .MuiAlert-message": {
      padding: "4px 0",
      display: "flex",
      alignItems: "center",
      color: "#fff !important",
    },
    "& .MuiAlert-action": {
      paddingLeft: "8px",
      marginRight: "-8px",
    },
    "& .MuiIconButton-root": {
      color: "#fff !important",
      opacity: 0.9,
      padding: "4px",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.15) !important",
        opacity: 1,
      },
      "&:active": {
        backgroundColor: "rgba(255, 255, 255, 0.2) !important",
      },
      "& svg": {
        color: "#fff !important",
      },
    },
    "& .MuiIconButton-label": {
      color: "#fff !important",
    },
  },
}));

const Alert = () => {
  const classes = useStyles();
  const { alert, setAlert } = CryptoState();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  // Determine duration based on message type
  const getDuration = () => {
    if (alert.type === "error") return 5000; // 5 seconds for errors
    if (alert.type === "warning") return 4500; // 4.5 seconds for warnings
    return 4000; // 4 seconds for success/info
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={getDuration()}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      className={classes.snackbar}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
        style={{
          color: '#fff'
        }}
        classes={{
          action: 'custom-alert-action'
        }}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
