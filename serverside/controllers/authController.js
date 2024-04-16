const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = 'deepthi';

exports.register = async (req, res) => {
  try {
    const { emailID, fullName, username, phoneNumber, department } = req.body;
    const password = 'default';
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      emailID: emailID.toLowerCase(),
      role: 'user',
      fullName,
      username,
      phoneNumber,
      department,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
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
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.login = async (req, res) => {
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
        res.status(401).send('Login failed');
      }
    } catch (error) {
      console.error('Error loogging in:', error);
      res.status(500).send('Server error');
    }
};

exports.changePassword = async (req, res) => {
  const { emailID, newPassword } = req.body;
  try {
    const user = await User.findOne({ emailID });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
