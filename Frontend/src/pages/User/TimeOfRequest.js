import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import Notification from './Notification';
import { ListItemText } from '@mui/material';

const TimeOfRequestPage = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reason, setReason] = useState('');
  const [document, setDocument] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/time-off-requests'); // Replace with your API endpoint
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('leaveType', leaveType);
      formData.append('startDate', startDate.toISOString());
      formData.append('endDate', endDate.toISOString());
      formData.append('reason', reason);
      if (document) formData.append('document', document);

      await axios.post('/api/time-off-requests', formData);
      setSnackbarMessage('Request submitted successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Failed to submit request:', error);
      setSnackbarMessage('Failed to submit request.');
      setSnackbarSeverity('error');
    }
    setOpenSnackbar(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ padding: '16px' }}>
        <Typography variant="h4">Time-Off Request</Typography>
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Leave Type</InputLabel>
            <Select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <MenuItem value="vacation">Vacation</MenuItem>
              <MenuItem value="sick">Sick Leave</MenuItem>
              <MenuItem value="personal">Personal Day</MenuItem>
            </Select>
          </FormControl>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
          />
          <TextField
            label="Reason"
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setDocument(e.target.files[0])}
            style={{ margin: '16px 0' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit Request
          </Button>
        </form>
        <Divider style={{ margin: '24px 0' }} />
        <Typography variant="h6">Request Summary</Typography>
        <Card>
          <CardContent>
            <Typography>Leave Type: {leaveType}</Typography>
            <Typography>Start Date: {startDate ? startDate.toLocaleDateString() : 'N/A'}</Typography>
            <Typography>End Date: {endDate ? endDate.toLocaleDateString() : 'N/A'}</Typography>
            <Typography>Reason: {reason}</Typography>
            {document && <Typography>Document: {document.name}</Typography>}
          </CardContent>
        </Card>
        <Divider style={{ margin: '24px 0' }} />
        <Typography variant="h6">Request History</Typography>
        {loading ? <CircularProgress /> : (
          <List>
            {requests.map((request) => (
              <ListItem key={request.id}>
                <ListItemText
                  primary={`${request.leaveType} - ${new Date(request.startDate).toLocaleDateString()} to ${new Date(request.endDate).toLocaleDateString()}`}
                  secondary={request.status}
                />
              </ListItem>
            ))}
          </List>
        )}
        <Notification
          open={openSnackbar}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
        />
      </div>
    </LocalizationProvider>
  );
};

export default TimeOfRequestPage;
