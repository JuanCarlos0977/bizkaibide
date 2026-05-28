function getLoggedUser() {
    try {
        return JSON.parse(localStorage.getItem('bizkaibideUser')) || null;
    } catch {
        return null;
    }
}

function requireLogin() {
    const user = getLoggedUser();
    if (!user) {
        window.location.href = '../ilogin/ilogin.html';
        return null;
    }
    return user;
}

function renderLoggedUser(selector) {
    const user = requireLogin();
    if (!user) return;

    const element = document.querySelector(selector);
    if (element) {
        element.textContent = `Bienvenido, ${user.nombre}`;
    }
}
