import { CheckIns, Prisma } from '@prisma/client'

export interface checkInRepositoryInterface {
  create(data: Prisma.CheckInsUncheckedCreateInput): Promise<CheckIns>
}
