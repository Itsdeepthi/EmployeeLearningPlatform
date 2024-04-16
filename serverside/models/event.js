const mongoose = require('mongoose');

const trainingEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  trainerName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  capacity :{
    type: Number,
    required: true
  },
  currentcapacity: {
    type: Number, 
    default: 0,
  },
  interested: {
    type: Number
  }
});

const TrainingEvent = mongoose.model('TrainingEvent', trainingEventSchema);

module.exports = TrainingEvent;
