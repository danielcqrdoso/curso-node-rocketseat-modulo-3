import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from '@/use-cases/petsUseCase/create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should to create pet', async () => {
    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.createdAt).toEqual(expect.any(Date))
  })
})
