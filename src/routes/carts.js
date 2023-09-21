import Router from './router.js';
import Carts from "../dao/dbManagers/carts.js";
import { findCart,createNewCart,addProductToCartById ,updateQuantityProdToCart,clearCartId,deleteProductToCartById,createNewPurchase} from '../controllers/cartsController.js';

const cartsManager = new Carts();

export default class CartsRouter extends Router {
    init() {

        this.get("/:id",['USER','ADMIN','PREMIUM'], findCart);

        this.post("/",['USER','PREMIUM'], createNewCart);

        this.post("/:id/products/:idprod",['USER','PREMIUM'],addProductToCartById);

        this.post("/:cid/purchase",['USER','PREMIUM'],createNewPurchase);

        this.put("/:id/update/products/:idprod",['USER','PREMIUM'],updateQuantityProdToCart);

        this.delete("/:id",['USER','PREMIUM'],clearCartId);

        this.delete("/:id/product/:pid",['USER','PREMIUM'],deleteProductToCartById);
    }
}