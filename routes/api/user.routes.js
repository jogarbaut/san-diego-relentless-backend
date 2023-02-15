const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/user.controller')
const ROLES_LIST = require('../../config/roles_list.config')
const verifyRoles = require('../../middleware/verifyRoles.middleware')
const verifyJWT = require('../../middleware/verifyJWT.middleware')

router.route('/')
  .get([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], UserController.getAllUsers)
  .delete([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], UserController.deleteUser)

router.route('/:id')
  .get([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], UserController.getUser)

module.exports = router