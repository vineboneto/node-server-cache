import 'dotenv/config'

import { MailQueue } from './mail-queue'
import { SendMail } from './jobs'

MailQueue.process(SendMail.handler)
