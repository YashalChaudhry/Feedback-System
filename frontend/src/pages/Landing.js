import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f3fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 5, maxWidth: 500, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" color="#a18ab7" gutterBottom>Bahria University</Typography>
        <Typography variant="h4" color="#7c6a9c" gutterBottom>Student Feedback System</Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Welcome to the Student Feedback Management System. Please select your role to continue.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" color="secondary" sx={{ bgcolor: '#a18ab7' }} onClick={() => navigate('/feedback')}>
            Student Feedback
          </Button>
          <Button variant="contained" color="secondary" sx={{ bgcolor: '#7c6a9c' }} onClick={() => navigate('/admin')}>
            Admin Access
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Landing; 