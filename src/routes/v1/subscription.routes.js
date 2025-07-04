import { Router } from "express";
import { createSubscription, getUsersSubscriptions } from "../../controllers/subscription.controller.js";
import authorize from '../../middlewares/auth.middleware.js'

const subscriptionRouter = Router()

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.get("/user/:id", authorize, getUsersSubscriptions)

export default subscriptionRouter