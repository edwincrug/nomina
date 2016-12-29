var referenceURL = global_settings.urlCORS + 'api/login/';


registrationModule.factory('loginRepository', function($http) {
    return {
        getPermisos: function(usuario, contrasena) {
            return $http({
                url: filtroURL + 'permisos/',
                method: "GET",
                params: {
                    usuario: usuario,
                    contrasena: contrasena
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }
    };

});
