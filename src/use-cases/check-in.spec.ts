import { describe, test, expect, beforeEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { afterEach } from 'node:test'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let sup: CheckInUseCase

describe('Testing Check In', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepository()
    sup = new CheckInUseCase(checkInRepository, gymRepository)

    gymRepository.items.push({
      id: 'gym-id-01',
      description: 'JavaScript Gym',
      phone: '00000',
      title: 'Gym created',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('Should be able creating a check-in', async () => {
    const { checkIn } = await sup.execute({
      userId: '1',
      gymId: 'gym-id-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('Should not be albe to check-in twice in the same day ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sup.execute({
      userId: '1',
      gymId: 'gym-id-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sup.execute({
        userId: '1',
        gymId: 'gym-id-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  test('Should be albe to check-in twice in different day ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sup.execute({
      userId: '1',
      gymId: 'gym-id-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sup.execute({
      userId: '1',
      gymId: 'gym-id-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
