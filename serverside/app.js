const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const TrainingEvent = require('./models/event');
const RegisterEvent = require('./models/registered')
const Skills = require('./models/skills')
const LikeEvent=require('./models/Like')

const nodemailer = require('nodemailer');
 
const app = express();
 
app.use(cors());
app.use(express.json());

const crypto = require('crypto');
const { title } = require('process');
let currentUser; 

const SECRET_KEY = 'deepthi';

mongoose.connect('mongodb+srv://itsmedeepthi02:QuOSLCsZVe8QsPQG@final.qhq9jgy.mongodb.net/Final',
  )
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/currentuser/:userId', async (req, res) => {  
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
});

app.get('/sendmail',async (req,res)=>{
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
})

app.get('/api/users/first', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }   
});

app.post('/login', async (req, res) => {
    const { emailID, password } = req.body;
    try {
      const user = await User.findOne({ emailID });
      currentUser = user;
  
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { userId: user._id, username: user.username },
          SECRET_KEY,
          { expiresIn: '1h' }
        );
        res.status(200).json({ token:token, role: user.role,userId: user._id });
      } else {
        
        return res.status(501).send("error loggin");
    
      }
    } catch (error) {
      // console.error('Error loogging in:', error);
      res.status(500).send('Server error');
    }
  });

app.post('/create', async (req,res) => {
  try {
    const {emailID, role, fullName, username, phoneNumber, department } = req.body;
    const password = 'default';
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      emailID: emailID.toLowerCase(),
      role: role, 
      fullName: fullName, 
      username: username, 
      phoneNumber : phoneNumber, 
      department : department,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    console.log("User Registered Successfully");
    res.status(200).json(savedUser);
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
      to: emailID,
      subject: 'Account Created',
      text: `Congratulations! You are now part of our Employee Learning platform. Your password is"default". To update it as you wish, go to login page and click on forget password`
    };
  
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
})



app.post('/update', async (req, res) => {
  const { emailID, newpassword } = req.body;

  try {
    const user = await User.findOne({ emailID });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newpassword, salt);
    await user.save();

    return res.status(200).send({message:'User Saved successfully!', redirect: '/login'} );
  } catch (error) {
    console.error('Error loogging in:', error);
    return res.status(500).send('Server error');
  }
});

app.get('/getfullnames', async (req, res) => {
  try {
    const users = await User.find();
    const fullNames = users.map(user => user.fullName);
    res.status(200).json(fullNames);
  } catch (error) {
    console.error('Error fetching full names:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.post('/createevent', async (req, res) => {
  try {
    const { title, domain, date, duration, link, trainerName, location, desc, capacity } = req.body;

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

    const user = await User.find(); 
    const emails = user.map(user => user.emailID);
    const fullNames = user.map(user => user.fullName);

    const savedTrainingEvent = await newTrainingEvent.save();

    if (savedTrainingEvent) {
      console.log("Training Event Created Successfully");
      
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
        subject: 'New event alert',
        text: `New event ${title} Created. Check the details in our events page http://localhost:3000/createevent`
      };

      for (let email of emails) {
        mailOptions.to = email;
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
      }
      return res.status(200).json({
        message: 'Sent Mail to all users', data: savedTrainingEvent
      });
    } else {
      res.status(400).json({ message: 'Event creation failed' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


app.get('/displayevents', async (req, res) => {
  try {
    const events = await TrainingEvent.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.post('/createskills/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const { skill,
        experience,
      strength } = req.body;

    const newSkill = new Skills({
      userId,
      skill,
      experience,
      strength
    });

    const savedSkill = await newSkill.save();

    if (savedSkill) {
      console.log("Skill Created Successfully");
      res.status(200).json({ savedSkill });
    
    } else {
      res.status(400).json({ message: 'Skill creation failed' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.get('/displayskills/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const skills = await Skills.find({userId:userId});
    res.status(200).json(skills);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.post('/editevent/:eventId', async (req, res) => {
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
});


app.post('/deleteevent/:eventId', async (req, res) => {
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
});

app.get("/fetch-event/:eventId", async (req, res) => {
  const { eventId } = req.params;
 
  try {
    const response = await TrainingEvent.findById(eventId);
 
    if (!response) {
      return res.status(404).send({ error: "Event not found" });
    }
 
    res.send(response);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.post('/acceptevent/:eventId', async (req, res) => {
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
});


app.post('/likeevent/:eventId', async (req, res) => {
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
});


app.post('/deletelikeevent/:eventId', async (req, res) => {
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
});

app.post('/registeredevents/:userId', async (req, res) => {
  const { userId } = req.params;
  const { title } = req.body;
  try {
    const registeredEvents = await RegisterEvent.find({userId: userId});
    
    if (!registeredEvents) {
      return res.status(404).json({ error: 'No registered events found for the user' });
    }

    const eventTitles = registeredEvents.map(event => event.eventTitle);
    res.status(200).json(eventTitles);
  } catch (error) {
    console.error('Error fetching registered events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.get('/registeredevents/:userId/display', async (req, res) => {
  const { userId } = req.params;
  try {
    const registeredEvents = await RegisterEvent.find({ userId: userId }).populate('eventId');
    res.status(200).json(registeredEvents);
  } catch (error) {
    console.error('Error fetching registered events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.get('/likedevents/:userId/display', async (req, res) => {
  const { userId } = req.params;
  try {
    const likedEvents = await LikeEvent.find({ userId: userId }).populate('eventId');
    
    res.status(200).json(likedEvents);
  } catch (error) {
    console.error('Error fetching liked events:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
