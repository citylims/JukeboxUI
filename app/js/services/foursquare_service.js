(function() {
  'use strict';

  angular
    .module('jukeboxApp')
    .factory('fourSquare', fourSquare);

  fourSquare.$inject = ['$http', 'secret'];

  function fourSquare($http, secret) {

    return {
      searchVenues: searchVenues
    }

    function searchVenues() {
      var foo = secret.getSecret();
      console.log(foo);
    }

  }

})();
