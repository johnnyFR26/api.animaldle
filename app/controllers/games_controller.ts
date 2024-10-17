import Game from '#models/game'
import type { HttpContext } from '@adonisjs/core/http'

export default class GamesController {
  async index({ response }: HttpContext) {
    const games = await Game.all()
    return response.ok(games)
  }

  async store({ request, response }: HttpContext) {
    const gameData = request.only(['id', 'animal_Id', 'user_Id'])
    console.log(gameData)
    const game = await Game.create(gameData)
    return response.created(game)
  }
}
