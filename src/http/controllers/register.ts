import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { name, email, password } = userSchema.parse(request.body)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(userWithSameEmail){
    return reply.status(409).send()
  }

  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash,
    },
  })

  return reply.status(201).send()
}
