import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import AppAppBar from './components/Navbar';
import TemporaryDrawer from './components/Admin/Drawer';
import LoginComponent from './components/Login';
import SignUpComponent from './components/SignUp';
import AdminDashboard from './components/Admin/Admin';
import EmployeeStatusDashboard from './components/Admin/Staffs';
import Profile from './components/Admin/Profile';
import StaffScheduling from './components/Admin/Schedule';
import RequestManagement from './components/Admin/Requests';
import StaffDashboard from './pages/User/StaffDashboard';
import StaffSidebar from './pages/User/StaffSideBar';
import MySchedule from './pages/User/MySchedule';
import Settings from './components/Admin/Settings';
import TimeOffRequestPage from './pages/User/TimeOfRequest';
import SwiftSwapping from './pages/User/ShiftSwapping';
import UserProfile from './pages/User/UserProfile';
import UserSettings from './pages/User/UserSettings';
import NotificationMessageIcon from './components/Admin/Notifications'; // Adjust the import path as needed
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const AppContent = ({ mode, toggleColorMode }) => {
  const location = useLocation();

  // Determine if the navbar and drawer should be displayed based on the current route
  // const showNavbar = location.pathname === '/' || location.pathname === '/Signup';
  const showSide = location.pathname === '/Dash' || location.pathname === '/My' || location.pathname === '/Time' || location.pathname === '/Shift'
    || location.pathname === '/User' || location.pathname === '/UserSettings';
  const showDrawer = location.pathname === '/Admin' || location.pathname === '/Staff' ||
    location.pathname === '/Profile' || location.pathname === '/Schedule' ||
    location.pathname === '/Req' || location.pathname === '/Dash' || location.pathname === '/Settings';

  // Define inline styles for layout
  const appContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'relative', // Ensure positioning context for absolute elements
  };

  const contentStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    transition: 'margin-left 0.3s',
    marginLeft: showDrawer ? '240px' : '0',
  };

  const contentWithSidebarStyle = {
    ...contentStyle,
    marginLeft: showSide ? '260px' : contentStyle.marginLeft,
  };

  // Define routes where the NotificationMessageIcon should be shown
  const showNotification = ['/Admin', '/Staff', '/Schedule', '/Req'].includes(location.pathname);

  return (
    <div style={appContentStyle}>
      {showDrawer && <TemporaryDrawer darkTheme={mode === 'dark'} toggleDarkTheme={toggleColorMode} />}
      {showSide && <StaffSidebar darkTheme={mode === 'dark'} toggleDarkTheme={toggleColorMode} />}
      <DndProvider backend={HTML5Backend}>
        <div style={contentWithSidebarStyle}>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/Signup" element={<SignUpComponent />} />
            <Route path="/Admin" element={<AdminDashboard />} />
            <Route path="/Staff" element={<EmployeeStatusDashboard />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Schedule" element={<StaffScheduling />} />
            <Route path="/Req" element={<RequestManagement />} />
            <Route path="/Dash" element={<StaffDashboard />} />
            <Route path="/Side" element={<StaffSidebar />} />
            <Route path="/My" element={<MySchedule />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Time" element={<TimeOffRequestPage />} />
            <Route path="/Shift" element={<SwiftSwapping />} />
            <Route path="/User" element={<UserProfile />} />
            <Route path="/UserSettings" element={<UserSettings />} />
          </Routes>
        </div>
      </DndProvider>
      {showNotification && <NotificationMessageIcon />}
    </div>
  );
};

export default AppContent;
