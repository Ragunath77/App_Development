import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppAppBar from './Navbar';
import '/Project/frontend/src/assets/Css/style.css';

const HomePage = ({ mode, toggleColorMode }) => {
  const themeClass = mode === 'dark' ? 'dark-theme' : '';

  return (
    <div className={themeClass}>
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box className="about-container">
        <Typography variant="h4" className="about-heading">
          Welcome to our Employee Management System (EMS)
        </Typography>
        <div className="about-content">
          <br /><br /><br />
          <Typography variant="body1">
            In the realm of workforce administration, we understand that the heartbeat of any successful organization lies in its people.
            With this fundamental belief, we have crafted a cutting-edge Employee Management System that goes beyond mere digitization;
            it revolutionizes the way businesses engage with their most valuable asset – their employees.
          </Typography>
          <Typography variant="body1">
            Our EMS is designed to streamline the entire employee lifecycle, from recruitment to retirement. It empowers HR professionals,
            managers, and employees with a comprehensive suite of tools for efficient workforce management.
          </Typography>
          <Typography variant="body1">
            We prioritize simplicity, transparency, and adaptability. Our user-friendly interface ensures seamless integration into your
            existing workflows, fostering a collaborative and engaging workplace environment.
          </Typography>
          <br />
          <Typography variant="body1">
            We implement robust measures to safeguard sensitive employee data,
            ensuring compliance with the latest regulations.
          </Typography>
          <Typography variant="body1">
            At [Your Company Name], we offer more than just a software solution; we provide a partnership dedicated to the success and
            growth of your business. Join us in creating a workplace where your team thrives with our innovative Employee Management System.
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default HomePage;
