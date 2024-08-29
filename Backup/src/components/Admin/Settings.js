import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  Select,
  MenuItem,
  FormHelperText,
  Modal,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Custom theme for styling
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [otpError, setOtpError] = useState(''); // To handle OTP errors
  const [mobileError, setMobileError] = useState(''); // To handle mobile errors
  const [emailError, setEmailError] = useState(''); // To handle email errors
  const [showMobileModalStep, setShowMobileModalStep] = useState(0); // 0: Input Number, 1: Verify OTP
  const [showEmailModalStep, setShowEmailModalStep] = useState(null); // null: Closed, 0: Input Email, 1: Confirm Email

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChangePassword = () => {
    let hasErrors = false;
    const newErrors = {};
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      hasErrors = true;
    }
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
      hasErrors = true;
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    // Handle password change logic
    setSnackbarMessage('Password changed successfully!');
    setShowSnackbar(true);
    setShowChangePasswordModal(false);
  };

  const handleToggleNotifications = (event) => {
    setNotificationsEnabled(event.target.checked);
  };

  const handleToggleTwoFactor = (event) => {
    setTwoFactorEnabled(event.target.checked);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleSendOtp = () => {
    if (mobileNumber) {
      setShowMobileModalStep(1); // Show OTP verification step
      setOtpError(''); // Clear any previous OTP error messages
      setMobileError(''); // Clear mobile error messages
    } else {
      setMobileError('Please enter a valid mobile number.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') { // Replace this with actual OTP verification logic
      setSnackbarMessage('Mobile number verified successfully!');
      setShowSnackbar(true);
      setShowMobileModalStep(null); // Close mobile modal
      // Optionally, you can open the email verification modal here if needed:
      // setShowEmailModalStep(0); // Open email verification modal
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  const handleSendVerificationCode = () => {
    console.log('Send Verification Code Button Clicked');
    setShowMobileModalStep(0); // Open modal for entering mobile number
  };

  const handleConfirmEmail = () => {
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Simple email validation
      setSnackbarMessage('Email linked successfully!');
      setShowSnackbar(true);
      setShowEmailModalStep(null); // Close email modal
      setEmail(''); // Clear email input
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  const handleLinkEmail = () => {
    console.log('Link Email Button Clicked');
    setShowEmailModalStep(0); // Open modal for entering email
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>

          {/* Change Password Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowChangePasswordModal(true)}
            >
              Change Password
            </Button>
          </Paper>

          {/* Notifications Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControl fullWidth margin="normal">
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationsEnabled}
                    onChange={handleToggleNotifications}
                    color="primary"
                  />
                }
                label="Enable Notifications"
              />
            </FormControl>
          </Paper>

          {/* Language Preferences Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Language Preferences
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="language-select">Select Language</InputLabel>
              <Select
                id="language-select"
                value={language}
                onChange={handleLanguageChange}
                label="Select Language"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
                {/* Add more languages as needed */}
              </Select>
            </FormControl>
          </Paper>

          {/* Two-Factor Authentication Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Two-Factor Authentication (2FA)
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControl fullWidth margin="normal">
              <FormControlLabel
                control={
                  <Switch
                    checked={twoFactorEnabled}
                    onChange={handleToggleTwoFactor}
                    color="primary"
                  />
                }
                label="Enable Two-Factor Authentication"
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendVerificationCode}
              sx={{ mt: 2 }}
            >
              Verify Mobile Number
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLinkEmail}
              sx={{ mt: 2, ml: 2 }}
            >
              Link Gmail
            </Button>
          </Paper>
        </Box>

        {/* Change Password Modal */}
        <Modal
          open={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
          aria-labelledby="change-password-modal-title"
          aria-describedby="change-password-modal-description"
        >
          <Box sx={{ ...modalStyle, width: 400 }}>
            <Typography id="change-password-modal-title" variant="h6" component="h2">
              Change Password
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="current-password"
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              error={Boolean(errors.currentPassword)}
              helperText={errors.currentPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      aria-label="toggle password visibility"
                      sx={{ color: 'text.primary' }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="new-password"
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={Boolean(errors.newPassword)}
              helperText={errors.newPassword}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm-password"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        </Modal>

        {/* Mobile Verification Modal */}
        <Modal
          open={showMobileModalStep !== null}
          onClose={() => setShowMobileModalStep(null)}
          aria-labelledby="mobile-verification-modal-title"
          aria-describedby="mobile-verification-modal-description"
        >
          <Box sx={{ ...modalStyle, width: 400 }}>
            {showMobileModalStep === 0 ? (
              <>
                <Typography id="mobile-verification-modal-title" variant="h6" component="h2">
                  Verify Mobile Number
                </Typography>
                <PhoneInput
                  country={'us'}
                  value={mobileNumber}
                  onChange={setMobileNumber}
                  placeholder="Enter mobile number"
                  inputProps={{ 'aria-label': 'Mobile Number' }}
                />
                {mobileError && <FormHelperText error>{mobileError}</FormHelperText>}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendOtp}
                  sx={{ mt: 2 }}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <Typography id="mobile-verification-modal-title" variant="h6" component="h2">
                  Verify OTP
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  error={Boolean(otpError)}
                  helperText={otpError}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleVerifyOtp}
                  sx={{ mt: 2 }}
                >
                  Verify OTP
                </Button>
              </>
            )}
          </Box>
        </Modal>

        {/* Email Linking Modal */}
        <Modal
          open={showEmailModalStep !== null}
          onClose={() => setShowEmailModalStep(null)}
          aria-labelledby="email-linking-modal-title"
          aria-describedby="email-linking-modal-description"
        >
          <Box sx={{ ...modalStyle, width: 400 }}>
            {showEmailModalStep === 0 ? (
              <>
                <Typography id="email-linking-modal-title" variant="h6" component="h2">
                  Link Gmail
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(emailError)}
                  helperText={emailError}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmEmail}
                  sx={{ mt: 2 }}
                >
                  Confirm Email
                </Button>
              </>
            ) : (
              <>
                <Typography id="email-linking-modal-title" variant="h6" component="h2">
                  Email Linked
                </Typography>
                <Typography variant="body1">
                  Your email has been linked successfully.
                </Typography>
              </>
            )}
          </Box>
        </Modal>

        {/* Snackbar for Notifications */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          action={
            <Button color="inherit" onClick={handleSnackbarClose}>
              Close
            </Button>
          }
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Settings;
