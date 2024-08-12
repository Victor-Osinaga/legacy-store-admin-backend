import * as dotenv from 'dotenv'
dotenv.config()

const config = {
  // PUERTO ______________________________________________________________
  PORT: process.env.PORT,
  // DATABASES ______________________________________________________________
  dev_url_database: process.env.DEV_URL_DATABASE,
  prod_url_database: process.env.PROD_URL_DATABASE,
  // URL FRONT LEGACY STORE ______________________________________________________________
  front_url_store_dev: process.env.FRONT_URL_STORE_DEV,
  front_url_store_prod: process.env.FRONT_URL_STORE_PROD,
  // URL FRONT/BACK LEGACY PANEL
  front_url_panel_dev: process.env.FRONT_URL_PANEL_DEV,
  front_url_panel_prod: process.env.FRONT_URL_PANEL_PROD,
  back_url_panel_dev: process.env.BACK_URL_PANEL_DEV,
  back_url_panel_prod: process.env.BACK_URL_PANEL_PROD,
  // ______________________________________________________________

//   access_token_mp: process.env.ACCESS_TOKEN_MP,
//   success_url_mp: process.env.SUCCESS_URL_MP,
//   failure_url_mp: process.env.FAILURE_URL_MP,
//   notification_url_mp: process.env.NOTIFICATION_URL_MP,
  private_key_jwt: process.env.PRIVATE_KEY_JWT,

  // ______________________________________________________________
  // PARA CAMBIAR DE MODO PROD A DEV SE USA UN 3ER PARAMETRO 'node index.js dev' : EL MODO PRODUCCION ESTA POR DEFECTO EN ESTA APP
  env: process.argv[2],
  // ______________________________________________________________
//   emailAdmin: process.env.EMAIL_ADMIN,
//   google : {
//     user: process.env.EMAIL_ADMIN,
//     pass: process.env.GMAILPASSWORD
//   },
//   firebaseAccountKey: {
//     type: process.env.TYPE,
//     project_id: process.env.PROJECT_ID,
//     private_key_id: process.env.PRIVATE_KEY_ID,
//     private_key: process.env.PRIVATE_KEY,
//     client_email: process.env.CLIENT_EMAIL,
//     client_id: process.env.CLIENT_ID,
//     token_uri: process.env.TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
//     client_x509_cert_url: process.env.CLIENT_CERT_URL
//   },
//   storage_bucket: process.env.STORAGE_BUCKET
}

export default config;