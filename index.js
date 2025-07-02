import express from 'express'

import {PORT} from './config/env.js'
const app = express()

app.get("/", (req, res) => {
  res.send("Welcome to subscription tracker")
})

app.listen(3000, () => {
  console.log(`Server running at port: ${PORT}`)
})