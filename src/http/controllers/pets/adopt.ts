import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAdoptPetUseCase } from '@/use-cases/petsUseCase/factories/make-adopt-pet-use-case'

export async function adopt(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    id: z.string(),
  })

  const { id } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeAdoptPetUseCase()
  await createPetUseCase.execute(id, request.user.sub)

  return reply.status(200).send()
}
