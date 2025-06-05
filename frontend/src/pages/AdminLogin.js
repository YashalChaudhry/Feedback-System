import React, { useState } from 'react';
import { Box, Button, Typography, Paper, TextField, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { password });
      if (res.data.success && res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin/panel');
      } else {
        setError('Invalid password!');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f3fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 5, maxWidth: 400, width: '100%', borderRadius: 3 }}>
        <Typography variant="h5" color="#7c6a9c" gutterBottom>Admin Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Admin Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button variant="contained" color="secondary" sx={{ bgcolor: '#7c6a9c', borderRadius: 2 }} type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLogin; 