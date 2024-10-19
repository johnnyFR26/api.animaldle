import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Animal from '#models/animal'
import User from '#models/user'

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare animalId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Animal)
  declare animal: BelongsTo<typeof Animal>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
