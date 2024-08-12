import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { format } from 'date-fns';

// Sample data for demonstration purposes
const sampleShifts = [
  { id: '1', date: '2024-07-30', startTime: '08:00', endTime: '16:00', role: 'Surgeon', doctorId: 'doctor1', shiftType: 'Morning', dutyType: 'Outpatient' },
  { id: '2', date: '2024-07-30', startTime: '16:00', endTime: '00:00', role: 'Nurse', doctorId: 'doctor2', shiftType: 'Evening', dutyType: 'Duty Doctor' },
  { id: '3', date: '2024-07-31', startTime: '00:00', endTime: '08:00', role: 'Surgeon', doctorId: 'doctor1', shiftType: 'Night', dutyType: 'Outpatient' },
  // Add more shifts as needed
];

const sampleDoctors = [
  { id: 'doctor1', name: 'Dr. John Doe' },
  { id: 'doctor2', name: 'Dr. Jane Smith' },
  // Add more doctors as needed
];

const SwiftSwapping = () => {
  const [date, setDate] = useState(new Date());
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [newShift, setNewShift] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [requestingSwap, setRequestingSwap] = useState(false);

  useEffect(() => {
    // Simulating data fetch
    setShifts(sampleShifts);
    setDoctors(sampleDoctors);
    setLoading(false);
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const formattedDate = format(newDate, 'yyyy-MM-dd');
    setShifts(sampleShifts.filter(shift => shift.date === formattedDate));
  };

  const handleSwapShift = (shift) => {
    setSelectedShift(shift);
    setNewShift(null); // Reset newShift
    setDialogOpen(true);
  };

  const handleConfirmSwap = async () => {
    if (!selectedShift || !newShift) return;
    try {
      setLoading(true);
      setRequestingSwap(true);
      // Simulate API call
      await axios.post('/api/swap-shifts', {
        fromShiftId: selectedShift.id,
        toShiftId: newShift.id,
      });
      // Update shifts state
      setShifts(shifts.map(shift => {
        if (shift.id === selectedShift.id || shift.id === newShift.id) {
          return { ...shift, swapped: true };
        }
        return shift;
      }));
      setSuccess('Shift swapped successfully!');
    } catch (err) {
      setError('Failed to swap shifts. Please try again.');
    } finally {
      setRequestingSwap(false);
      setLoading(false);
      setDialogOpen(false);
    }
  };

  const handleSnackbarClose = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Swift Swapping for Doctors
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Calendar</Typography>
              <Calendar
                onChange={handleDateChange}
                value={date}
                view="month"
                minDate={new Date()}
                tileClassName={({ date, view }) =>
                  view === 'month' && shifts.some(shift => shift.date === format(date, 'yyyy-MM-dd'))
                    ? 'highlight'
                    : null
                }
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Shifts for {format(date, 'MMMM d, yyyy')}</Typography>
              {loading ? (
                <CircularProgress />
              ) : shifts.length > 0 ? (
                <div>
                  {shifts.map((shift) => (
                    <Card key={shift.id} sx={{ marginBottom: 2, border: `1px solid ${shift.swapped ? 'green' : '#ccc'}` }}>
                      <CardContent>
                        <Typography variant="subtitle1">
                          {shift.role} - {shift.shiftType} ({shift.startTime} to {shift.endTime})
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Shift Date: {format(new Date(shift.date), 'MMMM d, yyyy')} - Duty: {shift.dutyType}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleSwapShift(shift)}
                          disabled={shift.swapped}
                        >
                          {shift.swapped ? 'Swapped' : 'Request Swap'}
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
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Request Shift Swap</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Select a new shift to swap with:</Typography>
          {shifts.filter(shift => shift.id !== selectedShift?.id).map(shift => (
            <Card key={shift.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">
                  {shift.role} - {shift.shiftType} ({shift.startTime} to {shift.endTime})
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Shift Date: {format(new Date(shift.date), 'MMMM d, yyyy')} - Duty: {shift.dutyType}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => setNewShift(shift)}
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          ))}
          {newShift && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="subtitle1">Selected New Shift:</Typography>
              <Typography variant="body2">
                {newShift.role} - {newShift.shiftType} ({newShift.startTime} to {newShift.endTime}) on {format(new Date(newShift.date), 'MMMM d, yyyy')} - Duty: {newShift.dutyType}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSwap}
            color="primary"
            disabled={loading || requestingSwap || !newShift}
          >
            {requestingSwap ? 'Requesting...' : 'Confirm Swap'}
          </Button>
        </DialogActions>
      </Dialog>
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
      )}
      <style jsx>{`
        .react-calendar {
          width: 100%;
          border: none;
          background: white;
        }

        .react-calendar__tile {
          padding: 10px;
          text-align: center;
          font-size: 14px;
        }

        .react-calendar__tile--active {
          background: #007bff;
          color: white;
        }

        .react-calendar__tile--highlight {
          background: #f0f8ff;
        }
      `}</style>
    </Box>
  );
};

export default SwiftSwapping;
