registrationModule.controller('loginController', function($scope, $rootScope, loginRepository, alertFactory, localStorageService) {

    $scope.init = function() {
        $rootScope.mostrarMenu = false;
    }
    $scope.permisos = function(usuario, contrasena) {
        loginRepository.getPermisos(usuario, contrasena).then(function(result) {
            console.log(result)
            location.href = '/busqueda'
        });
    }
});
