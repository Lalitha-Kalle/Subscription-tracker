import express from 'express'

import { PORT } from './config/env.js'
import connectDB from './db/database.js'
import authRouter from './routes/v1/auth.routes.js'
import userRouter from './routes/v1/user.routes.js'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'
import errorMiddleware from './middlewares/error.middleware.js'
import subscriptionRouter from './routes/v1/subscription.routes.js'
import workflowRouter from './routes/v1/workflow.routes.js'
import { notFoundMiddleware } from './middlewares/notFound.middleware.js'

const app = express()


app.use(express.json())
app.use(arcjetMiddleware)



app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/workflows", workflowRouter)

app.use(notFoundMiddleware)

app.use(errorMiddleware)

app.get("/", (req, res) => {
  res.send("Welcome to subscription tracker")
})

connectDB()

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`)
})