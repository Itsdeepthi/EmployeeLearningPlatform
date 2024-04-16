const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    skill: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    strength: {
        type: Number,
        required: true
    }
    
});

const Skills = mongoose.model('Skills', skillSchema);

module.exports = Skills;
