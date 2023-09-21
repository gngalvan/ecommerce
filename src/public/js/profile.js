const logout =  async () => {
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
        window.location.href='/login'
    }else{
        console.error(response)
    }

}

