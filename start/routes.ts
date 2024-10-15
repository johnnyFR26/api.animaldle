/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
const Iacontroller = () => import('#controllers/ia_controller')
const AnimalsController = () => import('#controllers/animals_controller')
const UsersController = () => import('#controllers/users_controller')
const GamesController = () => import('#controllers/games_controller')

router.post('/api/chatgpt', [Iacontroller, 'index'])
router.post('animals', [AnimalsController, 'store'])
router.get('animals', [AnimalsController, 'index'])
router.post('animals/destroy', [AnimalsController, 'destroy'])
router.post('animals/create', [AnimalsController, 'create'])
router.post('/user', [UsersController, 'store'])
router.post('/login', [UsersController, 'login'])
router.get('/user', [UsersController, 'index'])
router.get('/games', [GamesController, 'index'])

router.get('dashboard', async ({ auth }) => {
  /**
   * First, authenticate the user
   */
  await auth.authenticate()

  /**
   * Then access the user object
   */
})
