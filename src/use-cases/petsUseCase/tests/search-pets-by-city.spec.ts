import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchPetsByCityUseCase } from '@/use-cases/petsUseCase/search-pets-by-city'
import { randomUUID } from 'node:crypto'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsByCityUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsByCityUseCase(petsRepository)
  })

  it('should be able to search for pets', async () => {
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
      city: 'liverpool',
      neighborhood: 'neighborhood',
      street: 'street',
      latitude: -18.8127589,
      longitude: -40.5722593,
      id: randomUUID(),
      createdAt: new Date(),
    })

    const { pets } = await sut.execute({
      city: 'city',
      currentPetPage: 0,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ city: 'city' })])
  })

  it('should be able to fetch paginated pet search', async () => {
    for (let i = 1; i <= 12; i++) {
      await petsRepository.create({
        name: `pet name ${i}`,
        color: 'black',
        isFemale: true,
        race: 'pitbull',
        size: '1.8',
        userId: null,
        cep: '0000-000',
        state: 'rj',
        city: 'liverpool',
        neighborhood: 'neighborhood',
        street: 'street',
        latitude: -18.8127589,
        longitude: -40.5722593,
        id: randomUUID(),
        createdAt: new Date(),
      })
    }

    const { pets } = await sut.execute({
      city: 'liverpool',
      currentPetPage: 10,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'pet name 11' }),
      expect.objectContaining({ name: 'pet name 12' }),
    ])
  })
})
