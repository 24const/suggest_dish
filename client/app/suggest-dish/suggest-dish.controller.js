'use strict';

angular.module('suggestDishApp')
  .controller('SuggestDishCtrl', function ($scope, $resource) {
    $scope.dish = {};
    $scope.hadSubmitted = false;

    $scope.dishImageUpload = function(file, message) {
      var res = JSON.parse(message);
      $scope.dish.imageUrl = res.url;
    };

    $scope.saveSuggestedDish = function(dishForm) {
      $scope.hadSubmitted = true;
      console.log("Form invalid");

      if (dishForm.$valid) {
        var SuggestedDishApi = $resource('/api/suggestedDish');
        var suggestedDish = $scope.dish;

        //TODO: retrieve location from google places API
        //TODO: reset fields after save
        //TODO: show success and failure message at the top of screen
        console.log("suggestedDish", suggestedDish);
        var res = SuggestedDishApi.save(suggestedDish, function(resp) {
          console.log("Success", resp);
        });
      }
    }
  });
