const express = require('express');

const {
  createUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/userContoller');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const {verifyToken, verifyRole} = require('../middlewares/verify');

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/user/:id', verifyToken, getUser);
router.get('/', verifyToken, getUsers);
router.put('/user/:id', verifyToken, updateUser);
router.delete('/user/:id', verifyToken, deleteUser);

module.exports = router;