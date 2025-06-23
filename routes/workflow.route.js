import { Router } from "express";
import { sendReminders } from "../controllers/workflow.constoller.js";

const workflowRouter = Router();
workflowRouter.post('/subscription/reminder',sendReminders)
