const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  time: {
    type: Number,
    required: true,
    min: 0
  },
  moves: {
    type: Number,
    required: true,
    min: 0
  },
  gridSize: {
    type: Number,
    required: true,
    enum: [3, 4, 5]
  },
  imageType: {
    type: String,
    enum: ['default', 'custom'],
    default: 'default'
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }
}, {
  timestamps: true
});

// Indexes for faster queries
scoreSchema.index({ gridSize: 1, time: 1, moves: 1 });
scoreSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Score', scoreSchema);
