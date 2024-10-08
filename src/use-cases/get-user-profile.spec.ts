import { describe, test, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let userRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

describe('Testing Get User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  test('Should be able get profile', async () => {
    const user = await userRepository.create({
      email: 'jhondoe@example.com',
      name: 'Jonh Doe',
      password_hash: await hash('123456', 6),
    })

    expect(user.name).toEqual('Jonh Doe')
  })

  test('Should not be get profile with user id invalid', () => {
    expect(() =>
      sut.execute({
        userId: 'not-is-userId',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
