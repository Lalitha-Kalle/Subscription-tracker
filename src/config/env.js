import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

export const { 
  PORT, 
  SERVER_URL,
  NODE_ENV, 
  MONGO_URL, 
  JWT_SECRET, JWT_EXPIRY_IN,
  ARCJET_KEY, ARCJET_ENV,
  QSTASH_TOKEN, QSTASH_URL
} = process.env