import { describe, test, expect, beforeEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'

let checkInRepository: InMemoryCheckInRepository
let sup: CheckInUseCase

describe('Testing Check In', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sup = new CheckInUseCase(checkInRepository)
  })

  test('Should be able creating a check-in', async () => {
    const { checkIn } = await sup.execute({ userId: '1', gymId: '2' })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
