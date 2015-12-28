(function() {
  'use strict';

  /**
  * @desc directive for pallete
  * @example <pallete></pallete>
  */

  angular
    .module('jukeboxApp')
    .directive('pallete', pallete);

  function pallete() {
    var directive = {
      restrict: 'E',
      template: '<div id="pallete" class="pallete load"></div>',
      scope: true,
      controller: palleteCtrl,
      bindToController: true
    };
    return directive;
  }

  palleteCtrl.$inject = ['$scope', 'JukeService'];

  function palleteCtrl($scope, JukeService) {

    var pallete = fetchGradients()

    function fetchGradients() {
      JukeService.getGradients().then(function(res) {
        $scope.gradients = res.data;
      });
    }

  }

})();
