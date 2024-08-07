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
import { Modal, TextField, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import { LinearProgress } from '@mui/material';

// Sample data for demonstration purposes
const shifts = [
  { id: 1, date: '2024-07-30', startTime: '09:00', endTime: '17:00', role: 'Doctor', location: 'Room 101', notes: 'Routine checkup' },
  { id: 2, date: '2024-07-31', startTime: '13:00', endTime: '21:00', role: 'Doctor', location: 'Room 102', notes: 'Surgery' },
  // Add more shifts as needed
];

const appointments = [
  { id: 1, date: '2024-07-30', time: '10:00', type: 'Operation', patient: 'John Doe', location: 'Operating Room 1', notes: 'Pre-op assessment required' },
  { id: 2, date: '2024-07-31', time: '14:00', type: 'Outpatient', patient: 'Jane Smith', location: 'Consultation Room 3', notes: 'Follow-up visit' },
  // Add more appointments as needed
];

const timeOffRequests = [
  { id: 1, date: '2024-08-05', status: 'Approved' },
  { id: 2, date: '2024-08-10', status: 'Pending' },
  // Add more requests as needed
];

const MySchedule = () => {
  const [date, setDate] = useState(new Date());
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    patient: '',
    time: '',
    type: 'Operation',
    location: '',
    notes: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const selectedDate = format(date, 'yyyy-MM-dd');
    setSelectedShifts(shifts.filter(shift => shift.date === selectedDate));
    setSelectedAppointments(appointments.filter(appointment => appointment.date === selectedDate));
    setSelectedRequests(timeOffRequests.filter(request => request.date === selectedDate));
  }, [date]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm({ ...appointmentForm, [name]: value });
  };

  const handleSubmitAppointment = () => {
    // Add logic to save the appointment
    console.log('Appointment Submitted:', appointmentForm);
    setSnackbarOpen(true);
    handleCloseModal();
  };

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
              <Typography variant="h6">Shifts for {format(date, 'MMMM d, yyyy')}</Typography>
              {selectedShifts.length > 0 ? (
                <div>
                  {selectedShifts.map((shift) => (
                    <Card key={shift.id} sx={{ marginBottom: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1">
                          {shift.role} - {shift.startTime} to {shift.endTime}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Location: {shift.location}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Notes: {shift.notes}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          View Details
                        </Button>
                        <Button size="small" color="secondary">
                          Swap Shift
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </div>
              ) : (
                <Typography>No shifts for this day.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 3 }} />
      <Typography variant="h6">Appointments for {format(date, 'MMMM d, yyyy')}</Typography>
      {selectedAppointments.length > 0 ? (
        <div>
          {selectedAppointments.map((appointment) => (
            <Card key={appointment.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">
                  {appointment.type} - {appointment.time}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Patient: {appointment.patient}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Location: {appointment.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Notes: {appointment.notes}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
                <Button size="small" color="secondary">
                  Reschedule
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <Typography>No appointments for this day.</Typography>
      )}
      <Divider sx={{ marginY: 3 }} />
      <Typography variant="h6">Time-Off Requests for {format(date, 'MMMM d, yyyy')}</Typography>
      {selectedRequests.length > 0 ? (
        <div>
          {selectedRequests.map((request) => (
            <Card key={request.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">
                  Time-Off Request
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {request.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {request.status}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <Typography>No time-off requests for this day.</Typography>
      )}
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
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginTop: 3 }}>
        Add Appointment
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ padding: 3, backgroundColor: 'white', margin: 'auto', width: '50%', marginTop: '5%' }}>
          <Typography variant="h6" gutterBottom>
            Add New Appointment
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Patient Name</InputLabel>
            <TextField
              name="patient"
              value={appointmentForm.patient}
              onChange={handleAppointmentChange}
              placeholder="Enter patient name"
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Appointment Time</InputLabel>
            <TextField
              name="time"
              type="time"
              value={appointmentForm.time}
              onChange={handleAppointmentChange}
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Appointment Type</InputLabel>
            <Select
              name="type"
              value={appointmentForm.type}
              onChange={handleAppointmentChange}
            >
              <MenuItem value="Operation">Operation</MenuItem>
              <MenuItem value="Consultation">Consultation</MenuItem>
              <MenuItem value="Follow-Up">Follow-Up</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Location</InputLabel>
            <TextField
              name="location"
              value={appointmentForm.location}
              onChange={handleAppointmentChange}
              placeholder="Enter location"
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Notes</InputLabel>
            <TextField
              name="notes"
              value={appointmentForm.notes}
              onChange={handleAppointmentChange}
              multiline
              rows={4}
            />
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmitAppointment}>
            Save Appointment
          </Button>
        </Box>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Appointment added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MySchedule;
