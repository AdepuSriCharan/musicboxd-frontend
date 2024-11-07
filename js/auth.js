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

function togglePassword(button) {
    const passwordInput = button.previousElementSibling;
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        button.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        button.textContent = 'Show';
    }
}

