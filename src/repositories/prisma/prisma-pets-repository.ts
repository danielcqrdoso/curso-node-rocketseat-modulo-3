import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import {
  FindManyByCityParams,
  FindManyNearbyParams,
  PetsRepository,
} from '../Pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyNearby({
    latitudeUser,
    longitudeUser,
    currentPetPage,
  }: FindManyNearbyParams) {
    const pets = await prisma.$queryRaw<Pet[]>`
      SELECT *, 
        ( 6371 * acos( cos( radians(${latitudeUser}) ) * cos( radians(latitude) ) * cos( radians(longitude) - radians(${longitudeUser}) ) + sin( radians(${latitudeUser}) ) * sin( radians(latitude) ) ) ) AS distance
      FROM pets
      ORDER BY distance
      LIMIT 10
      OFFSET ${currentPetPage}
    `

    return {
      pets,
      currentPage: currentPetPage + pets.length,
    }
  }

  async findManyByCity({ city, currentPetPage }: FindManyByCityParams) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
      },
      take: 10,
      skip: currentPetPage,
    })

    return {
      pets,
      currentPage: currentPetPage + pets.length,
    }
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async adopt(id: string, userId: string) {
    console.log('aaa', userId)
    await prisma.pet.update({
      where: { id },
      data: {
        userId,
      },
    })
  }
}
