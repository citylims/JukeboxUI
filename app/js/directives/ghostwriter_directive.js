(function() {
  'use strict';

  /**
  * @desc directive for ghostwriter
  * @example <ghost-writer></ghost-writer>
  */

  angular
    .module('jukeboxApp')
    .directive('ghostWriter', ghostWriter);

  function ghostWriter() {
    var directive = {
      restrict: 'E',
      templateUrl: '../templates/ghostwriter.html',
      scope: true,
      controller: ghostWriterCtrl,
      bindToController: true,
      link: link
    };
    return directive;

    function link(scope, element, attrs) {
      scope.addNote = function() {
        console.log("YO");
      };
    };
  }

  ghostWriterCtrl.$inject = ['$scope', '$http', '$timeout', '$interval', 'JukeService'];

  function ghostWriterCtrl($scope, $http, $timeout, $interval, JukeService) {

    init();

    function init() {
      setPlaylist();
    }

    function setPlaylist() {
      var trackStr = "";
      JukeService.getPlaylist().then(function(res) {
        var tracksArr = res.data.tracks.items;
        var trackList = setTrackQueue(tracksArr);
        writeMessage(trackList, 0);
      }, function(err) {
        console.log(err);
      });
    }

    function setTrackQueue(data) {
      var trackList = [];
      console.log(data);
      data.forEach(function(obj) {
        var str = ""
        var name = obj.track.name;
        var artist = obj.track.artists[0].name;
        str += (name + ' : ' + artist);
        console.log(str);
        trackList.push(str);
      })
      return trackList;
    }

    function writeMessage(placeholders, trackId) {
      var content = placeholders[trackId];
      var i = 0;
      var el = angular.element(document.getElementById('textBoxMessage'));
      var cursor = angular.element(document.getElementById('cursor'));
      $scope.cursor = "|";
      $scope.message = "";

      //refresh transition
      if (el.hasClass('fade')) {
        el.removeClass('fade');
      }
      if (cursor.hasClass('fade')) {
        cursor.removeClass('fade');
      }

      //type placeholder
      var timer = $interval(function() {
        if (i < content.length) {
          $scope.message += content[i];
        } else {
          $interval.cancel(timer);
          $timeout(function() {
            refresh(el, cursor, placeholders)
          }, 1500);
        }
        i++
      }, 130)

      //refresh
      function refresh (el, cursor, placeholders) {
        el.addClass('fade');
        cursor.addClass('fade');
        $timeout(function() {
          trackId++
          writeMessage(placeholders, trackId);
        }, 3000)
      }

    }//write message closure
  }//directive
})();
