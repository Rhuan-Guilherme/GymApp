import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface'
import { Gym } from '@prisma/client'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}
interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymRepository: GymsRepositoryInterface) {}
  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
