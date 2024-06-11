import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const cretatePetUseCase = new CreatePetUseCase(petsRepository)

  return cretatePetUseCase
}
