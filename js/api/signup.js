function showLoginOverlay() {
    document.getElementById('loginOverlay').style.display = 'flex';
    document.getElementById('signupOverlay').style.display = 'none';
}

function showSignupOverlay() {
    document.getElementById('signupOverlay').style.display = 'flex';
    document.getElementById('loginOverlay').style.display = 'none';
}

function hideLoginOverlay() {
    document.getElementById('loginOverlay').style.display = 'none';
}

async function signup(event) {
    event.preventDefault();
    const signUpData = {
        name: document.getElementById('name').value,
        username: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:8080/api/auth/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signUpData)
        });

        if (!response.ok) throw new Error('Sign up failed');

        const data = await response.json();
        console.log(data);

        alert('Sign up successful! Login Now!');
        hideLoginOverlay(); 
    } catch (error) {
        console.error(error);
        alert('Sign up failed. Please try again.');
    }
}

window.onclick = function(event) {
    if (event.target === signupOverlay) {
        hideSignupOverlay();
    }
};
