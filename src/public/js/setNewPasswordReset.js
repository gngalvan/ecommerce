const loginForm = document.getElementById('login');
const panelLogin = document.getElementById('panelLogin');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    if (password === passwordConfirm) {
        const reset = {
            password,
            passwordConfirm
        }
        try {
            let loginFetch = await fetch('/api/user/update/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reset)
            });

            let response = await loginFetch.json();
            if (response.status !== 'success') {
                panelLogin.textContent = `${response.error}`;
            } else {
                panelLogin.style.color = 'green';
                panelLogin.textContent = "Password updated";
                const rs = await fetch(`/api/logout`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': `${document.cookie['coderCookieToken']}`
                    }
                });
                window.location.href = '/login';
            }

            loginForm.reset();
        } catch (error) {
            console.error(`Error:", ${error}`)
        }
    } else {
        panelLogin.textContent = "The passwords dont match";
    }
})