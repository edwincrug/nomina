registrationModule.controller('busquedaController', function($scope, $rootScope,$routeParams, alertFactory, busquedaRepository, filetreeRepository,localStorageService, filtrosRepository) {
    $scope.filtros = null;
    $scope.periodoFecha = '';
    $scope.fecha = '';
    $rootScope.mostrarMenu = true;
    $scope.timbrados = '';
    $scope.listaPdfs =[];
    $scope.idUsuario = $routeParams.idUsuario
    $scope.init = function() {
        openCloseNav();
        $scope.getGrupo(1);
        console.log('Estoy en busqueda',$routeParams.idPerfil + ' idUsuario' + $routeParams.idUsuario)
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
                $scope.filtros.idTipoEmpresa = null;
                $scope.filtros.idSucursal = null;
                $scope.filtros.idDepartamento = null;
                $scope.filtros.idTipoNomina = null;
                $scope.filtros.periodo = null;
                alertFactory.warning('Seleccioné un Grupo');
            }
        }
        //**********Termina Consigue las Empresas ligadas al Grupo**********//
        //**********Inicia Consigue el tipo de Agencia ligadas a la Empresa**********//
    $scope.cargaTipoAgencia = function(idempresa) {
        //$scope.idEmpresa = idempresa;
        if (idempresa != null) {
            $scope.idempresaSeleccionada = idempresa;
            empresaVacia();
            filtrosRepository.getAgencia(idempresa).then(function(result) {
                if (result.data.length > 0) {
                    $scope.agencias = result.data;
                    $scope.activarInputAgencia = false;
                    $scope.activarInputTipoNomina = false;
                    $scope.getTipoNomina($scope.idempresaSeleccionada);
                }
            });
        } else {
            empresaVacia();
            alertFactory.warning('Seleccioné una Empresa');
        }
    }
    var empresaVacia = function() {
            $scope.filtros.idSucursal = null;
            $scope.filtros.idDepartamento = null;
            $scope.filtros.idTipoNomina = null;
            $scope.filtros.periodo = null;
            $scope.activarInputAgencia = true;
            $scope.activarInputDepartamento = true;
            $scope.activarInputTipoNomina = true;
            $scope.activarInputPeriodo = false;
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
                    $scope.activarInputPeriodo = false;

                }
            });
        } else {
            sucursalVacia();
            alertFactory.warning('Seleccioné una Agencia');
        }
    }
    var sucursalVacia = function() {
            $scope.filtros.idDepartamento = null;
            $scope.filtros.idTipoNomina = null;
            $scope.filtros.periodo = null;
            $scope.activarInputDepartamento = true;
            $scope.activarInputTipoNomina = true;
            $scope.activarInputPeriodo = false;
            //$scope.activarInputPeriodo = true;
        }
        //**********Termina Consigue el tipo de Departamento ligadas a la Empresa y Sucursal**********//
        //**********Inicia Consigue el tipo de Nomina **********//
    $scope.getTipoNomina = function(idEmpresa) {
        if (idEmpresa != null) {

               //$('#tblTimbradoExitoso').DataTable().destroy();
               //$('#tblSinTimbrar').DataTable().destroy();
            tipoNominaVacia();
            filtrosRepository.getTipoNomina().then(function(result) {
                if (result.data.length > 0) {
                    $scope.tipoNomina = result.data;
                    $scope.activarInputTipoNomina = false;
                    console.log($scope.tipoNomina)
                }
            });
        } else {
            tipoNominaVacia();
            alertFactory.warning('Seleccioné un Departamento');
        }
    }

    var tipoNominaVacia = function() {
            $scope.filtros.idTipoNomina = null;
            $scope.filtros.periodo = null;
        }
        //**********Termina Consigue el tipo de Nomina **********//
        //**********Inicia Activa el input de periodo************//
    $scope.activaPeriodo = function(agencia) {
            if (agencia != null) {
                $scope.activarInputPeriodo = false;
            }
        }
        //**********Termina Activa el input de periodo************//
        //**********Inicia Verifica si es una fecha************//
    $scope.verificaFecha = function(filtro) {
        $scope.idEmpresa = filtro.idTipoEmpresa;
        $scope.idTipoNomina = filtro.idTipoNomina;
        //$scope.idUsuario = 2;
        $scope.nombre = filtro.periodo;

        //C:\Nomina_Timbrado\Origen\Semanal\001

        //console.log(filtro)
            $('#tblTimbradoExitoso').DataTable().destroy();
            $('#tblSinTimbrar').DataTable().destroy();
            if (filtro.periodo.length == 8) {
               
                var fechaActual = new Date();
                $scope.fecha = filtro.periodo.substr(2, 2) + '-' + filtro.periodo.substr(0, 2) + '-' + filtro.periodo.substr(4, 4);
                var fechaCarpeta = new Date($scope.fecha);
                $scope.periodoFecha = fechaCarpeta instanceof Date && !isNaN(fechaCarpeta.valueOf());
                if (fechaCarpeta <= fechaActual) {
                    if ($scope.periodoFecha === true) {
                        alertFactory.warning('Buscando...')
                        busquedaRepository.getTimbrados(filtro).then(function(result) {
                            $scope.timbrados = result.data;
                            $scope.sinTimbrar = result.data;
                            setTimeout(function() {
                            $scope.setTablePaging('tblTimbradoExitoso');
                            $scope.setTablePaging('tblSinTimbrar');
                            $("#tblTimbradoExitoso_filter").removeClass("dataTables_info").addClass("hide-div");
                            $("#tblSinTimbrar_filter").removeClass("dataTables_info").addClass("hide-div");
                            }, 1500);
                        });
                    }
                } else {
                    alertFactory.warning('El periodo es incorrecto');
                }
                console.log($scope.periodoFecha);
            }
        }

$scope.enviarCorreo = function(listaDocumentos,correo){
    $scope.correo = correo;
    //console.log($scope.correo)
    $scope.rutaCarpeta = "C:/Nomina_Timbrado/Timbrados/"+listaDocumentos[0].descripcionNomina+'/'+listaDocumentos[0].ClaveTimbrado+"/"+$scope.nombre+'/'
    $scope.contadorSel = 0;
    angular.forEach(listaDocumentos, function(value, key) {
            if (value.check == true) {
                $scope.listaPdfs.push({
                        nombreRecibo:value.nombreRecibo,
                        idTipoNomina: value.idTipoNomina,
                        nombreNomina: value.NombreNomina
                })
                $scope.contadorSel ++;
                console.log('entreee :)')
            }
        });
    //console.log($scope.idEmpresa+' '+ $scope.idTipoNomina+' '+ $scope.idUsuario+' '+ $scope.rutaCarpeta+' '+ $scope.nombre+' '+ 2)
     filetreeRepository.postDocumentosMail($scope.idEmpresa, $scope.idTipoNomina, $scope.idUsuario, $scope.rutaCarpeta, $scope.nombre, $scope.listaPdfs,$scope.correo).then(function(result) {
        if(result.data ==1){
            console.log(result)
            $('#modalLotes').modal('hide');
            
            alertFactory.success('Correo enviado');
            $scope.correo = "";
            $scope.rutaCarpeta = "";
            $scope.contadorSel = 0;

            //$scope.init()
            

        }else{
            console.log(nada)
        }
     });

            $('#modalLotes').modal('hide');
            
            alertFactory.success('Correo enviado');

            $('#tblTimbradoExitoso').DataTable().destroy();
            $('#tblSinTimbrar').DataTable().destroy();
            //$scope.filtro.correo = "";
            $scope.correo = "";
            $scope.rutaCarpeta = "";
            $scope.contadorSel = 0;
            $scope.listaPdfs=[];
            $scope.filtros = null;
            $scope.timbrados = [];
}


        //**********Termina Verifica si es una fecha************//
    $scope.setTablePaging = function(idTable) {
        $('#' + idTable).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [{
                extend: 'excel',
                title: 'ExampleFile'
            }, {
                extend: 'print',
                customize: function(win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }]
        });
    };
});
