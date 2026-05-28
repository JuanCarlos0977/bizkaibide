
const API_BASE_URL = 'http://localhost:4000';
const formularioLogin = document.getElementById('formLogin');
const botonEntrar = formularioLogin.querySelector('button[type="submit"]');
const aceptoCondiciones = document.getElementById('acepto');

botonEntrar.disabled = true;
aceptoCondiciones.addEventListener('change', () => {
  botonEntrar.disabled = !aceptoCondiciones.checked;
});

formularioLogin.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const correo = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: correo, password: pass })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    localStorage.setItem('bizkaibideUser', JSON.stringify(data));
    window.location.href = 'informacion.html';
  } catch (error) {
    alert(error.message);
  }

  formularioLogin.reset();
  botonEntrar.disabled = true;
});
