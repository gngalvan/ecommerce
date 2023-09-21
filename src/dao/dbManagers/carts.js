import { cartsModel } from "../models/carts.js";
import ManagerDb from "./managerDb.js";


export default class Carts extends ManagerDb {
    constructor(){
        super(cartsModel)
    }

    save = async () => {
      return this.model.create({})
    }

    getAll = async () => {
      const resultAll = await this.model.find().populate('products.product').lean();
    return resultAll
    }


    addProductToCart = async (idCart, idProd,quantity) => {
        const prod = { product: idProd, quantity: quantity };
        const updatedCart = await this.model.findByIdAndUpdate(
          idCart,
          { $push: { products: prod } },
          { new: true }
        );
    
        if (updatedCart) {
          return 1; 
        } else {
          return 0; 
        }
      
    };

      updateQuantityProdInCart = async (idCart, pid,quantity) => {
       
        const cart = await this.model.findOne({
          _id: idCart,
          "products.product": pid
        });

        if(cart){
           const update = { $inc: { "products.$[elem].quantity": quantity } };
        const options = { arrayFilters: [{ "elem.product": pid }] };
      
        const updatedCart = await this.model.findByIdAndUpdate(idCart, update, options);
        if (updatedCart) {
          return 1;
        }
        }else{
          return 0;
        }

          
     
      };


      clearCart = async (idCart) => {
        const updatedCart =  await this.model.findByIdAndUpdate(
          idCart,
          { $set: { "products": [] } },
          
        );
        if (updatedCart) {
          return 1;
        }else{
          return 0;
        }

      }



      deleteProductByID = async (idCart,pid) =>{ 

        const updatedCart = await this.model.updateOne(
          { _id: idCart },
          { $pull: { products: { product: pid } } }
        );
        if(updatedCart.acknowledged){
           
            return 1
        }else{
            return -1
        }


      }
   
}