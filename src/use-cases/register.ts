import { hash } from 'bcryptjs'
import { UserRepositoryInterface } from '@/repositories/user-repository-interface'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

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
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    await this.userRepository.create({ email, name, password_hash })
  }
}
