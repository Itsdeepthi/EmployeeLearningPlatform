const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'deepthi';
const nodemailer = require('nodemailer');

exports.getCurrentUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { emailID, newpassword } = req.body;
  try {
    const user = await User.findOne({ emailID });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newpassword, salt);
    await user.save();
    return res.status(200).send('User Saved successfully!');
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).send('Server error');
  }
};

exports.getFullNames = async (req, res) => {
  try {
    const users = await User.find();
    const fullNames = users.map(user => user.fullName);
    res.status(200).json(fullNames);
  } catch (error) {
    console.error('Error fetching full names:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.sendEmail = async (req, res) => {
  const requestingUser = req.query.requestingUser;

  const link = `http://localhost:3000/changepassword?emailID=${encodeURIComponent(requestingUser)}`

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: "nadiminti@jmangroup.com",  // Replace with your email
      pass: "Jman@600113"
    }
  });
  
  const mailOptions = {
    from: "nadiminti@jmangroup.com",
    to: requestingUser,
    subject: 'Change password',
    text: `change password here: ${link}`
  };

  await transporter.sendMail(mailOptions);
  return res.status(200).send('Sent Mail');
};

// exports.createEvent = async (req, res) => {
//   try {
//     const { title, domain, date, duration, trainerName, location, desc, capacity } = req.body;
//     const newTrainingEvent = new TrainingEvent({
//       title,
//       domain,
//       date,
//       duration,
//       trainerName,
//       location,
//       desc,
//       capacity,
//     });
//     const savedTrainingEvent = await newTrainingEvent.save();
//     console.log("Training Event Created Successfully");
//     res.status(200).json(savedTrainingEvent);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// exports.displayEvents = async (req, res) => {
//   try {
//     const events = await TrainingEvent.find();
//     res.status(200).json(events);
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// exports.registerEvent = async (req, res) => {
//   const { userId, eventId } = req.params;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     const trainingEvent = await TrainingEvent.findById(eventId);
//     if (!trainingEvent) {
//       return res.status(404).json({ error: 'Event not found' });
//     }
//     const newRegisteredEvent = new RegisteredEvent({
//       userId,
//       eventId,
//     });
//     await newRegisteredEvent.save();
//     res.status(200).json({ message: 'Registered for the event successfully' });
//   } catch (error) {
//     console.error('Error registering for event:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// exports.likeEvent = async (req, res) => {
//   const { userId, eventId } = req.params;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     const like = new LikeEvent({
//       userId,
//       eventId,
//     });
//     await like.save();
//     res.status(200).json({ message: 'Event liked successfully' });
//   } catch (error) {
//     console.error('Error liking event:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// exports.unlikeEvent = async (req, res) => {
//   const { userId, eventId } = req.params;
//   try {
//     await LikeEvent.findOneAndDelete({ userId, eventId });
//     res.status(200).json({ message: 'Event unliked successfully' });
//   } catch (error) {
//     console.error('Error unliking event:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };
