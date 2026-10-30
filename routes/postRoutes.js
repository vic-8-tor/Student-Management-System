const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/verify');
const checkOwnership = require('../middlewares/checkOwnership');
const { getPosts, createPost, updatePost, deletePost, addComment } = require('../controllers/postController');

router.get('/posts', getPosts);
router.post('/posts', verifyToken, createPost);
router.put('/posts/:id', verifyToken, checkOwnership, updatePost);
router.delete('/posts/:id', verifyToken, checkOwnership, deletePost);
router.post('/posts/:id/comments', verifyToken, addComment);

module.exports = router;