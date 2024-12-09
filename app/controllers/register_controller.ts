import type { HttpContext } from '@adonisjs/core/http'
import { RegisterValidator } from '../validators/register.js'
import User from '../models/user.js'

export default class RegisterController {
  create({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, auth, session, response }: HttpContext) {
    //validate the user data
    const validatedData = await request.validateUsing(RegisterValidator)
    // create a new user
    const user = await User.create(validatedData)
    // login the newly created user
    await auth.use('web').login(user)

    session.flash({
      notification: {
        type: 'Sucess',
        message: 'Regestration was done succesfuly',
      },
    })

    return response.redirect('/')
  }
}
