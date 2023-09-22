let isCartExist = localStorage.getItem('cartId') || 0;

const badge = document.getElementById('quantityBadge');

window.addEventListener('load', async () => {
  let counter = 0;
  isCartExist = localStorage.getItem('cartId') || 0;
  if (isCartExist != undefined) {
    const cart = await getCart(isCartExist);
    if (cart) {
      cart.products.forEach((element) => {
        counter += parseInt(element.quantity);
      });
      badge.textContent = counter;
    } else {
      localStorage.removeItem('cartId');
    }
  }
});

function navigateTo(page) {
  window.location.href = '/products?page=' + page;
}

// Función para ir al carrito de compras
function goToCart() {
  if (isCartExist) {
    if (parseInt(badge.textContent) > 0) {
      window.location.href = '/carts/' + isCartExist;
    }
  } else {
    alert("Carrito vacío");
  }
}

// Función para reducir la cantidad de un producto en el carrito
function reduce(element) {
  const quantity = element.parentNode.querySelector('#quantityValue');
  const currentValue = parseInt(quantity.textContent);
  if (currentValue > 1) {
    quantity.textContent = currentValue - 1;
  }
}

// Función para incrementar la cantidad de un producto en el carrito
function increment(element) {
  const quantity = element.parentNode.querySelector('#quantityValue');
  quantity.textContent = parseInt(quantity.textContent) + 1;
}

// Función para agregar un producto al carrito
async function addToCart(element) {
  const product = element.closest(".product");
  const quantityValue = product.querySelector("#quantityValue");
  const pid = product.querySelector("#idProd").textContent;
  const quantity = parseInt(quantityValue.textContent);

  isCartExist = localStorage.getItem('cartId') || null;

  if (isCartExist === null) {
    const newCart = await CreateCart();
    localStorage.setItem('cartId', newCart.payload);
    badge.textContent = parseInt(badge.textContent) + quantity;
    await AddToCartDB(newCart.payload, pid, quantity);
    isCartExist = newCart.payload;
  } else {
    const updateQuantity = await updateQuantityProd(isCartExist, pid, quantity);
    if (updateQuantity.status === 'failed') {
      await AddToCartDB(isCartExist, pid, quantity);
    }
    badge.textContent = parseInt(badge.textContent) + quantity;
  }
}

// Función para obtener información del carrito
const getCart = async (id) => {
  const rs = await fetch(`/carts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `${document.cookie['coderCookieToken']}`
    }
  });
  const response = await rs.json();
  return response;
};

// Función para cerrar sesión
const logout = async () => {
  const rs = await fetch(`/api/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `${document.cookie['coderCookieToken']}`
    }
  });

  const response = await rs.json();
  if(response.status === 'Success'){
    localStorage.removeItem('cartId');
    window.location.href='/login';
  } else {
    console.error(response);
  }
};

// Función para actualizar la cantidad de un producto en el carrito
const updateQuantityProd = async (cid, pid, quantity) => {
  const rs = await fetch(`/carts/${cid}/update/products/${pid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `${document.cookie['coderCookieToken']}`
    },
    body: JSON.stringify({
      "quantity": quantity
    })
  });
  const response = await rs.json();
  return response;
};

// Función para crear un nuevo carrito
const CreateCart = async () => {
  const rs = await fetch('/carts/', {
    method: 'POST',
    headers: {
      'Cookie': `${document.cookie['coderCookieToken']}`
    }
  });
  const response = await rs.json();
  return response;
};

// Función para agregar un producto al carrito en la base de datos
const AddToCartDB = async (cid, pid, quantity) => {
  const rs = await fetch(`/carts/${cid}/products/${pid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `${document.cookie['coderCookieToken']}`
    },
    body: JSON.stringify({
      "quantity": quantity
    })
  });
  const response = await rs.json();
  return response;
};
