const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },
  roles: {
    Coach: {
      type: Number,
      default: 1001
    },
    Admin: Number,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
  },
  refreshToken: String,
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema)