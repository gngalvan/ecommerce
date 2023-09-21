const socket = io();


 function generateProduct(product) {
    return  `<div class="product" id=${"product-"+product._id}>
    <p>id:</p>
    <p class="id">${product._id}</p>
    <p>Title:</p>
    <p class="title">${product.title}</p>
      <img class="image" src="${product.thumbnails[0]}"></img>
      <p>Description:</p>
      <p class="description">${product.description}</p>
      <p>Price:</p>
      <p class="price">${product.price}</p>
      <p>Stock:</p>
      <p class="stock">${product.stock}</p>
    </div>`;
  }



socket.on("SEND_PRODUCTS", async (response) => {
   response.forEach(element => {
   const prod = generateProduct(element);
    document.querySelector("#products").innerHTML += prod; 
   });
      
    });


 const addproduct = document.querySelector('#send');
 
 
 
 addproduct.addEventListener('submit',(e)=>{
   e.preventDefault();
    
      const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const thumbnails = document.getElementById("thumbnails").value;
    const code = document.getElementById("code").value;
    const category = document.getElementById("category").value;
    const stock = document.getElementById("stock").value;
    const status = document.getElementById("status").checked;
    
    const prod = {
        title,
     price,
     description,
     thumbnails,
      category,
      code,
      stock,
      status
    }
    socket.emit("PRODUCT_ADDED",prod)
    
    addproduct.reset();
  })
  

const deleteProduct = document.querySelector('#delete');

deleteProduct.addEventListener('submit',(e)=>{
    e.preventDefault();
    const id = document.getElementById("id").value;
    if(id){
       socket.emit("PRODUCT_DELETE",id); 
    }
    deleteProduct.reset()
})

socket.on("PRODUCT_DELETED",id=>{
     document.querySelector(`#product-${id}`).remove();
})

    socket.on("ADD_PRODUCT",(element)=>{
        const product = generateProduct(element)
document.querySelector("#products").innerHTML+=product
    })