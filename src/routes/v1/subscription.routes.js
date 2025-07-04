import { Router } from "express";
import { createSubscription, getUsersSubscriptions } from "../../controllers/subscription.controller.js";
import authorize from '../../middlewares/auth.middleware.js'

const subscriptionRoutes = Router()

subscriptionRoutes.post("/", authorize, createSubscription)

subscriptionRoutes.get("/user/:id", authorize, getUsersSubscriptions)

export default subscriptionRoutes