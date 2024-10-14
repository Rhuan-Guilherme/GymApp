import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFecthUserCheckInsHistoryUseCase } from '@/use-cases/Factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const fetchHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchHistoryBodySchema.parse(request.params)

  const fetchHistoryUseCase = makeFecthUserCheckInsHistoryUseCase()
  const { checkIns } = await fetchHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
