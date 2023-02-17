require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors');
const corsOptions = require("./config/corsOptions.config");
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials.middleware');

const PORT = `${process.env.PORT}` || 8000

// Mongodb config
const mongoose = require('mongoose');
const connectDB = require('./config/mongoose.config')
connectDB();

// Middleware
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(cookieParser())

// Routes
app.use('/register', require('./routes/register.routes'))
app.use('/auth', require('./routes/auth.routes'));
app.use('/refresh', require('./routes/refresh.routes'));
app.use('/logout', require('./routes/logout.routes'));
app.use('/posts', require('./routes/api/post.routes'));
app.use('/featuredPosts', require('./routes/api/featuredPost.routes'));
app.use('/users', require('./routes/api/user.routes'));
app.use('/boyTeams', require('./routes/api/boyTeam.routes'));
app.use('/girlTeams', require('./routes/api/girlTeam.routes'));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})