const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Add Students
const createStudent = async (req, res) => {
  try {
    const {_id} = req.params;
    const { name, email, course, score, age } = req.body;

    const newStudent = await Student.create({
      name,
      email,
      course,
      score,
      age
    });

    res.status(201).json({ newStudent, studentId: _id });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

// View all Students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Edit Student
const updateStudent = async (req, res) => {
  try {
    const {id} = req.params;
    const { name, email, age, course, score, password } = req.body;
    const updateData = { name, email, age, course, score };
    if (password)
      updateData.password = bcrypt.hash(password, 10);
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });
    
    res.status(200).json({ updatedStudent });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    console.log("DELETE hit, id:", req.params.id);
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ deletedStudent });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
