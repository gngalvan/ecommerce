

export default class TicketDTO {
  constructor(purchase, productsAccepted, productsRejected) {
    this.purchase = purchase;
    this.productsAccepted = productsAccepted;
    this.productsRejected = productsRejected;
  }

  generateListProducts() {
    let html = '<table><tr><th>Titulo</th><th>Precio</th><th>Cantidad</th></tr>';
  
    this.productsAccepted.forEach((product) => {
      html += `<tr><td>${product.title}</td><td>${product.price}</td><td>${product.quantity}</td></tr>`;
    });
  
    html += `<tr><td>Total:$${this.purchase.amount}</td></tr></table>`;
    return html;
  }

  getEmail(){
    const ticketEmail= {
      from: "Bolka",
      to: this.purchase.purchaser, 
      subject: "Ticket", 
      html:this.generateListProducts()
    }

    return ticketEmail;
  }
}
