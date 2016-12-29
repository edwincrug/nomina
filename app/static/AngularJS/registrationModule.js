// -- =============================================
// -- Author:      Gibran 
// -- Create date: 05/09/2016
// -- Description: Is the container of the application
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var registrationModule = angular.module("registrationModule", ["ngRoute", "LocalStorageModule"])
    .config(function($routeProvider, $locationProvider) {

        /*cheange the routes*/
        $routeProvider.when('/', {
            templateUrl: 'AngularJS/Templates/login.html', //example 1
        //     params: {
        //     mostrar: true
        // }
            controller: 'loginController'
        });
        $routeProvider.when('/timbrado', {
            templateUrl: 'AngularJS/Templates/timbrado.html', //example 1
            controller: 'timbradoController'
        });
        $routeProvider.when('/busqueda', {
            templateUrl: 'AngularJS/Templates/busqueda.html', //example 1
            controller: 'busquedaController'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

registrationModule.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        var changeHeight = function() { element.css('height', (w.height() - 20) + 'px'); };
        w.bind('resize', function() {
            changeHeight(); // when window size gets changed             
        });
        changeHeight(); // when page loads          
    };
});
registrationModule.run(function($rootScope) {
    $rootScope.var = "full";

})
