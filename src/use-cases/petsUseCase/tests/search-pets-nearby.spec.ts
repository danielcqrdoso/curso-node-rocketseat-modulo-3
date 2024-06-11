import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchPetsNearbyUseCase } from '@/use-cases/petsUseCase/search-pets-nearby'
import { randomUUID } from 'crypto'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsNearbyUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsNearbyUseCase(petsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await petsRepository.create({
      name: 'pet1',
      color: 'black',
      isFemale: true,
      race: 'pitbull',
      size: '1.8',
      userId: null,
      cep: '0000-000',
      state: 'rj',
      city: 'city',
      neighborhood: 'neighborhood',
      street: 'street',
      latitude: -18.8127589,
      longitude: -40.5722593,
      id: randomUUID(),
      createdAt: new Date(),
    })

    await petsRepository.create({
      name: 'pet2',
      color: 'black',
      isFemale: true,
      race: 'pitbull',
      size: '1.8',
      userId: null,
      cep: '0000-000',
      state: 'rj',
      city: 'city',
      neighborhood: 'neighborhood',
      street: 'street',
      latitude: -13.5769927,
      longitude: -38.4478526,
      id: randomUUID(),
      createdAt: new Date(),
    })

    const { pets } = await sut.execute({
      latitudeUser: -23.6816864,
      longitudeUser: -45.1088474,
      currentPetPage: 0,
    })

    expect(pets).toHaveLength(2)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'pet1' }))
    expect(pets[1]).toEqual(expect.objectContaining({ name: 'pet2' }))
  })
})
