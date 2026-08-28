let seccionActual = 0;

function mostrarSeccion(numero) {

    const secciones = document.querySelectorAll(".seccion");

    secciones.forEach(seccion => {
        seccion.classList.remove("activa");
    });

    secciones[numero].classList.add("activa");

}


function siguienteSeccion() {

    const secciones = document.querySelectorAll(".seccion");

    if (seccionActual < secciones.length - 1) {

        seccionActual++;

        mostrarSeccion(seccionActual);

    }

}


function anteriorSeccion() {

    if (seccionActual > 0) {

        seccionActual--;

        mostrarSeccion(seccionActual);

    }

}