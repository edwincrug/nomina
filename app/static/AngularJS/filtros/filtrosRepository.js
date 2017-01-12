var filtroURL = global_settings.urlCORS + 'api/filtros/';


registrationModule.factory('filtrosRepository', function($http) {
    return {
        getGrupo: function(idUsuario) {
            return $http({
                url: filtroURL + 'grupo/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getEmpresa: function(idgrupo) {
            return $http({
                url: filtroURL + 'empresa/',
                method: "GET",
                params: {
                    idGrupo: idgrupo
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
        },
        getTipoNomina: function() {
            return $http({
                url: filtroURL + 'tipoNomina/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //

        getValidarDocumentosTimbrados: function(nombreNomina) {
            return $http({
                url: filtroURL + 'validarDocumentosTimbrados/',
                method: "GET",
                params: {
                    nombreNomina: nombreNomina
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };

});
