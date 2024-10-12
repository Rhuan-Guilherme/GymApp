import { CheckIns, Prisma } from '@prisma/client'

export interface checkInRepositoryInterface {
  create(data: Prisma.CheckInsUncheckedCreateInput): Promise<CheckIns>
  findById(id: string): Promise<CheckIns | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIns | null>
  findManyUserId(userId: string, page: number): Promise<CheckIns[]>
  countByUserId(userId: string): Promise<number>
  save(checkIn: CheckIns): Promise<CheckIns>
}
