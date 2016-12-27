registrationModule.controller('timbradoController', function($scope, $rootScope, alertFactory, timbradoRepository, localStorageService, filtrosRepository, filetreeRepository) {

    $scope.idUsuario = 2;
    $scope.rutaCarpeta = ""
    $scope.tipoEmpresa = [];
    $scope.init = function() {
        $scope.yo = false;
        openCloseNav()
        $scope.treeView();
        $scope.getEmpresa($scope.idUsuario);
        $scope.getTipoNomina();
        //$scope.getFileTree();
    }


    $scope.treeView = function() {
        $(document).ready(function() {

            $('#jstree1').jstree({
                'core': {
                    'check_callback': true
                },
                'plugins': ['types', 'dnd'],
                'types': {
                    'default': {
                        'icon': 'glyphicon glyphicon-folder-open'
                    },
                    'html': {
                        'icon': 'glyphicon glyphicon-file'
                    },
                    'svg': {
                        'icon': 'glyphicon glyphicon-picture'
                    },
                    'css': {
                        'icon': 'glyphicon glyphicon-file'
                    },
                    'img': {
                        'icon': 'glyphicon glyphicon-picture'
                    },
                    'js': {
                        'icon': 'glyphicon glyphicon-file'
                    }

                }
            });
        });
    }


    $scope.getEmpresa = function(idUsuario) {
        filtrosRepository.getEmpresa(idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.empresaUsuario = result.data;
            }
        });

        $scope.getTipoNomina = function() {
                filtrosRepository.getTipoNomina().then(function(result) {
                    if (result.data.length > 0) {
                        $scope.tipoNomina = result.data;
                    }
                });
            } //getFileTree

        $scope.getFileTree = function(idEmpresa, idTipo) {

            filetreeRepository.getFileTree(idEmpresa, idTipo).then(function(result) {
                if (result.data != undefined) {
                    $scope.filetree = result.data;
                    $scope.yo = true;
                }
            });
        };

        $scope.ruta = function(obj) {

            console.log(obj)
            $scope.rutaCarpeta = obj.path;
            var dropzone =
                $('#file-dropzone').dropzone({
                    url: "C:/Nomina_Timbrado",
                    maxFilesize: 100,
                    paramName: "uploadfile",
                    //Message: "Documentos",
                    maxThumbnailFilesize: 5,
                    init: function() {

                        this.on('success', function(file, json) {});

                        this.on('addedfile', function(file) {

                        });

                        this.on('drop', function(file) {
                            alert('file');
                        });
                    }
                });
        };
    }

});
