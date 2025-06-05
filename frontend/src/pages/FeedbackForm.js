import React, { useState } from 'react';
import {
  Box, Button, Typography, Paper, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, MenuItem, Select, InputLabel, Rating, Alert, CircularProgress
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const departments = ['SE', 'CS', 'EE', 'ME'];
const subjects = ['OOP', 'DSA', 'DBMS', 'OS'];

const FeedbackForm = () => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    department: '',
    subject: '',
    rating: 0,
    comments: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (e, value) => {
    setForm((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/feedback', form);
      if (res.data.success) {
        setSuccess('Feedback submitted successfully!');
        setForm({ name: '', gender: '', department: '', subject: '', rating: 0, comments: '' });
      } else {
        setError('Submission failed.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f3fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 5, maxWidth: 500, width: '100%', borderRadius: 3 }}>
        <Typography variant="h5" color="#7c6a9c" gutterBottom>Student Feedback Form</Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row name="gender" value={form.gender} onChange={handleChange}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              sx={{ borderRadius: 2 }}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Subject</InputLabel>
            <Select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              sx={{ borderRadius: 2 }}
            >
              {subjects.map((subj) => (
                <MenuItem key={subj} value={subj}>{subj}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Rating</FormLabel>
            <Rating
              name="rating"
              value={Number(form.rating)}
              onChange={handleRating}
              max={5}
            />
          </FormControl>
          <TextField
            fullWidth
            label="Additional Comments"
            name="comments"
            value={form.comments}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
            inputProps={{ maxLength: 300 }}
            helperText={`${form.comments.length}/300`}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button variant="outlined" color="secondary" sx={{ bgcolor: '#f5f3fa', borderRadius: 2 }} type="button" disabled={loading} onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary" sx={{ bgcolor: '#a18ab7', borderRadius: 2 }} type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Feedback'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default FeedbackForm; 