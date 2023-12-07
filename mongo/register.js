const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 2020;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema and model for user registration
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.get('/register', (req, res) => {
  res.render('registration');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // Create a new user document
  const newUser = new User({
    username,
    email,
    password,
  });

  // Save the user to the database
  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.send('Error registering user.');
    } else {
      res.send('Registered user: ' + username);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
