import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem('userName');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data from local storage", error);
      return {};
    }
  }
  return {};
};

const drawerWidth = 240;

const StaffSidebar = () => {
  const drawerStyle = {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: '#003366', // Dark blue
      color: '#ffffff', // White text
      borderRight: '1px solid #002244', // Darker blue border
    },
  };

  const listItemStyle = {
    '&:hover': {
      backgroundColor: '#004080', // Lighter blue on hover
    },
  };

  const iconStyle = {
    color: '#ffffff', // White icons
  };

  const user = getUserFromLocalStorage();
  const userName = user.firstName || 'Guest';

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={drawerStyle}
    >
      <Box sx={{ width: drawerWidth }} role="presentation">
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={listItemStyle} component={Link} to="/User">
              <ListItemIcon sx={iconStyle}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" secondary={userName} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider sx={{ backgroundColor: '#002244' }} /> {/* Darker blue divider */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/Dash" sx={listItemStyle}>
            <ListItemIcon sx={iconStyle}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ backgroundColor: '#002244' }} /> {/* Darker blue divider */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/My" sx={listItemStyle}>
            <ListItemIcon sx={iconStyle}>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="My Schedule" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ backgroundColor: '#002244' }} /> {/* Darker blue divider */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/Time" sx={listItemStyle}>
            <ListItemIcon sx={iconStyle}>
              <FreeBreakfastIcon />
            </ListItemIcon>
            <ListItemText primary="Time-Off Requests" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ backgroundColor: '#002244' }} /> {/* Darker blue divider */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/Shift" sx={listItemStyle}>
            <ListItemIcon sx={iconStyle}>
              <SwapHorizIcon />
            </ListItemIcon>
            <ListItemText primary="Shift Swapping" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ backgroundColor: '#002244' }} /> {/* Darker blue divider */}
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/UserSettings" sx={listItemStyle}>
              <ListItemIcon sx={iconStyle}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: '#002244' }} /> {/* Darker blue divider */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" sx={listItemStyle}>
              <ListItemIcon sx={iconStyle}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default StaffSidebar;
