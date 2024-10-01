import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'

export default class UsersController {
  async store({ request }: HttpContext) {
    const data = request.only(['fullName', 'phone', 'password'])
    const user = await User.create(data)
    const password = await hash.make('password')
    return user
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
  }
  async index() {
    const users = await User.all()
    return users
  }
}
