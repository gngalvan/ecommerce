async function deleteItemUser(element) {
    const user = element.closest(".productCart");
    const idItem = user.querySelector("#idItem").textContent;
    if (idItem) {
        const isDelete = await deleteUser(idItem);
        if (isDelete) {
            user.remove();
        }
    }
}

// Función para enviar una solicitud de eliminación de usuario
async function deleteUser(id) {
    const rs = await fetch(`/api/user/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }
    });
    const response = await rs.json();

    return response;
}

// Función para eliminar usuarios infrecuentes
async function deleteUsersInfrequent() {
    const rs = await fetch(`/api/users/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }
    });
    const response = await rs.json();

    return response;
}

// Función para cambiar el rol de un usuario
async function changeRol(element) {
    const user = element.closest(".productCart");
    const idItem = user.querySelector("#idItem").textContent;
    const rol = user.querySelector('#opcionRolSelect').value;
    if (idItem) {
        const isChange = await changeRolUser(idItem, rol);
        if (isChange) {
            user.querySelector('#role').textContent = `${rol}`;
        }
    }
}

// Función para enviar una solicitud de cambio de rol de usuario
async function changeRolUser(id, rol) {
    const rs = await fetch(`/api/user/update/rol/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        },
        body: JSON.stringify({
            "rol": rol
        })
    });
    const response = await rs.json();

    return response;
}