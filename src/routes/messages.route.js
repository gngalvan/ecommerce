import Router from './router.route.js';
import {
    saveMessage,getAllMsg
} from '../controllers/messagesController.js';



export default class MessagesRouter extends Router {
    init() {
        this.get("/",['USER'], getAllMsg);
        this.post("/",['USER'],saveMessage );
    }

}