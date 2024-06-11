import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ORG')

    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201)
  })
})
