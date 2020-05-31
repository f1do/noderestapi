const Acceso = {
    Bienvenido: 'Bienvenido'
};

const Providers=['GMAIL|danger', 'FACEBOOK|primary', 'TWITTER|info']

const Registro = {
    Language: 'es',
    uColeccion: 'usuarios',
    Okay: 'Parece estar bien.',
    Valida:{
        Usuario:'Ingresa un usuario',
        Password: 'Ingresa tu contraseña',
        Email: 'Ingresa un email valido',
        Confirmacion: 'El texto ingresado no coincide con el password.',
        ConfirmaPass: 'Confirma tu password.'
    }
};

exports.Acceso = ()=> Acceso;
exports.Registro = ()=> Registro;
exports.Providers = ()=> Providers;
