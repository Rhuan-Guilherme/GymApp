import { Gym } from '@prisma/client'

export interface GymsRepositoryInterface {
  findById(gymId: string): Promise<Gym | null>
}
