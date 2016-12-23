registrationModule.controller('busquedaController', function($scope, $rootScope, alertFactory, busquedaRepository,localStorageService) {
    $scope.init = function(){
    	openCloseNav()
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
});
