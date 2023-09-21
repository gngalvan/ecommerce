import { getAllProducts,findProductById,addProduct,updateProductById,deleteProductById } from "../service/productsService.js";
import userDTO from "../dao/DTOs/users.dto.js";

const getProducts = async (req,res) => {
    const {limit, page,sort,title,price,category,status} = req.query;
    const query = {}
    
    if(title){
        query.title = title;
    }
    if(price){
        query.price = parseInt(price);
    }
    if(category){
        query.category = category;
    }
    if(status){
        query.status = status;
    }
    
        
        const products = await getAllProducts(limit,page,query,sort) ;
        const reqUser = req.user
        const userProfile = new userDTO(reqUser)
        products.user = userProfile;
        res.render('home',{products})

}

const findProduct = async (req, res) => {
    try{
        const id = req.params.id
const products = await findProductById(id);
    res.sendSuccess({status:'success',payload:products})
    }catch(error){
        logger.error(`Error al realizar la solicitud:", ${error}`)
        res.sendClientError(error)
    }
    
}



const addNewProduct = async (req,res) => {
    try {
        const product = req.body;
        if(req.user.role === 'PREMIUM'){
            product.owner=req.user.email
      }
        const products = await addProduct(product);
        if(products){
            res.sendSuccess("Producto Agregado!");
        }
    } catch (error) {
        logger.error(`Error al realizar la solicitud:", ${error}`)
        res.sendClientError(error)
    }
};


const updateProduct = async (req, res) => {
    try {
        const element = req.body;
        const id = req.params.id
        const products = await updateProductById(id,element);
        res.sendSuccess({status:'success', payload: products});
    } catch (error) {
        logger.error(`Error al realizar la solicitud:", ${error}`)
        res.sendClientError(error)
    }
}


const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
   const product = await deleteProductById(id,req.user);
    res.sendSuccess({status:'success', payload: product});      
    } catch (error) {
        logger.error(`Error al realizar la solicitud:", ${error}`)
        res.sendClientError(error)
    }
}

const renderProductsRealTime = async (req, res) => {
    res.render('realTimeProducts')
}

export {
    getProducts,findProduct,addNewProduct,updateProduct,deleteProduct,renderProductsRealTime
}