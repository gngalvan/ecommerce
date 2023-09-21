import {ticketRepository} from "../repositories/index.js";



 findTicketByID = async (id) =>{
    return await  ticketRepository.findById(id);
}


export {
    saveTicket,findTicketByID
}