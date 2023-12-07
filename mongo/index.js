const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require("./database").connect(); 

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb', extended: false }));
app.use(cors());

const User = require('./userModel');

app.get("/", async (req, res) => {
  console.log("connected");
  res.status(201).json({ message: "connected" });
});

app.post("/insert", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: "Data inserted successfully", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while inserting data" });
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const newEmail = req.body.email;

    const user = await userModel.findByIdAndUpdate(userId, { email: newEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Email updated successfully",user });
  } catch (error) {
    console.error("Error updating email: " + error);
    res.status(500).json({ message: "Error updating email" });
  }
});

// ...

app.post("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await userModel.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user: " + error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    // Fetch all users and sort by the "name" field in ascending order
    const users = await userModel.find().sort({ name: 1 });

    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    console.error("Error retrieving users: " + error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});


// ...
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: "Registration successful", user: savedUser });
  } catch (error) {
    console.error("Error occurred while registering user: " + error);
    res.status(500).json({ message: "Registration failed" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

  } catch (error) {
    console.error("Error occurred while logging in: " + error);
    res.status(500).json({ message: "Login failed" });
  }
});


app.listen(2020, () => {
  console.log('Server running');
});
