const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");

require("./database").connect();

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb", extended: false }));
app.use(cors());

const User = require("./userModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    //  cb(null, new Date().toISOString() + file.originalname);  Define the file name
    cb(null, file.fieldname + "-" + Date.now()+".jpg") 

  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 4* 1024 * 1024 }, // 4MB limit
});


app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

app.post("/insert", async (req, res) => {
  upload.single("file")(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: "File upload failed", error: err });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      profileImage: req.file.path,
    });

    try {
      const savedUser = await newUser.save();
      res.status(201).json({ message: "Data inserted successfully", user: savedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error occurred while inserting data" });
    }
  });
});

app.listen(2020, () => {
  console.log("Server running on port 2020");
});
