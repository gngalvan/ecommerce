import {
  usersModel
} from "../models/users.js";
import {
  comparePassword,
  createPasswordHash
} from "../../utils/utils.js";
import ManagerDb from "./managerDb.js";


export default class Users extends ManagerDb {
  constructor() {
    super(usersModel)
  }

  findIfExist = async (emailUser) => {
    const resultAll = await this.model.findOne({
      email: emailUser
    }).lean();
    return resultAll
  }

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

  save = async (user) => {
    const hashedPassword = await createPasswordHash(user.password)
    const newUser = {
      ...user,
      password: hashedPassword
    };
    const userCreated = await this.model.create(newUser)
    return userCreated
  };

  findById = async (id) => {
    const user = await this.model.findById({
      _id: id
    }).lean();
    return user
  }

  updateLastConecction = async (emailUser) => {
    return this.model.updateOne({
      email: emailUser
    }, {
      $set: {
        lastConnection: new Date()
      }
    })
  }

  deleteUsersInfrequentMethod = async ()=>{
let lastConnectionExpired = new Date();
lastConnectionExpired.setMinutes(lastConnectionExpired.getMinutes() - 30);
let usersDeleted = await this.model.find({lastConnection: { $lt: lastConnectionExpired } })
await this.model.deleteMany({lastConnection: { $lt: lastConnectionExpired } })
return usersDeleted
  }

  deleteUser = async (id)=>{
return this.model.deleteOne({ _id: id })
  }


  updateRol = async (id,rol)=>{
    return this.model.updateOne({
      _id: id
    }, {
      $set: {
        role:rol
      }
    })
  }

  updatePassword = async (emailUser,pass)=>{
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