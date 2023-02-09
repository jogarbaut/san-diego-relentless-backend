const Post = require('../models/post.model')

module.exports.createPost = (req, res) => {
  Post.create(req.body)
    .then(post => res.json(post))
    .catch(err => res.json(err))
}

module.exports.getAllPosts = (req, res) => {
  Post.find({})
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
}

module.exports.getPost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then(post => res.json(post))
    .catch(err => res.json(err))
}

module.exports.updatePost = (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true})
    .then(updatedPost => res.json(updatedPost))
    .catch(err => res.json(err))
}

module.exports.deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.json(err))
}