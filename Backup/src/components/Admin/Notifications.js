import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  List,
  ListItem,
  Button,
  Box,
  TextField,
  Avatar,
  Chip,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';

const initialNotifications = [
  { id: 1, text: 'System update available.', detail: 'A system update is available. Please update your system to the latest version for improved security and features.', read: false, icon: <SystemUpdateIcon /> },
  { id: 2, text: 'New user registration.', detail: 'A new user has registered. Please review their profile and permissions.', read: false, icon: <EventIcon /> },
  { id: 3, text: 'Server maintenance scheduled.', detail: 'Server maintenance is scheduled for 2 AM. Expect downtime during this period.', read: false, icon: <EventIcon /> },
  { id: 4, text: 'Password change required.', detail: 'Your password must be changed within the next 7 days for security reasons.', read: false, icon: <SystemUpdateIcon /> },
];

const sampleStaffData = [
  { id: 1, name: 'Alice', messages: [
    { id: 1, text: 'Requesting time off.', fromAdmin: false },
    { id: 2, text: 'Please approve my leave.', fromAdmin: false },
  ] },
  { id: 2, name: 'Bob', messages: [
    { id: 3, text: 'Need assistance with project.', fromAdmin: false },
    { id: 4, text: 'Can we have a meeting?', fromAdmin: false },
  ] },
  { id: 3, name: 'Charlie', messages: [
    { id: 5, text: 'Completed the task assigned.', fromAdmin: false },
    { id: 6, text: 'Let me know if you need anything else.', fromAdmin: false },
  ] },
  { id: 4, name: 'David', messages: [
    { id: 7, text: 'How to update my profile?', fromAdmin: false },
    { id: 8, text: 'Can I get feedback on my performance?', fromAdmin: false },
  ] },
];

const NotificationMessageIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [currentStaffMessages, setCurrentStaffMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleClick = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menu);
    setSelectedStaff(null);
    setCurrentStaffMessages([]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification) => {
    setNotifications(notifications.map((notif) =>
      notif.id === notification.id ? { ...notif, read: true } : notif
    ));
  };

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff);
    setCurrentStaffMessages(staff.messages);
    setCurrentMenu('messages');
    setAnchorEl(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const updatedMessages = [...currentStaffMessages, { id: Date.now(), text: newMessage, fromAdmin: true }];
    setCurrentStaffMessages(updatedMessages);
    setNewMessage('');
  };

  const handleMessageInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;
  const totalMessageCount = sampleStaffData.reduce((acc, staff) => acc + staff.messages.length, 0);

  const renderMenuContent = () => {
    if (currentMenu === 'notifications') {
      return (
        <>
          <Typography variant="subtitle1" sx={{ padding: '8px 16px', fontWeight: 'bold' }}>
            Notifications
          </Typography>
          <Divider />
          <List>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  button
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    '&:hover': { backgroundColor: '#f5f5f5' },
                    padding: '12px 16px',
                    borderRadius: '8px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <Avatar
                    sx={{
                      mr: 2,
                      bgcolor: notification.read ? 'transparent' : 'primary.main',
                      color: notification.read ? 'text.secondary' : 'white',
                    }}
                  >
                    {notification.icon}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}
                    >
                      {notification.text}
                    </Typography>
                  </Box>
                  {!notification.read && (
                    <Chip
                      label="New"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        right: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    />
                  )}
                </ListItem>
              ))
            ) : (
              <MenuItem disabled>No notifications</MenuItem>
            )}
          </List>
        </>
      );
    }
    if (currentMenu === 'messages') {
      return (
        <>
          <Typography variant="subtitle1" sx={{ padding: '8px 16px', fontWeight: 'bold' }}>
            Chat with {selectedStaff ? selectedStaff.name : 'Staff'}
          </Typography>
          <Divider />
          <Box sx={{ height: 300, overflowY: 'auto', p: 2 }}>
            {currentStaffMessages.length > 0 ? (
              currentStaffMessages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    mb: 1,
                    p: 1,
                    borderRadius: '8px',
                    bgcolor: msg.fromAdmin ? 'primary.main' : 'grey.200',
                    color: msg.fromAdmin ? 'white' : 'black',
                    alignSelf: msg.fromAdmin ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                  }}
                >
                  <Typography variant="body2">
                    {msg.fromAdmin ? 'You: ' : `${selectedStaff?.name}: `}{msg.text}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">No messages</Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Type a message..."
              value={newMessage}
              onChange={handleMessageInputChange}
              sx={{ mr: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage}>
              Send
            </Button>
          </Box>
        </>
      );
    }
    return null;
  };

  return (
    <div style={{ position: 'absolute', top: 16, right: 16 }}>
      <IconButton
        onClick={(event) => handleClick(event, 'notifications')}
        color="inherit"
        aria-controls="notification-menu"
        aria-haspopup="true"
        style={{ position: 'relative' }}
      >
        <Badge badgeContent={unreadCount} color="error" invisible={unreadCount === 0}>
          <NotificationsIcon style={{ color: unreadCount > 0 ? 'primary' : 'inherit' }} />
        </Badge>
      </IconButton>
      <IconButton
        onClick={(event) => handleClick(event, 'messages')}
        color="inherit"
        aria-controls="message-menu"
        aria-haspopup="true"
        style={{ marginLeft: 16, position: 'relative' }}
      >
        <Badge badgeContent={totalMessageCount} color="error" invisible={totalMessageCount === 0}>
          <MessageIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 400,
            maxHeight: '80vh',
          },
        }}
      >
        {renderMenuContent()}
        {selectedStaff && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<CloseIcon />}
            onClick={() => setSelectedStaff(null)}
            sx={{ mt: 2, ml: 2 }}
          >
            Close Chat
          </Button>
        )}
      </Menu>
    </div>
  );
};

export default NotificationMessageIcon;
