import EnumsErrors from "./enums.js";

  function errorHandler(error,req,res,next){
    switch(error.code){
        case EnumsErrors.INVALID_TYPE_ERROR:
            res.status(400).json({
                status:'Error',
                error:error.message,
                description:error.cause
            })
            break;
        case EnumsErrors.INVALID_CREDENTIALS:
             res.status(401).json({
                    status:'Error',
                    error:error.message,
                    description:error.cause
                })
                break;
        case EnumsErrors.PROPERTIES_ERROR:
         
            res.status(400).json({
                status:'Error',
                error:error.message,
                description:error.cause
            })
            break;
            case EnumsErrors.USER_EXIST:
            res.status(409).json({
                status:'Error',
                error:error.message,
                description:error.cause
            })
            break;
        default:
            res.status(400).json({
                status:'Error',
                error:error.message,
                description:'default'
            })
            break;
    }

  
}

export default errorHandler;