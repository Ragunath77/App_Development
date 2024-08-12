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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SchedulingComponent = () => {
  const [staffId, setStaffId] = useState('');
  const [staffDetails, setStaffDetails] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState('');
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [deletingScheduleId, setDeletingScheduleId] = useState(null);

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
      setStaffDetails(response.data);
      setError(''); // Clear any previous error
    } catch {
      setError('Invalid staff ID');
    }
  };

  const handleOpenModal = (scheduleToEdit = null) => {
    if (scheduleToEdit) {
      setEditingSchedule(scheduleToEdit);
      setStartDate(scheduleToEdit.startDate);
      setEndDate(scheduleToEdit.endDate);
      setStartTime(scheduleToEdit.startTime);
      setEndTime(scheduleToEdit.endTime);
    } else {
      setEditingSchedule(null);
      setStartDate('');
      setEndDate('');
      setStartTime('');
      setEndTime('');
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setError('');
  };

  const handleAddSchedule = async () => {
    if (staffDetails && startDate && endDate && startTime && endTime) {
      const scheduleData = {
        profileId: staffDetails.id,
        startDate,
        endDate,
        startTime,
        endTime,
        
      };
      console.log('Schedule Data:', scheduleData); // Log the data being sent

      try {
        if (editingSchedule) {
          const response = await axios.put(`http://localhost:8080/api/schedules/${editingSchedule.scheduleId}`, scheduleData);
          console.log('Update Response:', response.data); // Log the response from the update
          setSchedule(schedule.map(sched => sched.scheduleId === editingSchedule.scheduleId ? response.data : sched));
        } else {
          const response = await axios.post('http://localhost:8080/api/schedules', scheduleData);
          console.log('Create Response:', response.data); // Log the response from the create
          setSchedule([...schedule, response.data]);
        }
        handleCloseModal();
      } catch {
        console.error('Error adding/updating schedule:', error.response || error.message); // Log the error details

        setError('Error adding/updating schedule.');
      }
    } else {
      setError('Please fill out all fields.');
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setDeletingScheduleId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingScheduleId(null);
  };

  const handleDeleteSchedule = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/schedules/${deletingScheduleId}`);
      setSchedule(schedule.filter(sched => sched.scheduleId !== deletingScheduleId));
      handleCloseDeleteDialog();
    } catch {
      setError('Error deleting schedule.');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Find staff name from staffList by staffId
  const getStaffNameById = (id) => {
    const staff = staffList.find(staff => staff.id === id);
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
                <Button variant="contained" color="primary" onClick={() => handleOpenModal()} sx={{ marginTop: 2 }}>
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((sched) => (
                <TableRow key={sched.scheduleId}>
                  <TableCell>{sched.scheduleId}</TableCell>
                  <TableCell>{getStaffNameById(sched.profileId)}</TableCell>
                  <TableCell>{sched.startDate}</TableCell>
                  <TableCell>{sched.endDate}</TableCell>
                  <TableCell>{sched.startTime}</TableCell>
                  <TableCell>{sched.endTime}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleOpenModal(sched)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleOpenDeleteDialog(sched.scheduleId)} sx={{ marginLeft: 1 }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">{editingSchedule ? 'Edit Schedule' : 'Add Schedule'}</Typography>
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
          <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
            <Button variant="contained" color="primary" onClick={handleAddSchedule}>
              {editingSchedule ? 'Save Changes' : 'Add Schedule'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Schedule</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this schedule?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteSchedule} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SchedulingComponent;
