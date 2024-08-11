import config from "../../../config.js";
import { clientSquema } from "../../model/client/squema/client.schema.js";

let clientDao;

switch (config.env) {
    case 'dev':
        console.log("modo dev");
        
        const { default: ClientDevDAO } = await import('./ClientDev.dao.js')
        clientDao = new ClientDevDAO('clients', clientSquema, config.dev_url_database)
        break;

    default:
        console.log("modo prod");
        const { default: ClientProdDAO } = await import('./ClientProd.dao.js')
        clientDao = new ClientProdDAO('clients', clientSquema, config.prod_url_database)
        break;
}

export default clientDao;