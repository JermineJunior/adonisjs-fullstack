import { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'

export default class AuthController {
  create({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }
  async store({ request, auth, session, response }: HttpContext) {
    try {
      const user = await User.verifyCredentials(request.input('email'), request.input('password'))

      // login the newly created user
      await auth.use('web').login(user)

      session.flash({
        notification: {
          type: 'Sucess',
          message: 'Sign In was done succesfuly',
        },
      })
      return response.redirect('/')
    } catch (error) {
      session.flash({
        notification: {
          type: 'error',
          message: 'Invalid Credentials',
        },
      })
      return response.redirect().back()
    }
  }
  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    response.redirect('/')
  }
}
