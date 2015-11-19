'use strict';

var app = angular.module('jukeboxApp', ['spotify', 'ui.router'])
app.config(config);

function config(SpotifyProvider, $stateProvider, $urlRouterProvider) {
  SpotifyProvider.setClientId('27abb617a029486f9665b4a0a0c6adfe');
  SpotifyProvider.setRedirectUri('http://localhost:8888/callback.html');
  SpotifyProvider.setScope('playlist-read-private');

  $stateProvider

  .state('jukebox', {
    url: '/jukebox',
    templateUrl: 'templates/jukebox.html',
    controller: 'JukeCtrl'
  })

  //next

  //previous

  $urlRouterProvider.otherwise('/jukebox');
};
