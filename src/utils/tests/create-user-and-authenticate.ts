import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createUserAndAuthenticate(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'Jonh Doe',
      email: 'jonh@example.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authReponse = await request(app.server).post('/session').send({
    email: 'jonh@example.com',
    password: '123456',
  })

  const { token } = authReponse.body

  return {
    token,
  }
}
