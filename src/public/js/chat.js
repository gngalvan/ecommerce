const socket = io();


function generateNewMessage(message) {
  return  `<div class="message">
  <p class="title" style="color: rgb(150, 159, 245);">${message.email}</p>
  <p class="description">${message.message}</p>
  <p class="time">${message.timestamp}</p>
</div>`;
}
const newmessage = document.querySelector('#newmessage');

  newmessage.addEventListener('submit',(e)=>{
    e.preventDefault();
  
    const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  
  const newmsg = {
      email,
   message,

  }
  socket.emit("MESSAGE_ADDED",newmsg)
  

  document.getElementById("message").value =""
  // newmessage.reset();
})


socket.on("ADD_MESSAGE_CHAT",async (message)=>{
  message.timestamp = new Date()
  const msg = generateNewMessage(message);
  document.querySelector("#chat").innerHTML += msg; 
  let chatBox = document.getElementById("chatGeneral"); chatBox.scrollTop = chatBox.scrollHeight;
})