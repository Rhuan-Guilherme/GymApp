import { UserRepositoryInterface } from '@/repositories/user-repository-interface'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileRequest {
  userId: string
}
interface GetUserProfileResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
