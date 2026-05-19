
const formularioLogin = document.getElementById('formLogin');
const botonEntrar = formularioLogin.querySelector('button[type="submit"]');
const aceptoCondiciones = document.getElementById('acepto');

// Usuario 
const usuarioEjemplo = {
  correo: 'juan@juan.es',
  pass: '1234567'
};

botonEntrar.disabled = true;
aceptoCondiciones.addEventListener('change', function () {
  botonEntrar.disabled = !aceptoCondiciones.checked;
});

formularioLogin.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const correo = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value;

  if (correo === usuarioEjemplo.correo && pass === usuarioEjemplo.pass) {
    alert('¡Iniciaste sesión con éxito!');
    window.location.href = 'informacion.html';
  } 
  else {
    alert('Usuario o contraseña incorrectos. PONER juan@juan.es / 1234567');
  }

  formularioLogin.reset();
  botonEntrar.disabled = true;
});
