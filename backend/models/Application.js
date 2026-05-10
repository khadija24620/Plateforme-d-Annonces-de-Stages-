const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cvUrl: { type: String, required: true },
  motivation: String,
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);