import Game from '#models/game'
import type { HttpContext } from '@adonisjs/core/http'

export default class GamesController {
  async index({ response }: HttpContext) {
    const games = await Game.query().preload('animal').preload('user')
    return response.ok(games)
  }

  async store({ request, response }: HttpContext) {
    const gameData = request.only(['id', 'animalId', 'userId'])
    console.log(gameData)
    const game = await Game.create(gameData)
    return response.created(game)
  }
}
