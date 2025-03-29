import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";


const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send("Get all subscriptions");
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send("Get subscription details");
});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send("UPDATE subscription");
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send("DELETE subscription");
});

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send("CANCEL subscription");
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send("get upcoming renewals subscription");
});

export default subscriptionRouter;
