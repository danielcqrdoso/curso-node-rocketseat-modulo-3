import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsNearbyUseCase } from '../search-pets-nearby'

export function makeSearchPetsNearbyUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchPetsUseCase = new SearchPetsNearbyUseCase(petsRepository)

  return searchPetsUseCase
}
