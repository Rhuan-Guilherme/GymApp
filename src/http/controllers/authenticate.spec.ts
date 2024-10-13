import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import reqeust from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('Should be able to authenticate', async () => {
    await reqeust(app.server).post('/users').send({
      name: 'Jonh Doe',
      email: 'jonh@example.com',
      password: '123456',
    })

    const response = await reqeust(app.server).post('/session').send({
      email: 'jonh@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
