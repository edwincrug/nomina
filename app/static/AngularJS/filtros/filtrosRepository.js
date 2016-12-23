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
        },
        getAgencia: function(idempresa) {
            return $http({
                url: filtroURL + 'agencia/',
                method: "GET",
                params: {
                    idEmpresa: idempresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getDepartamento: function(idempresa, idsucursal) {
            return $http({
                url: filtroURL + 'departamento/',
                method: "GET",
                params: {
                    idEmpresa: idempresa,
                    idSucursal: idsucursal
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }
      
    };

});