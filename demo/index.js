const parser = require('body-parser');
const express = require("express");
var cors = require('cors');
const database = require("./database").connect();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
app.use(parser.urlencoded({ extended: true, limit: '50mb' }));
app.use(parser.json({ limit: '50mb', extended: false }));
app.use(cors());
app.use(express.static('view'));

const User = require('./userModel'); 


app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
  });
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      res.status(400).json({ message: 'Username or email is already register' });
      return;
    }

    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10), 
    });

    await newUser.save();

    res.redirect("/login")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
  });
app.post('/login', async (req, res) => {
  const {email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    if (bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: 'User logged in successfully' });
    } else {
      res.status(401).json({ message: 'Password is not match' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});


app.post('/search', async (req, res) => {
  const { query } = req.body;

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: new RegExp(query, 'i') } }, 
        { email: { $regex: new RegExp(query, 'i') } }, 
      ]
    }, { _id: 0, username: 1, email: 1 });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No matching users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Search failed' });
  }
});




app.get("/", async (req, res) => {
  console.log("client connected");
  res.status(201).json({ message: "connected" });
});

app.listen(2757, () => {
  console.log('Server running');
});