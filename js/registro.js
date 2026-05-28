
const API_BASE_URL = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', () => {
    const formularioRegistro = document.getElementById('formRegistro');
    const botonRegistrar = document.getElementById('btnRegistrarse');
    const aceptoCheckbox = document.getElementById('acepto');

    if (!formularioRegistro || !botonRegistrar || !aceptoCheckbox) return;

    botonRegistrar.disabled = !aceptoCheckbox.checked;
    aceptoCheckbox.addEventListener('change', () => {
        botonRegistrar.disabled = !aceptoCheckbox.checked;
    });

    formularioRegistro.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('❌ ¡Error! Las contraseñas no coinciden. Por favor, vuelve a intentarlo.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Error al registrar el usuario');
            }

            alert(`¡Felicidades ${data.nombre}! 🎉\nTu cuenta ha sido creada con éxito. Ahora puedes iniciar sesión.`);
            formularioRegistro.reset();
            botonRegistrar.disabled = true;
            window.location.href = '../ilogin/ilogin.html';
        } catch (error) {
            alert(error.message);
        }
    });
});
