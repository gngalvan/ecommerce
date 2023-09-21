import {
    productModel
} from "../models/products.js";
import ManagerDb from "./managerDb.js";

export default class Products extends ManagerDb {
    constructor() {
        super(productModel)
    }

    getAll = async (limit = 10, page = 1, query = '', sortValue) => {
        let filter = {};

        const options = {
            page,
            limit
        };

        if (sortValue) {
            const sortProducts = sortValue === 'asc' ? 1 : -1;
            options.sort = {
                price: sortProducts
            };
        }

        if (query) {
            filter = {
                ...query
            }
        }

        

        const result = await this.model.paginate(filter, options);
        const products = result.docs.map(doc => doc.toObject());

        return {
            products,
            pagination: {
              totalDocs: result.totalDocs,
              limit: result.limit,
              totalPages: result.totalPages,
              page: result.page,
              pagingCounter: result.pagingCounter,
              hasPrevPage: result.hasPrevPage,
              hasNextPage: result.hasNextPage,
              prevPage: result.prevPage,
              nextPage: result.nextPage
            }
    }

}

reduceStock = async (idProd,quantityToReduce) => {
  return  await this.model.updateOne(
        { _id: idProd },
        { $inc: { stock: -quantityToReduce } }
      );
}


findElementById = async (id) => {
    const resultCart = await this.model.findById({_id:id}).lean();
    return resultCart
}

}