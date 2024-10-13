import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { metrics } from './metrics'
import { validate } from './validate'
import { create } from './create'
import { history } from './history'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-in/metrics', metrics)
  app.get('/check-in/history', history)

  app.patch('/check-in/:checkInId/validate', validate)
  app.post('/check-in/:gymId/create', create)
}
