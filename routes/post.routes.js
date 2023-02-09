const PostController = require('../controllers/post.controller')
const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {
  app.post(`/api/post`, authenticate, PostController.createPost)
  app.get(`/api/post`, PostController.getAllPosts)
  app.get(`/api/post/:id`, PostController.getPost)
  app.put(`/api/post/:id`, authenticate, PostController.updatePost)
  app.delete(`/api/post:id`, authenticate, PostController.deletePost)
}