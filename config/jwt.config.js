const jwt = require('jsonwebtoken')
const secret = `${process.env.JWT_SECRET_KEY}`

module.exports.secret = secret

// Add middleware function 'authenticate' within routes files on applicable routes
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false })
    } else {
      next();
    }
  })
}