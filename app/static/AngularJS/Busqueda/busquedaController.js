registrationModule.controller('busquedaController', function($scope, $rootScope, alertFactory, busquedaRepository, localStorageService, filtrosRepository) {
    $scope.tipoEmpresa = '';
    $scope.periodoFecha = '';
    $scope.fecha = '';
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
            if (idusuario != null) {
                filtrosRepository.getGrupo(idusuario).then(function(result) {
                    if (result.data.length > 0) {
                        $scope.grupo = result.data;
                    }
                });
            } else {
                alertFactory.warning('No hay idUsuario')
            }
        }
        //**********Termina Consigue el Grupo dependiendo del Usuario**********//
        //**********Inicia Consigue las Empresas ligadas al Grupo**********//
    $scope.getEmpresa = function(idgrupo) {
            if (idgrupo != null) {
                filtrosRepository.getEmpresa(idgrupo).then(function(result) {
                    if (result.data.length > 0) {
                        $scope.empresaUsuario = result.data;
                        $scope.activarInputEmpresa = false;
                    }
                });
            } else {
                variablesInput();
                $scope.tipoEmpresa.idTipoEmpresa = '';
                $scope.tipoEmpresa.idSucursal = '';
                $scope.tipoEmpresa.idDepartamento = '';
                $scope.tipoEmpresa.idTipoNomina = '';
                $scope.tipoEmpresa.periodo = '';
                alertFactory.warning('Seleccioné un Grupo');
            }
        }
        //**********Termina Consigue las Empresas ligadas al Grupo**********//
        //**********Inicia Consigue el tipo de Agencia ligadas a la Empresa**********//
    $scope.cargaTipoAgencia = function(idempresa) {
        if (idempresa != null) {
            empresaVacia();
            filtrosRepository.getAgencia(idempresa).then(function(result) {
                if (result.data.length > 0) {
                    $scope.agencias = result.data;
                    $scope.activarInputAgencia = false;
                }
            });
        } else {
            empresaVacia();
            alertFactory.warning('Seleccioné una Empresa');
        }
    }
    var empresaVacia = function() {
            $scope.tipoEmpresa.idSucursal = '';
            $scope.tipoEmpresa.idDepartamento = '';
            $scope.tipoEmpresa.idTipoNomina = '';
            $scope.tipoEmpresa.periodo = '';
            $scope.activarInputAgencia = true;
            $scope.activarInputDepartamento = true;
            $scope.activarInputTipoNomina = true;
            $scope.activarInputPeriodo = true;
        }
        //**********Termina Consigue el tipo de Agencia ligadas a la Empresa**********//
        //**********Inicia Consigue el tipo de Departamento ligadas a la Empresa y Sucursal**********//
    $scope.cargaTipoDepartamento = function(idempresa, idsucursal) {
        if (idempresa != null && idsucursal != null) {
            sucursalVacia();
            filtrosRepository.getDepartamento(idempresa, idsucursal).then(function(result) {
                if (result.data.length > 0) {
                    $scope.departamento = result.data;
                    $scope.activarInputDepartamento = false;
                }
            });
        } else {
            sucursalVacia();
            alertFactory.warning('Seleccioné una Agencia');
        }
    }
    var sucursalVacia = function() {
            $scope.tipoEmpresa.idDepartamento = '';
            $scope.tipoEmpresa.idTipoNomina = '';
            $scope.tipoEmpresa.periodo = '';
            $scope.activarInputDepartamento = true;
            $scope.activarInputTipoNomina = true;
            $scope.activarInputPeriodo = true;
        }
        //**********Termina Consigue el tipo de Departamento ligadas a la Empresa y Sucursal**********//
        //**********Inicia Consigue el tipo de Nomina **********//
    $scope.getTipoNomina = function(iddepartamento) {
        if (iddepartamento != null) {
            sucursalVacia();
            filtrosRepository.getTipoNomina().then(function(result) {
                if (result.data.length > 0) {
                    $scope.tipoNomina = result.data;
                    $scope.activarInputTipoNomina = false;
                }
            });
        } else {
            sucursalVacia();
            alertFactory.warning('Seleccioné un Departamento');
        }

    }
    var sucursalVacia = function() {
            $scope.tipoEmpresa.idTipoNomina = '';
            $scope.tipoEmpresa.periodo = '';
            $scope.activarInputTipoNomina = true;
        }
        //**********Termina Consigue el tipo de Nomina **********//
        //**********Inicia Activa el input de periodo************//
    $scope.activaPeriodo = function() {
            $scope.activarInputPeriodo = false;
        }
        //**********Termina Activa el input de periodo************//
        //**********Inicia Verifica si es una fecha************//
    $scope.verificaFecha = function(periodo) {
            if (periodo.length == 8) {
                var fechaActual = new Date();
                $scope.fecha = periodo.substr(2, 2) + '-' + periodo.substr(0, 2) + '-' + periodo.substr(4, 4);
                var fechaCarpeta = new Date($scope.fecha);
                $scope.periodoFecha = fechaCarpeta instanceof Date && !isNaN(fechaCarpeta.valueOf());
                if(fechaCarpeta<=fechaActual){
                    if($scope.periodoFecha===true){
                        console.log('Aqui empezara la busqueda')
                    }
                }else{
                    alertFactory.warning('El periodo es incorrecto');
                }
                console.log($scope.periodoFecha);
            }
        }
        //**********Termina Verifica si es una fecha************//
});
