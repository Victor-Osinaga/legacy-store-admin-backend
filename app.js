import express from 'express'
import cors from 'cors'
import { v1ClientRouter } from './src/router/client/client.router.js'
import cookieParser from 'cookie-parser'
import config from './config.js'

const app = express()


// const allowedOriginPattern = /^http:\/\/([a-z0-9]+)\.localhost(:\d+)?$/; // RegExp para subdominios de localhost
const allowedOriginPatternDev = /^https?:\/\/([a-z0-9]+)\.localhost(:\d+)?$/; // Patrón para subdominios de localhost
const allowedOriginPatternProd = /^https?:\/\/([a-z0-9-]+)\.legacy-panel\.vercel\.app$/;
let allowedOrigins;
if (config.env == 'dev') {
    // AGREGAR allowedOriginPattern segun el modo para cambiar el regex
    console.log("MODO DEV");
    // Origen explícito
    allowedOrigins = [
        config.front_url_panel_dev,
        config.front_url_store_dev,
        config.back_url_panel_dev,
    ]
    console.log("allowedOrigins modo dev", allowedOrigins);
} else {
    console.log("MODO PROD");
    
    // Origen explícito
    allowedOrigins = [
        config.front_url_panel_prod,
        config.front_url_store_prod,
        config.back_url_panel_prod,
    ]
    console.log("allowedOrigins modo prod", allowedOrigins);
    
}
app.use(cors(
    {
        origin: function (origin, callback) {
            console.log("origin: ", origin);
            
            // Permitir solicitudes sin origen, como desde POSTMAN o cURL
            if (!origin) return callback(null, true);

            // Extraer el subdominio usando la expresión regular
            const matchdev = origin.match(allowedOriginPatternDev);

            if (matchdev) {
                const subdomain = matchdev[1]; // 'viktor' en 'http://viktor.localhost:5173'
                console.log("Subdominio detectado matchdev:", subdomain);

                // Aquí puedes implementar lógica adicional basada en el subdominio, si es necesario

                return callback(null, true);
            }

            // Extraer el subdominio usando la expresión regular
            const matchprod = origin.match(allowedOriginPatternProd);

            if (matchprod) {
                const subdomain = matchprod[1]; // 'viktor' en 'http://viktor.localhost:5173'
                console.log("Subdominio detectado matchprod:", subdomain);

                // Aquí puedes implementar lógica adicional basada en el subdominio, si es necesario

                return callback(null, true);
            }

            // Si el origen coincide con la lista de orígenes permitidos explícitos
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error('No permitido por CORS'));
            }
        },
        credentials: true,      // Permitir cookies y otros credenciales
    }
))

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// ROUTES
app.use('/api-admin/clients', v1ClientRouter)

app.all('*', (req, res) => {
    res.json({
        error: '404 NotFoud',
        desc: 'No se encontro la pagina que buscas legacy store'
    })
})

export {
    app
}