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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const UserSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [errors, setErrors] = useState({});

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
    alert('Password changed successfully!');
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
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="current-password">Current Password</InputLabel>
              <OutlinedInput
                id="current-password"
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Current Password"
                error={Boolean(errors.currentPassword)}
              />
              <FormHelperText error={Boolean(errors.currentPassword)}>
                {errors.currentPassword}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="new-password">New Password</InputLabel>
              <OutlinedInput
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
                error={Boolean(errors.newPassword)}
              />
              <FormHelperText error={Boolean(errors.newPassword)}>
                {errors.newPassword}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                error={Boolean(errors.confirmPassword)}
              />
              <FormHelperText error={Boolean(errors.confirmPassword)}>
                {errors.confirmPassword}
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              sx={{ mt: 2 }}
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
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserSettings;
