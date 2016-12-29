var timbradoURL = global_settings.urlCORS + 'api/timbrado/';


registrationModule.factory('timbradoRepository', function($http) {
    return {
    	getPermisos: function(idUsuario) {
            return $http({
                url: timbradoURL + 'timbradoProcesando/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }
      
    };

});
