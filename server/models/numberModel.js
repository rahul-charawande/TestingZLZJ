
const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['forestArea', 'volunteers', 'recycling', 'hours'],
    required: true,
  },
  forestArea: {
    type: Number,
    required: true,
  },
});

// Create and export the Mongoose model
module.exports = mongoose.model('Number', numberSchema);

