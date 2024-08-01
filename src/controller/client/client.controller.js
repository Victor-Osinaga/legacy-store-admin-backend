import clientService from "../../service/client/client.factory.js"
import { genAuthToken } from "../../utils/jwt/getAuthToken.js"

const createClient = async (req, res) => {
    try {
        const createdClient = await clientService.createClient(req.body)
        // const token = await genAuthToken(createdClient.id)
        // res.cookie('access_token', token, {
        //     secure: true,
        //     httpOnly: true,
        //     sameSite: 'none'
        // })
        res.status(200).json({ status: 'ok', data: createdClient })
    } catch (error) {
        res.status(error.status).json({ status: 'failed', data: error.msg })
    }
}

const getClients = async (req, res) => {
    try {
        const clients = await clientService.getClients()
        res.status(200).json({ status: 'ok', data: clients })
    } catch (error) {
        res.status(error.status).json({ status: 'failed', data: error.msg })
    }
}

const loginClient = async (req, res) => {
    try {
        const clientLoged = await clientService.loginClient(req.body)
        console.log("clientByEmail", clientLoged);
        const token = await genAuthToken(clientLoged.id)
        res.cookie('access_token', token, {
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        })
        res.status(200).json({ status: "ok", data: clientLoged })
    } catch (error) {
        console.log(error);
        res.status(401).json({ status: "failed", data: error.msg })
    }
}

const logoutClient = async (req, res) => {
    res.cookie("access_token", "", {
        expires: new Date(0),
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    })
    res.status(200).json({ status: "ok", data: "Logout successful" })
}

const getClientById = async (req, res) => {
    try {
        console.log("desde controller", req.clientId);
        const client = await clientService.getClientById(req.clientId)
        res.status(200).json({ status: "okkk", data: client })
    } catch (error) {
        res.status(error.status).json({ status: "failed", data: error.msg })
    }
}

// devolver nombre de la persona y subdomain
const verifySubdomain = async (req, res) => {
    console.log("req.body.subdomain", req.body.subdomain);
    try {
        const client = await clientService.getClientBySubdomain(req.body.subdomain)
        res.status(200).json({ status: "okkk", data: client })
    } catch (error) {
        res.status(error.status).json({ status: "failed", data: error.msg })
    }
}

// const verifyToken = async (req, res) => {
//     try {
//         const verifyToken = await clientService.verifyToken(req)
//         res.status(200).json({ status: "okkk", data: verifyToken })
//     } catch (error) {
//         res.status(error.status).json({ status: "failed", data: error.msg })
//     }
// }

export {
    createClient,
    getClients,
    loginClient,
    logoutClient,
    getClientById,
    verifySubdomain,
    // verifyToken,
}