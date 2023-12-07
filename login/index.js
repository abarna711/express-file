const express = require('express');
const bodyParser = require('body-parser');
require("./database").connect(); 
// const bcrypt = require('bcrypt');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
const User = require('./userModel');


app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    let user = await User.findOne({ name });

    if (user) {

      user = new User({ name, password });
      await user.save();

      res.status(201).json({ message: 'User logged in successfully' });
      return;
    }

    else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
