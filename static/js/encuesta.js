// Verificar sesión antes de mostrar la encuesta
document.addEventListener('DOMContentLoaded', async function() {
    
    // Verificar si hay sesión activa
    const { data: { session } } = await supabaseClient.auth.getSession();
    
    if (!session) {
        // No hay sesión, redirigir al login
        alert('Debes iniciar sesión para acceder a la encuesta.');
        window.location.href = 'index.html';
        return;
    }
    
    console.log('✅ Sesión activa:', session.user.email);

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


//--------------------------------------


async function guardarEncuesta() {
    
    // Verificar que la declaración jurada esté aceptada
    const acepta = document.getElementById('acepta_declaracion').checked;
    
    if (!acepta) {
        alert('Debes aceptar la declaración jurada para continuar.');
        return;
    }
    
    // Mostrar estado de carga
    const btnGuardar = document.querySelector('.btn-principal');
    btnGuardar.textContent = 'Guardando...';
    btnGuardar.disabled = true;
    
    try {
        // 1. INSERTAR ESTUDIANTE
        const { data: estudiante, error: errorEstudiante } = await window.supabaseClient
            .from('estudiantes')
            .insert([{
                dni: document.getElementById('dni').value,
                apellido_paterno: document.getElementById('apellido_paterno').value,
                apellido_materno: document.getElementById('apellido_materno').value,
                nombres: document.getElementById('nombres').value,
                fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
                edad: parseInt(document.getElementById('edad').value) || null,
                sexo: document.querySelector('input[name="sexo"]:checked')?.value || null,
                email: document.getElementById('correo').value,
                celular: document.getElementById('celular').value,
                telefono: document.getElementById('telefono').value || null,
                estado_civil: document.getElementById('estado_civil').value,
                numero_hijos: parseInt(document.getElementById('numero_hijos').value) || 0,
                departamento_nacimiento: document.getElementById('departamento_nacimiento').value,
                provincia_nacimiento: document.getElementById('provincia_nacimiento').value,
                distrito_nacimiento: document.getElementById('distrito_nacimiento').value,
                domicilio: document.getElementById('domicilio').value,
                zona: document.getElementById('zona').value,
                departamento_domicilio: document.getElementById('departamento_domicilio').value,
                provincia_domicilio: document.getElementById('provincia_domicilio').value,
                distrito_domicilio: document.getElementById('distrito_domicilio').value,
                institucion_procedencia: document.getElementById('institucion_procedencia').value,
                tipo_institucion: document.getElementById('tipo_institucion').value,
                repitio_anio: document.querySelector('input[name="repitio"]:checked')?.value === 'si',
                beca_completa: document.querySelector('input[name="beca_completa"]:checked')?.value === 'si',
                beca_parcial: document.querySelector('input[name="beca_parcial"]:checked')?.value || null,
                motivo_beca: document.getElementById('motivo_beca').value,
                otro_motivo_beca: document.getElementById('otro_motivo').value || null,
                programa_estudios: document.getElementById('programa').value,
                semestre: parseInt(document.getElementById('semestre').value) || null,
                unidades_matriculadas: parseInt(document.getElementById('unidades_matriculadas').value) || 0,
                unidades_desaprobadas: parseInt(document.getElementById('unidades_desaprobadas').value) || 0
            }])
            .select();
        
        if (errorEstudiante) throw errorEstudiante;
        
        const idEstudiante = estudiante[0].id_estudiante;
        console.log('✅ Estudiante guardado con ID:', idEstudiante);
        
        // 2. CREAR FICHA
        const anioActual = new Date().getFullYear();
        
        const { data: ficha, error: errorFicha } = await window.supabaseClient
            .from('fichas_socioeconomicas')
            .insert([{
                id_estudiante: idEstudiante,
                anio_ficha: anioActual,
                estado_ficha: 'completada'
            }])
            .select();
        
        if (errorFicha) throw errorFicha;
        
        const idFicha = ficha[0].id_ficha;
        console.log('✅ Ficha creada con ID:', idFicha);
        
        // 3. GUARDAR FAMILIARES
        if (familiares.length > 0) {
            const familiaresParaInsertar = familiares.map(f => ({
                id_ficha: idFicha,
                nombres_apellidos: f.nombre,
                parentesco: f.parentesco,
                sexo: f.sexo,
                edad: parseInt(f.edad),
                estado_civil: f.estadoCivil,
                grado_instruccion: f.instruccion,
                ocupacion: f.ocupacion,
                ingreso_mensual: f.ingreso
            }));
            
            const { error: errorFamiliares } = await window.supabaseClient
                .from('familiares')
                .insert(familiaresParaInsertar);
            
            if (errorFamiliares) throw errorFamiliares;
            console.log('✅ Familiares guardados:', familiares.length);
        }
        
        // 4. GUARDAR SITUACIÓN FAMILIAR
        const situacionFamiliar = {
            id_ficha: idFicha,
            vive_con_padre: document.querySelector('input[value="padre"]')?.checked || false,
            vive_con_madre: document.querySelector('input[value="madre"]')?.checked || false,
            vive_con_hermanos: document.querySelector('input[value="hermanos"]')?.checked || false,
            vive_con_conyuge: document.querySelector('input[value="conyuge"]')?.checked || false,
            vive_con_hijos: document.querySelector('input[value="hijos"]')?.checked || false,
            vive_con_otros_familiares: document.querySelector('input[value="otros_familiares"]')?.checked || false,
            vive_con_amigos: document.querySelector('input[value="amigos"]')?.checked || false,
            vive_solo: document.querySelector('input[value="solo"]')?.checked || false,
            relaciones_familiares: document.getElementById('relaciones_familiares').value,
            apoderado_nombre: document.getElementById('apoderado_nombre').value,
            apoderado_parentesco: document.getElementById('apoderado_parentesco').value,
            apoderado_celular: document.getElementById('apoderado_celular').value,
            apoderado_ocupacion: document.getElementById('apoderado_ocupacion').value || null
        };
        
        const { error: errorSituacion } = await window.supabaseClient
            .from('situacion_familiar')
            .insert([situacionFamiliar]);
        
        if (errorSituacion) throw errorSituacion;
        console.log('✅ Situación familiar guardada');
        
        // 5. GUARDAR VIDA SOCIAL
        const vidaSocial = {
            id_ficha: idFicha,
            hace_amigos: document.querySelector('input[name="hace_amigos"]:checked')?.value === 'si',
            prefiere_estar_solo: document.querySelector('input[name="prefiere_estar_solo"]:checked')?.value === 'si',
            deportes: document.getElementById('deportes').value || null,
            tiempo_libre: document.getElementById('tiempo_libre').value || null
        };
        
        const { error: errorVidaSocial } = await window.supabaseClient
            .from('vida_social')
            .insert([vidaSocial]);
        
        if (errorVidaSocial) throw errorVidaSocial;
        console.log('✅ Vida social guardada');
        
        // 6. GUARDAR ASPECTO ECONÓMICO
        const aspectoEconomico = {
            id_ficha: idFicha,
            dependencia_economica: document.getElementById('dependencia_economica').value,
            dependencia_otro: document.getElementById('dependencia_otro').value || null,
            trabaja_actualmente: document.querySelector('input[name="trabaja_actualmente"]:checked')?.value === 'si',
            continuara_trabajando: document.querySelector('input[name="continuara_trabajando"]:checked')?.value === 'si' || null,
            nombre_empresa: document.getElementById('nombre_empresa').value || null,
            cargo: document.getElementById('cargo').value || null,
            tipo_trabajo: document.querySelector('input[name="tipo_trabajo"]:checked')?.value || null,
            sueldo_mensual: parseFloat(document.getElementById('sueldo_mensual').value) || null
        };
        
        const { error: errorEconomico } = await window.supabaseClient
            .from('aspecto_economico')
            .insert([aspectoEconomico]);
        
        if (errorEconomico) throw errorEconomico;
        console.log('✅ Aspecto económico guardado');
        
        // 7. GUARDAR VIVIENDA
        const vivienda = {
            id_ficha: idFicha,
            tenencia_vivienda: document.getElementById('tenencia_vivienda').value,
            tenencia_otro: document.getElementById('tenencia_otro').value || null,
            tipo_vivienda: document.getElementById('tipo_vivienda').value,
            tipo_vivienda_otro: document.getElementById('tipo_vivienda_otro').value || null,
            numero_habitaciones: parseInt(document.getElementById('numero_habitaciones').value) || null,
            material_construccion: document.getElementById('material_construccion').value,
            material_otro: document.getElementById('material_otro').value || null,
            servicio_luz: document.querySelector('input[value="luz"]')?.checked || false,
            servicio_agua: document.querySelector('input[value="agua"]')?.checked || false,
            servicio_desague: document.querySelector('input[value="desague"]')?.checked || false,
            servicio_telefono: document.querySelector('input[value="telefono"]')?.checked || false,
            servicio_internet: document.querySelector('input[value="internet"]')?.checked || false,
            servicio_tv_cable: document.querySelector('input[value="tv_cable"]')?.checked || false
        };
        
        const { error: errorVivienda } = await window.supabaseClient
            .from('vivienda')
            .insert([vivienda]);
        
        if (errorVivienda) throw errorVivienda;
        console.log('✅ Vivienda guardada');
        
        // 8. GUARDAR ALIMENTACIÓN
        const alimentacion = {
            id_ficha: idFicha,
            lugar_alimentacion: document.getElementById('lugar_alimentacion').value,
            lugar_alimentacion_otro: document.getElementById('lugar_alimentacion_otro').value || null,
            come_desayuno: document.querySelector('input[value="desayuno"]')?.checked || false,
            come_almuerzo: document.querySelector('input[value="almuerzo"]')?.checked || false,
            come_cena: document.querySelector('input[value="cena"]')?.checked || false,
            come_media_manana: document.querySelector('input[value="media_manana"]')?.checked || false,
            come_media_tarde: document.querySelector('input[value="media_tarde"]')?.checked || false,
            come_otro: document.querySelector('input[value="otro"]')?.checked || false,
            comida_otro: document.getElementById('comida_otro').value || null
        };
        
        const { error: errorAlimentacion } = await window.supabaseClient
            .from('alimentacion')
            .insert([alimentacion]);
        
        if (errorAlimentacion) throw errorAlimentacion;
        console.log('✅ Alimentación guardada');
        
        // 9. GUARDAR SALUD
        const salud = {
            id_ficha: idFicha,
            tipo_seguro: document.getElementById('tipo_seguro').value || null,
            seguro_otro: document.getElementById('seguro_otro').value || null,
            tratamiento_continuo: document.querySelector('input[name="tratamiento_continuo"]:checked')?.value === 'si',
            problema_salud: document.getElementById('problema_salud').value || null,
            alergias: document.getElementById('alergias').value || null,
            discapacidad: document.querySelector('input[name="discapacidad"]:checked')?.value === 'si',
            tipo_discapacidad: document.getElementById('tipo_discapacidad').value || null,
            enfermedad: document.querySelector('input[name="enfermedad"]:checked')?.value === 'si',
            nombre_enfermedad: document.getElementById('nombre_enfermedad').value || null,
            toma_medicamento: document.querySelector('input[name="toma_medicamento"]:checked')?.value === 'si',
            nombre_medicamento: document.getElementById('nombre_medicamento').value || null,
            operaciones: document.getElementById('operaciones').value || null,
            otros_salud: document.getElementById('otros_salud').value || null,
            religion: document.getElementById('religion').value || null,
            estudio_tecnico: document.querySelector('input[name="estudio_tecnico"]:checked')?.value === 'si',
            nombre_estudio: document.getElementById('nombre_estudio').value || null,
            acepta_declaracion: true
        };
        
        const { error: errorSalud } = await window.supabaseClient
            .from('salud')
            .insert([salud]);
        
        if (errorSalud) throw errorSalud;
        console.log('✅ Salud guardada');
        
        // ÉXITO TOTAL
        alert('¡Ficha socioeconómica guardada correctamente!');
        
        // Opcional: limpiar formulario o redirigir
        // window.location.href = 'confirmacion.html';
        
    } catch (error) {
        console.error('❌ Error al guardar:', error);
        alert('Error al guardar: ' + error.message);
    } finally {
        btnGuardar.textContent = 'Siguiente →';
        btnGuardar.disabled = false;
    }
}

function manejarBotonSiguiente() {
    const secciones = document.querySelectorAll('.seccion');
    
    // Si es la última sección, guardar
    if (seccionActual === secciones.length - 1) {
        guardarEncuesta();
    } else {
        siguienteSeccion();
    }
}

// Función para actualizar el texto del botón según la sección
function actualizarBotonNavegacion() {
    const secciones = document.querySelectorAll('.seccion');
    const btnSiguiente = document.querySelector('.btn-principal');
    
    if (!btnSiguiente) return;
    
    // Si estamos en la última sección
    if (seccionActual === secciones.length - 1) {
        btnSiguiente.textContent = '💾 Guardar Encuesta';
        btnSiguiente.onclick = guardarEncuesta;
    } else {
        btnSiguiente.textContent = 'Siguiente →';
        btnSiguiente.onclick = manejarBotonSiguiente;
    }
}

// Modificar la función siguienteSeccion para actualizar el botón
function siguienteSeccion() {
    const secciones = document.querySelectorAll('.seccion');
    
    if (seccionActual < secciones.length - 1) {
        seccionActual++;
        mostrarSeccion(seccionActual);
        actualizarBotonNavegacion();
    }
}

// Modificar la función anteriorSeccion para actualizar el botón
function anteriorSeccion() {
    if (seccionActual > 0) {
        seccionActual--;
        mostrarSeccion(seccionActual);
        actualizarBotonNavegacion();
    }
}

// Función para manejar el botón siguiente
function manejarBotonSiguiente() {
    const secciones = document.querySelectorAll('.seccion');
    
    if (seccionActual === secciones.length - 1) {
        guardarEncuesta();
    } else {
        siguienteSeccion();
    }
}

// Llamar a actualizarBotonNavegacion al cargar
document.addEventListener('DOMContentLoaded', function() {
    // ... tu código existente ...
    actualizarBotonNavegacion();
});


});