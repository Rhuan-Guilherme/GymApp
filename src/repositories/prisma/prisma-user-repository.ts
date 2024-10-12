import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UserRepositoryInterface } from '../user-repository-interface'

export class PrismaUserRepository implements UserRepositoryInterface {
  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
