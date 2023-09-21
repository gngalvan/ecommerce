
export default class MessagesRepository {
    constructor(Messages) {
        this.messages = Messages
    }
     saveNewMessage = async (msg) => {
        return await this.messages.save();
    }
    
     getAllMessages = async () => {
        return await this.messages.getAll();
    }

}