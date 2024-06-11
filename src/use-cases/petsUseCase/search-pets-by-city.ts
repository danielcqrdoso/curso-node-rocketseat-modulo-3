import {
  PetsRepository,
  FindManyByCityParams,
} from '@/repositories/Pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseResponse {
  pets: Pet[]
  currentPage: number
}

export class SearchPetsByCityUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private petsRepository: PetsRepository) { }

  async execute(
    paramsFindManyByCity: FindManyByCityParams,
  ): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(paramsFindManyByCity)

    return {
      ...pets,
    }
  }
}
