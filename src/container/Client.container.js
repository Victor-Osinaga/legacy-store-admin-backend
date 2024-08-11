import mongoose from "mongoose";
mongoose.set('strictQuery', false);

export default class ClientMongo {
    constructor(collection, schema, url) {
        mongoose.connect(url, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
        });
        this.collection = mongoose.model(collection, schema)
    }

    async getClients() {
        try {
            return await this.collection.find({}, { _id: 0, __v: 0, password: 0 }).lean();
        } catch (error) {
            console.log("desde getClients : container");
            throw error
        }
    }

    async createClient(clientDto) {
        try {
            const newClient = new this.collection(clientDto);
            const savedClient = await newClient.save()

            if(!savedClient) {
                throw {msg: "Error en BD al crear el cliente", status: 500}
            }

            return await this.collection.findOne({id: savedClient.id}, { _id: 0, __v: 0, password: 0 }).lean();
        } catch (error) {
            throw error
        }
    }

    async getClientByEmail(email){
        try {
            const client = await this.collection.findOne({ email: email}, { _id: 0, __v: 0 }).lean();
            return client
        } catch (error) {
            throw error
        }
    }

    async getClientByProyectName(proyectName){
        try {
            const client = await this.collection.findOne({ proyectName: proyectName}, { _id: 0, __v: 0 }).lean();
            return client
        } catch (error) {
            throw error
        }
    }

    async getClientById(clientId) {
        try {
            const client = await this.collection.findOne({ id: clientId}, { _id: 0, __v: 0, password: 0 }).lean();
            return client
        } catch (error) {
            throw error
        }
    }

    async getClientBySubdomain(subdomain) {
        try {
            const client = await this.collection.findOne({ subdomain: subdomain}, { _id: 0, __v: 0, password: 0 }).lean();
            // console.log("client desde getClientBySubdomain : container", client);
            return client
        } catch (error) {
            throw error
        }
    }
}