import * as dotenv from "dotenv";
dotenv.config();

const config = {
  // PUERTO
  PORT: process.env.PORT,

  // DEV DATABASE LOCAL
  dev_url: process.env.DEV_URL,
  dev_url_database: process.env.DEV_URL_DATABASE,

  // PROD DATABASE LOCAL
  prod_url: process.env.PROD_URL,
  prod_url_database: process.env.PROD_URL_DATABASE,

  // PANEL FRONTEND - SOLO EL PANEL FRONT SE COMUNICA CON ESTE PARA CONSEGUIR EL TOKEN
  // front_url_panel_dev: process.env.FRONT_URL_PANEL_DEV,
  // front_url_panel_prod: process.env.FRONT_URL_PANEL_PROD,

  // JWT
  private_key_jwt: process.env.PRIVATE_KEY_JWT,

  // firebase imagenes MI CUENTA
  firebaseAccountKey: {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN,
  },
  storage_bucket: process.env.STORAGE_BUCKET,

  // VERCEL TOKEN
  vercel_token: process.env.VERCEL_TOKEN,

  // GITHUB TOKEN
  github_token: process.env.GITHUB_TOKEN,

  // ENTORNO
  env: process.argv[2],
};

export default config;
