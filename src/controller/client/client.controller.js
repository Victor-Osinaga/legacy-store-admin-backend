import clientService from "../../service/client/client.factory.js";
import { genAuthToken } from "../../utils/jwt/getAuthToken.js";

const createClient = async (req, res) => {
  try {
    const createdClient = await clientService.createClient(req.body);
    res.status(200).json({ status: "ok", data: createdClient });
  } catch (error) {
    console.log("error desde controller", error);

    res
      .status(error?.status || 700)
      .json({ status: "failed", data: error.msg });
  }
};

// LOGIN
const loginClient = async (req, res) => {
  try {
    const clientLoged = await clientService.loginClient(req.body);
    const token = await genAuthToken(clientLoged.id);
    // la cookie y el jwt tienen el mismo tiempo de expiracion, revisar si se puede hacer un refresh token cambiando la duracion de la cookie a un tiempo corto y el jwy a un tiempo de vida mas largo
    res.cookie("access_token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });
    res.status(200).json({ status: "ok", data: clientLoged });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 700)
      .json({ status: "failed", data: error.msg });
  }
};

const getClientById = async (req, res) => {
  try {
    console.log("desde controller", req.clientId);
    const client = await clientService.getClientById(req.clientId);
    res.status(200).json({ status: "okkk", data: client });
  } catch (error) {
    res
      .status(error?.status || 700)
      .json({ status: "failed", data: error.msg });
  }
};

const logoutClient = async (req, res) => {
  res.cookie("access_token", "", {
    expires: new Date(0),
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
  res.status(200).json({ status: "ok", data: "Logout successful" });
};

const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json({ status: "ok", data: clients });
  } catch (error) {
    res
      .status(error?.status || 700)
      .json({ status: "failed", data: error.msg });
  }
};

// devolver nombre de la persona y subdomain
// const verifySubdomain = async (req, res) => {
//   console.log("req.body.subdomain", req.body);
//   try {
//     const client = await clientService.getClientBySubdomain(req.body.subdomain);
//     res.status(200).json({ status: "okkk", data: client });
//   } catch (error) {
//     res
//       .status(error?.status || 700)
//       .json({ status: "failed", data: error.msg });
//   }
// };

export {
  createClient,
  getClients,
  loginClient,
  logoutClient,
  getClientById,
  // verifySubdomain,
};
