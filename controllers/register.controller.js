const User = require("../models/user.model")
const bcrypt = require("bcrypt")

const handleNewUser = async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body
  if (!username || !firstName || !lastName || !email || !password)
    return res.status(400).json({ message: "All fields required (register.controller.js)" })

  const duplicateUser = await User.findOne({ username: username }).exec()
  if (duplicateUser) return res.send(409).json({ message: "Duplicate username given (register.controller.js)"})

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await User.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    })
    res.status(201).json({ success: `New user ${email} created. (register.controller.js)` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { handleNewUser }
