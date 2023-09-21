import Router from './router.route.js';
import { purchase } from '../controllers/ticketController.js';

const usersManager = new Users();


export default class TicketRouterView extends Router {
    init() {
        this.post("/purchase", ['PUBLIC'], purchase);

    }

}