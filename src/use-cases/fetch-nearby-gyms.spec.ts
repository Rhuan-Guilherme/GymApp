import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { describe, test, expect, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let searchGymsRepository: InMemoryGymRepository
let sup: FetchNearbyGymsUseCase

describe('Testing fetch nearby gyms', () => {
  beforeEach(() => {
    searchGymsRepository = new InMemoryGymRepository()
    sup = new FetchNearbyGymsUseCase(searchGymsRepository)
  })

  test('Shoult be able fetch nearby gyms', async () => {
    await searchGymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -15.6292954,
      longitude: -47.659926,
    })
    await searchGymsRepository.create({
      title: 'TypeScrpit Gym',
      description: null,
      phone: null,
      latitude: -15.6292954,
      longitude: -47.659926,
    })

    const { gyms } = await sup.execute({
      userLatitude: -15.6292954,
      userLongitude: -47.659926,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
      expect.objectContaining({ title: 'TypeScrpit Gym' }),
    ])
  })

  test('Shoult be able fetch nearby gyms and not fecth for away gyms', async () => {
    await searchGymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -15.6292954,
      longitude: -47.659926,
    })
    await searchGymsRepository.create({
      title: 'TypeScrpit Gym',
      description: null,
      phone: null,
      latitude: -15.8735288,
      longitude: -47.5011876,
    })

    const { gyms } = await sup.execute({
      userLatitude: -15.6292954,
      userLongitude: -47.659926,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })
})
