import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import reqeust from 'supertest'
import { createUserAndAuthenticate } from '@/utils/tests/create-user-and-authenticate'

describe('Profile (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('Should be able to get user profile', async () => {
    const { token } = await createUserAndAuthenticate(app)

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
