import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  snackbar: {
    "& .MuiSnackbarContent-root": {
      background: "linear-gradient(135deg, #1a1d24 0%, #252932 100%)",
      border: "1px solid rgba(76, 175, 80, 0.3)",
      borderRadius: "8px",
      padding: "10px 16px",
      minWidth: "320px",
      maxWidth: "380px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
      cursor: "pointer",
    },
  },
  content: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  icon: {
    fontSize: "22px",
    color: "#4CAF50",
  },
  message: {
    flex: 1,
    color: "#e0e0e0",
    fontSize: "0.85rem",
    fontFamily: "'Inter', sans-serif",
    lineHeight: "1.4",
    fontWeight: "400",
  },

}));

const names = [
  "John Smith", "Emma Johnson", "Michael Brown", "Sarah Davis", "David Wilson",
  "Lisa Anderson", "James Taylor", "Jennifer Martinez", "Robert Garcia", "Mary Rodriguez",
  "William Lee", "Patricia White", "Richard Harris", "Linda Clark", "Thomas Lewis",
  "Barbara Walker", "Charles Hall", "Susan Allen", "Daniel Young", "Jessica King",
  "CryptoKing", "TraderJoe", "MoonShot", "DiamondHands", "BullRunner",
  "BearHunter", "SatoshiFan", "BlockMaster", "CoinWhale", "ChartWizard"
];

const notifications = [
  { time: "42 minutes", plan: "Hero", action: "subscribed" },
  { time: "1 hour", plan: "Adventurer", action: "upgraded" },
  { time: "23 minutes", plan: "Explorer", action: "subscribed" },
  { time: "3 hours", plan: "Hero", action: "started trial" },
  { time: "15 minutes", plan: "Adventurer", action: "subscribed" },
  { time: "2 hours", plan: "Explorer", action: "upgraded" },
  { time: "38 minutes", plan: "Hero", action: "subscribed" },
  { time: "1 hour", plan: "Explorer", action: "started trial" },
];

const SubscriptionNotification = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const showNotification = () => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const msg = `Just ${randomNotification.time} ago ${randomName} ${randomNotification.action} to the ${randomNotification.plan} subscription and started trading.`;
      setMessage(msg);
      setOpen(true);
    };

    // Show first notification after 30 seconds (increased from 5)
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 30000);

    // Then show notifications every 3-5 minutes (increased from 1-2)
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 120000 + 180000); // Random between 3-5 minutes

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      className={classes.snackbar}
      onClick={handleClose}
      message={
        <div className={classes.content}>
          <CheckCircle className={classes.icon} />
          <span className={classes.message}>{message}</span>
        </div>
      }
    />
  );
};

export default SubscriptionNotification;
