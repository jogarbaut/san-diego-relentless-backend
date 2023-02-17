const Post = require("../models/post.model")
const User = require("../models/user.model")

// getAllPosts
// createNewPost
// updatePost
// deletePost
// getPost

const getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ date: -1 })
  if (!posts) return res.sendStatus(204)
  res.json(posts)
}

const createNewPost = async (req, res) => {
  if (!req?.body?.title || !req?.body?.markdown || !req?.body?.date) {
    return res.status(400).json({ message: "Title, body, and date is required. (post.controller.js)"})
  }

  const user = await User.findOne({ username: req.body.username }).exec()

  try {
    const result = await Post.create({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown,
      date: req.body.date,
    })
    res.status(201).json(result)
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

const updatePost = async (req, res) => {
  if(!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required (post.controller.js)'})
  }

  const post = await Post.findOne({ _id: req.body.id }).exec();
  if (!post) {
      return res.status(204).json({ "message": `No post matches ID ${req.body.id}.` });
  }
  if (req.body?.title) post.title = req.body.title;
  if (req.body?.description) post.description = req.body.description;
  if (req.body?.markdown) post.markdown = req.body.markdown;
  if (req.body?.date) post.date = req.body.date;
  const result = await post.save();
  res.json(result);
}

const deletePost = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Post ID required.' });

  const post = await Post.findOne({ _id: req.params.id }).exec();
  if (!post) {
      return res.status(204).json({ "message": `No post matches ID ${req.params.id}.` });
  }
  const result = await post.deleteOne();
  res.json(result);
}

const getPost = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Post ID required.' });

  const post = await Post.findOne({ _id: req.params.id }).exec();
  if (!post) {
      return res.status(204).json({ "message": `No post matches ID ${req.params.id}.` });
  }
  res.json(post);
}

module.exports = {
  getAllPosts,
  createNewPost,
  updatePost,
  deletePost,
  getPost
}
