import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyRequest {
  latitude: number
  longitude: number
}

export interface GymsRepositoryInterface {
  findById(gymId: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearbyRequest): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
