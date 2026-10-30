const Post = require('../models/Post');

// Get Post
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('authorId', 'name email');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      authorId: req.user.userId
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    req.post.title = req.body.title ?? req.post.title;
    req.post.content = req.body.content ?? req.post.content;
    await req.post.save();
    res.status(200).json(req.post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await req.post.deleteOne();
    res.status(200).json('Post deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json('Post not found');

    post.comments.push({
      text: req.body.text,
      commenterId: req.user.userId
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  addComment
};