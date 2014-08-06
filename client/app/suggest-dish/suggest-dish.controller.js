'use strict';

angular.module('suggestDishApp')
  .controller('SuggestDishCtrl', function ($scope) {
    $scope.hadSubmitted = false;

    $scope.dishImageUpload = function(file) {
      console.log("file", file);
    };

    $scope.saveSuggestedDish = function() {
      $scope.hadSubmitted = true;
      console.log("scope.location", $scope.location);
      console.log("scope.dish", $scope.dish);
    }
  });
