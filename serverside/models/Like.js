const mongoose = require('mongoose');

const Likeschema = new mongoose.Schema({
  userId: String,
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingEvent',
    required: true
  },
 
});

const LikeEvent = mongoose.model('Like', Likeschema);

module.exports = LikeEvent;
