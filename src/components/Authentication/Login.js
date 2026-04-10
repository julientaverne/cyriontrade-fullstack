import { Box, Button, TextField, Checkbox, FormControlLabel, IconButton, InputAdornment } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { authAPI } from "../../services/api";
import { Visibility, VisibilityOff, Person, Lock } from "@material-ui/icons";

const Login = ({ handleClose, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { setAlert, setUser } = CryptoState();

  const handleSubmit = async () => {
    // Validation
    if (!email || !password) {
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

    setLoading(true);
    try {
      // Login via server API
      const { data } = await authAPI.login(email, password);
      
      // Store auth data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.user.uid);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userDisplayName', data.user.displayName || '');
      
      // Update user state
      setUser(data.user);
      
      setAlert({
        open: true,
        message: `Login Successful. Welcome back!`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.error || error.message || "Login failed. Please ensure the server is running.";
      
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
          Log in
        </h2>
        <p style={{ 
          fontSize: "0.9rem", 
          color: "#888",
          fontFamily: "'Inter', sans-serif",
        }}>
          Don't have an account?{" "}
          <span 
            onClick={switchToSignup}
            style={{ 
              color: "#EEBC1D", 
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Sign up
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

      {/* Remember Me */}
      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{ color: "#EEBC1D" }}
          />
        }
        label={<span style={{ color: "#888", fontSize: "0.9rem" }}>Remember me</span>}
      />

      {/* Login Button */}
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
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
        }}
      >
        {loading ? "Logging in..." : "Log in"}
      </Button>

      {/* Forgot Password */}
      <div style={{ textAlign: "center", marginTop: "5px" }}>
        <span style={{ fontSize: "0.85rem", color: "#888" }}>
          Forgot{" "}
          <span style={{ color: "#EEBC1D", cursor: "pointer", textDecoration: "underline" }}>
            username
          </span>
          {" / "}
          <span style={{ color: "#EEBC1D", cursor: "pointer", textDecoration: "underline" }}>
            Password
          </span>
          ?
        </span>
      </div>
    </Box>
  );
};

export default Login;
