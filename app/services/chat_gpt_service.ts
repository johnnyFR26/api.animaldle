import axios from 'axios'

export default class ChatGPTService {
  private apiKey: string
  private baseURL: string

  constructor() {
    this.apiKey =
      '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'
    this.baseURL = 'https://api.openai.com/v1'
  }

  async callChatGPT(prompt: any, retryCount = 3, delay = 1000): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data.choices[0].message.content
    } catch (error: any) {
      console.error('Erro ao chamar a API do ChatGPT:', error.message || error)

      if (error.response) {
        // Adicionando logs mais detalhados
        console.error('Data:', error.response.data)
        console.error('Status:', error.response.status)
        console.error('Headers:', error.response.headers)
      } else if (error.request) {
        console.error('Request foi feita, mas não houve resposta:', error.request)
      } else {
        console.error('Erro na configuração da requisição:', error.message)
      }

      if (error.response && error.response.status === 429 && retryCount > 0) {
        console.log(`429 Too Many Requests - Retrying after ${delay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
        return this.callChatGPT(prompt, retryCount - 1, delay * 2)
      } else {
        throw new Error('Falha na comunicação com o ChatGPT')
      }
    }
  }
}
