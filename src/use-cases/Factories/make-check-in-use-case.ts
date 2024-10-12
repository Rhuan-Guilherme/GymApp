import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

export function makeCheckInUseCase() {
  const gymRepository = new PrismaGymRepository()
  const checkInRepository = new PrismaCheckInRepository()
  const chekcInUsecase = new CheckInUseCase(checkInRepository, gymRepository)

  return chekcInUsecase
}
