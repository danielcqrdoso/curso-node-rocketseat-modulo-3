import {
  FindManyByCityParams,
  FindManyNearbyParams,
  PetsRepository,
} from '@/repositories/Pets-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-user-location-to-pets-locations'
import { Pet } from '@prisma/client'

interface petsDistance {
  pets: Pet
  distance: number
}

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(params: FindManyByCityParams) {
    const pets = this.items
      .filter((item) => item.city.includes(params.city))
      .slice(params.currentPetPage)

    return {
      pets,
      currentPage: params.currentPetPage + pets.length,
    }
  }

  async findManyNearby(params: FindManyNearbyParams) {
    const arrayDistancesPets: petsDistance[] = []

    this.items.forEach((pet) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitudeUser, longitude: params.longitudeUser },
        { latitude: pet.latitude, longitude: pet.longitude },
      )

      arrayDistancesPets.push({
        pets: pet,
        distance,
      })
    })

    arrayDistancesPets.sort((a, b) => a.distance - b.distance)

    return {
      pets: arrayDistancesPets.slice(0, 10).map((item) => item.pets),
      currentPage:
        arrayDistancesPets.length > 11 ? 10 : arrayDistancesPets.length,
    }
  }

  async create(data: Pet) {
    this.items.push(data)

    return data
  }

  async adopt(id: string, userId: string) {
    const pet = await this.findById(id)

    if (pet) {
      pet.userId = userId
    }
  }
}
