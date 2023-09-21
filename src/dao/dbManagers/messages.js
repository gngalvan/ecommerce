import { messagesModel } from "../models/messages.js";
import ManagerDb from "./managerDb.js";

export default class Messages extends ManagerDb{
    constructor(){
    super(messagesModel)
    }


 
}