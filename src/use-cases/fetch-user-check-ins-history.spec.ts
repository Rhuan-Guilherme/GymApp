import { describe, test, expect, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { FecthUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInRepository
let sup: FecthUserCheckInsHistoryUseCase

describe('Testing fetch check-in histor ', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sup = new FecthUserCheckInsHistoryUseCase(checkInRepository)
  })

  test('Should be able to fetch check-in history', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-1',
    })
    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-1',
    })

    const { checkIns } = await sup.execute({
      userId: 'user-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01', user_id: 'user-1' }),
      expect.objectContaining({ gym_id: 'gym-02', user_id: 'user-1' }),
    ])
  })
  test('Should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-0${i}`,
        user_id: 'user-1',
      })
    }

    const { checkIns } = await sup.execute({
      userId: 'user-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-021' }),
      expect.objectContaining({ gym_id: 'gym-022' }),
    ])
  })
})
