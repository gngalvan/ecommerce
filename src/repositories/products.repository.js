export default class ProductsRepository {
    constructor(Products){
        this.product = Products;
    }
    
 getAllProducts = async (limit, page , query,sortValue) => {
   const products = await this.product.getAll(limit, page , query,sortValue);
      return products
    }
    
     findProductById =  async (id) => {
        return await this.product.findElementById(id);
    }
    
    
     addProduct = async (product) => {
        return await this.product.save(product);
    }
    
     updateProductById = async(id,product) => {
        return await this.product.update(id,product);
    }
    
    
     deleteProductById = async (id) => {
        return await this.product.delete(id);
    }

    reduceStock = async (idProd,quantityToReduce)=>{
        return await this.product.reduceStock(idProd,quantityToReduce)
    }


}