const User = require('../models/user.model');

const handleLogout = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204)

  const refreshToken = cookies.jwt
  const foundUser = await User.find({ refreshToken }).exec()
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    return res.sendStatus(204)
  }

  // Delete refreshToken in database
  foundUser.refreshToken = ""
  const result = await foundUser.save()

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
  res.sendStatus(204)
}

module.exports = { handleLogout }