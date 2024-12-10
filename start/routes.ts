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
const FeedController = () => import('../app/controllers/feed_controller.js')
const PostsController = () => import('../app/controllers/posts_controller.js')
const AuthController = () => import('../app/controllers/auth_controller.js')
const RegisterController = () => import('../app/controllers/register_controller.js')

router.get('/', [FeedController, 'index'])
//auth routes
router.get('register', [RegisterController, 'create']).middleware(middleware.guest())
router.post('register', [RegisterController, 'store']).middleware(middleware.guest())
router.get('login', [AuthController, 'create']).middleware(middleware.guest())
router.post('login', [AuthController, 'store']).middleware(middleware.guest())
router.delete('logout', [AuthController, 'destroy']).middleware(middleware.auth())

//post routes
router.post('/posts', [PostsController, 'store']).middleware(middleware.auth())
