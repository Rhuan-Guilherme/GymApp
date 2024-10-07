import { describe, test, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { CredentialsInvalidError } from './errors/credentials-invalid-error'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Testing authenticate', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  test('Should be able authenticatre', async () => {
    await userRepository.create({
      email: 'jhondoe@example.com',
      name: 'Jonh Doe',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('Should not be authenticate with wrong email', () => {
    expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(CredentialsInvalidError)
  })

  test('Should not be authenticate with wrong password', async () => {
    await userRepository.create({
      email: 'jhondoe@example.com',
      name: 'Jonh Doe',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(CredentialsInvalidError)
  })
})
