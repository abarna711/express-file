const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {type:String,require:true},
  password:{type:String,require:true,uniqe:true}
});

module.exports = mongoose.model('User', userSchema);