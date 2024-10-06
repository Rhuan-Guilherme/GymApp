import { hash } from 'bcryptjs'
import { UserRepositoryInterface } from '@/repositories/user-repository-interface'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async exceute({ email, name, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exisits')
    }

    const password_hash = await hash(password, 6)

    await this.userRepository.create({ email, name, password_hash })
  }
}
