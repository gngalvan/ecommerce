const loginForm = document.getElementById('login');
const panelLogin = document.getElementById('panelLogin');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;

  const user = {
    email
  }
  try {
    let loginFetch = await fetch('/api/reset-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    let response = await loginFetch.json();
    if (response.status !== 'success') {
      panelLogin.textContent = "email invalido o no existe";
    } else {
      panelLogin.style.color = 'green';
      panelLogin.textContent = "Correo enviado, revise su buzón";
    }

    loginForm.reset();
  } catch (error) {
    console.error(`Error al realizar la solicitud:", ${error}`);
  }

});