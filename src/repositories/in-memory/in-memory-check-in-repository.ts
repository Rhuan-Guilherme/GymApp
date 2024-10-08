import { Prisma, CheckIns } from '@prisma/client'
import { checkInRepositoryInterface } from '../check-in-repository-interface'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInRepository implements checkInRepositoryInterface {
  checkIn: CheckIns[] = []

  async create(data: Prisma.CheckInsUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      gym_id: data.gym_id,
      user_id: data.user_id,
    }

    this.checkIn.push(checkIn)

    return checkIn
  }
}
