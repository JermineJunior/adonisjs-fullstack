/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const PostLikesController = () => import('../app/controllers/post_likes_controller.js')
const FeedController = () => import('../app/controllers/feed_controller.js')
const PostsController = () => import('../app/controllers/posts_controller.js')
const AuthController = () => import('../app/controllers/auth_controller.js')
const RegisterController = () => import('../app/controllers/register_controller.js')

router.get('/', [FeedController, 'index'])
//auth routes
router
  .group(() => {
    router.get('register', [RegisterController, 'create'])
    router.post('register', [RegisterController, 'store'])
    router.get('login', [AuthController, 'create'])
    router.post('login', [AuthController, 'store'])
  })
  .middleware(middleware.guest())

router.delete('logout', [AuthController, 'destroy']).middleware(middleware.auth())

//post routes
router
  .group(() => {
    router.post('/posts', [PostsController, 'store'])
    router.get('/posts/:id/edit', [PostsController, 'edit'])
    router.patch('/posts/:id', [PostsController, 'update'])
    router.delete('/posts/:id', [PostsController, 'destroy'])
    //likes
    router.post('posts/:id/likes', [PostLikesController, 'store'])
    router.delete('posts/:id/likes', [PostLikesController, 'destroy'])
  })
  .middleware(middleware.auth())
