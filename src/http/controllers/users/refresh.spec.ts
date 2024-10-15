import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import reqeust from 'supertest'

describe('Refresh Token (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('Should be able to Refresh a Token', async () => {
    await reqeust(app.server).post('/users').send({
      name: 'Jonh Doe',
      email: 'jonh@example.com',
      password: '123456',
    })

    const authResponse = await reqeust(app.server).post('/session').send({
      email: 'jonh@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')
    const response = await reqeust(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
