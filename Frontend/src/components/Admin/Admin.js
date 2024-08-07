import React, { useState, useEffect } from 'react';
import {
  Card, Typography, Grid, Box, Tooltip, IconButton, TextField, MenuItem, Select, CircularProgress, Modal, Button, List, ListItem, ListItemText, Snackbar, Slide
} from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import { CalendarToday, People, EventNote, TrendingUp } from '@mui/icons-material';
import TemporaryDrawer from './Drawer';
import InfoIcon from '@mui/icons-material/Info';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CustomLabel = ({ datum, x, y, color }) => (
  <text
    x={x}
    y={y - 10}
    fill={color}
    textAnchor="middle"
    style={{ fontSize: 12 }}
  >
    {datum.label}
  </text>
);

const Dashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [staffAvailability, setStaffAvailability] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [staffOfTheMonth, setStaffOfTheMonth] = useState([]);

  useEffect(() => {
    // Simulate data fetch
    setTimeout(() => {
      setIsLoading(false);
      setEvents([
        { id: 1, title: 'Staff Meeting', date: '2024-08-01' },
        { id: 2, title: 'Training Session', date: '2024-08-05' },
        { id: 3, title: 'Department Review', date: '2024-08-10' },
      ]);
      setStaffAvailability([
        { name: 'Tom henderson', status: 'Available' },
        { name: 'Ratchel zedgler', status: 'On Leave' },
        { name: 'Emily Johnson', status: 'Available' },
      ]);
      setPerformanceData([
        { week: 'Week 1', performance: 75 },
        { week: 'Week 2', performance: 85 },
        { week: 'Week 3', performance: 60 },
        { week: 'Week 4', performance: 90 },
      ]);
      setAlerts([
        { id: 1, message: 'Urgent: Equipment Maintenance Needed', date: '2024-07-29' },
        { id: 2, message: 'Reminder: Staff Training Tomorrow', date: '2024-07-30' },
        { id: 3, message: 'Update: New Policy on Staff Leave', date: '2024-08-01' }, // New alert added here
      ]);
      setStaffOfTheMonth([
        { name: 'Dr. Alice Brown', role: 'Surgeon', reason: 'Exceptional performance in recent surgeries' },
        { name: 'Nurse Bob White', role: 'Nurse', reason: 'Outstanding patient care' },
      ]);
    }, 2000);
  }, []);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TemporaryDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Healthcare Overview
        </Typography>
        {/* Filters and Search */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            fullWidth
          />
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            displayEmpty
            size="small"
            sx={{ width: 200 }}
          >
            <MenuItem value="All">All Departments</MenuItem>
            <MenuItem value="Department A">Department A</MenuItem>
            <MenuItem value="Department B">Department B</MenuItem>
            <MenuItem value="Department C">Department C</MenuItem>
          </Select>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {/* Key Metrics */}
              <Grid item xs={12} md={6} lg={3}>
                <StyledCard>
                  <Typography variant="h6" sx={{ color: '#1976d2', mb: 1 }}>
                    Total Healthcare Staff
                  </Typography>
                  <Typography variant="h4">200</Typography>
                  <Tooltip title="Total number of healthcare staff across all departments">
                    <IconButton size="small" color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </StyledCard>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <StyledCard>
                  <Typography variant="h6" sx={{ color: '#388e3c', mb: 1 }}>
                    Active Nurses
                  </Typography>
                  <Typography variant="h4">150</Typography>
                  <Tooltip title="Number of active nurses currently available">
                    <IconButton size="small" color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </StyledCard>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <StyledCard>
                  <Typography variant="h6" sx={{ color: '#f57c00', mb: 1 }}>
                    Pending Shifts
                  </Typography>
                  <Typography variant="h4">10</Typography>
                  <Tooltip title="Number of shifts pending for assignment or approval">
                    <IconButton size="small" color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </StyledCard>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <StyledCard>
                  <Typography variant="h6" sx={{ color: '#d32f2f', mb: 1 }}>
                    Completed Shifts
                  </Typography>
                  <Typography variant="h4">120</Typography>
                  <Tooltip title="Number of shifts that have been completed">
                    <IconButton size="small" color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </StyledCard>
              </Grid>

              {/* Staff Performance Metrics */}
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ padding: 2, boxShadow: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Staff Performance Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] }]}
                        series={[{ data: [75, 85, 60, 90] }]}
                        width={500}
                        height={300}
                        colors={['#1976d2']}
                        tooltip={{ formatter: (value) => `${value} % performance` }}
                        animate
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <PieChart width={470} height={270}
                        series={[
                          {
                            data: [
                              { id: 0, value: 20, label: 'Doctors' },
                              { id: 1, value: 50, label: 'Nurses' },
                              { id: 2, value: 30, label: 'Surgeons' },
                            ],
                          },
                        ]}
                        width={500}
                        height={300}
                        colors={['#388e3c', '#f57c00', '#d32f2f']}
                        tooltip={{ formatter: (value) => `${value} %` }}
                        customLabel={CustomLabel}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Alerts */}
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ padding: 2, boxShadow: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Alerts
                  </Typography>
                  <List>
                    {alerts.map((alert) => (
                      <ListItem key={alert.id} sx={{ borderBottom: '1px solid #ddd' }}>
                        <ListItemText
                          primary={alert.message}
                          secondary={alert.date}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>

              {/* Staff of the Month */}
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ padding: 2, boxShadow: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Staff of the Month
                  </Typography>
                  <List>
                    {staffOfTheMonth.map((staff, index) => (
                      <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
                        <ListItemText
                          primary={staff.name}
                          secondary={`Role: ${staff.role} - Reason: ${staff.reason}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>

              {/* Events */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ padding: 2, boxShadow: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Upcoming Events
                  </Typography>
                  <List>
                    {events.map((event) => (
                      <ListItem key={event.id} sx={{ borderBottom: '1px solid #ddd' }}>
                        <ListItemText
                          primary={event.title}
                          secondary={event.date}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>

              {/* Staff Availability */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ padding: 2, boxShadow: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Staff Availability
                  </Typography>
                  <List>
                    {staffAvailability.map((staff, index) => (
                      <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
                        <ListItemText
                          primary={staff.name}
                          secondary={`Status: ${staff.status}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            </Grid>
          </>
        )}

        {/* Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{ width: 400, bgcolor: 'background.paper', p: 3, mx: 'auto', my: 4 }}>
            <Typography variant="h6" id="modal-title">
              {modalContent}
            </Typography>
            <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          TransitionComponent={(props) => <Slide {...props} direction="down" />}
        >
          <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Dashboard;
