import { Gym } from '@prisma/client'
import { GymsRepositoryInterface } from '../gyms-repository-interface'

export class InMemoryGymRepository implements GymsRepositoryInterface {
  items: Gym[] = []

  async findById(gymId: string) {
    const gym = this.items.find((gym) => gym.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }
}
