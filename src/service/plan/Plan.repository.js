class PlanRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createPlan(planDto) {
    try {
      const newPlan = await this.dao.createPlan(planDto);
      return newPlan;
    } catch (error) {
      throw error;
    }
  }
}

export { PlanRepository };
