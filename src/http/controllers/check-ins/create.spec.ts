import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import reqeust from 'supertest'
import { createUserAndAuthenticate } from '@/utils/tests/create-user-and-authenticate'
import { PrismaClient } from '@prisma/client'

describe('Create Check-in (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('Should be able the create check-in', async () => {
    const { token } = await createUserAndAuthenticate(app)

    const prisma = new PrismaClient()
    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym ',
        latitude: -15.6292954,
        longitude: -47.659926,
      },
    })

    const profileResponse = await reqeust(app.server)
      .post(`/check-in/${gym.id}/create`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -15.6292954,
        longitude: -47.659926,
      })

    expect(profileResponse.status).toEqual(201)
  })
})
