(function() {

'use strict';

angular
  .module('jukeboxApp')
  .controller('JukeCtrl', JukeCtrl);

  JukeCtrl.$inject['$scope', "$http", "Spotify", "JukeService"];

  function JukeCtrl($scope, $http, Spotify, $timeout, $sce, JukeService) {

    $scope.searchArtist = function () {
      Spotify.search($scope.searchartist, 'artist').then(function (data) {
        $scope.artists = data.artists.items;
      });
    };

  };//JukeCtrl
})();
