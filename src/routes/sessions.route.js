import Router from './router.js';
import Users from "../dao/dbManagers/users.js";
import { registerUser,login,logout ,userList,deleteUserInfrequent,deleteUser,updateUserRol,sendEmailRestartPassword,resetPassword} from '../controllers/sessionsController.js';


// const usersManager = new Users();


export default class SessionsRouter extends Router {
    init() {
        this.post("/register", ['PUBLIC'], registerUser);

        this.post("/login", ['PUBLIC'],login);

        this.get("/logout", ['USER', 'ADMIN','PREMIUM'],logout);

        this.get("/users/",['ADMIN'],userList)

        this.delete("/users/",['ADMIN'],deleteUserInfrequent )

        this.delete("/user/delete/:id",['ADMIN'],deleteUser )
        
        this.put("/user/update/rol/:id",['ADMIN'],updateUserRol )

        this.put("/user/update/password",['USER', 'ADMIN'],resetPassword )

        this.put("/reset-password",['PUBLIC'],sendEmailRestartPassword )


    }

}