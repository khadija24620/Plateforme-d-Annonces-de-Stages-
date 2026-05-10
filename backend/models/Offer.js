const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: String,
  location: String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deadline: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);