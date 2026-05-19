const imagen = document.getElementById('laImagen');
const boton = document.getElementById('btnCambiar');

const img1 = '/img/imagen1.jpeg';
const img2 = '/img/imagen2.jpeg';
const img3 = '/img/imagen3.jpeg';

let estadoImagen = 1;


const cambiar = () => {

  if (estadoImagen === 1) {
    imagen.src = img2;
    estadoImagen = 2;
  }
  else if (estadoImagen === 2) {
    imagen.src = img3;
    estadoImagen = 3;
  }
  else {
    imagen.src = img1;
    estadoImagen = 1;
  }
};

const restaurar = () => imagen.src = img1;

boton.addEventListener('click', cambiar);

imagen.addEventListener('mouseenter', cambiar);

imagen.addEventListener('mouseleave', restaurar);
