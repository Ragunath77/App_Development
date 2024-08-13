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
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function TemporaryDrawer() {
  const drawerStyle = {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: '#00274d', // Fixed dark blue color
      color: '#fff', // Text color for better contrast on dark blue
      borderRight: `1px solid #001f3f`, // Slightly darker blue for border
    },
  };

  const listItemStyle = {
    '&:hover': {
      backgroundColor: '#003366', // Darker blue on hover
    },
  };

  const iconStyle = {
    color: '#fff', // Ensure icons are white
  };


  return (
    <Drawer
      variant="permanent" // Ensures the drawer remains open
      anchor="left"
      sx={drawerStyle}
    >
      <Box sx={{ width: drawerWidth, display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
        <Box>
          <Link to="/Profile" style={{ textDecoration: 'none', color: '#fff' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton sx={listItemStyle}>
                  <ListItemIcon sx={iconStyle}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
            </List>
          </Link>
          <Divider/>
          <Link to="/Admin" style={{ textDecoration: 'none', color: '#fff' }}>
            <ListItem disablePadding>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon sx={iconStyle}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider/>
          <Link to="/Staff" style={{ textDecoration: 'none', color: '#fff' }}>
            <ListItem disablePadding>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon sx={iconStyle}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Staffs" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider/>
          <Link to="/Schedule" style={{ textDecoration: 'none', color: '#fff' }}>
            <ListItem disablePadding>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon sx={iconStyle}>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Schedule" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider/>
          <Link to="/Req" style={{ textDecoration: 'none', color: '#fff' }}>
            <ListItem disablePadding>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon sx={iconStyle}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Requests" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider/>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <List>
            <Link to="/Settings" style={{ textDecoration: 'none', color: '#fff' }}>
              <ListItem disablePadding>
                <ListItemButton sx={listItemStyle}>
                  <ListItemIcon sx={iconStyle}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider/>
            <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
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
      </Box>
    </Drawer>
  );
}
