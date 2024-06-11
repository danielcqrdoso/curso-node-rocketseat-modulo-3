import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Adopt pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to adopt a pet', async () => {
    await request(app.server).post('/users').send({
      name: 'John ORG',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'ORG',
      latitude: -22.5198507,
      longitude: -43.6504454,
      whatsAppNumber: '2499999',
    })

    const authResponse = await request(app.server).post('/login').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const responsePet = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'pet1',
        color: 'black',
        isFemale: true,
        race: 'pitbull',
        size: '1.8',
        cep: '0000-000',
        state: 'rj',
        city: 'city',
        neighborhood: 'neighborhood',
        street: 'street',
        latitude: -18.8127589,
        longitude: -40.5722593,
      })

    const { pet } = responsePet.body.pet

    await request(app.server).post('/users').send({
      name: 'John USER',
      email: 'johndoe@email.com',
      password: '123456',
      role: 'USER',
      latitude: -22.5198507,
      longitude: -43.6504454,
      whatsAppNumber: '2499999',
    })

    const authResponse2 = await request(app.server).post('/login').send({
      email: 'johndoe@email.com',
      password: '123456',
    })

    const token2 = authResponse2.body.token
    const response = await request(app.server)
      .post('/pets/adopt')
      .set('Authorization', `Bearer ${token2}`)
      .send({
        id: pet.id,
      })

    expect(response.statusCode).toEqual(200)
  })
})
