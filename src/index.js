import express from 'express'

import {PORT} from './config/env.js'
import connectDB from './db/database.js'
const app = express()

app.get("/", (req, res) => {
  res.send("Welcome to subscription tracker")
})

connectDB()

app.listen(3000, () => {
  console.log(`Server running at port: ${PORT}`)
})