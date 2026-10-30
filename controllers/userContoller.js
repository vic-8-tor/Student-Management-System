const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const KEY = process.env.SPECIAL_KEY;
// Create
const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({ userName, email, password: hashedPassword });

    res.status(201).json({message: 'User Created', user: user});
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

// login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json('User not Found');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json('Invalid Credentials');
    
    const token = jwt.sign({
      userId: user._id,
      userEmail: user.email,
      role: user.role
    }, KEY, {
      expiresIn: '50m'
    })
    res.status(200).json({token});
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

// Get User
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== req.user.userId && req.user.role === 'admin') 
      return res.status(403).json('Forbidden Access');
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

// Get Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    if (req.params.id !== req.user.userId && req.user.role === 'admin')
      return res.status(403).json('Must be an Admin');
    
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      userName,
      email,
      password,
      role
    }, {new: true});
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.params.id !== req.user.userId && req.user.role === 'admin')
      return res.status(403).json('Must be an Admin');
    
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
