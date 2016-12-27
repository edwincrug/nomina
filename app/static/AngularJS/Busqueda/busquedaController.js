registrationModule.controller('busquedaController', function($scope, $rootScope, alertFactory, busquedaRepository, localStorageService, filtrosRepository) {
    $scope.tipoEmpresa = [];
    $scope.init = function() {
        openCloseNav();
        $scope.getGrupo(1);
        variablesInput();
    }
    var variablesInput = function() {
            $scope.activarInputEmpresa = true;
            $scope.activarInputAgencia = true;
            $scope.activarInputDepartamento = true;
            $scope.activarInputTipoNomina = true;
            $scope.activarInputPeriodo = true;
        }
        //**********Inicia Habilita las secciones de las tabs**********//
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
    //**********Termina Habilita las secciones de las tabs**********//
    //**********Inicia Consigue el Grupo dependiendo del Usuario**********//
    $scope.getGrupo = function(idusuario) {
        if(idusuario != undefined || idusuario != ''){
            filtrosRepository.getGrupo(idusuario).then(function(result) {
                if (result.data.length > 0) {
                    $scope.grupo = result.data;
                }
            });
        }
        else{
            variablesInput();
        }            
        }
        //**********Termina Consigue el Grupo dependiendo del Usuario**********//
        //**********Inicia Consigue las Empresas ligadas al Grupo**********//
    $scope.getEmpresa = function(idgrupo) {
            filtrosRepository.getEmpresa(idgrupo).then(function(result) {
                if (result.data.length > 0) {
                    $scope.empresaUsuario = result.data;
                    $scope.activarInputEmpresa = false;
                }
            });
        }
        //**********Termina Consigue las Empresas ligadas al Grupo**********//
        //**********Inicia Consigue el tipo de Agencia ligadas a la Empresa**********//
    $scope.cargaTipoAgencia = function(idempresa) {
            filtrosRepository.getAgencia(idempresa).then(function(result) {
                if (result.data.length > 0) {
                    $scope.agencias = result.data;
                    $scope.activarInputAgencia = false;
                }
            });
        }
        //**********Termina Consigue el tipo de Agencia ligadas a la Empresa**********//
        //**********Inicia Consigue el tipo de Departamento ligadas a la Empresa y Sucursal**********//
    $scope.cargaTipoDepartamento = function(idempresa, idsucursal) {
            filtrosRepository.getDepartamento(idempresa, idsucursal).then(function(result) {
                if (result.data.length > 0) {
                    $scope.departamento = result.data;
                    $scope.activarInputDepartamento = false;
                }
            });
        }
        //**********Termina Consigue el tipo de Departamento ligadas a la Empresa y Sucursal**********//
        //**********Inicia Consigue el tipo de Nomina **********//
    $scope.getTipoNomina = function() {
            filtrosRepository.getTipoNomina().then(function(result) {
                if (result.data.length > 0) {
                    $scope.tipoNomina = result.data;
                    $scope.activarInputTipoNomina = false;
                }
            });
        }
        //**********Termina Consigue el tipo de Nomina **********//
        //**********Inicia Activa el input de periodo************//
    $scope.activaPeriodo = function() {
        $scope.activarInputPeriodo = false;
    }
});
