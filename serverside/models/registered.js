const mongoose = require('mongoose');

const registeredschema = new mongoose.Schema({
  userId: String,
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingEvent',
    required: true
  },
 
});

const RegisterEvent = mongoose.model('UserRegister', registeredschema);

module.exports = RegisterEvent;
