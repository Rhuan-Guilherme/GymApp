import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { test, expect, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let userRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Users Test', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(userRepository)
  })

  test('Should be able to register', async () => {
    const { user } = await sut.exceute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('Should hash passowd upon registration', async () => {
    const { user } = await sut.exceute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  test('should not be able to register with same email twice', async () => {
    const email = 'jonhdoe@example.com'

    await sut.exceute({
      name: 'Jonh Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.exceute({
        name: 'Jonh Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
