import express from 'express'

import { PORT } from './config/env.js'
import connectDB from './db/database.js'
import authRouter from './routes/v1/auth.routes.js'
const app = express()


app.use(express.json())

app.use("/api/v1/auth", authRouter)

app.get("/", (req, res) => {
  res.send("Welcome to subscription tracker")
})

connectDB()

app.listen(3000, () => {
  console.log(`Server running at port: ${PORT}`)
})