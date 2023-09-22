import { usersModel } from "../models/users.model.js";
import { comparePassword, createPasswordHash } from "../../utils/utils.js";
import ManagerDb from "./managerDb.js";

export default class Users extends ManagerDb {
  constructor() {
    super(usersModel);
  }

  // Busca si un usuario con el correo electrónico dado existe en la base de datos
  findIfExist = async (emailUser) => {
    try {
      const resultAll = await this.model.findOne({
        email: emailUser
      }).lean();
      
      if (!resultAll) {
        throw new Error(`No user found with that email ${emailUser}`);
      }
      
      return resultAll;
    } catch (error) {
      console.error('Error en findIfExist:', error);
      throw error; 
    }
  }  

  // Valida el inicio de sesión del usuario
  LoginValidate = async (emailUser, passUser) => {
    const user = await this.model.findOne({
      email: emailUser
    }).lean();
    const resultCompare = await comparePassword(passUser, user.password)
    if (resultCompare) {
      await this.updateLastConecction(emailUser);
      return user
    } else {
      return 0
    }
  }

  // Guarda un nuevo usuario en la base de datos
  save = async (user) => {
    const hashedPassword = await createPasswordHash(user.password)
    const newUser = {
      ...user,
      password: hashedPassword
    };
    const userCreated = await this.model.create(newUser)
    return userCreated
  };

  // Busca un usuario por su ID.
  findById = async (id) => {
    const user = await this.model.findById({
      _id: id
    }).lean();
    return user
  }

  // Actualiza la última conexión de un usuario.
  updateLastConecction = async (emailUser) => {
    return this.model.updateOne({
      email: emailUser
    }, {
      $set: {
        lastConnection: new Date()
      }
    })
  }

  // Elimina usuarios inactivos.
  deleteUsersInfrequentMethod = async () => {
    let lastConnectionExpired = new Date();
    lastConnectionExpired.setMinutes(lastConnectionExpired.getMinutes() - 30);
    let usersDeleted = await this.model.find({lastConnection: { $lt: lastConnectionExpired } })
    await this.model.deleteMany({lastConnection: { $lt: lastConnectionExpired } })
    return usersDeleted
  }

  // Elimina un usuario por su ID.
  deleteUser = async (id) => {
    return this.model.deleteOne({ _id: id })
  }

  // Actualiza el rol de un usuario por su ID.
  updateRol = async (id, rol) => {
    return this.model.updateOne({
      _id: id
    }, {
      $set: {
        role: rol
      }
    })
  }

  // Actualiza la contraseña de un usuario por su correo electrónico.
  updatePassword = async (emailUser, pass) => {
    const hashedPassword = await createPasswordHash(pass)
    return this.model.updateOne({
      email: emailUser
    }, {
      $set: {
        password: hashedPassword
      }
    })
  }
}
