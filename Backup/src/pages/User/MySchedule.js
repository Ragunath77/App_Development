import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { Modal, Snackbar, Alert, LinearProgress } from '@mui/material';

// Sample API URL - Replace with your actual API endpoint
const API_URL = '/api/schedules';

const MySchedule = () => {
  const [date, setDate] = useState(new Date());
  const [selectedSchedules, setSelectedSchedules] = useState([
    {
      scheduleId: 1,
      profile: { role: 'Surgeon' },
      startDate: '2024-08-10',
      endDate: '2024-08-20',
      startTime: '08:00',
      endTime: '20:00',
      hoursWorked: 12
    }
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          const filteredSchedules = data.filter(schedule => 
            format(new Date(schedule.startDate), 'yyyy-MM-dd') <= format(date, 'yyyy-MM-dd') &&
            format(new Date(schedule.endDate), 'yyyy-MM-dd') >= format(date, 'yyyy-MM-dd')
          );
          setSelectedSchedules(filteredSchedules.length > 0 ? filteredSchedules : selectedSchedules);
        } else {
          console.error('Failed to fetch schedules');
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };
    
    fetchSchedules();
  }, [date]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Schedule
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Calendar</Typography>
              <Calendar
                onChange={setDate}
                value={date}
                view="month"
                minDate={new Date()}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Schedules for {format(date, 'MMMM d, yyyy')}</Typography>
              {selectedSchedules.length > 0 ? (
                <div>
                  {selectedSchedules.map((schedule) => (
                    <Card key={schedule.scheduleId} sx={{ marginBottom: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1">
                          {schedule.profile.role} - {schedule.startTime} to {schedule.endTime}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Start Date: {format(new Date(schedule.startDate), 'MMMM d, yyyy')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          End Date: {format(new Date(schedule.endDate), 'MMMM d, yyyy')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Hours Worked: {schedule.hoursWorked}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          View Details
                        </Button>
                        <Button size="small" color="secondary">
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </div>
              ) : (
                <Typography>No schedules for this day.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 3 }} />
      <Typography variant="h6">Performance Metrics</Typography>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="subtitle1">Overall Performance</Typography>
          <LinearProgress variant="determinate" value={75} sx={{ marginY: 2 }} />
          <Typography variant="body2" color="textSecondary">
            Progress towards monthly targets
          </Typography>
        </CardContent>
      </Card>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Appointment successfully submitted!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MySchedule;
