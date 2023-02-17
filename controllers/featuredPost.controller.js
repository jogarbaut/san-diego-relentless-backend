const FeaturedPost = require("../models/featuredPost.model")
const User = require("../models/user.model")
const cloudinary = require("../config/cloudinary")

// getAllFeaturedPosts
// createNewFeaturedPost
// updateFeaturedPost
// deleteFeaturedPost
// getFeaturedPost

const getAllFeaturedPosts = async (req, res) => {
  const featuredPosts = await FeaturedPost.find().sort({ date: -1 })
  if (!featuredPosts) return res.sendStatus(204)
  res.json(featuredPosts)
}

const createNewFeaturedPost = async (req, res) => {
  if (!req?.body?.title || !req?.body?.image || !req?.body?.date) {
    return res.status(400).json({ message: "Title, image, and date is required. (featuredPost.controller.js)"})
  }

  const user = await User.findOne({ username: req.body.username }).exec()

  if (req.body.image) {
    try {
      const uploadRes = await cloudinary.uploader.upload(req.body.image, {
        upload_preset: "sdr"
      })
      if (uploadRes) {
        const result = await FeaturedPost.create({
          user: user._id,
          title: req.body.title,
          description: req.body.description,
          image: uploadRes,
          date: req.body.date,
        })
        res.status(201).json(result)
      }
    } catch (err) {
      res.status(400).json({ message: err })
    }
  }
}

const updateFeaturedPost = async (req, res) => {
  if(!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required (post.controller.js)'})
  }

  const featuredPost = await FeaturedPost.findOne({ _id: req.body.id }).exec();
  if (!featuredPost) {
      return res.status(204).json({ "message": `No featured post matches ID ${req.body.id}.` });
  }
  if (req.body?.title) featuredPost.title = req.body.title;
  if (req.body?.description) featuredPost.description = req.body.description;
  if (req.body?.image) featuredPost.image = req.body.image;
  if (req.body?.date) featuredPost.date = req.body.date;
  const result = await featuredPost.save();
  res.json(result);
}

const deleteFeaturedPost = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Featured Post ID required.' });

  const featuredPost = await FeaturedPost.findOne({ _id: req.params.id }).exec();
  if (!featuredPost) {
      return res.status(204).json({ "message": `No featured post matches ID ${req.params.id}.` });
  }
  const result = await featuredPost.deleteOne();
  res.json(result);
}

const getFeaturedPost = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Featured Post ID required.' });

  const featuredPost = await FeaturedPost.findOne({ _id: req.params.id }).exec();
  if (!featuredPost) {
      return res.status(204).json({ "message": `No featured post matches ID ${req.params.id}.` });
  }
  res.json(featuredPost);
}

module.exports = {
  getAllFeaturedPosts,
  createNewFeaturedPost,
  updateFeaturedPost,
  deleteFeaturedPost,
  getFeaturedPost
}
