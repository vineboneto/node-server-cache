import 'dotenv/config'
import express, { json, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import faker from 'faker'

import mail from './mailer'
import { getRedis, setRedis } from './redis-config'

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
        username: faker.name.findName(),
        password: faker.internet.password(),
      },
    })
    mail.sendMail({
      to: email,
      subject: 'Testing Email',
      from: 'Queue Teste',
      html: '<p>Hello World</p>',
    })
    return data ? response.status(200).json(data) : response.status(204)
  } catch (err: any) {
    return response.status(500).json({ error: err.message })
  }
})

app.listen(port, () => console.log(`Server started http://localhost:${port} `))
