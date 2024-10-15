import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import reqeust from 'supertest'
import { createUserAndAuthenticate } from '@/utils/tests/create-user-and-authenticate'

describe('Create Gym (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('Should be able the create gym', async () => {
    const { token } = await createUserAndAuthenticate(app, true)

    const profileResponse = await reqeust(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: '',
        phone: '',
        latitude: -15.6292954,
        longitude: -47.659926,
      })

    expect(profileResponse.status).toEqual(201)
  })
})
