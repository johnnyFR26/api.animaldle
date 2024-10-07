import Animal from '#models/animal'
import Game from '#models/game'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class GamesController {
  async index({ response }: HttpContext) {
    const games = await Game.all()
    return response.ok(games)
  }

  async store({ request, response }: HttpContext) {
    const animalsIds = await Animal.all()
    const user = await User.findOrFail(request.id)
  }
}
