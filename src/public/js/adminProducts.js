const logout = async () => {
    const rs = await fetch(`/api/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }
    });

    const response = await rs.json();
    if (response.status === 'Success') {
        localStorage.removeItem('cartId');
        window.location.href = '/login';
    } else {
        console.error(response);
    }
}

// Función para eliminar un producto
async function deleteProduct(element) {
    const user = element.closest(".productCart");
    const idItem = user.querySelector("#idItem").textContent;
    if (idItem) {
        const isDelete = await deleteProd(idItem);
        if (isDelete) {
            user.remove();
        }
    }
}

// Función para enviar una solicitud de eliminación de producto
async function deleteProd(id) {
    const rs = await fetch(`/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }
    });
    const response = await rs.json();

    return response;
}

const addProduct = document.getElementById('send');
const panelAddProd = document.getElementById('panelAddProd');

addProduct.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const thumbnails = document.getElementById('thumbnails').value;
    const code = document.getElementById('code').value;
    const category = document.getElementById('category').value;
    const stock = document.getElementById('stock').value;
    const price = document.getElementById('price').value;
    const status = document.getElementById('status').value;

    const productData = {
        title: title,
        description: description,
        thumbnails: thumbnails,
        code: code,
        category: category,
        stock: stock,
        price: price,
        status: status,
    };

    try {
        let addProdFetch = await fetch('/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        let response = await addProdFetch.json();
        if (response.data != 'Producto Agregado!') {
            panelAddProd.textContent = "Error al agregar el producto";
        } else {
            window.location.href = '/admin/console/products/';
        }

        addProduct.reset();
    } catch (error) {
        console.error(`Error al realizar la solicitud:", ${error}`);
    }
});
