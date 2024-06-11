import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsByCityUseCase } from '../search-pets-by-city'

export function makeSearchPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchPetsUseCase = new SearchPetsByCityUseCase(petsRepository)

  return searchPetsUseCase
}
