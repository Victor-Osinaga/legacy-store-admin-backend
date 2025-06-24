import planDao from "../../dao/plan/index.dao.js";
import { PlanRepository } from "./Plan.repository.js";
import { PlanService } from "./Plan.service.js";

const repository = new PlanRepository(planDao);
const planService = new PlanService(repository);

export default planService;
