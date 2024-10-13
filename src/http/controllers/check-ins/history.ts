import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFecthUserCheckInsHistoryUseCase } from '@/use-cases/Factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const fetchHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchHistoryBodySchema.parse(request.body)

  const fetchHistoryUseCase = makeFecthUserCheckInsHistoryUseCase()
  await fetchHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(201).send()
}
