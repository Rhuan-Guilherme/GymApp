import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import reqeust from 'supertest'
import { createUserAndAuthenticate } from '@/utils/tests/create-user-and-authenticate'
import { PrismaClient } from '@prisma/client'

describe('Check-in history (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('Should be able the list check-in', async () => {
    const { token } = await createUserAndAuthenticate(app)

    const prisma = new PrismaClient()

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym ',
        latitude: -15.6292954,
        longitude: -47.659926,
      },
    })

    await prisma.checkIns.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    const profileResponse = await reqeust(app.server)
      .get('/check-in/history/1')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.status).toEqual(200)
    expect(profileResponse.body.checkIns).toEqual([
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
    ])
  })
})
