import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, Modal } from '@mui/material';
import { Visibility as VisibilityIcon, Check as CheckIcon, Cancel as CancelIcon } from '@mui/icons-material';

const drawerWidth = 240; // Width of the drawer to align content

const RequestManagement = () => {
  const [requests, setRequests] = useState([]);
  const [requestHistory, setRequestHistory] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Initialize with sample requests
    const initialRequests = [
      { id: 1, name: 'John Doe', type: 'Leave', status: 'Pending', reason: 'Family emergency', details: 'Requires immediate attention' },
      { id: 2, name: 'Jane Smith', type: 'Shift Change', status: 'Pending', reason: 'Doctor’s appointment', requestedTime: '08:00 - 16:00', details: 'Adjust shift timing' },
      { id: 3, name: 'Emily Johnson', type: 'Leave', status: 'Pending', reason: 'Vacation', details: 'Planning extended leave' },
      { id: 4, name: 'Michael Brown', type: 'Shift Change', status: 'Pending', reason: 'Personal reasons', requestedTime: '12:00 - 20:00', details: 'Urgent shift change needed' }
    ];
    setRequests(initialRequests);
  }, []);

  const handleOpen = (request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

  const handleAction = (action) => {
    if (selectedRequest) {
      const updatedRequests = requests.filter(req => req.id !== selectedRequest.id);
      const updatedHistory = [...requestHistory, { ...selectedRequest, status: action === 'accept' ? 'Approved' : 'Denied', date: new Date().toISOString().split('T')[0] }];
      setRequests(updatedRequests);
      setRequestHistory(updatedHistory);
      handleClose();
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: 0,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Request Management
        </Typography>

        {/* Requests Section */}
        <Typography variant="h5" gutterBottom>
          Pending Requests
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>ID</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Name</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Type</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Details</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <TableRow key={request.id} sx={{ height: 48 }}>
                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>{request.id}</TableCell>
                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>{request.name}</TableCell>
                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>{request.type}</TableCell>
                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>{request.details}</TableCell>
                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpen(request)}
                        sx={{ mr: 1 }}
                        startIcon={<VisibilityIcon />}
                      >
                        View Request
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ backgroundColor: '#f5f5f5' }}>
                    No requests available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Request History Section */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Request History
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>ID</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Name</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Type</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Details</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Status</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestHistory.length > 0 ? (
                requestHistory.map((request) => (
                  <TableRow key={request.id} sx={{ height: 48 }}>
                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>{request.id}</TableCell>
                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>{request.name}</TableCell>
                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>{request.type}</TableCell>
                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>{request.details}</TableCell>
                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>{request.status}</TableCell>
                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>{request.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ backgroundColor: '#f5f5f5' }}>
                    No history available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for Viewing Request */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 10, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              {selectedRequest ? `Request Details - ${selectedRequest.type}` : 'Request Details'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Name:</strong> {selectedRequest?.name}
            </Typography>
            {selectedRequest?.requestedTime && (
              <Typography variant="body1" gutterBottom>
                <strong>Requested Time:</strong> {selectedRequest.requestedTime}
              </Typography>
            )}
            <Typography variant="body1" gutterBottom>
              <strong>Reason:</strong> {selectedRequest?.reason}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Details:</strong> {selectedRequest?.details}
            </Typography>
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button variant="contained" color="success" onClick={() => handleAction('accept')}>
                Accept <CheckIcon sx={{ ml: 1 }} />
              </Button>
              <Button variant="contained" color="error" onClick={() => handleAction('deny')} sx={{ ml: 1 }}>
                Deny <CancelIcon sx={{ ml: 1 }} />
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default RequestManagement;
