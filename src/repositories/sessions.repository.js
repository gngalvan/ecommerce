import passport from "passport";


export default class SessionsRepository {
    constructor(Sessions) {
        this.sessions = Sessions;
    }

     findUserExist = async (emailUser) =>{
        return await  this.sessions.findIfExist(emailUser);
    }
    
     validateLogin = async (emailUser,passUser) =>{
        return await  this.sessions.LoginValidate(emailUser,passUser);
    }
    
     saveUser = async (user)=> {
        return await  this.sessions.save(user);
    }
    
     findUserByID = async (id) =>{
        return await  this.sessions.findById(id);
    }

     listUsers = async() =>{
        return await this.sessions.getAll()
    }
    

    deleteUsersInfrequent = async() =>{
        return await this.sessions.deleteUsersInfrequentMethod()
    }

    deleteUser = async (id) =>{
        return await this.sessions.deleteUser(id)
    }

    deleteUser = async (id) =>{
        return await this.sessions.deleteUser(id)
    }

    updateUserRol = async (id,rol)=>{
        return await this.sessions.updateRol(id,rol)
    }

    resetPassword = async (email,password)=>{
        return await this.sessions.updatePassword(email,password)
    }
}