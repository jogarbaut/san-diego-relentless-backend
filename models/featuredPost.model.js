const mongoose = require("mongoose")

const FeaturedPostSchema = new mongoose.Schema({
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
  image: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
}, {timestamps: true})

module.exports = mongoose.model('FeaturedPost', FeaturedPostSchema)