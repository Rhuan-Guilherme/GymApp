import { Gym, Prisma } from '@prisma/client'
import {
  FindManyNearbyRequest,
  GymsRepositoryInterface,
} from '../gyms-repository-interface'
import { prisma } from '@/lib/prisma'

export class PrismaGymRepository implements GymsRepositoryInterface {
  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyRequest) {
    const gyms = prisma.$queryRaw<Gym[]>`
      SELECT * FROM gym
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = prisma.gym.create({
      data,
    })

    return gym
  }
}
