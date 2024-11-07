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
    console.log(document.getElementById('signupEmail').value);

    confirmPassword = document.getElementById('confirmPassword').value
    const signUpData = {
        name: document.getElementById('name').value,
        username: document.getElementById('signupEmail').value,
        password: document.getElementById('signupPassword').value
    };

    if (signUpData.password !== confirmPassword) {
        alert('Passwords do not match. Please re-enter.');
        return;
    }

    try {
        const response = await fetch('http://musicboxd-aiven-env.eba-bbjzqugv.eu-north-1.elasticbeanstalk.com/api/auth/user/signup', {
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
