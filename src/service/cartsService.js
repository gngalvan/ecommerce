import { cartsRepository, productsRepository, ticketRepository } from '../repositories/index.js';
import { createPasswordHash } from '../utils/utils.js';
import TicketDTO from '../dao/DTO/ticket.dto.js';
import PurchaseDTO from '../dao/DTO/purchaseDTO.js';
import { sendEmail } from '../config/mailer.config.js';

const findCartById = async (id) => {
    return await cartsRepository.findCartById(id);
}

const createCart = async () => {
    return await cartsRepository.createCart();
}

const createPurchase = async (idCart, email) => {
    const cart = await cartsRepository.findCartById(idCart);
    const buyed = [];
    const notStock = [];
    let totalAmount = 0;

    for (const prod of cart.products) {
        const productDB = await productsRepository.findProductById(prod.product._id);

        if (productDB.stock >= prod.quantity) {
            buyed.push({
                title: prod.product.title,
                price: prod.product.price,
                quantity: prod.quantity
            });
            await productsRepository.reduceStock(productDB._id, prod.quantity);
            await cartsRepository.deleteProdInCart(idCart, productDB._id);
            totalAmount += prod.product.price * prod.quantity;
        } else {
            notStock.push(prod.product._id);
        }
    }

    let codeUniqe = email;
    const currentDate = new Date().toLocaleDateString();
    const concatenatedString = codeUniqe.concat(currentDate);
    const code = await createPasswordHash(concatenatedString);
    const purchase = new PurchaseDTO(code, totalAmount, email);

    const GeneratePuchase = await ticketRepository.saveTicket(purchase);

    const ticket = new TicketDTO(GeneratePuchase, buyed, notStock);

    const emailSend = ticket.getEmail();
    await sendEmail(emailSend);

    return ticket;
}

const addProdToCart = async (idCart, idProd, quantity) => {
    return await cartsRepository.addProdToCart(idCart, idProd, quantity);
}

const updateProdQuantityInCart = async (idCart, pid, quantity) => {
    return await cartsRepository.updateProdQuantityInCart(idCart, pid, quantity);
}

const ClearCartById = async (idCart) => {
    return await cartsRepository.ClearCartById(idCart);
}

const deleteProdInCart = async (idCart, pid) => {
    return await cartsRepository.deleteProdInCart(idCart, pid);
}

export {
    findCartById,
    createCart,
    addProdToCart,
    updateProdQuantityInCart,
    ClearCartById,
    deleteProdInCart,
    createPurchase
}