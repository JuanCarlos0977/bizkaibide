const fechaDia = new Date();
meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]

const dia = fechaDia.getDate() + " de " + meses[fechaDia.getMonth()] + " de " + fechaDia.getFullYear();
const diaSemana = dias[fechaDia.getDay()];

document.getElementById("fechaDia").innerHTML = "<p>" + diaSemana + ", " + dia + "</p>";