const express = require('express')
const router = express.Router()
const GirlTeamController = require('../../controllers/girlTeam.controller')
const ROLES_LIST = require('../../config/roles_list.config')
const verifyRoles = require('../../middleware/verifyRoles.middleware')
const verifyJWT = require('../../middleware/verifyJWT.middleware')

router.route('/')
  .get(GirlTeamController.getAllGirlsTeams)
  .post([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], GirlTeamController.createNewGirlTeam)
  .put([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], GirlTeamController.updateGirlTeam)

router.route('/:id')
  .delete([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], GirlTeamController.deleteGirlTeam)
  .get(GirlTeamController.getGirlTeam)

module.exports = router