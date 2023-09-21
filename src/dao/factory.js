import config from "../config/config.js";
import { logger } from "../utils/logger.js";

let Products;
let Carts;
let Sessions;
let Messages;
let Tickets;
const persistence = config.persistence;

switch(persistence) {
    case 'MONGO':
        logger.info('Persistence: MongoDB')
        const mongoose = await import("mongoose");
        await mongoose.connect(config.mongoUrl);
        const { default: MongoProducts } = await import('../dao/dbManagers/products.js');
        const { default: MongoCarts } = await import('../dao/dbManagers/carts.js');
        const { default: MongoSessions } = await import('../dao/dbManagers/users.js');
        const { default: MongoMessages } = await import('../dao/dbManagers/messages.js');
        const { default: MongoTickets } = await import('../dao/dbManagers/ticket.js');
        Products = new MongoProducts();
        Carts = new MongoCarts();
        Sessions =new MongoSessions();
        Messages =new MongoMessages();
        Tickets = new MongoTickets();
        break;
    case 'FILE':
        logger.info('Persistence: FILE')
        const { default: fileManager } = await import('./fileManagers/FileManager.js');
        const { default: cartManager } = await import('./fileManagers/CartFileManager.js');
        const { default: userFileManager } = await import('./fileManagers/UserFileManager.js');
        const productsManagerFile = new fileManager('./db/products.json');
        const cartsManagerFile = new cartManager('./db/cart.json');
        const userManagerFile = new userFileManager('./db/users.json');
        Products = productsManagerFile;
        Carts = cartsManagerFile;
        Sessions = userManagerFile;
        break;
}

export {
    Products,
    Carts,
    Sessions,
    Messages,
    Tickets
}