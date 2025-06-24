import config from "../../../config.js";
import { planSchema } from "../../model/plan/squema/Plan.squema.js";

let planDao;

switch (config.env) {
  case "dev":
    console.log("modo dev");
    const { default: PlanDevDAO } = await import("./PlanDev.dao.js");
    planDao = new PlanDevDAO("plans", planSchema, config.dev_url_database);
    break;

  default:
    console.log("modo prod");
    const { default: PlanProdDAO } = await import("./PlanProd.dao.js");
    planDao = new PlanProdDAO("plans", planSchema, config.prod_url_database);
    break;
}

export default planDao;
