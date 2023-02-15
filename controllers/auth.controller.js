const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required (auth.controller.js)." })

  const foundUser = await User.findOne({ username: username }).exec()
  if (!foundUser) return res.status(401).json({ message: "Could not find user (auth.controller.js)." })

  const matchPassword = await bcrypt.compare(password, foundUser.password)

  if (matchPassword) {
    const roles = Object.values(foundUser.roles).filter(Boolean)

    // Create JWT accessToken
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles
        },
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: "10s" }
    )

    // Create JWT refreshToken
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      `${process.env.REFRESH_TOKEN_SECRET}`,
      { expiresIn: "1d" }
    )

    // Save current user with refreshToken
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()

    // Create cookie with refresh token
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
    
    // Send authorization roles and access token to user)
    res.json({ roles, accessToken })
  } else {
    res.status(401).json({ message: "Error when handling login in auth.controller (auth.controller.js)." })
  }
}

module.exports = { handleLogin };