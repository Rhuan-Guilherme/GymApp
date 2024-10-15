import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createUserAndAuthenticate } from '@/utils/tests/create-user-and-authenticate'

describe('Create Gym (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('Should be able the nearby gym', async () => {
    const { token } = await createUserAndAuthenticate(app, true)

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: '',
        phone: '',
        latitude: -15.6292954,
        longitude: -47.659926,
      })

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: '',
        phone: '',
        latitude: -15.6292954,
        longitude: -47.659926,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -15.6292954, longitude: -47.659926 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toEqual(200)
    // expect(response.body.gyms).toHaveLength(1)
    // expect(response.body.gyms).toEqual([
    //   expect.objectContaining({
    //     title: 'JavaScript Gym',
    //   }),
    // ])
  })
})
