// import type { HttpContext } from '@adonisjs/core/http'
import Animal from '#models/animal'
import { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'

export default class AnimalsController {
  async store({ request, response }: HttpContext) {
    const animalNames = request.input('animals')

    if (!Array.isArray(animalNames)) {
      return response.status(400).json({ error: 'Invalid input: animals must be an array' })
    }

    try {
      const iaResponse = await axios.post('http://localhost:3333/api/chatgpt', {
        prompt: animalNames,
      })

      const animalsDatas = iaResponse.data

      for (const animalData of animalsDatas) {
        await Animal.create({
          name: animalData.name,
          characteristics: animalData.characteristics,
        })
        return response.created({ success: true, data: animalsDatas })
      }
    } catch (error) {
      console.error('Error:', error)
      return response.status(500).json({ error: 'Erro ao processar a solicitação do ChatGPT' })
    }
  }
}
