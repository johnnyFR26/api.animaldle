import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class UsersController {
  static accessTokens = DbAccessTokensProvider.forModel(User)

  async store({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'phone', 'password'])
    const user = await User.create(data)
    const password = await hash.make('password')
    const token = await User.accessTokens.create(user)
    return response.created({ user, token, password })
  }

  async login({ request, response }: HttpContext) {
    const { phone, password } = request.only(['phone', 'password'])
    /*Encontrar o usuario pelo numero. Retornar erro
        se o usuario nao existir.
    */
    const user = await User.findBy('phone', phone)
    if (!user) {
      return response.abort('Dados Invalidos')
    }
    /*Verificar a senha usando o serviço hash*/
    const isPasswordValid = await hash.verify(user.password, password)
    if (!isPasswordValid) {
      return response.abort('Dados Invalidos')
    }
    const token = await User.accessTokens.create(user)
    return { user, token }
  }

  async index() {
    const users = await User.all()
    return users
  }
}
