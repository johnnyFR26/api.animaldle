import ChatGPTService from '#services/chat_gpt_service'
const json = () => import('../../animalsjson.json')

export default class TestesController {
  async index({ request, response }: any) {
    const { prompt } = request.only(['prompt'])
    //const chatGPTService = new ChatGPTService()

    try {
      //const chatResponse = await chatGPTService.callChatGPT(prompt)
      return response.json({ message: json })
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao processar a solicitação do ChatGPT' })
    }
  }
}
