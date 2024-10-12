import { makeGetUserProfileUseCase } from '@/use-cases/Factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserUseCase = makeGetUserProfileUseCase()
  const { user } = await getUserUseCase.execute({ userId: request.user.sub })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
