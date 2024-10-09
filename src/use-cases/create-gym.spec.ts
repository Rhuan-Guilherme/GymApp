import { describe, test, expect, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Testing gym use case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  test('Should be able authenticatre', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript gym',
      description: null,
      phone: null,
      latitude: -15.6292954,
      longitude: -47.659926,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
