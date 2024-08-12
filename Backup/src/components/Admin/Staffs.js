import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DepartmentFilter from './Filter'; // Adjust path as needed
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, Modal, TextField, MenuItem } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const defaultDepartments = ['Cardiology', 'Radiology', 'Oncology', 'Pediatrics', 'Emergency'];
const defaultRoles = ['Doctor', 'Nurse', 'Technician', 'Receptionist', 'Surgeon'];

const EmployeeStatusDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [staffData, setStaffData] = useState([]);
  const [departments, setDepartments] = useState(new Set(defaultDepartments));
  const [editingStaff, setEditingStaff] = useState(null);
  const [deletingStaff, setDeletingStaff] = useState(null);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/profiles');
      setStaffData(response.data);
      updateDepartments(response.data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const updateDepartments = (data) => {
    const departmentSet = new Set([...defaultDepartments, ...data.map(item => item.dept)]);
    setDepartments(departmentSet);
  };

  const handleModalOpen = (type, staff = null) => {
    if (type === 'add') setOpenAdd(true);
    if (type === 'edit') {
      setEditingStaff(staff);
      setOpenEdit(true);
    }
    if (type === 'delete') {
      setDeletingStaff(staff);
      setOpenDelete(true);
    }
  };

  const handleModalClose = (type) => {
    if (type === 'add') setOpenAdd(false);
    if (type === 'edit') {
      setOpenEdit(false);
      setEditingStaff(null);
    }
    if (type === 'delete') {
      setOpenDelete(false);
      setDeletingStaff(null);
    }
  };

  const handleAddStaff = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/profiles', values);
      setStaffData(prev => [...prev, response.data]);
      updateDepartments([...staffData, response.data]);
      await axios.post('http://localhost:8080/api/persons', {
        email: values.email,
        password: values.password
      });

      handleModalClose('add');
      resetForm();
    } catch (error) {
      console.error('Error adding new staff:', error);
    }
    setSubmitting(false);
  };

  const handleEditStaff = async (values, { setSubmitting }) => {
    try {
      await axios.put(`http://localhost:8080/api/profiles/${values.profileId}`, values);
      setStaffData(prev => prev.map(item => (item.profileId === values.profileId ? values : item)));
      handleModalClose('edit');
    } catch (error) {
      console.error('Error updating staff:', error);
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (deletingStaff) {
      try {
        await axios.delete(`http://localhost:8080/api/profiles/${deletingStaff.profileId}`);
        setStaffData(prev => prev.filter(item => item.profileId !== deletingStaff.profileId));
        updateDepartments(staffData.filter(item => item.profileId !== deletingStaff.profileId));
        handleModalClose('delete');
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const filteredData = staffData.filter(item =>
    selectedDepartment === '' || item.dept === selectedDepartment
  );

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'), // Added password validation
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
    dept: Yup.string().required('Department is required'),
    role: Yup.string().required('Role is required'),
    experience: Yup.string().required('Experience is required'),
    mobile: Yup.string().required('Mobile number is required'),
  });

  const modalContent = (type) => (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 5, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        {type === 'add' ? 'Add Staff' : 'Edit Staff'}
      </Typography>
      <Formik
        initialValues={{
          email: editingStaff?.email || '',
          password: '' ,
          profileId: editingStaff?.profileId || '',
          name: editingStaff?.name || '',
          age: editingStaff?.age || '',
          dept: editingStaff?.dept || '',
          role: editingStaff?.role || '',
          experience: editingStaff?.experience || '',
          mobile: editingStaff?.mobile || '',
        }}
        validationSchema={validationSchema}
        onSubmit={type === 'add' ? handleAddStaff : handleEditStaff}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Field
              as={TextField}
              margin="normal"
              name="email"
              label="Email"
              fullWidth
              helperText={<ErrorMessage name="email" />}
              error={Boolean(errors.email && touched.email)}
            />
            <Field
            as={TextField}
            margin="normal"
            name="password"
            label="Password"
            type="password"
            fullWidth
            helperText={<ErrorMessage name="password" />}
            error={Boolean(errors.password && touched.password)}
          />
              <Field
                as={TextField}
                margin="normal"
                name="name"
                label="Name"
                fullWidth
                helperText={<ErrorMessage name="name" />}
                error={Boolean(errors.name && touched.name)}
                />
                <Field
                as={TextField}
                margin="normal"
                name="age"
                label="Age"
                type="number"
                fullWidth
                helperText={<ErrorMessage name="age" />}
                error={Boolean(errors.age && touched.age)}
              />
              <Field
                as={TextField}
                margin="normal"
                name="dept"
                label="Department"
                select
                fullWidth
                helperText={<ErrorMessage name="dept" />}
                error={Boolean(errors.dept && touched.dept)}
              >
                {Array.from(departments).map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Field>
              <Field
                as={TextField}
                margin="normal"
                name="role"
                label="Role"
                select
                fullWidth
                helperText={<ErrorMessage name="role" />}
                error={Boolean(errors.role && touched.role)}
              >
                {defaultRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Field>
              <Field
                as={TextField}
                margin="normal"
                name="experience"
                label="Experience"
                fullWidth
                helperText={<ErrorMessage name="experience" />}
              />
              <Field
                as={TextField}
                margin="normal"
                name="mobile"
                label="Mobile"
                fullWidth
                helperText={<ErrorMessage name="mobile" />}
                error={Boolean(errors.mobile && touched.mobile)}
              />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="error" onClick={() => handleModalClose(type)} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" color="success" type="submit" disabled={isSubmitting}>
                {type === 'add' ? 'Create Staff' : 'Save Changes'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: '0px',
          width: '100%',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Manage Staffs
        </Typography>
        <Typography variant="h5" gutterBottom>
          Filter By Department:
        </Typography>
        <Box sx={{ mb: -4, display: 'flex', alignItems: 'center', width: 250 }}>
          <DepartmentFilter selectedDepartment={selectedDepartment} onDepartmentChange={setSelectedDepartment} departments={Array.from(departments)} sx={{ width: 120 }} />
        </Box>
        <Box sx={{ textAlign: 'right', mb: 2 }}>
          <Button variant="contained" color="success" onClick={() => handleModalOpen('add')}>
            Add Staff
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell  sx={{ backgroundColor: '#dbe9f4' }}>Profile ID</TableCell>
                <TableCell  sx={{ backgroundColor: '#dbe9f4' }}>Name</TableCell>
                <TableCell  sx={{ backgroundColor: '#dbe9f4' }}>Age</TableCell>
                <TableCell  sx={{ backgroundColor: '#dbe9f4' }}>Department</TableCell>
                <TableCell  sx={{ backgroundColor: '#dbe9f4' }}>Role</TableCell>
                <TableCell  sx={{ backgroundColor: '#dbe9f4' }}>Experience</TableCell>
                <TableCell  sx={{ backgroundColor: '#dbe9f4' }}>Mobile</TableCell>
                <TableCell  sx={{ backgroundColor: '#dbe9f4' }}>Email</TableCell>
                <TableCell  sx={{ backgroundColor: '#dbe9f4' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((staff) => (
                <TableRow key={staff.profileId}>
                  <TableCell>{staff.profileId}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.age}</TableCell>
                  <TableCell>{staff.dept}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>{staff.experience}</TableCell>
                  <TableCell>{staff.mobile}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleModalOpen('edit', staff)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleModalOpen('delete', staff)} sx={{ ml: 2 }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal open={openAdd} onClose={() => handleModalClose('add')}>
        {modalContent('add')}
      </Modal>
      <Modal open={openEdit} onClose={() => handleModalClose('edit')}>
        {modalContent('edit')}
      </Modal>
      <Modal open={openDelete} onClose={() => handleModalClose('delete')}>
        <Box sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 5, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Delete Staff
          </Typography>
          <Typography variant="body1">Are you sure you want to delete this staff member?</Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ mr: 2 }}>
              Delete
            </Button>
            <Button variant="contained" color="default" onClick={() => handleModalClose('delete')}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EmployeeStatusDashboard;
