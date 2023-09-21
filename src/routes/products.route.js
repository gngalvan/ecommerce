import Router from './router.route.js';
import addProductValidator from "../middlewares/addProductValidator.js";
import {
    getProducts,
    findProduct,
    addNewProduct,
    updateProduct,
    deleteProduct,
    renderProductsRealTime
} from '../controllers/productsController.js';



export default class ProductsRouter extends Router {
    init() {
        this.get('/', ['USER', 'ADMIN','PREMIUM'], getProducts);

        this.get("/product/:id", ['USER', 'ADMIN','PREMIUM'], findProduct);

        this.post("/", ['ADMIN','PREMIUM'], addProductValidator, addNewProduct);

        this.put("/:id", ['ADMIN','PREMIUM'], updateProduct);

        this.delete("/:id",['ADMIN','PREMIUM'], deleteProduct);

        this.get("/realtimeproducts", ['USER', 'ADMIN'],renderProductsRealTime);
    }
}