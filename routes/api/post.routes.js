const express = require('express')
const router = express.Router()
const PostController = require('../../controllers/post.controller')
const ROLES_LIST = require('../../config/roles_list.config')
const verifyRoles = require('../../middleware/verifyRoles.middleware')
const verifyJWT = require('../../middleware/verifyJWT.middleware')

router.route('/')
  .get(PostController.getAllPosts)
  .post([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], PostController.createNewPost)
  .put([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], PostController.updatePost)

router.route('/:id')
  .delete([verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Coach)], PostController.deletePost)
  .get(PostController.getPost)

module.exports = router