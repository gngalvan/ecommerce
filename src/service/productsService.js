import UserNotificationDTO from '../dao/DTOs/userNotificationDTO.js';
import { productsRepository } from '../repositories/index.js';
import { sendEmail } from '../config/mailer.config.js';

const getAllProducts = async (limit, page, query, sortValue) => {
    return await productsRepository.getAllProducts(limit, page, query, sortValue);
}

const findProductById = async (id) => {
    return await productsRepository.findProductById(id);
}

const addProduct = async (product) => {
    return await productsRepository.addProduct(product);
}

const updateProductById = async (id, product) => {
    return await productsRepository.updateProductById(id, product);
}

const deleteProductById = async (id, user) => {
    const prodDB = await productsRepository.findProductById(id);

    if (user.role === 'PREMIUM') {
        if (prodDB.owner !== user.email) {
            throw new Error('The product can only be removed by owner');
        };
        const dtoNotificationUser = new UserNotificationDTO('Product Delete', user, `Your product ${prodDB.title} was removed`);
        const notification = dtoNotificationUser.getEmail();
        sendEmail(notification);
    };

    return await productsRepository.deleteProductById(id);
}

const reduceStock = async (idProd, quantityToReduce) => {
    return await productsRepository.reduceStock(idProd, quantityToReduce);
}

export {
    getAllProducts,
    findProductById,
    addProduct,
    updateProductById,
    deleteProductById,
    reduceStock
}
