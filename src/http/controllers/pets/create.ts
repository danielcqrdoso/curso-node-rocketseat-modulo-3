import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/use-cases/petsUseCase/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    color: z.string().nullable(),
    isFemale: z.boolean(),
    race: z.string(),
    size: z.string(),
    cep: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  // eslint-disable-next-line prettier/prettier
  const params = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const pet = await createPetUseCase.execute({
    ...params,
  })

  return reply.status(201).send({
    pet: {
      ...pet,
    },
  })
}
