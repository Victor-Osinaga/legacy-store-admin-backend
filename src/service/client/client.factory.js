import clientDao from "../../dao/client/index.dao.js";
import { ClientRepository } from "./Client.repository.js";
import { ClientService } from "./Client.service.js";

const repository = new ClientRepository(clientDao)
const clientService = new ClientService(repository)

export default clientService;