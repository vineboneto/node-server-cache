import 'dotenv/config'
import express, { json, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import faker from 'faker'
import { getRedis, setRedis } from './redis-config'
import { MailQueue } from './mail-queue'
import { SendMail } from './jobs'

const client = new PrismaClient()
const app = express()

app.use(json())

const port = process.env.PORT || 3000

app.get('/users', async (request: Request, response: Response) => {
  try {
    const userRedis = await getRedis('user-all')
    console.time()
    const userParser = JSON.parse(userRedis)

    if (userParser) {
      console.timeEnd()
      return response.status(200).json(userParser)
    }

    const data = await client.user.findMany()
    console.timeEnd()
    await setRedis('user-all', JSON.stringify(data))
    return data?.length ? response.status(200).json(data) : response.status(204)
  } catch (err: any) {
    return response.status(500).json({ error: err.message })
  }
})

app.post('/users', async (request: Request, response: Response) => {
  try {
    const email = faker.internet.email()
    const data = await client.user.create({
      data: {
        email,
        password: faker.internet.password(),
        username: faker.name.findName(),
      },
    })
    await MailQueue.add({ email })
    return data ? response.status(200).json(data) : response.status(204)
  } catch (err: any) {
    return response.status(500).json({ error: err.message })
  }
})

app.listen(port, () => console.log(`Server started http://localhost:${port} `))
