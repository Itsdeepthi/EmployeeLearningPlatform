const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/router');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb+srv://itsmedeepthi02:QuOSLCsZVe8QsPQG@final.qhq9jgy.mongodb.net/Final',
  )
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
// Routes
app.use('/', router);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
