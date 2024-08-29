import React from 'react';
import { MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import PropTypes from 'prop-types';

const DepartmentFilter = ({ selectedDepartment, onDepartmentChange, departments = [] }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Department</InputLabel>
      <Select
        value={selectedDepartment || ''}
        onChange={(e) => onDepartmentChange(e.target.value)}
        label="Department"
      >
        <MenuItem value="">All</MenuItem>
        {departments.length > 0 ? (
          departments.map((department, index) => (
            <MenuItem key={index} value={department}>
              {department}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>No departments available</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

DepartmentFilter.propTypes = {
  selectedDepartment: PropTypes.string.isRequired,
  onDepartmentChange: PropTypes.func.isRequired,
  departments: PropTypes.array
};

export default DepartmentFilter;
