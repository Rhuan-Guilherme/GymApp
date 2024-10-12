import { Prisma, CheckIns } from '@prisma/client'
import { checkInRepositoryInterface } from '../check-in-repository-interface'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements checkInRepositoryInterface {
  async create(data: Prisma.CheckInsUncheckedCreateInput) {
    const chcekIn = await prisma.checkIns.create({
      data,
    })

    return chcekIn
  }

  async findById(id: string) {
    const chcekIn = prisma.checkIns.findUnique({
      where: {
        id,
      },
    })

    return chcekIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIns.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  async findManyUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIns.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async countByUserId(userId: string) {
    const chcekIns = await prisma.checkIns.count({
      where: {
        user_id: userId,
      },
    })

    return chcekIns
  }

  async save(data: CheckIns) {
    const chcekIn = await prisma.checkIns.update({
      where: {
        id: data.id,
      },
      data,
    })

    return chcekIn
  }
}
