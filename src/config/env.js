import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

export const { 
  PORT, 
  NODE_ENV, 
  MONGO_URL, 
  JWT_SECRET, JWT_EXPIRY_IN,
  ARCJET_KEY, ARCJET_ENV
} = process.env