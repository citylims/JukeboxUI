(function() {
  'use strict';

  angular
    .module('jukeboxApp')
    .factory('JukeService', JukeService);

  JukeService.$inject = ['$http'];

  function JukeService($http) {
    return {
      getGradients: getGradients,
      getPlaylist: getPlaylist
    };

    function getGradients() {
      return $http.get('assets/gradients.json');
    }

    function getPlaylist() {
      return $http.get('js/playlist.json');
    }

  }

})();
