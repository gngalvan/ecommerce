import Router from './router.js';
import { authTokenResetPassword } from '../utils/utils.js';
import {  registrer,login,profile,adminUsers,resetPasswordView,setNewPasswordReset,adminProds } from '../controllers/sessionsViewsController.js';

export default class SessionsViews extends Router {
    init() {
        
        this.get("/register",['PUBLIC'],registrer);

         this.get("/login", ['PUBLIC'],login);
       
         this.get("/", ['USER','ADMIN','PREMIUM'],profile);

         this.get("/admin/console/products", ['PREMIUM','ADMIN'],adminProds);

         this.get("/reset-password", ['PUBLIC'],resetPasswordView);

         this.get("/password-reset/:token", ['PUBLIC'],authTokenResetPassword,setNewPasswordReset);

         this.get("/admin/console/users",['ADMIN'] ,adminUsers);

    }

}