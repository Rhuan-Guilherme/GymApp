import { UserRepositoryInterface } from '@/repositories/user-repository-interface'
import { CredentialsInvalidError } from './errors/credentials-invalid-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseReponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseReponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new CredentialsInvalidError()
    }

    const doesPasswordHashed = await compare(password, user.password_hash)

    if (!doesPasswordHashed) {
      throw new CredentialsInvalidError()
    }

    return {
      user,
    }
  }
}
