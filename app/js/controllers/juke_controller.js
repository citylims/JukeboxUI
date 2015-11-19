app.controller('JukeCtrl', function($scope, Spotify) {

  $scope.searchArtist = function () {
    Spotify.search($scope.searchartist, 'artist').then(function (data) {
      console.log($scope.artists);
      $scope.artists = data.artists.items;
    });
  };

});
