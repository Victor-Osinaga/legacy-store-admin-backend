import mongoose, { mongo } from "mongoose";
mongoose.set("strictQuery", false);

export default class PlanMongo {
  constructor(collection, schema, url) {
    mongoose.connect(url);
    this.collection = mongoose.model(collection, schema);
  }

  async createPlan(planDto) {
    try {
      const newPlan = new this.collection(planDto);
      const savedPlan = await newPlan.save();

      if (!savedPlan) {
        throw { msg: "Error en BD al crear el plan", status: 500 };
      }

      return await this.collection
        .findOne({ id: savedPlan.id }, { _id: 0, __v: 0 })
        .lean();
    } catch (error) {
      console.log("error al crear plan : createPlan : PlanMongo", error);

      throw error;
    }
  }
}
