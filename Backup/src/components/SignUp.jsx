import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

// Import images
import backgroundImageLight from '/FullStack/myapp/src/assets/Images/back.png'
import topImage from '/FullStack/myapp/src/assets/Images/bg.jpeg';
// Define themes
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', // Dark background for the whole page
      paper: '#1D1D1D', // Dark background for paper components
    },
    text: {
      primary: '#FFFFFF', // White text color
    },
  },
});

const defaultTheme = createTheme(); // Use default theme for light mode

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    terms: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const theme = useTheme(); // Use the current theme

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, firstName ,lastName} = formData;
    let errorMessage = '';

    // Clear previous error messages
    setErrorMessages({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: '',
    });

    // Validation logic
    if (email === '' || password === '' || firstName === '') {
      errorMessage = 'All fields are required.';
    } else if (firstName.length < 1) {
      errorMessage = 'First Name must be at least 1 character.';
    } else if (firstName.charAt(0) !== firstName.charAt(0).toUpperCase()) {
      errorMessage = 'First Name must start with a capital letter.';
    } else if (password.length < 8) {
      errorMessage = 'Password must be at least 8 characters.';
    } else if (!agreeToTerms) {
      errorMessage = 'You must agree to the terms and conditions.';
    }

    if (errorMessage) {
      setErrorMessages(prev => ({ ...prev, terms: errorMessage }));
      return;
    }

    // If validation passes, store data in localStorage and navigate to Login page
    setSnackbarMessage('Account created successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);

    localStorage.setItem('userData', JSON.stringify({ email, password }));
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setAgreeToTerms(event.target.checked);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
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
              Staff Scheduling Made Easy
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
                color: theme.palette.text.primary, // Ensure text color is correct
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                top: 40,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{color: theme.palette.text.primary}}>
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, mb: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={handleChange}
                      InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                      InputProps={{ style: { color: theme.palette.text.primary } }}
                      sx={{ input: { color: theme.palette.text.primary } }}
                      error={!!errorMessages.firstName}
                      helperText={errorMessages.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={handleChange}
                      InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                      InputProps={{ style: { color: theme.palette.text.primary } }}
                      sx={{ input: { color: theme.palette.text.primary } }}
                      error={!!errorMessages.lastName}
                      helperText={errorMessages.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                      InputProps={{ style: { color: theme.palette.text.primary } }}
                      sx={{ input: { color: theme.palette.text.primary } }}
                      error={!!errorMessages.email}
                      helperText={errorMessages.email}
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
                      autoComplete="new-password"
                      onChange={handleChange}
                      InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                      InputProps={{ style: { color: theme.palette.text.primary } }}
                      sx={{ input: { color: theme.palette.text.primary } }}
                      error={!!errorMessages.password}
                      helperText={errorMessages.password}
                    />
                  </Grid>
                  {errorMessages.terms && (
                    <Grid item xs={12} sx={{ textAlign: 'center', mt: 0.5, mb: 0.2 }}>
                      <Typography color="error">{errorMessages.terms}</Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} sx={{textAlign: 'center', mt: -1}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="agree"
                          color="primary"
                          onChange={handleCheckboxChange}
                        />
                      }
                      label={
                        <Typography variant="body2" color={theme.palette.text.primary}>
                          I agree to the terms and conditions
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 2.5, mb: 2}}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="center" sx={{textAlign: 'center'}}>
                  <Grid item>
                    <Link href="/" variant="body2">
                      Already have an account? Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          action={
            <Button color="inherit" onClick={handleCloseSnackbar}>
              Close
            </Button>
          }
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            position: 'fixed',
            top: '-20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            maxWidth: '90%', // Adjust as needed
          }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
