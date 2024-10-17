// import type { HttpContext } from '@adonisjs/core/http'
import Animal from '#models/animal'
import { HttpContext } from '@adonisjs/core/http'

export default class AnimalsController {
  async store({ response }: HttpContext) {
    try {
      // Usando import dinâmico para carregar o JSON
      const animalsData = await import('../../animalsjson.json', {
        assert: { type: 'json' },
      })

      if (Array.isArray(animalsData.default)) {
        for (const animal of animalsData.default) {
          // Cadastrando os animais no banco de dados
          await Animal.create({
            name: animal.name,
            //@ts-ignore
            characteristics: animal.characteristics,
          })
        }
        return response
          .status(201)
          .send({ message: `Animais cadastrados com sucesso! ${new Date()}` })
      } else {
        return response.status(400).send({ error: 'O arquivo JSON não contém um array válido.' })
      }
    } catch (error) {
      console.error('Erro ao carregar o arquivo JSON:', error)
      return response.status(500).send({ error: 'Erro ao carregar o arquivo JSON.' })
    }
  }

  async create({ request, response }: HttpContext) {
    const { name, characteristics } = request.only(['name', 'characteristics'])
    const animal = await Animal.create({ name, characteristics })
    return response.created(animal)
  }

  async index({ response }: HttpContext) {
    const animals = await Animal.all()
    return response.ok(animals)
  }

  async destroy({ response }: HttpContext) {
    await Animal.query().delete()

    return response.ok({ message: 'Animais excluídos com sucesso!' })
  }
}
