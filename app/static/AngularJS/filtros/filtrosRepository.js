var filtroURL = global_settings.urlCORS + 'api/filtros/';


registrationModule.factory('filtrosRepository', function($http) {
    return {
    	 getEmpresa: function(idUsuario) {
            return $http({
                url: filtroURL + 'empresa/',
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