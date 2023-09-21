import express from 'express';
import __dirname from './utils/utils.js';
import handlebars from 'express-handlebars';
import compression from 'express-compression';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUIexpress from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Server as HTTPServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import './dao/dbManagers/dbConfig.js';
import FileManager from './dao/fileManagers/FileManager.js';
import Products from './dao/dbManagers/products.js';
import Messages from './dao/dbManagers/messages.js';
import errorHandler from './middlewares/errors/index.js';
import { addLogger, logger } from './utils/logger.js';

import CartsRouter from './routes/carts.route.js';
import messagesRouter from './routes/messages.route.js';
import SessionsRouter from './routes/sessions.route.js';
import SessionsViews from './routes/sessionViews.route.js';
import ProductsRouter from './routes/products.js';
import mockProductsRouter from './routes/mockProducts.route.js';

const fileManager = new FileManager("./db/products.json");
const productsManager = new Products();
const messagesManager = new Messages();

const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const sessionsRouter = new SessionsRouter();
const sessionsViews = new SessionsViews();
const msgRouter = new messagesRouter();
const mockingproducts = new mockProductsRouter();

const app = express();
const httpServer = new HTTPServer(app);
export const socketServer = new SocketServer(httpServer);
export const io = socketServer;

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentacion Bolka Ecommerce',
      description: 'API para un ecommerce',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJsdoc(swaggerOptions);
app.use(addLogger);
app.use('/api/docs', swaggerUIexpress.serve, swaggerUIexpress.setup(specs));

// Compresión
app.use(compression({
  brotli: { enable: true, zlib: {} },
}));

// Middleware para JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(`${__dirname}/public`));
const staticRoutes = [
  '/products/realtimeproducts',
  '/products/',
  '/chats',
  '/carts/',
  '/admin/console/users/',
  '/password-reset/',
  '/admin/console/products/',
];
staticRoutes.forEach(route => {
  app.use(route, express.static(`${__dirname}/public`));
});

// Rutas
app.use('/carts', cartsRouter.getRouter());
app.use('/chat', msgRouter.getRouter());
app.use('/mockingproducts', mockingproducts.getRouter());
app.use('/products', productsRouter.getRouter());
app.use('/api', sessionsRouter.getRouter());
app.use('/', sessionsViews.getRouter());

// Manejo de errores
app.use(errorHandler);
app.use(cookieParser());
passportInit();
app.use(passport.initialize());

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Manejo de sockets
socketServer.on('connection', async (socket) => {
  logger.info('socket conectado');
  socket.emit("SEND_PRODUCTS", await productsManager.getAll());
  socket.on("PRODUCT_ADDED", async (obj) => {
    obj.thumbnails = [obj.thumbnails];
    const resultSave = await productsManager.save(obj);
    socketServer.sockets.emit("ADD_PRODUCT", resultSave);
  });
  socket.on("PRODUCT_DELETE", async (id) => {
    await productsManager.delete(id);
    socketServer.sockets.emit("PRODUCT_DELETED", id);
  });
  socket.on("MESSAGE_ADDED", async (message) => {
    await messagesManager.save(message);
    socketServer.sockets.emit("ADD_MESSAGE_CHAT", message);
  });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  logger.info(`Express Server listening on PORT ${process.env.PORT || 8080}`);
});