import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SchedulingComponent = () => {
  const [staffId, setStaffId] = useState('');
  const [staffDetails, setStaffDetails] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch existing schedules
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/schedules');
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    // Fetch staff list
    const fetchStaffList = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/profiles');
        setStaffList(response.data);
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };

    fetchSchedules();
    fetchStaffList();
  }, []);

  useEffect(() => {
    // Fetch schedules when selected date changes
    const fetchSchedulesForDate = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/schedules');
        const schedules = response.data.filter(sched => {
          const schedStartDate = new Date(sched.startDate);
          const schedEndDate = new Date(sched.endDate);
          return selectedDate >= schedStartDate && selectedDate <= schedEndDate;
        });
        setSchedule(schedules);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedulesForDate();
  }, [selectedDate]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/profiles/${staffId}`);
      if (response.data) {
        setStaffDetails(response.data);
        setError(''); // Clear any previous error
      } else {
        setError('Staff ID not found');
      }
    } catch {
      setError('Invalid staff ID');
    }
  };

  const handleOpenModal = () => {
    setStartDate('');
    setEndDate('');
    setStartTime('');
    setEndTime('');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setError('');
  };

  const handleAddSchedule = async () => {
    if (staffDetails && startDate && endDate && startTime && endTime) {
      const scheduleData = {
        startDate,
        endDate,
        startTime,
        endTime,
        hoursWorked: calculateHoursWorked(startDate, startTime, endDate, endTime),
        profile: { profileId: staffDetails.profileId },
      };

      console.log('Schedule Data:', scheduleData); // Log the data being sent

      try {
        const response = await axios.post('http://localhost:8080/api/schedules', scheduleData);
        console.log('Create Response:', response.data); // Log the response from the create
        setSchedule([...schedule, response.data]);
        handleCloseModal();
      } catch (error) {
        console.error('Error adding schedule:', error.response || error.message); // Log the error details
        setError('Error adding schedule.');
      }
    } else {
      setError('Please fill out all fields.');
    }
  };

  const calculateHoursWorked = (startDate, startTime, endDate, endTime) => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const hoursWorked = (end - start) / (1000 * 60 * 60);
    return hoursWorked;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Find staff name from staffList by staffId
  const getStaffNameById = (id) => {
    const staff = staffList.find(staff => staff.profileId === id);
    return staff ? staff.name : 'Unknown';
  };

  return (
    <Box display="flex" flexDirection="column" padding={2} gap={2}>
      <Box display="flex" gap={2}>
        <Box flex={1} display="flex" flexDirection="column" gap={2}>
          <Typography variant="h5" gutterBottom>
            Search Staff
          </Typography>
          <TextField
            label="Staff ID"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            size="small"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          
          {staffDetails && (
            <Card variant="outlined" sx={{ marginTop: 2 }}>
              <CardContent>
                <Typography variant="h6">{staffDetails.name}</Typography>
                <Typography>Department: {staffDetails.dept}</Typography>
                <Typography>Role: {staffDetails.role}</Typography>
                <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginTop: 2 }}>
                  Add Schedule
                </Button>
              </CardContent>
            </Card>
          )}
        </Box>

        <Box flex={1} display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography variant="h5" gutterBottom>
            Admin Calendar
          </Typography>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            view="month"
          />
        </Box>
      </Box>

      <Box marginTop={2}>
        <Typography variant="h5" gutterBottom>
          Scheduled Details for {selectedDate.toDateString()}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Schedule ID</TableCell>
                <TableCell>Staff Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((sched) => (
                <TableRow key={sched.scheduleId}>
                  <TableCell>{sched.scheduleId}</TableCell>
                  <TableCell>{getStaffNameById(sched.profile.profileId)}</TableCell>
                  <TableCell>{sched.startDate}</TableCell>
                  <TableCell>{sched.endDate}</TableCell>
                  <TableCell>{sched.startTime}</TableCell>
                  <TableCell>{sched.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal for Add Schedule */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Add Schedule
          </Typography>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button variant="contained" color="primary" onClick={handleAddSchedule}>
              Save Schedule
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SchedulingComponent;
