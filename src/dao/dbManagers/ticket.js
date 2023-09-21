import { ticketModel } from "../models/ticket.js";
import ManagerDb from "./managerDb.js";

export default class Tickets extends ManagerDb{
    constructor(){
    super(ticketModel)
    }


    findById = async (id) => {
        const purchase = await this.model.findById({_id:id}).lean();
        return purchase
    }

    
}