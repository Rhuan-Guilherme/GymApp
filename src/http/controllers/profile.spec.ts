import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import reqeust from 'supertest'

describe('Profile (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('Should be able to get user profile', async () => {
    await reqeust(app.server).post('/users').send({
      name: 'Jonh Doe',
      email: 'jonh@example.com',
      password: '123456',
    })

    const authReponse = await reqeust(app.server).post('/session').send({
      email: 'jonh@example.com',
      password: '123456',
    })

    const { token } = authReponse.body

    const profileResponse = await reqeust(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.status).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'jonh@example.com',
      }),
    )
  })
})
