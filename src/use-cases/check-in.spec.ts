import { describe, test, expect, beforeEach, vi, afterAll } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { afterEach } from 'node:test'

let checkInRepository: InMemoryCheckInRepository
let sup: CheckInUseCase

describe('Testing Check In', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sup = new CheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('Should be able creating a check-in', async () => {
    const { checkIn } = await sup.execute({ userId: '1', gymId: '2' })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('Should not be albe to check-in twice in the same day ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sup.execute({ userId: '1', gymId: '2' })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    await expect(() =>
      sup.execute({ userId: '1', gymId: '2' }),
    ).rejects.toBeInstanceOf(Error)
  })

  test('Should be albe to check-in twice in different day ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sup.execute({ userId: '1', gymId: '2' })

    const { checkIn } = await sup.execute({ userId: '1', gymId: '2' })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
