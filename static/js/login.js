// =========================================================
// LOGIN CON SUPABASE Y ROLES
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formLogin");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", async function (event) {

        event.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();
        const mensaje = document.getElementById("mensajeLogin");

        // Validar campos vacíos
        if (!usuario || !password) {
            mensaje.textContent = "Completa todos los campos.";
            mensaje.style.color = "red";
            return;
        }

        // Mostrar estado de carga
        mensaje.textContent = "Iniciando sesión...";
        mensaje.style.color = "blue";

        try {
            // 1. Iniciar sesión con Supabase
            const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
                email: usuario,
                password: password
            });

            if (authError) {
                throw authError;
            }

            console.log("✅ Usuario autenticado:", authData.user.email);

            // 2. Obtener el rol del usuario desde la tabla perfiles
            const { data: perfilData, error: perfilError } = await supabaseClient
                .from('perfiles')
                .select('rol, nombre_completo')
                .eq('id_usuario', authData.user.id)
                .single();

            if (perfilError) {
                console.error("Error al obtener perfil:", perfilError);
                // Si no hay perfil, asumir que es estudiante
                mensaje.textContent = "✅ Login correcto, pero no tienes un rol asignado.";
                mensaje.style.color = "orange";
                
                setTimeout(() => {
                    window.location.href = 'encuesta.html';
                }, 1500);
                return;
            }

            console.log("👤 Perfil encontrado:", perfilData);

            // 3. Guardar sesión en localStorage
            localStorage.setItem('usuarioActual', JSON.stringify({
                email: authData.user.email,
                id: authData.user.id,
                rol: perfilData.rol,
                nombre: perfilData.nombre_completo || authData.user.email,
                loginAt: new Date().toISOString()
            }));

            mensaje.textContent = "✅ ¡Login correcto! Redirigiendo...";
            mensaje.style.color = "green";

            // 4. Redirigir según el rol
            setTimeout(() => {
                if (perfilData.rol === 'admin') {
                    console.log("🔀 Redirigiendo a admin.html");
                    window.location.href = 'admin.html';
                } else {
                    console.log("🔀 Redirigiendo a encuesta.html");
                    window.location.href = 'encuesta.html';
                }
            }, 1000);

        } catch (error) {
            console.error("❌ Error de login:", error);
            
            if (error.message.includes('Invalid login credentials')) {
                mensaje.textContent = "Usuario o contraseña incorrectos.";
            } else if (error.message.includes('Email not confirmed')) {
                mensaje.textContent = "Debes confirmar tu correo electrónico.";
            } else {
                mensaje.textContent = "Error: " + error.message;
            }
            
            mensaje.style.color = "red";
        }

    });

});


// =========================================================
// FUNCIÓN PARA CERRAR SESIÓN
// =========================================================

async function cerrarSesion() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        
        if (error) {
            throw error;
        }
        
        // Limpiar localStorage
        localStorage.removeItem('usuarioActual');
        
        // Redirigir al login
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Error al cerrar sesión");
    }
}


// =========================================================
// VERIFICAR SESIÓN ACTIVA
// =========================================================

async function verificarSesion() {
    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (error) {
            throw error;
        }
        
        if (session) {
            console.log("✅ Sesión activa:", session.user.email);
            return session.user;
        } else {
            console.log("❌ No hay sesión activa");
            return null;
        }
        
    } catch (error) {
        console.error("Error al verificar sesión:", error);
        return null;
    }
}