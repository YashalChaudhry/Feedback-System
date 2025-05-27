const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  department: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String, trim: true, maxlength: 300 }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema); 