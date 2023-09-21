

export default class CartsRepository {
    constructor(Carts) {
        this.cart = Carts
    }

    findCartById = async (id) => {
        return await this.cart.findElementById(id);
    }


    createCart = async () => {
        return await this.cart.save();
    }


    addProdToCart = async (idCart, idProd, quantity) => {
        return await this.cart.addProductToCart(idCart, idProd, quantity)
    }

    updateProdQuantityInCart = async (idCart, pid, quantity) => {
        return await this.cart.updateQuantityProdInCart(idCart, pid, quantity);
    }


    ClearCartById = async (idCart) => {
        return await this.cart.clearCart(idCart);
    }

    deleteProdInCart = async (idCart, pid) => {
        return await this.cart.deleteProductByID(idCart, pid)
    }

}