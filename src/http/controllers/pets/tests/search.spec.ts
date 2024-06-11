import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Search pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await prisma.pet.deleteMany()
  })

  it('should be able to search pets by city', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ORG')

    await request(app.server)
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

    await request(app.server)
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
        city: 'liverpool',
        neighborhood: 'neighborhood',
        street: 'street',
        latitude: -18.8127589,
        longitude: -40.5722593,
      })

    const response = await request(app.server)
      .post('/pets/search')
      .set('Authorization', `Bearer ${token}`)
      .send({
        city: 'liverpool',
        currentPetPage: 0,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.currentPage).toBe(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        city: 'liverpool',
      }),
    ])
  })

  it('should be able to search pets nearby', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ORG')

    await request(app.server)
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

    await request(app.server)
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
        city: 'liverpool',
        neighborhood: 'neighborhood',
        street: 'street',
        latitude: -19.2375254,
        longitude: -39.7943917,
      })

    const response = await request(app.server)
      .post('/pets/search')
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentPetPage: 0,
        latitudeUser: -16.1371181,
        longitudeUser: -39.8967996,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.currentPage).toBe(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        city: 'city',
      }),
      expect.objectContaining({
        city: 'liverpool',
      }),
    ])
  })
})
