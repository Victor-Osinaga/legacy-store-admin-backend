class ClientRepository{
    constructor(dao){
        this.dao = dao
    }

    async repoGetClients() {
        try {
            const clients = await this.dao.getClients();
            return clients;
        } catch (error) {
            throw error
        }
    }

    async repoCreateClient (clientDto) {
        try {
            const newClient = await this.dao.createClient(clientDto)
            return newClient
        } catch (error) {
            throw error
        }
    }

    async repoGetClientByEmail (email) {
        try {
            const client = await this.dao.getClientByEmail(email)
            return client
        } catch (error) {
            throw error
        }
    }

    async repoGetClientByProyectName (proyectName) {
        try {
            const client = await this.dao.getClientByProyectName(proyectName)
            return client
        } catch (error) {
            throw error
        }
    }
    
    async repoGetClientById (clientId) {
        try {
            const client = await this.dao.getClientById(clientId)
            return client
        } catch (error) {
            throw error
        }
    }

    async repoGetClientBySubdomain (subdomain) {
        try {
            const client = await this.dao.getClientBySubdomain(subdomain)
            return client
        } catch (error) {
            throw error
        }
    }
}

export {
    ClientRepository
}