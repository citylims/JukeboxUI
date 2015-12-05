(function() {

'use strict';

angular
  .module('jukeboxApp')
  .controller('JukeCtrl', JukeCtrl);

  function JukeCtrl($scope, $http, Spotify, JukeService) {

    init();

    function init() {
      fetchPlaylist();
      fetchGradients();
    }

    function fetchPlaylist() {
      JukeService.getPlaylist().then(function(res) {
        $scope.playlist = res.data.tracks.items;
      });
    }

    function fetchGradients() {
      JukeService.getGradients().then(function(res) {
        $scope.gradients = res.data;
        $scope.palleteRefresh();
      });
    }

    $scope.searchArtist = function () {
      if (!$scope.searchartist) {
        $scope.artists = [];
      } else {
        Spotify.search($scope.searchartist, 'artist').then(function (data) {
          $scope.artists = data.artists.items;
        });
      }
    };

    $scope.palleteRefresh = function() {
      console.log($scope.gradients)
      if ($scope.gradients) {
        JukeService.palleteRefresh($scope.gradients);
      }
    }

  };//JukeCtrl
})();
