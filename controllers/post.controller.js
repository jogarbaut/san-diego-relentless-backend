const Post = require("../models/post.model")

// getAllPosts
// createNewPost
// updatePost
// deletePost
// getPost

const getAllPosts = async (req, res) => {
  const posts = await Post.find()
  if (!posts) return res.status(204).json({ message: 'No posts found (post.controller.js)'})
  res.json(posts)
}

const createNewPost = async (req, res) => {
  if (!req?.body?.user || !req?.body?.title || !req?.body?.markdown || !req?.body?.date) {
    return res.status(400).json({ message: "Title, body, and date is required. (post.controller.js)"})
  }

  try {
    const result = await Post.create({
      user: req.body.user,
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown,
      date: req.body.date,
    })
  } catch (err) {
    console.log(err)
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
  if (!req?.body?.id) return res.status(400).json({ 'message': 'Post ID required.' });

  const post = await Post.findOne({ _id: req.body.id }).exec();
  if (!post) {
      return res.status(204).json({ "message": `No post matches ID ${req.body.id}.` });
  }
  const result = await post.deleteOne(); //{ _id: req.body.id }
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
