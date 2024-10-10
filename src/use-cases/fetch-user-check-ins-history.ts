import { checkInRepositoryInterface } from '@/repositories/check-in-repository-interface'
import { CheckIns } from '@prisma/client'

interface FecthUserCheckInsHistoryRequest {
  userId: string
  page: number
}

interface FecthUserCheckInsHistoryResponse {
  checkIns: CheckIns[]
}

export class FecthUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: checkInRepositoryInterface) {}

  async execute({
    userId,
    page,
  }: FecthUserCheckInsHistoryRequest): Promise<FecthUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInRepository.fyndManyUserId(userId, page)

    return { checkIns }
  }
}
