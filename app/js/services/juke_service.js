(function() {
  'use strict';

  angular
    .module('jukeboxApp')
    .factory('JukeService', JukeService);

  JukeService.$inject = ['$http'];

  function JukeService($http) {
    return {
      getGradients: getGradients
    };

    function getGradients() {
      return $http.get('assets/gradients.json');
    }

  }

})();
