(function() {
  'use strict';

  /**
  * @desc directive for pallete
  * @example <pallete></pallete>
  */

  angular
    .module('starter')
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

  palleteCtrl.$inject = ['$scope', '$http', '$timeout', '$interval'];

  function palleteCtrl($scope, $http, $timeout, $interval) {
    
  }
})();
