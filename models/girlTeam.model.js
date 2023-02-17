const mongoose = require("mongoose")

const GirlTeamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  roster: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  coach: {
    type: String,
  },
}, {timestamps: true})

module.exports = mongoose.model('GirlTeam', GirlTeamSchema)