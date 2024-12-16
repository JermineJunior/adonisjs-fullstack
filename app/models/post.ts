import { DateTime } from 'luxon'
import { BaseModel, hasMany, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTimestamps: true,
  })
  declare likes: ManyToMany<typeof User>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
}
