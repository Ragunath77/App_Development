import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import axios from 'axios';
import myLogo from '/FullStack/myapp/src/assets/Images/lo.png'
// Import images
import backgroundImageLight from '/FullStack/myapp/src/assets/Images/back.png';
import topImage from '/FullStack/myapp/src/assets/Images/bg.jpeg';

// Define themes
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1D1D1D',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
});
const defaultTheme = createTheme(); // Use default theme for light mode

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [resetLinkModalOpen, setResetLinkModalOpen] = useState(false); // New state for reset link modal
  const navigate = useNavigate();
  const theme = useTheme(); // Use the current theme

  // POST request to validate credentials
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    // Validation logic
    if (!email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/persons/login', { email, password });
      
      if (response.status === 200) {
        if (email.endsWith('@admin.com')) { // Adjust domain as needed
          setSnackbarMessage('Admin login successful!');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          setTimeout(() => navigate('/Admin'), 1000);
        } else {
          setSnackbarMessage('Login successful!');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          setTimeout(() => navigate('/Dash'), 1000);
        }
      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
    setForgotPasswordError('');
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleForgotPasswordSubmit = () => {
    if (!validateEmail(forgotPasswordEmail)) {
      setForgotPasswordError('Please enter a valid email address.');
      return;
    }

    // Simulate sending the reset link
    setForgotPasswordOpen(false); // Close the forgot password modal
    setResetLinkModalOpen(true); // Open the reset link sent modal
    setForgotPasswordError('');
  };

  const handleResetLinkModalClose = () => {
    setResetLinkModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme.palette.mode === 'dark' ? darkTheme : defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          height: '100vh',
          backgroundColor: theme.palette.background.default,
          backgroundImage: theme.palette.mode === 'light' ? `url(${backgroundImageLight})` : 'none',
          backgroundSize: 'cover',
        }}
      >
        <Box
          component="img"
          src={topImage}
          sx={{
            width: 'calc(100% - 32px)', // Increased space on left and right
            height: '35vh',
            borderRadius: '28px', // Curved edges
            position: 'absolute',
            top: 20, // Space at the top
            left: 16, // Space from the left edge
            right: 16, // Space from the right edge
            mb: 8, // Space below the image
          }}
        />
        <Grid
          container
          component="main"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Grid
            item
            xs={12}
            sm={7}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 2,
              color: theme.palette.text.primary,
              textAlign: 'left',
              zIndex: 1,
              pl: 10,
              pr: 8,
              mt: 32,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme.palette.text.primary,
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="h6" component="p" sx={{ lineHeight: '1.5', maxWidth: '100%' }}>
              Efficiently manage your staff with our comprehensive scheduling system.
              Increase productivity and streamline operations with ease.
              Customize shifts, manage availability, and improve communication.
              Join hundreds of businesses who trust our solution.
              Start simplifying your scheduling today!
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={6}
            component={Box}
            elevation={6}
            square
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ml: 'auto',
              mr: 'auto',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 400,
                py: 4,
                px: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'dark' ? '#1D1D1D' : '#FFFFFF', // Dark theme background
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', // Consistent shadow
                position: 'relative',
                color: theme.palette.text.primary, // Ensure text color is correct
                top: 40, // Raised login box slightly
              }}
            >
             <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
             <img src={myLogo} alt="Logo" style={{ width: '100%', height: '100%' }} />
             </Avatar>
              <Typography 
              variant="h5"    // Adjust the variant to change the size. You can also use "h3", "h5", etc.
              style={{ 
              fontWeight: 'bold',   // Make the text bold
              color: '#3f51b5',     // Custom color if not using theme colors
              textAlign: 'center',  // Center align the text
              }}>
              Feliz Scheduler
              </Typography>

              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      value={formData.email}
                      InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                      InputProps={{ style: { color: theme.palette.text.primary } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      value={formData.password}
                      InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                      InputProps={{ style: { color: theme.palette.text.primary } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {errorMessage && (
                      <Typography color="error" variant="body2" align="center">
                        {errorMessage}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 1,
                  }}
                >
                  <Link href="#" variant="body2" onClick={handleForgotPasswordOpen}>
                    Forgot password?
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Forgot Password Modal */}
      <Modal
        open={forgotPasswordOpen}
        onClose={handleForgotPasswordClose}
        aria-labelledby="forgot-password-modal"
        aria-describedby="forgot-password-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Forgot Password
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="forgotPasswordEmail"
            label="Email Address"
            name="forgotPasswordEmail"
            autoComplete="email"
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            value={forgotPasswordEmail}
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
            InputProps={{ style: { color: theme.palette.text.primary } }}
          />
          {forgotPasswordError && (
            <Typography color="error" variant="body2" align="center">
              {forgotPasswordError}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleForgotPasswordSubmit}
            sx={{ mt: 2 }}
          >
            Send Reset Link
          </Button>
        </Box>
      </Modal>

      {/* Reset Link Sent Modal */}
      <Modal
        open={resetLinkModalOpen}
        onClose={handleResetLinkModalClose}
        aria-labelledby="reset-link-sent-modal"
        aria-describedby="reset-link-sent-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Reset Link Sent
          </Typography>
          <Typography variant="body1" component="p">
            A password reset link has been sent to your email address.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleResetLinkModalClose}
            sx={{ mt: 2 }}
          >
            OK
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
