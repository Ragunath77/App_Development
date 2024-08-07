import React from 'react';
import { MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const DepartmentFilter = ({ selectedDepartment, onDepartmentChange, departments }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Department</InputLabel>
      <Select
        value={selectedDepartment}
        onChange={(e) => onDepartmentChange(e.target.value)}
        label="Department"
      >
        <MenuItem value="">All</MenuItem>
        {departments.map((department, index) => (
          <MenuItem key={index} value={department}>{department}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DepartmentFilter;
