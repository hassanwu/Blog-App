const apiRouter = require('express').Router()
const postController = require('./controllers/postController')
const userController = require('./controllers/userController')

apiRouter.post('/register', userController.apiRegister)
apiRouter.post('/login', userController.apiLogin)
apiRouter.post('/create-post', userController.apimustBeLoggedIn, postController.apiCreate);
apiRouter.delete('/post/:id', userController.apimustBeLoggedIn, postController.apiDelete)
apiRouter.get('/postsByAuthor/:username', userController.apiGetPostsByUsername)
apiRouter.get('/users', userController.apiGetUsers)


module.exports = apiRouter
