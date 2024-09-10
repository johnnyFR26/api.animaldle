import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Animal from './animal.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Animal)
  declare animalId: HasMany<typeof Animal>

  @hasMany(() => User)
  declare userId: HasMany<typeof User>
}
