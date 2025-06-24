import { v4 as uuidv4 } from "uuid";
import { Plan } from "../../model/plan/model/Plan.model.js";

class PlanService {
  constructor(repository) {
    this.planRepository = repository;
  }

  async createPlan(body) {
    try {
      const newPlanDto = new Plan({
        id: uuidv4(),
        ...body,
      });

      const createdPlan = await this.planRepository.createPlan(
        newPlanDto.convertToDto()
      );
      return createdPlan;
    } catch (error) {
      console.log("desde PlanService: createPlan", error);
      throw error;
    }
  }
}

export { PlanService };
