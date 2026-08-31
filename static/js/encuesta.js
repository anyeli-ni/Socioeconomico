// =========================================================
// ENCUESTA SOCIOECONÓMICA
// encuesta.js
// =========================================================


// =========================================================
// 1. VARIABLES GENERALES
// =========================================================

let seccionActual = 0;

let familiares = [];


// =========================================================
// 2. NAVEGACIÓN ENTRE SECCIONES
// =========================================================

function mostrarSeccion(numero) {

    const secciones = document.querySelectorAll(".seccion");

    secciones.forEach(seccion => {
        seccion.classList.remove("activa");
    });

    if (secciones[numero]) {
        secciones[numero].classList.add("activa");
    }
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


// =========================================================
// 3. MOTIVO DE LA BECA
// =========================================================

function mostrarOtroMotivo(valor) {

    const campo =
        document.getElementById("campo_otro_motivo");

    const input =
        document.getElementById("otro_motivo");


    if (!campo || !input) {
        return;
    }


    if (valor === "otro") {

        campo.style.display = "flex";

        input.required = true;

        input.focus();

    } else {

        campo.style.display = "none";

        input.required = false;

        input.value = "";
    }
}


// =========================================================
// 4. FAMILIARES
// =========================================================


// ---------------------------------------------------------
// AGREGAR FAMILIAR
// ---------------------------------------------------------

function agregarFamiliar() {

    const nombre =
        document.getElementById("familiar_nombre").value.trim();

    const parentesco =
        document.getElementById("parentesco").value;

    const sexo =
        document.getElementById("sexo_familiar").value;

    const edad =
        document.getElementById("edad_familiar").value;

    const estadoCivil =
        document.getElementById("estado_civil_familiar").value;

    const instruccion =
        document.getElementById("instruccion_familiar").value;

    const ocupacion =
        document.getElementById("ocupacion_familiar").value.trim();

    const ingreso =
        document.getElementById("ingreso_familiar").value;


    // -----------------------------------------------------
    // VALIDAR
    // -----------------------------------------------------

    if (
        !nombre ||
        !parentesco ||
        !sexo ||
        !edad ||
        !estadoCivil ||
        !instruccion ||
        !ocupacion ||
        !ingreso
    ) {

        alert(
            "Por favor, completa todos los campos del familiar."
        );

        return;
    }


    // -----------------------------------------------------
    // CREAR OBJETO
    // -----------------------------------------------------

    const familiar = {

        nombre: nombre,

        parentesco: parentesco,

        sexo: sexo,

        edad: edad,

        estadoCivil: estadoCivil,

        instruccion: instruccion,

        ocupacion: ocupacion,

        ingreso: parseFloat(ingreso)
    };


    // -----------------------------------------------------
    // GUARDAR
    // -----------------------------------------------------

    familiares.push(familiar);


    // -----------------------------------------------------
    // MOSTRAR EN TABLA
    // -----------------------------------------------------

    mostrarFamiliares();


    // -----------------------------------------------------
    // LIMPIAR FORMULARIO
    // -----------------------------------------------------

    limpiarFormularioFamiliar();
}


// ---------------------------------------------------------
// MOSTRAR FAMILIARES
// ---------------------------------------------------------

function mostrarFamiliares() {

    const tabla =
        document.getElementById("tablaFamilia");

    const contador =
        document.getElementById("contadorFamilia");

    const mensaje =
        document.getElementById("mensajeFamilia");


    if (!tabla || !contador || !mensaje) {
        return;
    }


    tabla.innerHTML = "";


    familiares.forEach((familiar, index) => {

        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td class="numero-familiar">
                ${String(index + 1).padStart(2, "0")}
            </td>

            <td>
                ${familiar.nombre}
            </td>

            <td>
                ${familiar.parentesco}
            </td>

            <td>
                ${familiar.sexo}
            </td>

            <td>
                ${familiar.edad}
            </td>

            <td>
                ${familiar.estadoCivil}
            </td>

            <td>
                ${familiar.instruccion}
            </td>

            <td>
                ${familiar.ocupacion}
            </td>

            <td class="ingreso-familiar">
                S/. ${familiar.ingreso.toFixed(2)}
            </td>

            <td>

                <button
                    type="button"
                    class="btn-eliminar-familiar"
                    onclick="eliminarFamiliar(${index})"
                    title="Eliminar familiar"
                >
                    ×
                </button>

            </td>

        `;


        tabla.appendChild(fila);

    });


    // -----------------------------------------------------
    // CONTADOR
    // -----------------------------------------------------

    const cantidad =
        familiares.length;


    if (cantidad === 0) {

        contador.textContent =
            "0 integrantes registrados";

        mensaje.style.display =
            "block";

    }

    else if (cantidad === 1) {

        contador.textContent =
            "1 integrante registrado";

        mensaje.style.display =
            "none";

    }

    else {

        contador.textContent =
            cantidad + " integrantes registrados";

        mensaje.style.display =
            "none";
    }
}


// ---------------------------------------------------------
// ELIMINAR FAMILIAR
// ---------------------------------------------------------

function eliminarFamiliar(index) {

    const confirmar =
        confirm(
            "¿Deseas eliminar este integrante?"
        );


    if (!confirmar) {
        return;
    }


    familiares.splice(index, 1);


    mostrarFamiliares();
}


// ---------------------------------------------------------
// LIMPIAR FORMULARIO
// ---------------------------------------------------------

function limpiarFormularioFamiliar() {

    document.getElementById(
        "familiar_nombre"
    ).value = "";


    document.getElementById(
        "parentesco"
    ).value = "";


    document.getElementById(
        "sexo_familiar"
    ).value = "";


    document.getElementById(
        "edad_familiar"
    ).value = "";


    document.getElementById(
        "estado_civil_familiar"
    ).value = "";


    document.getElementById(
        "instruccion_familiar"
    ).value = "";


    document.getElementById(
        "ocupacion_familiar"
    ).value = "";


    document.getElementById(
        "ingreso_familiar"
    ).value = "";


    document.getElementById(
        "familiar_nombre"
    ).focus();
}


// =========================================================
// 5. CONVIVENCIA FAMILIAR
// =========================================================

function configurarConvivencia() {

    const opcionesVive =
        document.querySelectorAll(".vive-con");

    const opcionSolo =
        document.getElementById("vive_solo");


    if (!opcionesVive.length || !opcionSolo) {
        return;
    }


    opcionesVive.forEach(opcion => {

        opcion.addEventListener(
            "change",
            function () {


                // -----------------------------------------
                // SOLO(A)
                // -----------------------------------------

                if (
                    this.id === "vive_solo" &&
                    this.checked
                ) {

                    opcionesVive.forEach(otra => {

                        if (otra !== opcionSolo) {
                            otra.checked = false;
                        }

                    });

                }


                // -----------------------------------------
                // OTRA OPCIÓN
                // -----------------------------------------

                else if (
                    this.id !== "vive_solo" &&
                    this.checked
                ) {

                    opcionSolo.checked = false;
                }

            }
        );

    });
}


// =========================================================
// 6. DEPENDENCIA ECONÓMICA
// =========================================================

function mostrarOtraDependencia(valor) {

    const campo =
        document.getElementById(
            "campo_dependencia_otro"
        );

    const input =
        document.getElementById(
            "dependencia_otro"
        );


    if (!campo || !input) {
        return;
    }


    if (valor === "otro") {

        campo.style.display = "flex";

        input.required = true;

        input.focus();

    }

    else {

        campo.style.display = "none";

        input.required = false;

        input.value = "";
    }
}


// =========================================================
// 7. SITUACIÓN LABORAL
// =========================================================

function actualizarSituacionLaboral() {

    const trabaja =
        document.querySelector(
            'input[name="trabaja_actualmente"]:checked'
        );


    const campoContinuara =
        document.getElementById(
            "campo_continuara_trabajando"
        );


    const grupoLaboral =
        document.getElementById(
            "grupo_informacion_laboral"
        );


    if (
        !trabaja ||
        !campoContinuara ||
        !grupoLaboral
    ) {
        return;
    }


    // =====================================================
    // SI ACTUALMENTE TRABAJA
    // =====================================================

    if (trabaja.value === "si") {

        grupoLaboral.style.display =
            "block";

        campoContinuara.style.display =
            "flex";


        // Hacer obligatorios los campos laborales

        document.getElementById(
            "nombre_empresa"
        ).required = true;


        document.getElementById(
            "cargo"
        ).required = true;


        document.getElementById(
            "sueldo_mensual"
        ).required = true;


        document
            .querySelectorAll(
                'input[name="tipo_trabajo"]'
            )
            .forEach(input => {
                input.required = true;
            });


    }


    // =====================================================
    // SI NO TRABAJA
    // =====================================================

    else {

        grupoLaboral.style.display =
            "none";

        campoContinuara.style.display =
            "none";


        // -----------------------------------------------
        // LIMPIAR CAMPOS
        // -----------------------------------------------

        document.getElementById(
            "nombre_empresa"
        ).value = "";


        document.getElementById(
            "cargo"
        ).value = "";


        document.getElementById(
            "sueldo_mensual"
        ).value = "";


        // -----------------------------------------------
        // QUITAR REQUIRED
        // -----------------------------------------------

        document.getElementById(
            "nombre_empresa"
        ).required = false;


        document.getElementById(
            "cargo"
        ).required = false;


        document.getElementById(
            "sueldo_mensual"
        ).required = false;


        // -----------------------------------------------
        // LIMPIAR TIPO DE TRABAJO
        // -----------------------------------------------

        document
            .querySelectorAll(
                'input[name="tipo_trabajo"]'
            )
            .forEach(input => {

                input.checked = false;

                input.required = false;

            });


        // -----------------------------------------------
        // LIMPIAR CONTINUARÁ
        // -----------------------------------------------

        document
            .querySelectorAll(
                'input[name="continuara_trabajando"]'
            )
            .forEach(input => {

                input.checked = false;

            });

    }

}


// =========================================================
// 8. INICIALIZACIÓN
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // -----------------------------------------------
        // CONVIVENCIA
        // -----------------------------------------------

        configurarConvivencia();


        // -----------------------------------------------
        // PRIMERA SECCIÓN
        // -----------------------------------------------

        mostrarSeccion(seccionActual);


        // -----------------------------------------------
        // INICIAR DEPENDENCIA
        // -----------------------------------------------

        const dependencia =
            document.getElementById(
                "dependencia_economica"
            );


        if (dependencia) {

            mostrarOtraDependencia(
                dependencia.value
            );

        }


        // -----------------------------------------------
        // INICIAR SITUACIÓN LABORAL
        // -----------------------------------------------

        actualizarSituacionLaboral();

    }
);


// =========================================================
// 7. VIVIENDA Y SERVICIOS
// =========================================================


// ---------------------------------------------------------
// OTRO TIPO DE TENENCIA
// ---------------------------------------------------------

function mostrarOtraTenencia(valor) {

    const campo = document.getElementById("campo_tenencia_otro");
    const input = document.getElementById("tenencia_otro");

    if (!campo || !input) {
        return;
    }

    if (valor === "otro") {

        campo.style.display = "flex";

        input.required = true;

        input.focus();

    } else {

        campo.style.display = "none";

        input.required = false;

        input.value = "";

    }
}


// ---------------------------------------------------------
// OTRO TIPO DE VIVIENDA
// ---------------------------------------------------------

function mostrarOtroTipoVivienda(valor) {

    const campo = document.getElementById("campo_tipo_vivienda_otro");
    const input = document.getElementById("tipo_vivienda_otro");

    if (!campo || !input) {
        return;
    }

    if (valor === "otro") {

        campo.style.display = "flex";

        input.required = true;

        input.focus();

    } else {

        campo.style.display = "none";

        input.required = false;

        input.value = "";

    }
}


// ---------------------------------------------------------
// OTRO MATERIAL
// ---------------------------------------------------------

function mostrarOtroMaterial(valor) {

    const campo = document.getElementById("campo_material_otro");
    const input = document.getElementById("material_otro");

    if (!campo || !input) {
        return;
    }

    if (valor === "otro") {

        campo.style.display = "flex";

        input.required = true;

        input.focus();

    } else {

        campo.style.display = "none";

        input.required = false;

        input.value = "";

    }
}

// =========================================================
// 7. ALIMENTACIÓN
// =========================================================


// ---------------------------------------------------------
// MOSTRAR OTRO LUGAR DE ALIMENTACIÓN
// ---------------------------------------------------------

function mostrarOtroLugarAlimentacion(valor) {

    const campo = document.getElementById(
        "campo_lugar_alimentacion_otro"
    );

    const input = document.getElementById(
        "lugar_alimentacion_otro"
    );


    if (!campo || !input) {
        return;
    }


    if (valor === "otro") {

        campo.style.display = "flex";

        input.required = true;

        input.focus();

    } else {

        campo.style.display = "none";

        input.required = false;

        input.value = "";

    }

}

// =========================================================
// MOSTRAR OTRA COMIDA
// =========================================================

function mostrarOtraComida(seleccionado) {

    const campo = document.getElementById(
        "campo_comida_otro"
    );

    const input = document.getElementById(
        "comida_otro"
    );


    if (!campo || !input) {
        return;
    }


    if (seleccionado) {

        campo.style.display = "flex";

        input.required = true;

        input.focus();

    } else {

        campo.style.display = "none";

        input.required = false;

        input.value = "";

    }

}

// =========================================================
// SECCIÓN 8 - SALUD
// =========================================================


// ---------------------------------------------------------
// OTRO SEGURO
// ---------------------------------------------------------

function mostrarOtroSeguro(valor) {

    const campo = document.getElementById("campo_seguro_otro");
    const input = document.getElementById("seguro_otro");

    if (valor === "otro") {

        campo.style.display = "flex";
        input.required = true;
        input.focus();

    } else {

        campo.style.display = "none";
        input.required = false;
        input.value = "";

    }
}


// ---------------------------------------------------------
// PROBLEMA DE SALUD
// ---------------------------------------------------------

function mostrarProblemaSalud(mostrar) {

    const campo = document.getElementById("campo_problema_salud");
    const input = document.getElementById("problema_salud");

    if (mostrar) {

        campo.style.display = "flex";

    } else {

        campo.style.display = "none";
        input.value = "";

    }
}


// ---------------------------------------------------------
// DISCAPACIDAD
// ---------------------------------------------------------

function mostrarDiscapacidad(mostrar) {

    const campo = document.getElementById("campo_tipo_discapacidad");
    const input = document.getElementById("tipo_discapacidad");

    if (mostrar) {

        campo.style.display = "flex";

    } else {

        campo.style.display = "none";
        input.value = "";

    }
}


// ---------------------------------------------------------
// ENFERMEDAD
// ---------------------------------------------------------

function mostrarEnfermedad(mostrar) {

    const campo = document.getElementById("campo_nombre_enfermedad");
    const input = document.getElementById("nombre_enfermedad");

    if (mostrar) {

        campo.style.display = "flex";

    } else {

        campo.style.display = "none";
        input.value = "";

    }
}


// ---------------------------------------------------------
// MEDICAMENTO
// ---------------------------------------------------------

function mostrarMedicamento(mostrar) {

    const campo = document.getElementById("campo_nombre_medicamento");
    const input = document.getElementById("nombre_medicamento");

    if (mostrar) {

        campo.style.display = "flex";

    } else {

        campo.style.display = "none";
        input.value = "";

    }
}


// ---------------------------------------------------------
// ESTUDIOS ADICIONALES
// ---------------------------------------------------------

function mostrarEstudio(mostrar) {

    const campo = document.getElementById("campo_nombre_estudio");
    const input = document.getElementById("nombre_estudio");

    if (mostrar) {

        campo.style.display = "flex";

    } else {

        campo.style.display = "none";
        input.value = "";

    }
}
