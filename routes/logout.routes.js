const express = require('express');
const router = express.Router();
const LogoutController = require('../controllers/logout.controller')

router.get('/', LogoutController.handleLogout);

module.exports = router;