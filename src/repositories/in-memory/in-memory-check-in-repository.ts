import { Prisma, CheckIns } from '@prisma/client'
import { checkInRepositoryInterface } from '../check-in-repository-interface'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements checkInRepositoryInterface {
  items: CheckIns[] = []

  async fyndByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkInOnSomeDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSomeDate) {
      return null
    }

    return checkInOnSomeDate
  }

  async create(data: Prisma.CheckInsUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      gym_id: data.gym_id,
      user_id: data.user_id,
    }

    this.items.push(checkIn)

    return checkIn
  }
}
