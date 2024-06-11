import {
  PetsRepository,
  FindManyNearbyParams,
} from '@/repositories/Pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsNearbyUseCaseResponse {
  pets: Pet[]
  currentPage: number
}

export class SearchPetsNearbyUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private petsRepository: PetsRepository) { }

  async execute(
    paramsFindManyNearby: FindManyNearbyParams,
  ): Promise<SearchPetsNearbyUseCaseResponse> {
    const pets = await this.petsRepository.findManyNearby(paramsFindManyNearby)

    return {
      ...pets,
    }
  }
}
