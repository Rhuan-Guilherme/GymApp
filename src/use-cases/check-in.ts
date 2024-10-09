import { checkInRepositoryInterface } from '@/repositories/check-in-repository-interface'
import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface'
import { CheckIns } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInsUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInsUseCaseResponse {
  checkIn: CheckIns
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: checkInRepositoryInterface,
    private gymRepository: GymsRepositoryInterface,
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInsUseCaseRequest): Promise<CheckInsUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // Calculate distace between user and gym

    const checkInOnSomeDay = await this.checkInRepository.fyndByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSomeDay) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
