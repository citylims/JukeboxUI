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
      templateUrl: '../templates/pallete.html',
      scope: true,
      require: '^hud'
      controller: palleteCtrl,
      bindToController: true,
      link: link
    };
    return directive;

    function link(scope, element, attrs) {
      //nothing yet
    };
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
