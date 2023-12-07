const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userModle=require('./userModle')

const app = express();

app.use(bodyParser.json());

app.post('/users', (req, res) => {
  const userModle = {
    name: req.body.name,
    email:req.body.email
  };

  User.create(userModle, (err, user) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    console.log('Inserted User:');
    console.log(user);

    res.status(201).json(user);
  });
});

app.listen(2020, () => {
    console.log('Server running ');
});
