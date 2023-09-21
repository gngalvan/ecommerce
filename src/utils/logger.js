import winston from "winston";
import config from "../config/config.js";

const ENVIROMENT = config.ENVIROMENT;

const optionsLevel = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        debug:4
    },
    colors:{
        fatal:'red',
        error:'red',
        warning:'yellow',
        info:'green',
        debug:'blue'

    }
}

export let logger;

if(ENVIROMENT == 'production'){
  logger = winston.createLogger({
    levels: optionsLevel.levels,
    transports:[
        new winston.transports.Console({
            level:'info',
            format:winston.format.combine(
                winston.format.colorize({
                    all:true,
                    colors:optionsLevel.colors
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: './logs/errors.log',
        level:'info' }),
    ]
}) 
logger.info(`ENVIROMENT: Production`)
}

if(ENVIROMENT == 'development'){
     logger = winston.createLogger({
    levels: optionsLevel.levels,
    transports:[
        new winston.transports.Console({
            level:'debug',
            format:winston.format.combine(
                winston.format.colorize({
                    all:true,
                    colors:optionsLevel.colors
                }),
                winston.format.simple()
            )
        })
       
    ]
}) 
logger.info(`ENVIROMENT: Development`)
}



export const addLogger = (req,res,next) =>{
    logger.info(`${req.method} en ${req.url} - ${new Date().toISOString()}`)
    next()
} 