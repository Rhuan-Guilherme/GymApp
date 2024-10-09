import { CheckIns, Prisma } from '@prisma/client'

export interface checkInRepositoryInterface {
  create(data: Prisma.CheckInsUncheckedCreateInput): Promise<CheckIns>
  fyndByUserIdOnDate(userId: string, date: Date): Promise<CheckIns | null>
}
