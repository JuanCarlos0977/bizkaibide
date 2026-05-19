
document.addEventListener("DOMContentLoaded", () => {
    const formularioRegistro = document.getElementById("formRegistro");
    const botonRegistrar = document.getElementById("btnRegistrarse");
    const aceptoCheckbox = document.getElementById("acepto");

    if (!formularioRegistro || !botonRegistrar || !aceptoCheckbox) return;

    // Deshabilitar botón de enviar si no se aceptan las condiciones al cargar
    botonRegistrar.disabled = !aceptoCheckbox.checked;

    // Escuchar el cambio en el checkbox para habilitar/deshabilitar botón
    aceptoCheckbox.addEventListener("change", () => {
        botonRegistrar.disabled = !aceptoCheckbox.checked;
    });

    // Escuchar envío del formulario
    formularioRegistro.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            alert("❌ ¡Error! Las contraseñas no coinciden. Por favor, vuelve a intentarlo.");
            return;
        }

        // Simular registro exitoso
        alert(`¡Felicidades ${nombre}! 🎉\nTu cuenta con el correo (${email}) ha sido creada con éxito. Ahora puedes iniciar sesión.`);

        // Limpiar el formulario y redireccionar al login
        formularioRegistro.reset();
        botonRegistrar.disabled = true;
        
        window.location.href = "../ilogin/ilogin.html";
    });
});
