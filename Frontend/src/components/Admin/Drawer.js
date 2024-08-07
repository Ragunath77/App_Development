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
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function TemporaryDrawer({ darkTheme, toggleDarkTheme }) {
  const theme = createTheme({
    palette: {
      mode: darkTheme ? 'dark' : 'light',
    },
  });

  const drawerStyle = {
    width: drawerWidth,
    flexShrink: 10,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      background: darkTheme ? 'linear-gradient(to bottom, #333, #555)' : '#fff',
      color: theme.palette.text.primary,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  };

  const listItemStyle = {
    '&:hover': {
      backgroundColor: darkTheme ? '#444' : '#f5f5f5',
    },
  };

  const iconStyle = {
    color: darkTheme ? '#fff' : '#000',
  };

  const firstName = localStorage.getItem('firstName') || 'First';
  const lastName = localStorage.getItem('lastName') || 'Last';

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        variant="permanent" // Ensures the drawer remains open
        anchor="left"
        sx={drawerStyle}
      >
        <Box sx={{ width: drawerWidth }} role="presentation">
          <Link to="/Profile" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton sx={listItemStyle}>
                  <ListItemIcon sx={iconStyle}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" secondary={`${firstName} ${lastName}`} />
                </ListItemButton>
              </ListItem>
            </List>
          </Link>
          <Divider />
          <Link to="/Admin" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            <ListItem disablePadding>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon sx={iconStyle}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link to="/Staff" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            <ListItem disablePadding>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon sx={iconStyle}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Staffs" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link to="/Schedule" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            <ListItem disablePadding>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon sx={iconStyle}>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Schedule" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link to="/Req" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            <ListItem disablePadding>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon sx={iconStyle}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Requests" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleDarkTheme} sx={listItemStyle} sx={{mb:33}}>
                <ListItemIcon sx={iconStyle}>
                  <Brightness4Icon />
                </ListItemIcon>
                <ListItemText primary="Dark Theme" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <Link to="/Settings" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
              <ListItem disablePadding>
                <ListItemButton sx={listItemStyle}>
                  <ListItemIcon sx={iconStyle}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
              <ListItem disablePadding>
                <ListItemButton sx={listItemStyle}>
                  <ListItemIcon sx={iconStyle}>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}
