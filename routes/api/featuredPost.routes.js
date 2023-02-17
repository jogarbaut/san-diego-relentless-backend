const express = require('express')
const router = express.Router()
const FeaturedPostController = require('../../controllers/featuredPost.controller')
const ROLES_LIST = require('../../config/roles_list.config')
const verifyRoles = require('../../middleware/verifyRoles.middleware')
const verifyJWT = require('../../middleware/verifyJWT.middleware')

router.route('/')
  .get(FeaturedPostController.getAllFeaturedPosts)
  .post([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], FeaturedPostController.createNewFeaturedPost)
  .put([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], FeaturedPostController.updateFeaturedPost)

router.route('/:id')
  .delete([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], FeaturedPostController.deleteFeaturedPost)
  .get(FeaturedPostController.getFeaturedPost)

module.exports = router