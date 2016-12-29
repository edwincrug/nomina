var filetreeURL = global_settings.urlCORS + 'api/filetree/';


registrationModule.factory('filetreeRepository', function($http) {
    return {
    	getFileTree: function(idEmpresa,idTipo){
            return $http({
                url: filetreeURL + 'files/',
                method:"GET",
                 params: {
                    idEmpresa: idEmpresa,
                    idTipo:idTipo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getSocket: function(idEmpresa,idTipo,idUsuario,pach,nombreCarpeta){
            return $http({
                url:filetreeURL + 'socket/',
                method:"GET",
                params:{
                    idEmpresa: idEmpresa,
                    idTipo: idTipo,
                    idUsuario: idUsuario,
                    pach: pach,
                    nombreCarpeta: nombreCarpeta
                },
                headers:{
                    'Content-Type':'application/json'
                }
            });
        }
    };

});
