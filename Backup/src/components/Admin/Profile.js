import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Avatar, IconButton, Card, CardContent, Divider, Grid } from '@mui/material';
import { Edit as EditIcon, CameraAlt as CameraAltIcon } from '@mui/icons-material';
import bannerImage from '/FullStack/myapp/src/assets/Images/ban.jpg';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Main St',
    position: 'Manager',
    profilePicture: 'https://via.placeholder.com/150' // Default picture
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editableProfile, setEditableProfile] = useState(profile);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profileData');
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

    localStorage.setItem('profileData', JSON.stringify(editableProfile));
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditableProfile(profile);
  };

  return (
    <Box sx={{
      padding: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#e3f2fd', // Light blue background
      minHeight: '100vh',
    }}>
      <Box
        sx={{
          width: '100%',
          height: 200,
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          position: 'relative',
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
            borderRadius: '20px 20px 0 0',
            zIndex: 1,
          }}
        />
      </Box>
      <Card sx={{
        maxWidth: 600,
        width: '100%',
        mt: -8,
        zIndex: 2,
        borderRadius: '20px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
        background: '#ffffff',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
        },
        animation: 'fadeIn 1s ease-in-out',
      }}>
        <CardContent sx={{ padding: '32px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={editableProfile.profilePicture}
                  sx={{
                    width: 120,
                    height: 120,
                    border: '4px solid #64b5f6',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
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
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
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
            <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                {editableProfile.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#1976d2', mb: 2 }}>
                {editableProfile.position}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: '#64b5f6', mb: 1 }}>Email:</Typography>
                {!isEditMode ? (
                  <Typography variant="body1" sx={{ color: '#333' }}>{editableProfile.email}</Typography>
                ) : (
                  <TextField
                    name="email"
                    value={editableProfile.email}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                )}
              </Box>
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: '#64b5f6', mb: 1 }}>Phone Number:</Typography>
                {!isEditMode ? (
                  <Typography variant="body1" sx={{ color: '#333' }}>{editableProfile.phoneNumber}</Typography>
                ) : (
                  <TextField
                    name="phoneNumber"
                    value={editableProfile.phoneNumber}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                )}
              </Box>
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: '#64b5f6', mb: 1 }}>Address:</Typography>
                {!isEditMode ? (
                  <Typography variant="body1" sx={{ color: '#333' }}>{editableProfile.address}</Typography>
                ) : (
                  <TextField
                    name="address"
                    value={editableProfile.address}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                )}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                {!isEditMode ? (
                  <Button
                    variant="contained"
                    sx={{
                      background: '#64b5f6',
                      color: '#fff',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                      borderRadius: '30px',
                      padding: '10px 20px',
                      transition: 'background 0.3s ease-in-out, transform 0.3s ease-in-out',
                      '&:hover': {
                        background: '#42a5f5',
                        transform: 'scale(1.05)',
                      }
                    }}
                    onClick={handleEditButtonClick}
                    endIcon={<EditIcon />}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        background: '#64b5f6',
                        color: '#fff',
                        borderRadius: '30px',
                        padding: '10px 20px',
                        transition: 'background 0.3s ease-in-out',
                        '&:hover': {
                          background: '#42a5f5',
                        }
                      }}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#64b5f6',
                        borderColor: '#64b5f6',
                        borderRadius: '30px',
                        padding: '10px 20px',
                        transition: 'border 0.3s ease-in-out',
                        '&:hover': {
                          borderColor: '#42a5f5',
                        }
                      }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
