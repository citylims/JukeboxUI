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
      template: '<div id="pallete" class="pallete load">',
      scope: true,
      controller: palleteCtrl,
      bindToController: true,
      link: link
    };
    return directive;

    function link(scope, element, attrs) {
      //nothing yet
    };
  }

  palleteCtrl.$inject = ['$scope', '$http', '$timeout', '$interval', 'JukeService'];

  function palleteCtrl($scope, $http, $timeout, $interval, JukeService) {

    init();

    function init() {
      fetchGradients();
    }

    function fetchGradients() {
      JukeService.getGradients().then(function(res) {
        $scope.gradients = res.data;
        console.log(res);
        JukeService.transitionRefresh($scope.gradients);
      });
    }

  }

})();
