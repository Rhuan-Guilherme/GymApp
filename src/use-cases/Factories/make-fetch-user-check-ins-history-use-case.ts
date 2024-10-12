import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { FecthUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFecthUserCheckInsHistoryUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const fecthUserCheckInsHistoryUseCase = new FecthUserCheckInsHistoryUseCase(
    checkInRepository,
  )

  return fecthUserCheckInsHistoryUseCase
}
