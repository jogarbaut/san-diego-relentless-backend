const express = require('express')
const router = express.Router()
const BoyTeamController = require('../../controllers/boyTeam.controller')
const ROLES_LIST = require('../../config/roles_list.config')
const verifyRoles = require('../../middleware/verifyRoles.middleware')
const verifyJWT = require('../../middleware/verifyJWT.middleware')

router.route('/')
  .get(BoyTeamController.getAllBoysTeams)
  .post([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], BoyTeamController.createNewBoyTeam)
  .put([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], BoyTeamController.updateBoyTeam)

router.route('/:id')
  .delete([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], BoyTeamController.deleteBoyTeam)
  .get(BoyTeamController.getBoyTeam)

module.exports = router