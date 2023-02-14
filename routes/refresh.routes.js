const express = require('express');
const router = express.Router();
const RefreshTokenController = require('../controllers/refreshToken.controller');

router.get('/', RefreshTokenController.handleRefreshToken);

module.exports = router;