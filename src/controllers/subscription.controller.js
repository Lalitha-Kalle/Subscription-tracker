import Subscription from '../models/subscription.model.js'

export const createSubscription = async (req, res, next) =>{
  try {
    const subscription = Subscription.create({
      ...req.body,
      user: req.user._id
    })

    res.status(201).json({
      success: true,
      message: "Successfully subscription created",
      data: subscription
    })
  } catch (error) {
    next(error);
  }
}