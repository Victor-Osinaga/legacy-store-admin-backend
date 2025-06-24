import { Router } from "express";
import * as planController from "../../controller/plan/plan.controller.js";

const v1PlanRouter = new Router();

v1PlanRouter.post("/", planController.createPlan);

export { v1PlanRouter };
