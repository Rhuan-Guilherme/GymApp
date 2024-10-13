import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/Factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const gymIdSchemaParams = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = gymIdSchemaParams.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const createChckInUseCase = makeCheckInUseCase()
  await createChckInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
