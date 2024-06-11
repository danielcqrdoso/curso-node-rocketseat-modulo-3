import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsByCityUseCase } from '@/use-cases/petsUseCase/factories/make-search-pet-by-city-use-case'
import { makeSearchPetsNearbyUseCase } from '@/use-cases/petsUseCase/factories/make-search-pet-nearby-use-case'
import { MissSomeDataError } from '@/use-cases/petsUseCase/errors/miss-some-data-error'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string().optional(),
    currentPetPage: z.coerce.number().min(0),
    latitudeUser: z
      .number()
      .refine((value) => {
        return Math.abs(value) <= 90
      })
      .optional(),

    longitudeUser: z
      .number()
      .refine((value) => {
        return Math.abs(value) <= 180
      })
      .optional(),
  })

  const { city, latitudeUser, longitudeUser, currentPetPage } =
    searchPetsQuerySchema.parse(request.body)

  let useCase

  if (latitudeUser && longitudeUser) {
    useCase = makeSearchPetsNearbyUseCase()
    const { pets, currentPage } = await useCase.execute({
      currentPetPage,
      latitudeUser,
      longitudeUser,
    })

    return reply.status(200).send({
      pets,
      currentPage,
    })
  } else if (city) {
    useCase = makeSearchPetsByCityUseCase()
    const { pets, currentPage } = await useCase.execute({
      currentPetPage,
      city,
    })

    return reply.status(200).send({
      pets,
      currentPage,
    })
  } else {
    return reply.status(400).send(MissSomeDataError)
  }
}
