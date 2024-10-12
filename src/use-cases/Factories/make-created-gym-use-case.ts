import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymRepository = new PrismaGymRepository()
  const createGymUseCase = new CreateGymUseCase(gymRepository)

  return createGymUseCase
}
