import {messagesRepository} from '../repositories/index.js';


const saveNewMessage = async (msg) => {
    return await messagesRepository.saveNewMessage();
}

const getAllMessages = async () => {
    return await messagesRepository.getAllMessages();
}


export {
    saveNewMessage,getAllMessages
}