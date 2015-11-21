app.controller('JukeCtrl', JukeCtrl)

JukeCtrl.$inject['$scope', "$http", "Spotify"];

function JukeCtrl($scope, $http, Spotify, $timeout, $sce) {

  init();

  function init(){
    bindData();
  }

  function bindData() {
    $scope.pallete = angular.element(document.getElementById("pallete"));
    $scope.iframe = angular.element(document.getElementById("spotify-player"));
    console.log($scope.iframe);
    fetchGradients();
    fetchPlaylist();
  }

  function fetchGradients() {
    $http.get('assets/gradients.json').success(function(data){
      $scope.gradients = data;
    })
  }

  function fetchPlaylist() {
    $http.get('js/playlist.json').success(function(data) {
      console.log(data);
      $scope.timeCodes = [];
      $scope.tracks = data.tracks.items;
      for (var i = 0; i < $scope.tracks.length; i++) {
        var track = {
          duration: $scope.tracks[i].track.duration_ms,
          artist: $scope.tracks[i].track.artists[0].name
        }
        console.log(track);
        $scope.timeCodes.push(track);
      }
      trackCalc();
    })
  }

  $scope.ctaConfirm = function(tracks, timecodes) {
    // user event for play confirmation, due to spotify not exposing their api
    //init trackCalc.
  }

  function trackCalc(index) {
    transitionRefresh();
    $scope.iframe.removeClass();

    var index = index ? index : 0;
    var duration = $scope.timeCodes[index].duration;

    var soundTrack = $timeout(function() {
      $timeout.cancel(soundTrack);
      trackCalc(index + 1);
    }, duration);

    setArtist()

    function setArtist() {
      $scope.artist = $scope.timeCodes[index].artist;
      $scope.iframe.addClass($scope.timeCodes[index].artist);
      console.log($scope.artist);
    }
  }

  $scope.searchArtist = function () {
    Spotify.search($scope.searchartist, 'artist').then(function (data) {
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
      $scope.track = data;
      $scope.trackQuery = $sce.trustAsResourceUrl($scope.track.uri);
      player.append(template);
    }).error(function(data){
      console.log(data);
    })
  }

  function transitionRefresh() {
    $scope.pallete.removeClass('load')
    $timeout(function(){
      $scope.pallete.addClass('load');
      var gradients = shuffle($scope.gradients);
      var gradient = gradients[0];
      $scope.pallete.css("background", "linear-gradient(to left, " + gradient.colors[0] + ", " + gradient.colors[1] + ")");
    }, 800)
  }

  var shuffle = function(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

};
