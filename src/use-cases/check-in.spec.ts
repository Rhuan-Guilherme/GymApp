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

    gymRepository.create({
      id: 'gym-id-01',
      description: 'JavaScript Gym',
      phone: '00000',
      title: 'Gym created',
      latitude: new Decimal(-15.6292954),
      longitude: new Decimal(-47.659926),
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
      userLatitude: -15.6292954,
      userLongitude: -47.659926,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('Should not be albe to check-in twice in the same day ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sup.execute({
      userId: '1',
      gymId: 'gym-id-01',
      userLatitude: -15.6292954,
      userLongitude: -47.659926,
    })

    await expect(() =>
      sup.execute({
        userId: '1',
        gymId: 'gym-id-01',
        userLatitude: -15.6292954,
        userLongitude: -47.659926,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  test('Should be albe to check-in twice in different day ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sup.execute({
      userId: '1',
      gymId: 'gym-id-01',
      userLatitude: -15.6292954,
      userLongitude: -47.659926,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sup.execute({
      userId: '1',
      gymId: 'gym-id-01',
      userLatitude: -15.6292954,
      userLongitude: -47.659926,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('Should not be albe to check-in in on distant', async () => {
    gymRepository.create({
      id: 'gym-id-02',
      description: 'JavaScript Gym',
      phone: '00000',
      title: 'Gym created',
      latitude: new Decimal(15.6188323),
      longitude: new Decimal(-47.7116778),
    })

    await expect(() =>
      sup.execute({
        userId: '1',
        gymId: 'gym-id-02',
        userLatitude: -15.6292954,
        userLongitude: -47.659926,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})

// -15.6292954,-47.659926 eu
// -15.6188323,-47.7116778 academia
