app.controller('JukeCtrl', JukeCtrl)

JukeCtrl.$inject['$scope', "$http", "Spotify"];

function JukeCtrl($scope, $http, Spotify) {

  init();

  function init(){
    fetchGradients();
  }

  $scope.searchArtist = function () {
    console.log($scope.gradients);
    Spotify.search($scope.searchartist, 'artist').then(function (data) {
      console.log($scope.artists);
      $scope.artists = data.artists.items;
    });
  };

 function fetchGradients() {
    $http.get('assets/gradients.json').success(function(data){
      console.log(data);
      $scope.gradients = data;
    })
  }

  $scope.next = function() {
    console.log("yup");
    fetchGradients();
  }

  var shuffle = function(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

};
