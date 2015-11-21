app.controller('JukeCtrl', JukeCtrl)

JukeCtrl.$inject['$scope', "$http", "Spotify"];

function JukeCtrl($scope, $http, Spotify, $timeout, $sce) {

  init();

  function init(){
    bindData();
  }

  function bindData() {
    $scope.el = angular.element(document.getElementById("pallete"));
    fetchGradients();
  }

  function fetchGradients() {
     $http.get('assets/gradients.json').success(function(data){
       console.log(data);
       $scope.gradients = data;
     })
   }

  $scope.searchArtist = function () {
    console.log($scope.gradients);
    Spotify.search($scope.searchartist, 'artist').then(function (data) {
      console.log($scope.artists);
      $scope.artists = data.artists.items;
    });
  };

  $scope.next = function() {
    transitionRefresh();
    $http.get("https://api.spotify.com/v1/tracks/1zHlj4dQ8ZAtrayhuDDmkY").
    success(function(data) {
      console.log(data);
      var player = angular.element(document.getElementById('spotify-container'));
      console.log(player);
      var embedUrl = "https://embed.spotify.com/?uri=";
      var embedUrl = embedUrl += data.uri;
      var template = "<iframe src='" + embedUrl + "' width='300' height='80' frameboreder='0' allowtransparency='true'></iframe>";
      console.log(template);
      console.log(embedUrl);
      $scope.track = data
      $scope.trackQuery = $sce.trustAsResourceUrl($scope.track.uri);
      player.append(template);
// <iframe ng-src="https://embed.spotify.com/?uri={{trackQuery}}"  width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
      // $sce.trustAsResourceUrl($scope.currentProject.url);
      // $scope.track = {
      //   uri: "spotify:track:4th1RQAelzqgY7wL53UGQt"
      // }

    }).error(function(data){
      console.log(data);
    })
  }

  function transitionRefresh() {
    $scope.el.removeClass('load')
    $timeout(function(){
      $scope.el.addClass('load');
      var gradients = shuffle($scope.gradients);
      var gradient = gradients[0];
      $scope.el.css("background", "linear-gradient(to left, " + gradient.colors[0] + ", " + gradient.colors[1] + ")");
    }, 800)
  }

  var shuffle = function(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

};
