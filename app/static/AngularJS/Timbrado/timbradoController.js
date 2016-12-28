registrationModule.controller('timbradoController', function($scope, $rootScope, alertFactory, timbradoRepository, localStorageService, filtrosRepository, filetreeRepository) {

    $scope.idUsuario = 2;
    $scope.rutaCarpeta = ""
    $scope.tipoEmpresa = [];
    $scope.timbrar = false;
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
    	$scope.timbrar = false;
        filtrosRepository.getTipoNomina().then(function(result) {
            if (result.data.length > 0) {
                $scope.tipoNomina = result.data;
            }
        });
    }

    $scope.getFileTree = function(idEmpresa, idTipo) {
        $scope.rutaCarpeta = "";
        $scope.timbrar = false;
        filetreeRepository.getFileTree(idEmpresa, idTipo).then(function(result) {
            if (result.data != undefined) {
                $scope.filetree = result.data;
                $scope.yo = true;
            }
        });
    };

    $scope.ruta = function(obj) {
    	$scope.timbrar = true;
    	//$scope.nombre = obj.name
        //$("ul").children('#'+$scope.nombre).slideToggle("fast");
        $scope.rutaCarpeta = obj.path;
       }

    $scope.seleccionarTimbre = function(obj){
    	//$scope.timbrar = true;
    	//$scope.nombre = obj.name
    	//$scope.rutaCarpeta = obj.path;
    	$scope.nombre = obj.name
        $("ul").children('#'+$scope.nombre).slideToggle("fast");
    }
});
