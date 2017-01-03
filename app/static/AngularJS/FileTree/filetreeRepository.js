var filetreeURL = global_settings.urlCORS + 'api/filetree/';
var mailPdfs = global_settings.urlCORS + 'api/zipandmail/';


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
        getSocket: function(idEmpresa,idTipo,idUsuario,path,nombreCarpeta,opcion){
            return $http({
                url:filetreeURL + 'socket/',
                method:"GET",
                params:{
                    idEmpresa: idEmpresa,
                    idTipo: idTipo,
                    idUsuario: idUsuario,
                    path: path,
                    nombreCarpeta: nombreCarpeta,
                    opcion:opcion
                },
                headers:{
                    'Content-Type':'application/json'
                }
            /*});
*/            console.log(params)
        },
        postDocumentosMail: function(idEmpresa,idTipo,idUsuario,path,nombreCarpeta,opcion,listaPds){
            var objectArchivos ={
                archivos:listaPds,
                idEmpresa: idEmpresa,
                idTipo: idTipo,
                idUsuario: idUsuario,
                path: path,
                nombreCarpeta: nombreCarpeta,
                opcion:opcion

            }
            return $http({
                url:mailPdfs + 'generaZipMail/',
                method: "POST",
                data: objectArchivos,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(objectArchivos)
        }
    };

});
