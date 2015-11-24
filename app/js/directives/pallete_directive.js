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

    $scope.pallete = angular.element(document.getElementById("pallete"));
    init();

    function init() {
      JukeService.getGradients().then(function(res) {
        console.log(res);
      }, function(err) {
        console.log(err);
      })
      console.log($scope.pallete);
    }

    var shuffle = function(o) {
      for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }
  }
})();
