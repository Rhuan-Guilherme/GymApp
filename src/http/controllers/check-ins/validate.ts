import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/use-cases/Factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const checkInIdBodySchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = checkInIdBodySchema.parse(request.params)

  const ValidateCheckInUseCase = makeValidateCheckInUseCase()
  await ValidateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(201).send()
}
