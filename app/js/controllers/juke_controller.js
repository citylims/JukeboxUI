// app.controller('JukeCtrl', JukeCtrl)
(function() {

  'use strict';

  angular
    .module('jukeboxApp')
    .controller('JukeCtrl', JukeCtrl);

    JukeCtrl.$inject['$scope', "$http", "Spotify"];

    function JukeCtrl($scope, $http, Spotify, $timeout, $sce) {

      init();

      function init(){
        bindData();
        fetchGradients();
        fetchPlaylist();
      }

      function bindData() {
        $scope.pallete = angular.element(document.getElementById("pallete"));
        $scope.overlayButton = angular.element(document.getElementById("overlayBtn"));
        $scope.iframe = angular.element(document.getElementById("spotifyPlayer"));
        $scope.iframeContainer = angular.element(document.getElementById("iframeContainer"));
        // get iframe
        embedPlayButton();
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
            $scope.timeCodes.push(track);
          }
          $scope.transitionRefresh();
        })
      }

      function trackCalc(index) {
        $scope.iframe.removeClass();

        var index = index ? index : 0;
        console.log(index);
        var duration = $scope.timeCodes[index].duration;
        console.log(duration);

        var soundTrack = $timeout(function() {
          trackCalc(index + 1);
          $timeout.cancel(soundTrack);
          $scope.transitionRefresh();
          console.log("soundtrack")
        }, duration);

        setArtist()

        function setArtist() {
          $scope.artist = $scope.timeCodes[index].artist;
          $scope.iframe.addClass($scope.timeCodes[index].artist);
          console.log($scope.artist);
        }
      } //track calc

      $scope.searchArtist = function () {
        Spotify.search($scope.searchartist, 'artist').then(function (data) {
          $scope.artists = data.artists.items;
        });
      };

      function embedPlayButton() {
        //hardcoding this for now
        var embedUrl = "https://embed.spotify.com/?uri=";
        var playlistUri = "spotify%3Auser%3Acitylims%3Aplaylist%3A7Iu50rZxm3R0nciFzISZLd";
        var targetUrl = embedUrl += playlistUri;
        console.log(targetUrl);
        var template = "<iframe src='" + targetUrl + "' width='300' height='80' frameborder='0' allowtransparency='true'></iframe>";
        $scope.iframeContainer.append(template);
      }

      $scope.pressPlay = function() {
        $scope.overlayButton.css("display", "none");
        $timeout(function(){
          trackCalc();
        }, 1000 )
      }

      $scope.transitionRefresh = function() {
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
})();
