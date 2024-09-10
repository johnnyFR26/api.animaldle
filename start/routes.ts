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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router.post('/api/chatgpt', [Iacontroller, 'index'])
router.post('animals', [AnimalsController, 'store'])
