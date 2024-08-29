import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Avatar, IconButton, Card, CardContent, Grid } from '@mui/material';
import { Edit as EditIcon, CameraAlt as CameraAltIcon } from '@mui/icons-material';
import bannerImage from '/FullStack/myapp/src/assets/Images/ban.jpg';

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Admin Name',
    email: 'admin@example.com',
    mobile: '987-654-3210',
    dept: 'Administration',
    role: 'Administrator',
    experience: '10 years',
    address: '456 Admin St',
    profilePicture: 'https://via.placeholder.com/150' // Default picture
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editableProfile, setEditableProfile] = useState(profile);

  useEffect(() => {
    const storedProfile = localStorage.getItem('adminProfileData');
    if (storedProfile) {
      const profileData = JSON.parse(storedProfile);
      setProfile(profileData);
      setEditableProfile(profileData);
    }
  }, []);

  const handleEditButtonClick = () => {
    setEditableProfile(profile);
    setIsEditMode(true);
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
    setIsEditMode(false);
    localStorage.setItem('adminProfileData', JSON.stringify(editableProfile));
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditableProfile(profile);
  };

  return (
    <Box sx={{
      padding: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#e3f2fd', // Light blue background
      minHeight: '100vh',
    }}>
      <Box
        sx={{
          width: '100%',
          height: 150,
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px 10px 0 0',
          position: 'relative',
          zIndex: 1, // Ensure banner is below the card
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '10px 10px 0 0',
          }}
        />
      </Box>
      <Card sx={{
        maxWidth: 600,
        width: '100%',
        mt: -10, // Ensure the card overlaps with the banner
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        background: '#ffffff',
        zIndex: 2, // Ensure the card is above the banner
        position: 'relative',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
        },
      }}>
        <CardContent sx={{ padding: 2, paddingTop: 8 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={editableProfile.profilePicture}
                  sx={{
                    width: 100,
                    height: 100,
                    border: '3px solid #64b5f6',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: isEditMode ? 'scale(1.1)' : 'none',
                    },
                  }}
                />
                {isEditMode && (
                  <>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="profile-picture-upload"
                      type="file"
                      onChange={handleProfilePictureChange}
                    />
                    <label htmlFor="profile-picture-upload">
                      <IconButton component="span" sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: '#ffffff',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.2)',
                        },
                      }}>
                        <CameraAltIcon sx={{ color: '#64b5f6' }} />
                      </IconButton>
                    </label>
                  </>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                {editableProfile.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#1976d2', mb: 2 }}>
                {editableProfile.role}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#64b5f6' }}>Email:</Typography>
              {!isEditMode ? (
                <Typography variant="body2" sx={{ color: '#333' }}>{editableProfile.email}</Typography>
              ) : (
                <TextField
                  name="email"
                  value={editableProfile.email}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#64b5f6' }}>Mobile:</Typography>
              {!isEditMode ? (
                <Typography variant="body2" sx={{ color: '#333' }}>{editableProfile.mobile}</Typography>
              ) : (
                <TextField
                  name="mobile"
                  value={editableProfile.mobile}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#64b5f6' }}>Department:</Typography>
              {!isEditMode ? (
                <Typography variant="body2" sx={{ color: '#333' }}>{editableProfile.dept}</Typography>
              ) : (
                <TextField
                  name="dept"
                  value={editableProfile.dept}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#64b5f6' }}>Role:</Typography>
              {!isEditMode ? (
                <Typography variant="body2" sx={{ color: '#333' }}>{editableProfile.role}</Typography>
              ) : (
                <TextField
                  name="role"
                  value={editableProfile.role}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#64b5f6' }}>Experience:</Typography>
              {!isEditMode ? (
                <Typography variant="body2" sx={{ color: '#333' }}>{editableProfile.experience}</Typography>
              ) : (
                <TextField
                  name="experience"
                  value={editableProfile.experience}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#64b5f6' }}>Address:</Typography>
              {!isEditMode ? (
                <Typography variant="body2" sx={{ color: '#333' }}>{editableProfile.address}</Typography>
              ) : (
                <TextField
                  name="address"
                  value={editableProfile.address}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {!isEditMode ? (
              <Button variant="contained" color="primary" onClick={handleEditButtonClick} startIcon={<EditIcon />}>
                Edit
              </Button>
            ) : (
              <>
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminProfile;
