import { Products,Carts,Sessions,Messages,Tickets } from '../dao/factory.js';
import ProductsRepository from '../repositories/products.repository.js';
import CartsRepository from '../repositories/carts.repository.js';
import SessionsRepository from './sessions.repository.js';
import MessagesRepository from './messages.repository.js';
import TicketRepository from './ticket.repository.js';

const productsRepository = new ProductsRepository(Products);
const cartsRepository = new CartsRepository(Carts);
const sessionsRepository = new SessionsRepository(Sessions);
const messagesRepository = new MessagesRepository(Messages);
const ticketRepository =  new TicketRepository(Tickets);

export {
    productsRepository,cartsRepository,sessionsRepository,messagesRepository,ticketRepository
}