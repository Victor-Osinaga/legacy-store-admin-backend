import { v4 as uuidv4 } from 'uuid'
import bcryptjs from 'bcryptjs'
import { genAuthToken } from '../../utils/jwt/getAuthToken.js'
import { Client } from '../../model/client/model/Client.model.js'
import jwt from 'jsonwebtoken'
import config from '../../../config.js'
import verifyToken from '../../middlewares/verifyToken.js'
import verifyTokenAuth from '../../utils/jwt/verifyTokenAuth.js'

class ClientService {
    constructor(repository) {
        this.clientRepository = repository
    }

    async getClients() {
        try {
            const clients = await this.clientRepository.repoGetClients();
            return clients;
        } catch (error) {
            console.log("desde client service", error);
            throw error
        }
    }

    async createClient(body) {
        try {
            const newClientDto = new Client({
                id: uuidv4(),
                ...body
            })

            const clientByEmail = await this.clientRepository.repoGetClientByEmail(newClientDto.getEmail())
            if (clientByEmail != null) throw { msg: "Email ya registrado", status: 400 }

            const clientByProyectName = await this.clientRepository.repoGetClientByProyectName(newClientDto.getProyectName())
            if (clientByProyectName != null) throw { msg: "Nombre del proyecto ya registrado", status: 400 }

            newClientDto.setPassword(await bcryptjs.hash(newClientDto.getPassword(), 8))

            const registeredClient = await this.clientRepository.repoCreateClient(newClientDto.convertToDTO())

            const { subdomain, proyectName, ...otherData } = registeredClient;
            return {subdomain, proyectName}
        } catch (error) {
            console.log("desde client service", error);
            throw error
        }
    }

    async loginClient(body) {
        try {
            if (!body?.email) throw { msg: "EMAIL es requerida", status: 400 }
            if (!body?.password) throw { msg: "PASSWORD es requerida", status: 400 }

            const clientByEmail = await this.clientRepository.repoGetClientByEmail(body.email)
            if (!clientByEmail) throw { msg: "No existe un cliente con ese Email", status: 400 }

            if (await bcryptjs.compare(body.password, clientByEmail.password)) {
                const { password, ...clientDataWithoutPassword } = clientByEmail;
                return clientDataWithoutPassword;
            } else {
                console.log("contraseña incorrecta")
                throw { msg: "Contraseña incorrecta", status: 400 }
            }
        } catch (error) {
            console.log("desde loginClient service", error);
            throw error
        }
    }

    async getClientById(clientId) {
        try {
            const clientById = await this.clientRepository.repoGetClientById(clientId)
            if (!clientById) {
                throw { msg: "No existe un cliente con ese Id", status: 400 }
            }
            return clientById
        } catch (error) {
            console.log("desde getClientById service", error);
            throw error
        }
    }

    async getClientBySubdomain(subdomain) {
        try {
            console.log("subdomain", subdomain);
            const clientBySubdomain = await this.clientRepository.repoGetClientBySubdomain(subdomain)
            if (!clientBySubdomain) {
                throw { msg: "No existe un cliente con ese subdominio", status: 400 }
            }
            return {
                proyectName: clientBySubdomain.proyectName,
                name: clientBySubdomain.name,
                lastname: clientBySubdomain.lastname
            }
        } catch (error) {
            console.log("desde getClientBySubdomain service", error);
            throw error
        }
    }

    // async verifyToken(req) {
    //     const { access_token } = req.cookies
    //     console.log("access_token", access_token);

    //     if (!access_token) {
    //         throw { msg: "No hay token", status: 401}
    //         // console.log("No hay token desde verify token controller");
    //     }
    //     try {
    //         const tokenVerify = await verifyTokenAuth(access_token)
    //         console.log("tokenVerify", tokenVerify);
    //         const userFound = await this.getClientById(tokenVerify)
    //         console.log("userFound", userFound);
    //         return userFound
    //     } catch (error) {
    //         console.log("desde verifyToken service", error);
    //         throw error
    //     }
    // }
}

export {
    ClientService
}