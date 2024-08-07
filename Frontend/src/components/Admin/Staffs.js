import React, { useState, useEffect } from 'react';
import DepartmentFilter from './Filter'; // Adjust path according to your file structure
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, Modal, TextField } from '@mui/material';

const drawerWidth = 240; // Width of the drawer to align content

const EmployeeStatusDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [departments, setDepartments] = useState(new Set()); // Set to store unique departments

  useEffect(() => {
    // Initialize with sample data
    const initialData = [
      { id: 1, name: 'Alex Johnson', city: 'New York', department: 'Cardiology', phone: '123-456-7890' },
      { id: 2, name: 'Sophie Adams', city: 'Los Angeles', department: 'Pediatrics', phone: '987-654-3210' },
      { id: 3, name: 'Liam Martinez', city: 'Chicago', department: 'Orthopedics', phone: '555-123-4567' },
      { id: 4, name: 'Olivia Brown', city: 'New York', department: 'Emergency', phone: '555-987-6543' },
      { id: 5, name: 'Ethan Wilson', city: 'Los Angeles', department: 'Neurology', phone: '555-000-1111' }
    ];
    setStaffData(initialData);
    updateDepartments(initialData);
  }, []);

  const updateDepartments = (data) => {
    const departmentSet = new Set(data.map(item => item.department));
    setDepartments(departmentSet);
  };

  const handleOpen = (data = null) => {
    setModalData(data);
    setNewStaff(data || { id: '', name: '', city: '', department: '', phone: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalData(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setStaffData(prev =>
      prev.map(item =>
        item.id === newStaff.id ? newStaff : item
      )
    );
    updateDepartments(staffData.map(item => item.department));
    handleClose();
  };

  const handleAdd = () => {
    if (staffData.some(item => item.id === newStaff.id)) {
      alert('ID already exists. Please enter a unique ID.');
      return;
    }
    const updatedStaffData = [...staffData, newStaff];
    setStaffData(updatedStaffData);
    updateDepartments(updatedStaffData);
    handleClose();
  };

  const handleDelete = (id) => {
    const updatedStaffData = staffData.filter(item => item.id !== id);
    setStaffData(updatedStaffData);
    updateDepartments(updatedStaffData);
  };

  const [newStaff, setNewStaff] = useState({ id: '', name: '', city: '', department: '', phone: '' });

  const filteredData = staffData.filter(item =>
    selectedDepartment === '' || item.department === selectedDepartment
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: `0px`, // Removed the margin-left to eliminate extra space
          width: `100%`, // Adjusted width to take full space after removing margin
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Manage Staffs
        </Typography>
        <Typography variant="h5" gutterBottom>
          Filter By Department:
        </Typography>
        {/* Filter Section */}
        <Box sx={{ mb: -4, display: 'flex', alignItems: 'center', width: 250 }}>
          <DepartmentFilter selectedDepartment={selectedDepartment} onDepartmentChange={setSelectedDepartment} departments={Array.from(departments)} sx={{ width: 120 }} />
        </Box>
        {/* Add Staff Button */}
        <Box sx={{ textAlign: 'right', mb: 2 }}>
          <Button variant="contained" color="success" onClick={() => handleOpen()}>
            Add Staff
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#ADD8E6' }}>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>ID</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Name</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>City</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Department</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Phone Number</TableCell>
                <TableCell sx={{ backgroundColor: '#dbe9f4' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <TableRow key={row.id} sx={{ height: 48 }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleOpen(row)} sx={{ mr: 1 }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Modal for Adding/Editing Staff */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 10, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              {modalData ? 'Edit Staff' : 'Add Staff'}
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="ID"
              name="id"
              value={newStaff.id}
              onChange={handleChange}
              disabled={!!modalData}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={newStaff.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="City"
              name="city"
              value={newStaff.city}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Department"
              name="department"
              value={newStaff.department}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone Number"
              name="phone"
              value={newStaff.phone}
              onChange={handleChange}
            />
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button variant="outlined" onClick={handleClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={modalData ? handleSave : handleAdd}
              >
                {modalData ? 'Save' : 'Add'}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default EmployeeStatusDashboard;
