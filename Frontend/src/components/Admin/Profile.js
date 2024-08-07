import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField, Box, Card, CardContent, Typography, Avatar, Grid, IconButton } from '@mui/material';
import { Edit as EditIcon, Email as EmailIcon, Phone as PhoneIcon, Home as HomeIcon, Work as WorkIcon, Cake as CakeIcon, CameraAlt as CameraAltIcon } from '@mui/icons-material';
import bannerImage from '/FullStack/myapp/src/assets/Images/banner.jpg';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Main St',
    position: 'Manager',
    profilePicture: localStorage.getItem('profilePicture') || 'https://via.placeholder.com/150'
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editableProfile, setEditableProfile] = useState(profile);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profileData');
    if (storedProfile) {
      const profileData = JSON.parse(storedProfile);
      const storedProfilePicture = localStorage.getItem('profilePicture');
      if (storedProfilePicture) {
        profileData.profilePicture = storedProfilePicture;
      }
      setProfile(profileData);
    }
  }, []);

  const handleEditButtonClick = () => {
    setEditableProfile(profile);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setEditableProfile((prev) => ({
          ...prev,
          profilePicture: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(editableProfile);
    setIsEditModalOpen(false);

    // Store profile data in localStorage
    localStorage.setItem('profileData', JSON.stringify(editableProfile));
    localStorage.setItem('profilePicture', editableProfile.profilePicture);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  const firstName = localStorage.getItem('firstName') || 'First';
  const lastName = localStorage.getItem('lastName') || 'Last';
  const email = localStorage.getItem('email') || 'email';

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', backgroundColor: isDarkTheme ? '#333' : '#f0f0f0', color: isDarkTheme ? '#fff' : '#000', p: 3 }}>
      <Button onClick={handleThemeToggle} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        Toggle Theme
      </Button>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 220,
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '0 0 10px 10px',
      }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', top: 150 }}>
        <Card sx={{
          maxWidth: 600,
          width: '100%',
          p: 4,
          boxShadow: 6,
          borderRadius: 2,
          backgroundColor: isDarkTheme ? '#424242' : '#fff',
          color: isDarkTheme ? '#fff' : '#000',
          overflow: 'hidden',
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar src={profile.profilePicture} sx={{ width: 120, height: 120,top:-20, border: `3px solid ${isDarkTheme ? '#fff' : '#000'}` }} />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleProfilePictureChange}
                />
                <label htmlFor="raised-button-file">
                  <IconButton component="span" sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: isDarkTheme ? '#424242' : '#fff' }}>
                    <CameraAltIcon sx={{ color: isDarkTheme ? '#fff' : '#000' }} />
                  </IconButton>
                </label>
              </Box>
              <Typography variant="h4" component="div" gutterBottom align="center" sx={{ mt: 2 }}>
                {firstName} {lastName}
              </Typography>
              <Typography variant="subtitle1" align="center">
                {profile.position}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CakeIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    <strong>Age:</strong> {profile.age}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    <strong>Email:</strong> {email}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PhoneIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    <strong>Position:</strong> {profile.position}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <HomeIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    <strong>Address:</strong> {profile.address}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WorkIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    <strong>Mobile no:</strong> {profile.phoneNumber}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button variant="contained" color="primary" onClick={handleEditButtonClick} startIcon={<EditIcon />}>
                Edit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Modal open={isEditModalOpen} onClose={handleCancel}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            backgroundColor: isDarkTheme ? '#424242' : '#fff',
            color: isDarkTheme ? '#fff' : '#000',
          }}
        >
          <Typography variant="h5" component="div" gutterBottom>
            Edit Profile
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleProfilePictureChange}
            />
            <label htmlFor="raised-button-file">
              <IconButton component="span">
                <Avatar src={editableProfile.profilePicture} sx={{ width: 100, height: 100, border: `3px solid ${isDarkTheme ? '#fff' : '#000'}` }} />
              </IconButton>
            </label>
          </Box>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={editableProfile.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={editableProfile.age}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={editableProfile.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={editableProfile.phoneNumber}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={editableProfile.address}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Position"
            name="position"
            value={editableProfile.position}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Profile;
