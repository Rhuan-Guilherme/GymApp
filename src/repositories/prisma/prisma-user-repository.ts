import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UserRepositoryInterface } from '../user-repository-interface'

export class PrismaUserRepository implements UserRepositoryInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findById(userId: string): Promise<User | null> {
    throw new Error('Method not implemented.')
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
