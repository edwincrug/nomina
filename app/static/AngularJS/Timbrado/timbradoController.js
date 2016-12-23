registrationModule.controller('timbradoController', function($scope, $rootScope, alertFactory, timbradoRepository,localStorageService) {
    $scope.init = function(){
    	openCloseNav()
    	$scope.treeView();
    }

    $scope.treeView = function(){
	    $(document).ready(function(){

	        $('#jstree1').jstree({
	            'core' : {
	                'check_callback' : true
	            },
	            'plugins' : [ 'types', 'dnd' ],
	            'types' : {
	                'default' : {
	                    'icon' : 'glyphicon glyphicon-folder-open'
	                },
	                'html' : {
	                    'icon' : 'glyphicon glyphicon-file'
	                },
	                'svg' : {
	                    'icon' : 'glyphicon glyphicon-picture'
	                },
	                'css' : {
	                    'icon' : 'glyphicon glyphicon-file'
	                },
	                'img' : {
	                    'icon' : 'glyphicon glyphicon-picture'
	                },
	                'js' : {
	                    'icon' : 'glyphicon glyphicon-file'
	                }

	            }
	        });

	        $('#using_json').jstree({
	            'core' : {
	            'data' : [
	                'Empty Folder',
	                {
	                    'text': 'Resources',
	                    'state': {
	                        'opened': true
	                    },
	                    'children': [
	                        {
	                            'text': 'css',
	                            'children': [
	                                {
	                                    'text': 'animate.css', 'icon': 'none'
	                                },
	                                {
	                                    'text': 'bootstrap.css', 'icon': 'none'
	                                },
	                                {
	                                    'text': 'main.css', 'icon': 'none'
	                                },
	                                {
	                                    'text': 'style.css', 'icon': 'none'
	                                }
	                            ],
	                            'state': {
	                                'opened': true
	                            }
	                        },
	                        {
	                            'text': 'js',
	                            'children': [
	                                {
	                                    'text': 'bootstrap.js', 'icon': 'none'
	                                },
	                                {
	                                    'text': 'inspinia.min.js', 'icon': 'none'
	                                },
	                                {
	                                    'text': 'jquery.min.js', 'icon': 'none'
	                                },
	                                {
	                                    'text': 'jsTree.min.js', 'icon': 'none'
	                                },
	                                {
	                                    'text': 'custom.min.js', 'icon': 'none'
	                                }
	                            ],
	                            'state': {
	                                'opened': true
	                            }
	                        },
	                        {
	                            'text': 'html',
	                            'children': [
	                                {
	                                    'text': 'layout.html', 'icon': 'none'
	                                },
	                                {
	                                    'text': 'navigation.html', 'icon': 'none'
	                                },
	                                {
	                                    'text': 'navbar.html', 'icon': 'none'
	                                },
	                                {
	                                    'text': 'footer.html', 'icon': 'none'
	                                },
	                                {
	                                    'text': 'sidebar.html', 'icon': 'none'
	                                }
	                            ],
	                            'state': {
	                                'opened': true
	                            }
	                        }
	                    ]
	                },
	                'Fonts',
	                'Images',
	                'Scripts',
	                'Templates',
	            ]
	        } });

	    });
    }

    
});
