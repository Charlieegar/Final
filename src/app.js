import express from "express";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";
import { connectDB } from "./config/mongoose.config.js";

// Importación de enrutadores
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import routerViewHome from "./routes/home.view.router.js";

// Se crea una instancia de Express
const app = express();

// Se define el puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;

// Conexión con la Base de Datos de MongoDB
connectDB();

// Declaración de archivos estáticos desde la carpeta 'public'
app.use("/api/public", express.static("./src/public"));

// Middleware para acceder al contenido de formularios codificados en URL
app.use(express.urlencoded({ extended: true }));

// Middleware para acceder al contenido JSON de las solicitudes
app.use(express.json());

// Configuración del motor de plantillas
configHandlebars(app);

// Declaración de rutas
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/cart", routerCarts);
app.use("/", routerViewHome);
app.use((req, res, next) => {
    res.status(404).render('error404');
});

// Se levanta el servidor en el puerto definido
const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});

// Configuración del servidor de websocket
configWebsocket(httpServer);
