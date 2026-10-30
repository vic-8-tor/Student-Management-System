const Post = require('../models/Post');

const checkOwnership = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json('Post not found');

    const isOwner = post.authorId.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json('Forbidden — not your post');
    }

    req.post = post;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = checkOwnership;