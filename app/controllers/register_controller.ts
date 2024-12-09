import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  create({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  store({ request, auth, session, response }) {}
}
