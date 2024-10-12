import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbtGymsUseCase() {
  const gymRepository = new PrismaGymRepository()
  const fetchNearbtGymsUseCase = new FetchNearbyGymsUseCase(gymRepository)

  return fetchNearbtGymsUseCase
}
