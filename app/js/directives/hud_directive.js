(function() {
  'use strict';

  /**
  * @desc directive for hud
  * @example <hud></hud>
  */

  angular
    .module('jukeboxApp')
    .directive('hud', hud);

  function hud() {
    var directive = {
      restrict: 'E',
      templateUrl: '../templates/hud.html',
      scope: true,
      controller: hudCtrl,
      bindToController: true,
      link: link
    };
    return directive;

    function link(scope, element, attrs) {
      //nothing yet
    };
  }

  hudCtrl.$inject = ['$scope', '$http', '$timeout', '$interval', 'JukeService', '$rootScope'];

  function hudCtrl($scope, $http, $timeout, $interval, JukeService, $rootScope){
    console.log("hudCTRL")

    $scope.$on('active track', function(event, message) {
      var index = message;
      $scope.activeTrack = $scope.playlist[index].track;
      setHud($scope.activeTrack);
    })

    function setHud(trackObj) {
      console.log(trackObj);
      $scope.track = {
        image: trackObj.album.images[0].url,
        songName: trackObj.name,
        artist: trackObj.artists[0].name
      }
      $scope.$apply();
    }

    // $scope.track = {
    //   image: "https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg"
    // }

    console.log($scope.playlist);


  } //hudCtrl

})();
