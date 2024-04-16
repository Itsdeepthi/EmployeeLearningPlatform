const TrainingEvent = require('../models/event');
const User = require('../models/user');
const RegisterEvent = require('../models/registered');
const LikeEvent = require('../models/Like');
const nodemailer = require('nodemailer');

exports.createEvent = async (req, res) => {
    try {
      const { title, domain, date, duration,link, trainerName, location, desc, capacity } = req.body;
  
      // Create a new training event
      const newTrainingEvent = new TrainingEvent({
        title,
        domain,
        date,
        duration,
        link,
        trainerName,
        location,
        desc,
        capacity
      });
  
      // Save the new training event
      const savedTrainingEvent = await newTrainingEvent.save();
  
      // Retrieve all users' emails and full names
      const users = await User.find();
      const emails = users.map(user => user.emailID);
      const fullNames = users.map(user => user.fullName);
  
      // Check if the event was saved successfully
      if (savedTrainingEvent) {
        console.log("Training Event Created Successfully");
  
        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: "nadiminti@jmangroup.com", 
            pass: "Jman@600113"
          }
        });
  
        // Prepare email options
        const mailOptions = {
          from: "nadiminti@jmangroup.com",
          subject: 'New event alert',
          text: `New event ${title} Created. Check the details in our events page http://localhost:3000/createevent`
        };
  
        // Send emails to all users
        for (let email of emails) {
          mailOptions.to = email;
          await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${email}`);
        }
  
        // Send response
        return res.status(200).json({
          message: 'Sent Mail to all users',
          data: savedTrainingEvent
        });
      } else {
        // Send error response if event creation failed
        res.status(400).json({ message: 'Event creation failed' });
      }
    } catch (error) {
      // Handle errors
      console.error('Error creating event:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

exports.displayEvents = async (req, res) => {
  try {
    const events = await TrainingEvent.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.editEvent = async (req, res) => {
    const { eventId } = req.params;
    console.log("eventid", eventId)
    try {
      const {
        title,
        domain,
        date,
        duration,
        link,
        trainerName,
        location,
        desc,
        capacity
      } = req.body;
  
      const existingEvent = await TrainingEvent.findById(eventId);
  
      existingEvent.title = title;
      existingEvent.domain = domain;
      existingEvent.date = date;
      existingEvent.duration = duration;
      existingEvent.link = link;
      existingEvent.trainerName = trainerName;
      existingEvent.location = location;
      existingEvent.desc = desc;
      existingEvent.capacity = capacity;
  
      const event = await existingEvent.save();
  
      const user = await User.find(); 
      const emails = user.map(user => user.emailID);
  
      const transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: "nadiminti@jmangroup.com", 
            pass: "Jman@600113"
          }
        });
  
        const mailOptions = {
          from: "nadiminti@jmangroup.com",
          subject: 'Event modification alert',
          text: `Event ${title} has been modified. Check out the new details in our events page http://localhost:3000/createevent`
        };
  
        for (let email of emails) {
          mailOptions.to = email;
          await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${email}`);
        }
        
      return res.status(200).json(event);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
      const {title} = req.body;
   
      const existingevent = await TrainingEvent.findById(eventId);
      if (!existingevent) {
        return res.status(404).json({ message: 'Event not found' });
      }
   
      await TrainingEvent.deleteOne({ title });
      return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getEventById = async (req, res) => {
    const { eventId } = req.params;
  
    try {
      const response = await Event.findById(eventId);
  
      if (!response) {
        return res.status(404).send({ error: "Event not found" });
      }
  
      return res.send(response);
    } catch (error) {
      return res.status(500).send({ error: "Internal server error" });
    }
  };

exports.registerEvent = async (req, res) => {
    const { userId } = req.body; 
  const { eventId } = req.params;
  
  try {
    const trainingEvent = await TrainingEvent.findOne({ _id: eventId });
    const eventTitle = trainingEvent.title;
    const user = await User.findById({ _id: userId }); 
    
    if (!trainingEvent) {
      throw new Error('Training event not found');
    }

    if (trainingEvent.currentcapacity < trainingEvent.capacity) {
      trainingEvent.currentcapacity += 1;
      await trainingEvent.save();
    } else {
      throw new Error('Max capacity reached');
    }

    const registeredEvent = new RegisterEvent({
      userId: userId,
      eventId: eventId
    });

    const savedEvent = await registeredEvent.save();

    if (!savedEvent) {
      throw new Error('Failed to register for the event');
    }

    if (trainingEvent.currentcapacity == trainingEvent.capacity){
    const likedUsers = await LikeEvent.find({ eventId }).populate('userId');
    const userIds = likedUsers.map(like => like.userId);
    const users = await User.find({ _id: { $in: userIds } });
    const userEmails = users.map(user => user.emailID);
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: "nadiminti@jmangroup.com", 
        pass: "Jman@600113"
      }
    });

    const mailOptions = {
      from: "nadiminti@jmangroup.com",
      subject: 'Event capacity reached alert',
      text: `Event ${eventTitle} has reached its capacity. Thank you for showing intetrest. Check out more events in our events page http://localhost:3000/createevent`
    };

    for (let email of userEmails) {
      mailOptions.to = email;
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
    }
  }

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: "nadiminti@jmangroup.com", 
          pass: "Jman@600113"
        }
      });

      const mailOptions = {
        from: "nadiminti@jmangroup.com",
        to: user.emailID,
        subject: 'Event registered',
        text: `You have registered for a new event ${trainingEvent.title}. Check the details in our events page http://localhost:3000/createevent`
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Event registered successfully and Mail Send' });
  } catch (error) {
    console.log('Error registering for event:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.likeEvent = async (req, res) => {
    const { userId } = req.body; 
    const { eventId } = req.params;
    
    try {
      const trainingEvent = await TrainingEvent.findOne({ _id: eventId });
      const user = await User.findById({ _id: userId }); 
      
      if (!trainingEvent) {
        throw new Error('Training event not found');
      }
  
      const likeEvent = new LikeEvent({
        userId: userId,
        eventId: eventId
      });
  
      const likedEvent = await likeEvent.save();
  
      if (!likedEvent) {
        throw new Error('Failed to like the event');
      }
  
    } catch (error) {
      console.log('Error liking the event:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.unlikeEvent = async (req, res) => {
    const { userId } = req.body; 
    const { eventId } = req.params;
  
    console.log(userId)
    
    try {
      const likedevent = await LikeEvent.findOne({ eventId: eventId, userId: userId });
      
      if (!likedevent) {
        throw new Error('Event not liked');
      }
  
      await LikeEvent.deleteOne({eventId: eventId, userId: userId});
      return res.status(200).json({ message: 'event disliked successfully' });
    } catch (error) {
      console.log('Error unliking the event:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.DisplayregisteredEvents = async (req, res) => {
    const { userId } = req.params;
  try {
    const registeredEvents = await RegisterEvent.find({ userId: userId }).populate('eventId');
    res.status(200).json(registeredEvents);
  } catch (error) {
    console.error('Error fetching registered events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.DisplaylikeEvents = async (req, res) => {
    const { userId } = req.params;
  try {
    const likedEvents = await LikeEvent.find({ userId: userId }).populate('eventId');
    
    res.status(200).json(likedEvents);
  } catch (error) {
    console.error('Error fetching liked events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
