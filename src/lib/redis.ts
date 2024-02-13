import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://us1-renewing-marlin-39285.upstash.io',
  token: process.env.REDIS_KEY!,
})