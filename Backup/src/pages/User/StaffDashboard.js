import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import Calendar from 'react-calendar';
import { LinearProgress, CircularProgress, Snackbar, IconButton, Alert } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const hoursData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Hours Worked',
      data: [40, 35, 45, 50],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const operationsData = {
  labels: ['Surgery', 'Consultation', 'Emergency', 'Follow-up', 'Others'],
  datasets: [
    {
      label: 'Number of Operations Attended',
      data: [20, 45, 30, 15, 10],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
    },
  ],
};

const successRateData = {
  labels: ['Success', 'Failure'],
  datasets: [
    {
      label: 'Success Rate',
      data: [75, 25],
      backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    },
  ],
};

const tileClassName = ({ date }) => {
  const workedDaysArray = [1, 5, 10, 15, 20, 25, 30];
  if (workedDaysArray.includes(date.getDate())) {
    return 'highlighted';
  }
  return null;
};

const StaffDashboard = () => {
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user-data'); // Replace with your API endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications'); // Replace with your API endpoint
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchUserData();
    fetchNotifications();
    setLoading(false);
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.firstName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Today's Date: {new Date().toLocaleDateString()}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Hours Worked This Month
            </Typography>
            <Bar data={hoursData} options={{ responsive: true }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Number of Days Worked
            </Typography>
            <Typography variant="body1">
              <CalendarTodayIcon /> {user.workedDays} days
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(user.hoursWorked / user.targetHours) * 100}
              sx={{ marginBottom: 2 }}
            />
            <Typography variant="body1">
              Hours Worked: {user.hoursWorked} / {user.targetHours}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Calendar
            </Typography>
            <Calendar
              tileClassName={tileClassName}
              style={{ border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Paper elevation={3} sx={{ padding: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Operations Attended
            </Typography>
            <Line data={operationsData} options={{ responsive: true }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Paper elevation={3} sx={{ padding: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Success Rate
            </Typography>
            <Pie data={successRateData} options={{ responsive: true }} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Paper key={notification.id} elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
                    <Typography variant="body1">
                      {notification.message}
                    </Typography>
                  </Paper>
                ))
              ) : (
                <Typography>No notifications at the moment.</Typography>
              )
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Additional Details
            </Typography>
            <Typography variant="body1">
              <strong>Salary Received:</strong> {user.salaryReceived ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body1">
              <strong>Specialization:</strong> {user.specialization}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <style>
        {`
          .react-calendar .highlighted {
            background-color: #ffcc00 !important;
            color: #000 !important;
            border-radius: 50%;
          }
        `}
      </style>
    </Box>
  );
};

export default StaffDashboard;