import CustomError from "./errors/customErrors.js";
import EnumsErrors from "./errors/enums.js";
import { generateProductsPropertieInvalid,generateProductsPropertieNotReceived } from "./errors/info.js";

async function addProductValidator(req, res, next) {
    const propiedadesEsperadas = ["title", "description", "price","code","stock","category","status","thumbnails"];
    const propiedadesProducto = Object.keys(req.body);
    let error;
  

    for (const prop in propiedadesProducto){
        if (!propiedadesEsperadas.includes(propiedadesProducto[prop])){
         error = new CustomError(
           'Invalid Properties',
              await generateProductsPropertieInvalid(propiedadesProducto[prop])	,
        'Error al crear el producto',
            EnumsErrors.PROPERTIES_ERROR
        )
        throw error
        }
      }

      for (const prop in propiedadesEsperadas){
        if (!propiedadesProducto.includes(propiedadesEsperadas[prop])){
         error = new CustomError(
             'Error al crear el producto',
             'property was expected',
             await generateProductsPropertieNotReceived(propiedadesEsperadas[prop]),
            EnumsErrors.PROPERTIES_ERROR
        )

        throw error
        }
      }
    
        return next();
    

}

export default addProductValidator;