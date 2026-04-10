import { Box, Button, TextField, IconButton, InputAdornment } from "@material-ui/core";
import { useState, useEffect } from "react";
import { CryptoState } from "../../CryptoContext";
import { authAPI, referralAPI } from "../../services/api";
import { Visibility, VisibilityOff, Person, Lock, CardGiftcard } from "@material-ui/icons";

const Signup = ({ handleClose, switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { setAlert } = CryptoState();

  // Check URL for referral code on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      setReferralCode(refCode);
    }
  }, []);

  const handleSubmit = async () => {
    // Validation
    if (!email || !password || !confirmPassword) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "warning",
      });
      return;
    }

    if (!email.includes('@')) {
      setAlert({
        open: true,
        message: "Please enter a valid email address",
        type: "warning",
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        open: true,
        message: "Password must be at least 6 characters long",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      // Signup via server API
      const { data } = await authAPI.signup(email, password, email.split('@')[0]);
      
      // If referral code provided, apply it
      if (referralCode && referralCode.trim()) {
        try {
          await referralAPI.applyReferralCode(referralCode.trim().toUpperCase(), data.user.uid);
          setAlert({
            open: true,
            message: "Account created successfully! You've received a $10 welcome bonus!",
            type: "success",
          });
        } catch (refError) {
          console.error('Referral code error:', refError);
          // Still show success for account creation
          setAlert({
            open: true,
            message: "Account created successfully! (Invalid referral code)",
            type: "success",
          });
        }
      } else {
        setAlert({
          open: true,
          message: data.message || "Account created successfully! Please log in.",
          type: "success",
        });
      }
      
      // Switch to login form
      switchToLogin();
    } catch (error) {
      console.error('Signup error:', error);
      
      const errorMessage = error.response?.data?.error || error.message || "Failed to create account. Please ensure the server is running.";
      
      setAlert({
        open: true,
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={4}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h2 style={{ 
          fontSize: "2rem", 
          fontWeight: "700", 
          color: "#fff", 
          marginBottom: "10px",
          fontFamily: "'Inter', sans-serif",
        }}>
          Sign up
        </h2>
        <p style={{ 
          fontSize: "0.9rem", 
          color: "#888",
          fontFamily: "'Inter', sans-serif",
        }}>
          Already have an account?{" "}
          <span 
            onClick={switchToLogin}
            style={{ 
              color: "#EEBC1D", 
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Log in
          </span>
        </p>
      </div>

      {/* Email Field */}
      <TextField
        variant="outlined"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person style={{ color: "#888" }} />
            </InputAdornment>
          ),
          style: {
            color: "#fff",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
          },
        }}
        InputLabelProps={{
          style: { color: "#888" },
        }}
      />

      {/* Password Field */}
      <TextField
        variant="outlined"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock style={{ color: "#888" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                style={{ color: "#888" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          style: {
            color: "#fff",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
          },
        }}
        InputLabelProps={{
          style: { color: "#888" },
        }}
      />

      {/* Confirm Password Field */}
      <TextField
        variant="outlined"
        placeholder="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock style={{ color: "#888" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
                style={{ color: "#888" }}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          style: {
            color: "#fff",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
          },
        }}
        InputLabelProps={{
          style: { color: "#888" },
        }}
      />

      {/* Referral Code Field (Optional) */}
      <TextField
        variant="outlined"
        placeholder="Referral Code (Optional)"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CardGiftcard style={{ color: "#888" }} />
            </InputAdornment>
          ),
          style: {
            color: "#fff",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
          },
        }}
        InputLabelProps={{
          style: { color: "#888" },
        }}
        helperText={
          <span style={{ 
            color: "#EEBC1D", 
            fontSize: "0.85rem", 
            fontWeight: "700",
            fontFamily: "'Inter', sans-serif",
            display: "block",
            textAlign: "center",
            marginTop: "8px",
            letterSpacing: "0.3px"
          }}>
            Get $10 bonus with a referral code!
          </span>
        }
        FormHelperTextProps={{
          style: {
            textAlign: "center",
            margin: "8px 0 0 0"
          }
        }}
      />

      {/* Sign Up Button */}
      <Button
        variant="contained"
        size="large"
        disabled={loading}
        style={{
          backgroundColor: "#EEBC1D",
          color: "#000",
          fontWeight: "700",
          borderRadius: "25px",
          textTransform: "none",
          padding: "14px",
          fontSize: "1rem",
          boxShadow: "0 4px 15px rgba(238, 188, 29, 0.3)",
          transition: "all 0.3s ease",
          marginTop: "10px",
        }}
        onClick={handleSubmit}
      >
        {loading ? "Creating Account..." : "Sign up"}
      </Button>
    </Box>
  );
};

export default Signup;
