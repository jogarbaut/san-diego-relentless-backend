const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
})

module.exports = mongoose.model('Post', PostSchema)