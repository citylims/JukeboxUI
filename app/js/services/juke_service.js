(function() {
  'use strict';

  angular
    .module('jukeboxApp')
    .factory('JukeService', JukeService);

  JukeService.$inject = ['$http', '$timeout'];

  function JukeService($http, $timeout) {
    return {
      getGradients: getGradients,
      getPlaylist: getPlaylist,
      palleteRefresh: palleteRefresh
    };

    function getGradients() {
      return $http.get('assets/gradients.json');
    }

    function getPlaylist() {
      return $http.get('js/playlist.json');
    }

    function palleteRefresh(gradients) {
      var pallete = angular.element(document.getElementById("pallete"));
      pallete.toggleClass('load')

      var gradients = shuffle(gradients);

      $timeout(function(){
        pallete.toggleClass('load');
        var gradient = gradients[0];
        pallete.css("background", "linear-gradient(to left, " + gradient.colors[0] + ", " + gradient.colors[1] + ")");
      }, 800) //

      function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      }
    }

  }//JukeService

})();
