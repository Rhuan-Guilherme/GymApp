import { describe, test, expect } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { CredentialsInvalidError } from './errors/credentials-invalid-error'

describe('Testing authenticate', () => {
  test('Should be able authenticatre', async () => {
    const userRepository = new InMemoryUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)

    await userRepository.create({
      email: 'jhondoe@example.com',
      name: 'Jonh Doe',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('Should not be authenticate with wrong email', () => {
    const userRepository = new InMemoryUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)

    expect(() =>
      authenticateUseCase.execute({
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(CredentialsInvalidError)
  })

  test('Should not be authenticate with wrong password', async () => {
    const userRepository = new InMemoryUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)

    await userRepository.create({
      email: 'jhondoe@example.com',
      name: 'Jonh Doe',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      authenticateUseCase.execute({
        email: 'jhondoe@example.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(CredentialsInvalidError)
  })
})
