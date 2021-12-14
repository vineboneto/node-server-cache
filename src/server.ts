import express, { json, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Redis from 'ioredis'

const redisClient = new Redis()

const client = new PrismaClient()
const app = express()

app.use(json())

const port = process.env.PORT || 3000

app.get('/users', async (request: Request, response: Response) => {
  try {
    const data = await client.user.findMany()
    return data?.length ? response.status(200).json(data) : response.status(204)
  } catch (err: any) {
    return response.status(500).json({ error: err.message })
  }
})

app.listen(port, () => console.log(`Server started http://localhost:${port} `))
