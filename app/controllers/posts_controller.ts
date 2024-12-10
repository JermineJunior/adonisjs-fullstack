import type { HttpContext } from '@adonisjs/core/http'
import { PostValidator } from '../validators/post.js'

export default class PostsController {
  async store({ request, auth, session, response }: HttpContext) {
    const { content } = await request.validateUsing(PostValidator)

    await auth.user!.related('posts').create({ content })

    session.flash({
      notification: {
        type: 'Sucess',
        message: 'Post was created succesfuly',
      },
    })

    return response.redirect().back()
  }
}
