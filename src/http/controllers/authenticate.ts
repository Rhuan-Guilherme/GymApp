import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { CredentialsInvalidError } from '@/use-cases/errors/credentials-invalid-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateSchema.parse(request.body)

  try {
    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)
    await authenticateUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof CredentialsInvalidError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
