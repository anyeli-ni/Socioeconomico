// Configuración de Supabase
window.SUPABASE_URL = 'https://ckfxhrxvvutlsojfoazp.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_z3a0HtqL49GSF74MzsNtNQ_2qCW5M2l';

// Crear el cliente de Supabase
window.supabaseClient = supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
);

console.log("✅ Supabase inicializado correctamente");
console.log("🔗 URL:", window.SUPABASE_URL);