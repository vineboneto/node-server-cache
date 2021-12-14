import Redis from 'ioredis'
import { promisify } from 'util'

const redisClient = new Redis()

export async function getRedis(value: string): Promise<string> {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)
  return syncRedisGet(value)
}

export async function setRedis(key: string, value: string): Promise<void> {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient)
  return syncRedisSet(key, value)
}
