const registerForm = document.getElementById('register');


registerForm.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {
        firstName,
        lastName,
        email,
        password
    }

   const rs = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .catch(error => {
        logger.error(`Error al realizar la solicitud:", ${error}`)
      });

      const response =  await rs.json();
      if(response.status === 'success'){
        window.location.href='/products'
      }else{
        console.error('Error de Registro')
      }

registerForm.reset();
})