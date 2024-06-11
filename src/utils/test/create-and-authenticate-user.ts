import { Role } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role: Role = 'USER',
) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
    role,
    latitude: -22.5198507,
    longitude: -43.6504454,
    whatsAppNumber: '2499999',
  })

  const authResponse = await request(app.server).post('/login').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token, cookies } = authResponse.body

  return {
    token,
    cookies,
  }
}
