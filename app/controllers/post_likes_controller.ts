import type { HttpContext } from '@adonisjs/core/http'
import Post from '../models/post.js'

export default class PostLikesController {
  async store({ params, auth, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    if (await auth.user?.hasLikedPost(post.id)) {
      return response.redirect().back()
    }
    await auth.user?.related('likes').attach([post.id])

    return response.redirect().back()
  }

  async destroy({ params, auth, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    const user = auth.user

    await user?.related('likes').detach([post.id])

    return response.redirect().back()
  }
}
