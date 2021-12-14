import Queue from 'bull'
import { SendMail } from './jobs'

const redisConfig: any = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
}

export const MailQueue = new Queue(SendMail.key, { redis: redisConfig })

MailQueue.on('failed', (job, err) => {
  console.log(err)
  console.log('Job failed', job.data, job.name)
})
