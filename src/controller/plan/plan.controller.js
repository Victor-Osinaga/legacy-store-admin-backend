import planService from "../../service/plan/plan.factory.js";

const createPlan = async (req, res) => {
  try {
    const createdPlan = await planService.createPlan(req.body);
    res.status(200).json({ status: "ok", data: createdPlan });
  } catch (error) {
    console.log("error desde controller: createPlan", error);

    res
      .status(error?.status || 700)
      .json({ status: "failed", data: error.msg });
  }
};

export { createPlan };
