import { describe, test, expect, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInRepository
let sup: GetUserMetricsUseCase

describe('Get User Metrics use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sup = new GetUserMetricsUseCase(checkInRepository)
  })

  test('Should be able to get check-ins count from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-1',
    })
    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-1',
    })

    const { checkInsCount } = await sup.execute({
      userId: 'user-1',
    })

    expect(checkInsCount).toEqual(2)
  })
})
