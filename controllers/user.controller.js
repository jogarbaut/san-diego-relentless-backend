const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode")

module.exports.registerUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      const userToken = jwt.sign(
        { id: user._id },
        `${process.env.JWT_SECRET_KEY}`
      )
      res
        .cookie("usertoken", userToken, { httpOnly: true })
        .json({ message: "Registration successful", user: user })
    })
    .catch((err) => res.json(err))
}

module.exports.loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user === null) {
    return res.sendStatus(400)
  }

  const correctPassword = await bcrypt.compare(req.body.password, user.password)
  if (!correctPassword) {
    return res.sendStatus(400)
  }

  const userToken = jwt.sign(
    {
      id: user._id,
    },
    `${process.env.JWT_SECRET_KEY}`
  )
  res
    .cookie("usertoken", userToken, {
      httpOnly: true,
    })
    .json({ message: "Login successful" })
}

module.exports.logoutUser = (req, res) => {
  res.clearCookie("usertoken")
  res.sendStatus(200)
}

module.exports.getUser = (req, res) => {
  if (req.cookies.usertoken) {
    const decodedToken = jwt_decode(req.cookies.usertoken)
    const userId = decodedToken.id
    res.json({userId: userId})
  } else {
    res.sendStatus(200)
  }

}