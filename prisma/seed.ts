import { PrismaClient, User } from '@prisma/client'
import faker from 'faker'

const client = new PrismaClient()

type UserRandom = Omit<User, 'id' | 'created_at'>

const generateRandomUsers = (): UserRandom[] => {
  const data: UserRandom[] = []
  for (let i = 0; i < 10000; i++) {
    data.push({ email: faker.internet.email(), password: faker.internet.password(), username: faker.name.findName() })
  }
  return data
}

client.user
  .createMany({
    data: generateRandomUsers(),
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
