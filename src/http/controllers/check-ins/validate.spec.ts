import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import reqeust from 'supertest'
import { createUserAndAuthenticate } from '@/utils/tests/create-user-and-authenticate'
import { PrismaClient } from '@prisma/client'

describe('Validate Check-in (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('Should be able the create check-in', async () => {
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

    let checkIn = await prisma.checkIns.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await reqeust(app.server)
      .patch(`/check-in/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toEqual(204)

    checkIn = await prisma.checkIns.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
