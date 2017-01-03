registrationModule.controller('loginController', function($scope, $rootScope, $location, loginRepository, alertFactory, localStorageService) {
    $scope.datosUsuario = '';
    $scope.init = function() {
        $rootScope.mostrarMenu = false;
    }
    $scope.permisos = function(usuario, contrasena) {
        loginRepository.getPermisos(usuario, contrasena).then(function(result) {
            $scope.datosUsuario = result.data;
            console.log($scope.datosUsuario)
            if ($scope.datosUsuario.length > 0) {
                if ($scope.datosUsuario[0].idPerfil == 2) {
                    $location.url('/timbrado' + $scope.datosUsuario[0].idPerfil);
                } else if ($scope.datosUsuario[0].idPerfil == 3) {
                    $location.url('/busqueda' + $scope.datosUsuario[0].idPerfil);
                }else if($scope.datosUsuario[0].idPerfil == 1){
                	$location.url('/timbrado' + $scope.datosUsuario[0].idPerfil);
                }
            }
            //console.log(result)
            //$location.url('/busqueda' + $scope.datosUsuario[0].idPerfil);
            //location.href = '/busqueda'+1
        });
    }
});
