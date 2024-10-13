import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/Factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const queryBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = queryBodySchema.parse(request.body)

  const searchUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchUseCase.execute({
    query,
    page,
  })

  return reply.status(201).send({ gyms })
}
