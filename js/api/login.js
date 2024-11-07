async function login(event) {
    event.preventDefault();

    const credentials = {
        username: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) throw new Error('Login failed');

        const data = await response.json();
        console.log(data);
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('refreshJwt', data.refreshJwt);

        localStorage.setItem('userRole', data.userRole);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);

        hideLoginOverlay();

        alert('Login successful!');
    } catch (error) {
        console.error(error);
        alert('Invalid login credentials. Please try again.');
    }
}

window.onclick = function(event) {
    if (event.target === loginOverlay) {
        hideLoginOverlay();
    }
};