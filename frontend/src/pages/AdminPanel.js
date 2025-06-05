import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, InputLabel, Rating, CircularProgress, Alert, Button, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const subjects = ['OOP', 'DSA', 'DBMS', 'OS'];

const AdminPanel = () => {
  const [subject, setSubject] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('http://localhost:5000/api/feedback', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeedbacks(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch feedbacks.');
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('adminToken');
          navigate('/admin');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [navigate]);

  const filtered = subject ? feedbacks.filter(f => f.subject === subject) : feedbacks;
  const avgRating = filtered.length ? (filtered.reduce((a, b) => a + b.rating, 0) / filtered.length) : 0;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f3fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ display: 'flex', minHeight: 600, maxWidth: 1100, width: '100%', borderRadius: 4, overflow: 'hidden', boxShadow: 6 }}>
        {/* Sidebar */}
        <Box sx={{ bgcolor: '#ede7f6', p: 4, width: 270, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Typography variant="h5" color="#7c6a9c" fontWeight={700} mb={2}>Dashboard</Typography>
          <Divider sx={{ width: '100%', mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel>Subject</InputLabel>
            <Select value={subject} label="Subject" onChange={e => setSubject(e.target.value)} sx={{ borderRadius: 2, bgcolor: '#fff' }}>
              <MenuItem value="">All</MenuItem>
              {subjects.map(subj => <MenuItem key={subj} value={subj}>{subj}</MenuItem>)}
            </Select>
          </FormControl>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="subtitle1" color="#7c6a9c">Average Rating</Typography>
            <Rating value={avgRating} precision={0.5} readOnly sx={{ color: '#a18ab7', fontSize: 32 }} />
            <Typography variant="h6" color="#7c6a9c">{avgRating.toFixed(1)}</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" color="secondary" sx={{ bgcolor: '#a18ab7', borderRadius: 2, width: '100%' }} onClick={handleLogout}>Logout</Button>
        </Box>
        {/* Main Content */}
        <Box sx={{ flex: 1, p: 4, bgcolor: '#f5f3fa', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" color="#7c6a9c" fontWeight={700} mb={3}>Admin Feedback</Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3, bgcolor: '#fff' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#ede7f6' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#7c6a9c' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#7c6a9c' }}>Gender</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#7c6a9c' }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#7c6a9c' }}>Subject</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#7c6a9c' }}>Rating</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#7c6a9c' }}>Comments</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No feedback found.</TableCell>
                    </TableRow>
                  ) : filtered.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{row.department}</TableCell>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell><Rating value={row.rating} precision={0.5} readOnly sx={{ color: '#a18ab7' }} /></TableCell>
                      <TableCell>{row.comments}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminPanel; 