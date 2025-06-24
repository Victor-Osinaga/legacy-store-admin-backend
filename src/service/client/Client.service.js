import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import { Client } from "../../model/client/model/Client.model.js";
import { storeConfigurationFactory } from "../storeConfiguration/storeConfiguration.factory.js";

class ClientService {
  constructor(repository) {
    this.clientRepository = repository;
  }

  async getClients() {
    try {
      const clients = await this.clientRepository.repoGetClients();
      return clients;
    } catch (error) {
      console.log("desde client service", error);
      throw error;
    }
  }

  async createClient(body) {
    try {
      const newClientDto = new Client({
        id: uuidv4(),
        ...body,
      });

      const clientByEmail = await this.clientRepository.repoGetClientByEmail(
        newClientDto.getEmail()
      );
      if (clientByEmail != null)
        throw { msg: "Email ya registrado", status: 400 };

      const clientByProyectName =
        await this.clientRepository.repoGetClientByProyectName(
          newClientDto.getProyectName()
        );
      if (clientByProyectName != null)
        throw { msg: "Nombre del proyecto ya registrado", status: 400 };

      const clientBySubdomain =
        await this.clientRepository.repoGetClientBySubdomain(
          newClientDto.getSubdomain()
        );
      if (clientBySubdomain != null)
        throw { msg: "Subdominio ya registrado", status: 400 };

      newClientDto.setPassword(
        await bcryptjs.hash(newClientDto.getPassword(), 8)
      );

      const registeredClient = await this.clientRepository.repoCreateClient(
        newClientDto.convertToDTO()
      );

      console.log("registeredClient", registeredClient);

      if (registeredClient) {
        const storeConfigurationService = await storeConfigurationFactory(
          registeredClient.proyectName
        );

        const createdStoreConfig =
          await storeConfigurationService.createDefaultStoreConfig();
        console.log(
          "createClientAdmin : createdStoreConfig: ",
          createdStoreConfig
        );
        if (createdStoreConfig) {
          const { subdomain, proyectName } = registeredClient;
          return { subdomain, proyectName };
        }
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const errorMessage = Object.values(error.errors)
          .map((err) => err.message)
          .join(", "); // Separar los mensajes por comas o cualquier delimitador que prefieras
        const errorFields = Object.keys(error.errors).join(", ");
        throw {
          msg: `Validation CLIENTADMIN failed: ${errorFields}`,
          status: 400,
        };
      }

      throw error;
    }
  }

  async loginClient(body) {
    try {
      if (!body?.email) throw { msg: "EMAIL es requerida", status: 400 };
      if (!body?.password) throw { msg: "PASSWORD es requerida", status: 400 };

      const clientByEmail = await this.clientRepository.repoGetClientByEmail(
        body.email
      );
      if (!clientByEmail)
        throw { msg: "No existe un cliente con ese Email", status: 400 };

      if (await bcryptjs.compare(body.password, clientByEmail.password)) {
        const { password, ...clientDataWithoutPassword } = clientByEmail;
        return clientDataWithoutPassword;
      } else {
        console.log("contraseña incorrecta");
        throw { msg: "Contraseña incorrecta", status: 400 };
      }
    } catch (error) {
      console.log("desde loginClient service", error);
      throw error;
    }
  }

  async getClientById(clientId) {
    try {
      const clientById = await this.clientRepository.repoGetClientById(
        clientId
      );
      if (!clientById) {
        throw { msg: "No existe un cliente con ese Id", status: 400 };
      }
      // console.log("CLIENT BY IDDDDDDDDDDDDDDDDD", clientById);

      return {
        proyectName: clientById.proyectName,
        name: clientById.name,
        lastname: clientById.lastname,
        subdomain: clientById.subdomain,
        email: clientById.email,
      };
    } catch (error) {
      console.log("desde getClientById service", error);
      throw error;
    }
  }

  async getClientBySubdomain(subdomain) {
    try {
      console.log("subdomain desde getClientBySubdomain", subdomain);
      const clientBySubdomain =
        await this.clientRepository.repoGetClientBySubdomain(subdomain);
      if (!clientBySubdomain) {
        throw { msg: "No existe un cliente con ese subdominio", status: 400 };
      }
      return {
        proyectName: clientBySubdomain.proyectName,
        name: clientBySubdomain.name,
        lastname: clientBySubdomain.lastname,
        subdomain: clientBySubdomain.subdomain,
        email: clientBySubdomain.email,
      };
    } catch (error) {
      console.log("desde getClientBySubdomain service", error);
      throw error;
    }
  }
}

export { ClientService };
