require("dotenv").config()
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express()
const PORT = `${process.env.PORT}` || 8000

// Mongodb config
require('./config/mongoose.config')

// Middleware
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
require('./routes/user.routes')(app)
require('./routes/post.routes')(app)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})