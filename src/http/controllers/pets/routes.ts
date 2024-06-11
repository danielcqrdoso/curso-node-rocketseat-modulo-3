import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { create } from './create'
import { adopt } from './adopt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/pets/search', search)

  app.post('/pets', { onRequest: [verifyUserRole('ORG')] }, create)

  app.post('/pets/adopt', { onRequest: [verifyUserRole('USER')] }, adopt)
}
