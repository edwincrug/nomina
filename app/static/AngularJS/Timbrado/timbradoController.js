registrationModule.controller('timbradoController', function($scope, $rootScope, alertFactory, timbradoRepository, localStorageService, filtrosRepository, filetreeRepository) {

    $scope.idUsuario = 2;
    $scope.procesando = false;
    $scope.rutaCarpeta = ""
    $scope.nombreCarpeta = ""
    $scope.nombre = "";
    $scope.tipoEmpresa = [];
    $scope.timbrar = false;
    $scope.idTipoNomina = 0;
    $scope.idEmpresa = 0;
    var cronometro
    $scope.mensajePanel = "";

    $scope.init = function() {
        //$scope.carga();
        $scope.yo = false;
        openCloseNav()
        $scope.getEmpresa(1);
        $scope.getTipoNomina();
        //$scope.getPermisos();
        setInterval(function() { $scope.getPermisos(); }, 1000);
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
        $scope.nombreCarpeta = "";
        $scope.idTipoNomina = idTipo;
        $scope.idEmpresa = idEmpresa;
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
        $scope.rutaCarpeta = obj.path;
        var cadena = obj.path;
        $scope.directorio = cadena.substr((cadena.length) -8, 8)
        console.log($scope.directorio)
    }

    $scope.seleccionarTimbre = function(obj) {
        $scope.nombre = obj.name
        $("ul").children('#' + $scope.nombre).slideToggle("fast");
    }

    $scope.realizarTimbrado = function() {
        //var rutaCarpetaModif = $scope.rutaCarpeta.replace(/\\/gi, "\\\\");
        filetreeRepository.getSocket($scope.idEmpresa, $scope.idTipoNomina, $scope.idUsuario, $scope.rutaCarpeta, $scope.nombre, 1).then(function(result) {
            if (result.data != "") {
                alertFactory.success('Exito');
                $scope.procesando = true;
            } else {
                alertFactory.warning('no se pudo realizar');
            }
        })
        //alertFactory.error('esperando');
    }

    $scope.getPermisos = function() {
        $scope.datosPendientes = [];
        $scope.promise = timbradoRepository.getPermisos($scope.idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.datosPendientes = result.data
                $scope.NombreEmpresa = result.data[0].NombreEmpresa
                $scope.NombreNomina = result.data[0].NombreNomina
                $scope.DocumentosAceptados = result.data[0].TotalRecibos
                if ($scope.datosPendientes[0].estatus == 'timbrando') {

                    if ($scope.datosPendientes[0].timbrados == $scope.datosPendientes[0].TotalRecibos) {
                        $scope.mensajePanel = "Timbrado Finalizado...."
                        $scope.timbradoPendiente = false;
                        $scope.procesando = true;
                        $scope.porcentaje = ($scope.datosPendientes[0].timbrados * 100) / $scope.datosPendientes[0].TotalRecibos
                        $scope.mostrarEstado = false;
                    } else {
                        $scope.mensajePanel = "Procesando Timbrado...."
                        $scope.timbradoPendiente = true;
                        $scope.procesando = true;
                        $scope.mostrarEstado = true;
                        $scope.porcentaje = ($scope.datosPendientes[0].timbrados * 100) / $scope.datosPendientes[0].TotalRecibos
                    }
                } else {
                    $scope.procesando = false;
                    $scope.yo = true;
                    $scope.timbradoPendiente = false;
                }

            } else {
                console.log('salio')
            }
        });
    }

    // $scope.carga = function() {
    //     contador_s = 0;
    //     contador_m = 0;
    //     s = document.getElementById("segundos");
    //     m = document.getElementById("minutos");

    //     cronometro = setInterval(
    //         function() {
    //             if (contador_s == 60) {
    //                 contador_s = 0;
    //                 contador_m++;
    //                 m.innerHTML = contador_m;

    //                 if (contador_m == 60) {
    //                     contador_m = 0;
    //                 }
    //             }

    //             s.innerHTML = contador_s;
    //             contador_s++;

    //         }, 1000);
    // }

});
