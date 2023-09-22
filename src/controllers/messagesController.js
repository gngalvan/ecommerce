import { saveNewMessage, getAllMessages } from "../service/messagesServices.js";

const saveMessage = async (req, res) => {
  try {
    const msg = req.body;
    const message = await saveNewMessage(msg);
    if (message) {
      res.send("Mensaje Agregado!");
    }
  } catch (error) {
    logger.error(`Error al realizar la solicitud:", ${error}`);
    res.status(400).send().json({
      error: error
    });
  }
};

const getAllMsg = async (req, res) => {
  const messages = await getAllMessages();
  res.render('chat', { messages });
};

export {
  saveMessage,
  getAllMsg
};