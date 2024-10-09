import { checkInRepositoryInterface } from '@/repositories/check-in-repository-interface'
import { CheckIns } from '@prisma/client'

interface CheckInsUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInsUseCaseResponse {
  checkIn: CheckIns
}

export class CheckInUseCase {
  constructor(private checkInRepository: checkInRepositoryInterface) {}

  async execute({
    userId,
    gymId,
  }: CheckInsUseCaseRequest): Promise<CheckInsUseCaseResponse> {
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
