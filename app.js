import express from 'express'
import cors from 'cors'
import { v1ClientRouter } from './src/router/client/client.router.js'
import cookieParser from 'cookie-parser'
import config from './config.js'

const app = express()

// const allowedOriginPattern = /^http:\/\/([a-z0-9]+)\.localhost(:\d+)?$/; // RegExp para subdominios de localhost
const allowedOriginPattern = /^http:\/\/([a-z0-9]+)\.localhost(:\d+)?$/; // Patrón para subdominios de localhost
const allowedOrigins = [
    config.front_url,  // Otro ejemplo de origen explícito
    // Agrega otros orígenes explícitos si es necesario
];
app.use(cors(
    // {
    //     // origin: "https://legacy-store.vercel.app",
    //     origin: config.front_url, // Origen permitido
    //     credentials: true,      // Permitir cookies y otros credenciales
    // }
    {
        // origin: "https://legacy-store.vercel.app",
        origin: function (origin, callback) {
            // console.log("origin", origin);

            // Permitir solicitudes sin origen, como desde POSTMAN o cURL
            if (!origin) return callback(null, true);

            // Extraer el subdominio usando la expresión regular
            const match = origin.match(allowedOriginPattern);

            if (match) {
                const subdomain = match[1]; // 'viktor' en 'http://viktor.localhost:5173'
                // console.log("Subdominio detectado:", subdomain);

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