import Subscription from '../models/subscription.model.js'
import { StatusCodes } from 'http-status-codes'
export const createSubscription = async (req, res, next) =>{
  try {

    const exists = await Subscription.findOne({
      user: req.user._id
    })


    if(exists) {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: "Subscription with that user already exists"
      })
    }

    const subscription = Subscription.create({
      ...req.body,
      user: req.user._id
    })

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully subscription created",
      data: subscription
    })
  } catch (error) {
    next(error);
  }
}

export const getUsersSubscriptions = async (req, res, next) => {
  try {
    if(req.user.id !== req.params.id) {
      const error = new Error("You are not owner of this account");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({
      user: req.params.id
    });

    res.status(200).json({
      success: true,
      message: 'Get all user subscriptions',
      data: subscriptions
    })

  } catch (error) {
    next(error);
  }
}