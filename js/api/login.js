async function login(event) {
    event.preventDefault();

    const credentials = {
        username: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };

    try {
        const response = await fetch('http://musicboxd-aiven-env.eba-bbjzqugv.eu-north-1.elasticbeanstalk.com/api/auth/login', {
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