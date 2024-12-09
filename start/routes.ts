/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController = () => import('../app/controllers/auth_controller.js')
const RegisterController = () => import('../app/controllers/register_controller.js')

router.on('/').render('pages/home')

//auth routes
router.get('register', [RegisterController, 'create'])
router.post('register', [RegisterController, 'store'])
router.get('login', [AuthController, 'create'])
router.post('login', [AuthController, 'store'])
router.delete('logout', [AuthController, 'destroy'])
