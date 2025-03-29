import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({
      status: "success",
      data: {
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // check if the user is the same as the user in the token
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not a owner of this account");
      error.statusCode = 401;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({
      status: "success",
      data: {
        subscriptions,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    // check if the user is the same as the user in the token
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not a owner of this account");
      error.statusCode = 401;
      throw error;
    }
    // find the subscription by id and update it
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      status: "success",
      data: {
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
