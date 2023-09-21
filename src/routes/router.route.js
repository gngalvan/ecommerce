import toAsyncRouter from 'async-express-decorator';
import {
    Router as expressRouter
} from 'express';
import passport from "passport";
import { logger } from '../utils/logger.js';

export default class Router {
    constructor() {
        this.router = toAsyncRouter(expressRouter());
        this.init();
    }

    getRouter() {
        return this.router;
    };


    async get(path, policies, ...callbacks) {
        await this.router.get(
            path,
            await this.handlePolicies(policies),
            this.generateCustomReponse,
            ...await this.applyCallbacks(callbacks)
        );

    }

    async post(path, policies, ...callbacks) {
              await this.router.post(
            path,
            await this.handlePolicies(policies),
            this.generateCustomReponse,
            ...await this.applyCallbacks(callbacks)
        );
        
            
        
      
    }


    async put(path, policies, ...callbacks) {
        await this.router.put(
            path,
            await this.handlePolicies(policies),
            this.generateCustomReponse,
            ...await this.applyCallbacks(callbacks)
        );
    }

    async delete(path, policies, ...callbacks) {
        await this.router.delete(
            path,
            await this.handlePolicies(policies),
            this.generateCustomReponse,
            ...await this.applyCallbacks(callbacks)
        );
    }

    async handlePolicies(policies) {
        return function (req, res, next) {
            if (policies[0] === 'PUBLIC') {
                return next();
            }
            passport.authenticate('jwt', { session: false,failureRedirect: '/login' })(req, res, (err) => {
  
                if (err) {
                    return next(err);
                }
    
                if (!req.user) {
                    return res.status(401).json({
                        message: 'No token provided'
                    });
                }
    
                if (!policies.includes(req.user.role.toUpperCase())) {
                    return res.status(403).json({
                        message: 'Forbidden'
                    });
                }
                next();
            });
        };
    }
    


    generateCustomReponse(req, res, next){
        res.sendSuccess = (data) => {
            res.status(200).json({
                data
            });
        };
        res.sendServerError = (error) => {
            res.status(500).json({
                error
            });
        };
        res.sendClientError = (error) => {
            res.status(400).json({
                error
            });
        };
        next();
    }

    async applyCallbacks(callbacks,req, res, next) {
        return callbacks.map((callback) => async (...params) => {
            try{
               await callback.apply(this, params); 
            }catch(error){
                    logger.error(`${error}`)
                 throw error
            }
            

        })
    }
}