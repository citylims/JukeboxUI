app.controller('JukeCtrl', JukeCtrl)

JukeCtrl.$inject['$scope', "$http", "Spotify"];

function JukeCtrl($scope, $http, Spotify) {

  init();

  function init(){
    $scope.el = angular.element(document.getElementById("pallete"));
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
    console.log("load next gradient");
    var gradients = shuffle($scope.gradients);
    var gradient = gradients[0];
    $scope.el.css("background", "linear-gradient(to left, " + gradient.colors[0] + ", " + gradient.colors[1] + ")")
  }

  var shuffle = function(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

};
