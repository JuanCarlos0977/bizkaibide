
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".form-contacto");
    const checkbox = document.getElementById("acepto");
    const botonEnviar = formulario?.querySelector('button[type="submit"]');

    if (!formulario || !checkbox || !botonEnviar) return;

    botonEnviar.disabled = !checkbox.checked;

    checkbox.addEventListener("change", () => {
        botonEnviar.disabled = !checkbox.checked;
    });
});
