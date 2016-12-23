registrationModule.controller('busquedaController', function($scope, $rootScope, alertFactory, busquedaRepository, localStorageService, filtrosRepository) {
    $scope.init = function() {
        openCloseNav()
        $scope.getEmpresa(1);
    }
    $scope.setActiveClass = function(currentTab) {
        for (var i = 0; i < $scope.panels.length; i++) {
            $scope.panels[i].active = false;
            $scope.panels[i].className = "";
        }
        currentTab.active = true;
        currentTab.className = "active";
    };
    $scope.panels = [
        { name: 'Timbrado Exitoso', active: true, className: 'active' },
        { name: 'Sin Timbrar', active: false, className: '' }
    ];

    $scope.getEmpresa = function(idUsuario) {
        filtrosRepository.getEmpresa(idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.empresaUsuario = result.data;
            }
        });
    }
    $scope.cargaTipoAgencia = function(idempresa){
        filtrosRepository.getAgencia(idempresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.agencias = result.data;
                console.log($scope.agencias);
            }
        });
    }
    $scope.cargaTipoDepartamento = function(idempresa,idsucursal){
        filtrosRepository.getAgencia(idempresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.departamento = result.data;
                console.log($scope.agencias);
            }
        });
    }
});
