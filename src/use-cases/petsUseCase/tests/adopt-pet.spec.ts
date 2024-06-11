import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { AdoptPetUseCase } from '@/use-cases/petsUseCase/adopt-pet'

let petsRepository: InMemoryPetsRepository
let sut: AdoptPetUseCase

describe('Adopt Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new AdoptPetUseCase(petsRepository)
  })

  it('should adopt pet', async () => {
    await petsRepository.create({
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
      id: 'id',
      createdAt: new Date(),
      userId: null,
    })

    await sut.execute('id', 'userId')

    const pet = await petsRepository.findById('id')

    expect(pet!.userId).toEqual('userId')
  })
})
