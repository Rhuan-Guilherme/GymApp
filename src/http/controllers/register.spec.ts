import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import reqeust from 'supertest'

describe('Register (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('Should be able to register', async () => {
    const response = await reqeust(app.server).post('/users').send({
      name: 'Jonh Doe',
      email: 'jonh@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(201)
  })
})
