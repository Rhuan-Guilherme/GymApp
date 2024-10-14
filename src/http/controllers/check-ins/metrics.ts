import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUserGetMetricsUseCase } from '@/use-cases/Factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const metricsuseCase = makeUserGetMetricsUseCase()
  const { checkInsCount } = await metricsuseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
