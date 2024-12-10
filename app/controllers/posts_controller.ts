import type { HttpContext } from '@adonisjs/core/http'
import { PostValidator } from '../validators/post.js'
import Post from '#models/post'

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

  async edit({ params, view }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    return view.render('pages/posts/edit', { post })
  }

  async update({ params, request, session, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    const { content } = await request.validateUsing(PostValidator)

    await post.merge({ content }).save()
    session.flash({
      notification: {
        type: 'Sucess',
        message: 'Post was updated ',
      },
    })

    return response.redirect('/')
  }

  async destroy({ params, session, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
    session.flash({
      notification: {
        type: 'Sucess',
        message: 'Post was deleted',
      },
    })
    return response.redirect().back()
  }
}
