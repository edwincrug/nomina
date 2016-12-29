var busquedaURL = global_settings.urlCORS + 'api/busqueda/';


registrationModule.factory('busquedaRepository', function($http) {
    return {
        getTimbrados: function(filtro) {
            return $http({
                url: busquedaURL + 'timbrados/',
                method: "GET",
                params: {
                    idDepartamento: filtro.idDepartamento,
                    idSucursal: filtro.idSucursal,
                    idEmpresa: filtro.idTipoEmpresa,
                    idGrupo: filtro.idTipoGrupo,
                    idTipoNomina: filtro.idTipoNomina,
                    carpeta: filtro.periodo
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }
    };

});
