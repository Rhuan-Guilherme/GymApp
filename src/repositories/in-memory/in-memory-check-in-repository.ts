import { Prisma, CheckIns } from '@prisma/client'
import { checkInRepositoryInterface } from '../check-in-repository-interface'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInRepository implements checkInRepositoryInterface {
  checkIns: CheckIns[] = []

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fyndByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSomeDate = this.checkIns.find(
      (checkIn) => checkIn.user_id === userId,
    )

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

    this.checkIns.push(checkIn)

    return checkIn
  }
}
