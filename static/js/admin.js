// ============================================
// NAVEGACIÓN DEL PANEL ADMINISTRADOR
// ============================================

function mostrarPagina(idPagina) {

```
// Ocultar todas las páginas
const paginas = document.querySelectorAll(".pagina");

paginas.forEach(function (pagina) {

    pagina.classList.remove("activa");

});


// Mostrar la página seleccionada
const paginaSeleccionada = document.getElementById(idPagina);

if (paginaSeleccionada) {

    paginaSeleccionada.classList.add("activa");

}


// Actualizar botón activo del menú
const botonesMenu = document.querySelectorAll(".menu-item");

botonesMenu.forEach(function (boton) {

    boton.classList.remove("activo");

});


// Buscar el botón correspondiente
botonesMenu.forEach(function (boton) {

    const funcion = boton.getAttribute("onclick");

    if (funcion && funcion.includes("'" + idPagina + "'")) {

        boton.classList.add("activo");

    }

});
```

}

// ============================================
// REGISTRAR ESTUDIANTE
// ============================================

function registrarEstudiante() {

```
const dni = document.getElementById("admin_dni").value.trim();

const nombres = document
    .getElementById("admin_nombres")
    .value
    .trim();


const apellidoPaterno = document
    .getElementById("admin_apellido_paterno")
    .value
    .trim();


const apellidoMaterno = document
    .getElementById("admin_apellido_materno")
    .value
    .trim();


const correo = document
    .getElementById("admin_correo")
    .value
    .trim();


const celular = document
    .getElementById("admin_celular")
    .value
    .trim();


const programa = document
    .getElementById("admin_programa")
    .value;


const semestre = document
    .getElementById("admin_semestre")
    .value;



// ========================================
// VALIDACIÓN
// ========================================

if (!dni ||
    !nombres ||
    !apellidoPaterno ||
    !apellidoMaterno ||
    !correo ||
    !celular ||
    !programa ||
    !semestre) {

    alert("Por favor, completa todos los campos.");

    return;

}



// ========================================
// POR AHORA SOLO MOSTRAMOS UN MENSAJE
// ========================================

alert(
    "Estudiante registrado correctamente.\n\n" +
    "DNI: " + dni + "\n" +
    "Estudiante: " +
    nombres + " " +
    apellidoPaterno + " " +
    apellidoMaterno
);


// ========================================
// LIMPIAR FORMULARIO
// ========================================

document.getElementById("admin_dni").value = "";

document.getElementById("admin_nombres").value = "";

document.getElementById("admin_apellido_paterno").value = "";

document.getElementById("admin_apellido_materno").value = "";

document.getElementById("admin_correo").value = "";

document.getElementById("admin_celular").value = "";

document.getElementById("admin_programa").value = "";

document.getElementById("admin_semestre").value = "";


// Volver a estudiantes
mostrarPagina("estudiantes");
```

}
