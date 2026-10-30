const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, unique: true},
  course: {type: String, trim: true},
  score: {type: Number, max: 100},
  age: {type: Number, min: 16, max: 40},
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;