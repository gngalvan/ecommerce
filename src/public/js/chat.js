const socket = io();

function generateNewMessage(message) {
  return `<div class="message" style="border: 1px solid #ccc; padding: 10px; margin: 10px; background-color: #f0f0f0;">
    <p class="title" style="color: rgb(150, 159, 245); font-weight: bold;">${message.email}</p>
    <p class="description" style="font-style: italic;">${message.message}</p>
    <p class="time" style="color: #999; font-size: 12px;">${message.timestamp}</p>
  </div>`;
}

const newMessage = document.querySelector('#newmessage');

newMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const newmsg = {
    email,
    message,
  }
  socket.emit("MESSAGE_ADDED", newmsg)

  document.getElementById("message").value = ""
})

socket.on("ADD_MESSAGE_CHAT", async (message) => {
  message.timestamp = new Date()
  const msg = generateNewMessage(message);
  document.querySelector("#chat").innerHTML += msg;
  let chatBox = document.getElementById("chatGeneral");
  chatBox.scrollTop = chatBox.scrollHeight;
})