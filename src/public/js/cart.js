let isCartExist = localStorage.getItem('cartId') || null;

const modal = document.getElementById("myModal");
const productsTableAcepted = document.getElementById("productsAcepted");
const totalAmount = document.getElementById("totalAmount");
const openModalButton = document.getElementById("openModalButton");
const closeButton = document.getElementsByClassName("close")[0];
const codeLabel = document.getElementById("code");
const emailLabel = document.getElementById("emailuser");
const productsList = document.getElementById("products");
const panelNotificacion = document.getElementById("panelNotificacion");


function navigateTo() {
    window.location.href = '/products/';
}


async function deleteItemCart(element){
    const product = element.closest(".productCart");
    const idItem = product.querySelector("#idItem").textContent;
if(isCartExist){
   const isDelete = await deleteItemCartDB(isCartExist,idItem)
   if(isDelete){
    product.remove();
   }
}

}


const deleteItemCartDB = async (cid, pid) => {

    const rs = await fetch(`/carts/${cid}/product/${pid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }   
    });
    const response = await rs.json();

    return response

}


const deleteCart = async () => {
    if(isCartExist){
const isDeleteCart = await deleteCartDB(isCartExist);
if(isDeleteCart){
    const product = document.getElementById("cards");
    product.remove();
}
    }
}


const deleteCartDB = async (cid) => {

    const rs = await fetch(`/carts/${cid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }   
    });
    const response = await rs.json();

    return response

}


const buy = async () => {
    const rs = await fetch(`/carts/${isCartExist}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }   
    });
    const response = await rs.json();
if(response.status === 'success'){
    if(response.payload.productsAccepted.length){
         codeLabel.textContent = response.payload.purchase.code;
    emailLabel.textContent =  response.payload.purchase.purchaser;
    const productsAcepted = response.payload.productsAccepted;
    totalAmount.textContent=response.payload.purchase.amount;
    if(response.payload.productsRejected.length){
        panelNotificacion.textContent="Products without sufficient stock will remain in your cart"
    }
    productsAcepted.forEach((product) => {
            const row = document.createElement("tr");
            row.innerHTML = `<th>${product.title}</th><th> ${product.price}</th> <th>${product.quantity}</th>`;
            productsTableAcepted.appendChild(row);
          });
    modal.style.display = "block";
    }else{
        alert('The selected products are out of stock')
    }
   
}

    return response
}


closeButton.addEventListener("click", () => {
  modal.style.display = "none";
 window.location.href=`/carts/${isCartExist}`
});