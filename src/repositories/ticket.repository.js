

export default class TicketRepository {
    constructor(Tickets) {
        this.tickets = Tickets;
    }

     saveTicket = async (ticket)=> {
        return await  this.tickets.save(ticket);
    }
    
     findTicketByID = async (id) =>{
        return await  this.tickets.findById(id);
    }
}