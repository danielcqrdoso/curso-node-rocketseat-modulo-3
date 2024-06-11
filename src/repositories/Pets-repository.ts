import { Pet, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitudeUser: number
  longitudeUser: number
  currentPetPage: number
}

export interface FindManyByCityParams {
  city: string
  currentPetPage: number
}

export interface FindManyReturn {
  pets: Pet[]
  currentPage: number
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyNearby(params: FindManyNearbyParams): Promise<FindManyReturn>
  findManyByCity(params: FindManyByCityParams): Promise<FindManyReturn>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  adopt(id: string, userId: string): Promise<void>
}
