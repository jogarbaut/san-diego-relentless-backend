const User = require("../models/user.model")
const bcrypt = require("bcrypt")

const handleNewUser = async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body
  if (!username || !firstName || !lastName || !email || !password)
    return res.status(400).json({ message: "All fields required" })

  const duplicateUser = await User.findOne({ username: username }).exec()
  if (duplicateUser) return res.sendStatus(409)

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await User.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    })
    console.log(result)
    res.status(201).json({ success: `New user ${email} created.` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { handleNewUser }
