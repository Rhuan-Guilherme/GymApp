import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { describe, test, expect, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let searchGymsRepository: InMemoryGymRepository
let sup: SearchGymsUseCase

describe('Testing search gyms', () => {
  beforeEach(() => {
    searchGymsRepository = new InMemoryGymRepository()
    sup = new SearchGymsUseCase(searchGymsRepository)
  })

  test('Shoult be able to search gyms for title', async () => {
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

    const { gyms } = await sup.execute({ query: 'JavaScript Gym', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  test('Should be able to search gyms for title with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await searchGymsRepository.create({
        title: `TypeScrpit Gym ${i}`,
        description: null,
        phone: null,
        latitude: -15.6292954,
        longitude: -47.659926,
      })
    }

    const { gyms } = await sup.execute({ query: 'TypeScrpit Gym', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScrpit Gym 21' }),
      expect.objectContaining({ title: 'TypeScrpit Gym 22' }),
    ])
  })
})
