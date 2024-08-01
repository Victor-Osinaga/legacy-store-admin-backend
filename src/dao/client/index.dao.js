import config from "../../../config.js";
import { clientSquema } from "../../model/client/squema/client.schema.js";

let clientDao;

switch (config.env) {
    case 'prod':
        const { default: ClientProdDAO } = await import('./ClientProd.dao.js')
        clientDao = new ClientProdDAO('clients', clientSquema, config.prod_url)
        break;

    default:
        const { default: ClientDevDAO } = await import('./ClientDev.dao.js')
        clientDao = new ClientDevDAO('clients', clientSquema, config.dev_url)
        break;
}

export default clientDao;