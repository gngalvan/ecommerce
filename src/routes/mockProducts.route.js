import Router from './router.js';
import { MockProducts } from '../utils/utils.js';
import { logger } from '../utils/logger.js';

export default class mockProductsRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], (req,res)=>{
            const products = MockProducts();
            res.sendSuccess({status:'success',payload:products})
        });

        this.get('/loggerTest', ['PUBLIC'], (req,res)=>{
          logger.fatal(`${req.method} en ${req.url} - FATAL ERROR - ${new Date().toISOString()}`)
          logger.error(`${req.method} en ${req.url} -  ERROR - ${new Date().toISOString()}`)
          logger.warning(`${req.method} en ${req.url} -  WARNING - ${new Date().toISOString()}`)
          logger.info(`${req.method} en ${req.url} -  INFO - ${new Date().toISOString()}`)
          logger.debug(`${req.method} en ${req.url} -  DEBUG - ${new Date().toISOString()}`)
          res.status(200).send("Success Logger")
        });
    }
}