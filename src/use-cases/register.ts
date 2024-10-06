import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaUserRepository } from '../repositories/prisma-user-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  email,
  name,
  password,
}: RegisterUseCaseRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exisits')
  }

  const password_hash = await hash(password, 6)

  const prismaUserRepository = new PrismaUserRepository()
  await prismaUserRepository.create({ email, name, password_hash })
}
