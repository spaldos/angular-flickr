(function(){

  'use strict';

  angular.module('flickrApp', ['ngMaterial'])
    .controller('photosController', ['$scope', '$http', function($scope, $http){

      $scope.results = [];
      $scope.isSearching = true;

      $scope.search = function(){

        $scope.isSearching = true;

        setTimeout(function(){

        },5000);

        $http({

          method: 'GET',
          url: 'https://api.flickr.com/services/rest',
          params: {

            method: 'flickr.photos.search',
            api_key: '8ed63adedf2f6f72bbe0338fc915c428',
            text: $scope.searchText,
            format: 'json',
            safe_search: 1,
            content_type: 1,
            extras: 'description,tags,owner_name',
            nojsoncallback: 1,
            per_page: 10

          }

        }).success(function(data){

          $scope.isSearching = false;
          $scope.results = data;

        }).error(function(error){

          $scope.isSearching = false;
          console.error(error);

        });

      };

      $scope.photoUrl = function(photo){
        return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
      }

      $scope.photoPageUrl = function(photo){
        return 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id;
      };

      $scope.authorPageUrl = function(photo){
        return 'https://www.flickr.com/people/' + photo.owner;
      };

      $scope.tagPageUrl = function(tag){
        return 'https://www.flickr.com/search/?tags=' + tag;
      };

    }]);

})();