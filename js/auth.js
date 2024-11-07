const loginOverlay = document.getElementById('loginOverlay');
const loginButton = document.getElementById('login-button');

function showLoginOverlay() {
    loginOverlay.style.display = 'flex';
}

function hideLoginOverlay() {
    loginOverlay.style.display = 'none';
}

loginOverlay.addEventListener('click', (e) => {
    if (e.target === loginOverlay) hideLoginOverlay();
});

loginButton.addEventListener('click', showLoginOverlay);

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const passwordToggleButton = document.querySelector('.show-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggleButton.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        passwordToggleButton.textContent = 'Show';
    }
}
