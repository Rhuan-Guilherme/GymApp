import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeUserGetMetricsUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository)

  return getUserMetricsUseCase
}
