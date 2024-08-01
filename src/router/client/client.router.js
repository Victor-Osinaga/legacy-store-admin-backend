import { Router } from "express";
import * as clientController from '../../controller/client/client.controller.js'
import verifyToken from "../../middlewares/verifyToken.js";

const v1ClientRouter = new Router()

v1ClientRouter.post('/auth/register', clientController.createClient)
v1ClientRouter.get('/', clientController.getClients)
v1ClientRouter.post('/auth/login', clientController.loginClient)
v1ClientRouter.post('/auth/logout', clientController.logoutClient)
v1ClientRouter.get('/auth/profile', verifyToken, clientController.getClientById)
v1ClientRouter.post('/auth/verify-subdomain', clientController.verifySubdomain)
v1ClientRouter.get('/auth/verify-token', verifyToken, clientController.getClientById)

export {
    v1ClientRouter
}