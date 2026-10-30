const mongoose = require('mongoose');

//Define Schema
const userSchema = mongoose.Schema({
  userName: String,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'user', enum: ['admin', 'user']}
});

// Create User
const User = mongoose.model('User', userSchema)

module.exports = User;