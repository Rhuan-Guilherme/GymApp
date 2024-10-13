import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createUserAndAuthenticate(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Jonh Doe',
    email: 'jonh@example.com',
    password: '123456',
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
