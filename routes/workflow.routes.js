import { Router } from "express";
import { sendReminder } from "../controllers/workFlow.controller.js";

const workflowRouter = Router();

workflowRouter.post('/subscripiton/reminder',sendReminder);

export default workflowRouter;

