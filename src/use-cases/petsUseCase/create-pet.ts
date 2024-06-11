import { PetsRepository } from '@/repositories/Pets-repository'
import { Pet } from '@prisma/client'
import { randomUUID } from 'crypto'

interface CreatePetUseCaseRequest {
  name: string
  color: string | null
  isFemale: boolean
  race: string
  size: string
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  latitude: number
  longitude: number
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private petRepository: PetsRepository) { }

  async execute(
    params: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petRepository.create({
      id: randomUUID(),
      createdAt: new Date(),
      ...params,
    })

    return {
      pet,
    }
  }
}
