registrationModule.controller('timbradoController', function($scope, $rootScope, alertFactory, timbradoRepository, localStorageService, filtrosRepository, filetreeRepository) {

    $scope.idUsuario = 2;
    $scope.rutaCarpeta = ""
    $scope.tipoEmpresa = [];
    $scope.init = function() {
        $scope.yo = false;
        openCloseNav()
        $scope.getEmpresa(1);
        $scope.getTipoNomina();
    }

    $scope.getEmpresa = function(idUsuario) {
        filtrosRepository.getEmpresa(idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.empresaUsuario = result.data;
            }
        });
    }

    $scope.getTipoNomina = function() {
        filtrosRepository.getTipoNomina().then(function(result) {
            if (result.data.length > 0) {
                $scope.tipoNomina = result.data;
            }
        });
    }

    $scope.getFileTree = function(idEmpresa, idTipo) {
        $scope.rutaCarpeta = "";
        filetreeRepository.getFileTree(idEmpresa, idTipo).then(function(result) {
            if (result.data != undefined) {
                $scope.filetree = result.data;
                $scope.yo = true;
            }
        });
    };

    $scope.ruta = function(obj) {
    	$scope.nombre = obj.name
        $("ul").children('#'+$scope.nombre).slideToggle("fast");
        $scope.rutaCarpeta = obj.path;
       }


});
