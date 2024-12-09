/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const RegisterController = () => import('../app/controllers/register_controller.js')

router.on('/').render('pages/home')

//auth routes
router.get('register', [RegisterController, 'create'])
router.post('register', [RegisterController, 'store'])
