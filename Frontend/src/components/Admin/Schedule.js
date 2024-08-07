import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, IconButton, Modal, Button, TextField } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const mockData = [
    { id: 1, name: 'John Doe', role: 'Nurse', schedule: '09:00 - 17:00', startDate: dayjs().subtract(10, 'days').format('YYYY-MM-DD'), endDate: dayjs().add(10, 'days').format('YYYY-MM-DD'), startTime: '09:00', endTime: '17:00' },
    { id: 2, name: 'Jane Smith', role: 'Doctor', schedule: '12:00 - 20:00', startDate: dayjs().subtract(5, 'days').format('YYYY-MM-DD'), endDate: dayjs().add(15, 'days').format('YYYY-MM-DD'), startTime: '12:00', endTime: '20:00' },
    { id: 3, name: 'Michael Brown', role: 'Technician', schedule: '08:00 - 16:00', startDate: dayjs().subtract(3, 'days').format('YYYY-MM-DD'), endDate: dayjs().add(20, 'days').format('YYYY-MM-DD'), startTime: '08:00', endTime: '16:00' },
    { id: 4, name: 'Emily Davis', role: 'Receptionist', schedule: '10:00 - 18:00', startDate: dayjs().subtract(7, 'days').format('YYYY-MM-DD'), endDate: dayjs().add(5, 'days').format('YYYY-MM-DD'), startTime: '10:00', endTime: '18:00' },
    { id: 5, name: 'David Wilson', role: 'Pharmacist', schedule: '09:00 - 17:00', startDate: dayjs().subtract(15, 'days').format('YYYY-MM-DD'), endDate: dayjs().add(8, 'days').format('YYYY-MM-DD'), startTime: '09:00', endTime: '17:00' },
    { id: 6, name: 'Olivia Martinez', role: 'Surgeon', schedule: '11:00 - 19:00', startDate: dayjs().subtract(12, 'days').format('YYYY-MM-DD'), endDate: dayjs().add(12, 'days').format('YYYY-MM-DD'), startTime: '11:00', endTime: '19:00' },
    { id: 7, name: 'Liam Johnson', role: 'Anesthetist', schedule: '14:00 - 22:00', startDate: dayjs().subtract(2, 'days').format('YYYY-MM-DD'), endDate: dayjs().add(25, 'days').format('YYYY-MM-DD'), startTime: '14:00', endTime: '22:00' },
    { id: 8, name: 'Sophia Lee', role: 'Cardiologist', schedule: '08:00 - 16:00', startDate: dayjs().subtract(1, 'days').format('YYYY-MM-DD'), endDate: dayjs().add(30, 'days').format('YYYY-MM-DD'), startTime: '08:00', endTime: '16:00' },
    { id: 9, name: 'James Taylor', role: 'General Practitioner', schedule: '07:00 - 15:00', startDate: dayjs().subtract(8, 'days').format('YYYY-MM-DD'), endDate: dayjs().add(7, 'days').format('YYYY-MM-DD'), startTime: '07:00', endTime: '15:00' },
    { id: 10, name: 'Ava Anderson', role: 'Endocrinologist', schedule: '13:00 - 21:00', startDate: dayjs().subtract(4, 'days').format('YYYY-MM-DD'), endDate: dayjs().add(10, 'days').format('YYYY-MM-DD'), startTime: '13:00', endTime: '21:00' },
  ];
  

const StaffScheduling = () => {
  const [staffData, setStaffData] = useState(mockData);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    schedule: '',
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().add(10, 'days').format('YYYY-MM-DD'),
    startTime: '09:00',
    endTime: '17:00',
  });
  const [errors, setErrors] = useState({});

  const handleOpenModal = (staff) => {
    setSelectedStaff(staff);
    setFormData(staff || {
      name: '',
      role: '',
      schedule: '',
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(10, 'days').format('YYYY-MM-DD'),
      startTime: '09:00',
      endTime: '17:00',
    });
    setErrors({});
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStaff(null);
    setOpenModal(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    return newErrors;
  };

  const handleSave = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const updatedData = {
      ...formData,
      schedule: `${formData.startTime} - ${formData.endTime}`,
    };
    if (selectedStaff) {
      setStaffData((prevData) =>
        prevData.map((staff) =>
          staff.id === selectedStaff.id ? { ...updatedData, id: selectedStaff.id } : staff
        )
      );
    } else {
      setStaffData((prevData) => [...prevData, { ...updatedData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setStaffData((prevData) => prevData.filter((staff) => staff.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', marginLeft: '0px', padding: 2 }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Staff Scheduling
          </Typography>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenModal(null)}>
            Add Staff
          </Button>
          <Grid container spacing={5} style={{ marginTop: 20 }}>
            {staffData.map((staff) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={staff.id}>
                <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3, position: 'relative', overflow: 'visible' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -30,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: 3,
                      border: '2px solid white',
                    }}
                  >
                    <Typography variant="h6">{staff.name.charAt(0)}</Typography>
                  </Box>
                  <CardContent sx={{ pt: 7, pb: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
                      <Typography variant="h6" sx={{ mb: 0 }}>
                        {staff.name}
                      </Typography>
                      <Typography variant="body1" color="textSecondary" sx={{ mb: 0.2 }}>
                        {staff.role}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 0.2 }}>
                        ID: {staff.id}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 0.2 }}>
                        Start Date: {dayjs(staff.startDate).format('YYYY-MM-DD')}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 0.07 }}>
                        End Date: {dayjs(staff.endDate).format('YYYY-MM-DD')}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                        Schedule: {staff.schedule}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                      <IconButton color="primary" onClick={() => handleOpenModal(staff)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(staff.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Modal open={openModal} onClose={handleCloseModal}>
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
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {selectedStaff ? 'Edit Staff' : 'Add Staff'}
              </Typography>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                margin="normal"
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              <TextField
                fullWidth
                label="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                margin="normal"
                error={Boolean(errors.role)}
                helperText={errors.role}
              />
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { fontSize: 16 } }}
                error={Boolean(errors.startDate)}
                helperText={errors.startDate}
              />
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { fontSize: 16 } }}
                error={Boolean(errors.endDate)}
                helperText={errors.endDate}
              />
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { fontSize: 16 } }}
                error={Boolean(errors.startTime)}
                helperText={errors.startTime}
              />
              <TextField
                fullWidth
                label="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { fontSize: 16 } }}
                error={Boolean(errors.endTime)}
                helperText={errors.endTime}
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="primary" onClick={handleCloseModal} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  {selectedStaff ? 'Save' : 'Create Staff'}
                </Button>
              </Box>
            </Box>
          </Modal>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default StaffScheduling;
