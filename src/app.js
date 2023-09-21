import express from 'express';
import messagesRouter from './routes/messages.route.js'
import SessionsRouter from './routes/sessions.route.js';
import SessionsViews from './routes/sessionViews.route.js';
import handlebars  from 'express-handlebars';
import __dirname from './utils/utils.js'
import {Server as HTTPServer} from 'http'
import {Server as SocketServer} from 'socket.io'
import './dao/dbManagers/dbConfig.js'
import FileManager from './dao/fileManagers/FileManager.js';
import Products from './dao/dbManagers/products.js';
import Messages from './dao/dbManagers/messages.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportInit from './config/passport.config.js';
import ProductsRouter from './routes/products.js'
import CartsRouter from './routes/carts.js'
import mockProductsRouter from './routes/mockProducts.js';
import compression from 'express-compression';
import errorHandler from './middlewares/errors/index.js'
import { addLogger, logger } from './utils/logger.js';
import swaggerJsdoc from 'swagger-jsdoc';
import  swaggerUIexpress from 'swagger-ui-express';



const fileManager = new FileManager("./db/products.json");
const productsManager = new Products();
const messagesManager = new Messages();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const sessionsRouter = new SessionsRouter();
const sessionsViews = new SessionsViews();
const msgRouter = new messagesRouter();
const mockingproducts = new mockProductsRouter()

const app = express();
const httpServer = new HTTPServer(app);
export const socketServer = new SocketServer(httpServer);
export  const io = socketServer; 

const swaggerOptions = {
  definition:{
    openapi:'3.0.1',
    info:{
      title:'Documentacion del proyecto Ecommerce',
      description:'API para un ecommerce'
    }
  },
  apis:[`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsdoc(swaggerOptions)
app.use(addLogger);
app.use('/api/docs',swaggerUIexpress.serve,swaggerUIexpress.setup(specs))

app.use(compression(
  {
    brotli:{enable:true,zlib:{}}
  }
  ))
  
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use(express.static(`${__dirname}/public`));
  app.use('/products/realtimeproducts',express.static(`${__dirname}/public`));
app.use('/products/',express.static(`${__dirname}/public`));
app.use('/chats',express.static(`${__dirname}/public`));
app.use('/carts/',express.static(`${__dirname}/public`));
app.use('/admin/console/users/',express.static(`${__dirname}/public`));
app.use('/password-reset/',express.static(`${__dirname}/public`));
app.use('/admin/console/products/',express.static(`${__dirname}/public`));


app.use(cookieParser())
passportInit();
app.use(passport.initialize());

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views` ); 
app.set('view engine',`handlebars` ); 

app.use('/mockingproducts',mockingproducts.getRouter())
app.use('/products', productsRouter.getRouter())
app.use('/carts',cartsRouter.getRouter())
app.use('/chat',msgRouter.getRouter())
app.use('/api',sessionsRouter.getRouter())
app.use('/',sessionsViews.getRouter())
app.use(errorHandler);




socketServer.on('connection',async (socket) =>{
    logger.info('socket conectado')

    socket.emit("SEND_PRODUCTS",await productsManager.getAll())

    socket.on("PRODUCT_ADDED",async(obj)=>{
        obj.thumbnails= [obj.thumbnails];
       const resultSave = await productsManager.save(obj)
         socketServer.sockets.emit("ADD_PRODUCT",resultSave)
      })

      socket.on("PRODUCT_DELETE",async(id)=>{
        await productsManager.delete(id);
        socketServer.sockets.emit("PRODUCT_DELETED",id)
      })


      socket.on("MESSAGE_ADDED",async(message)=>{

await messagesManager.save(message);
socketServer.sockets.emit("ADD_MESSAGE_CHAT",message)
      })
})

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT,()=>{
    logger.info(`Express Server listening on PORT ${process.env.PORT || 8080}`)
})  